import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut, Settings, Phone, Save, MessageSquare,
  Plus, Trash2, ChevronDown, ChevronUp, Edit3,
  Check, X, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// ─── Types ──────────────────────────────────────────────────
interface HeroData { id: string; badge_text: string; headline: string; headline_highlight: string; subheadline: string; }
interface Stat { id: string; value: string; label: string; sort_order: number; }
interface Problem { id: string; text: string; subtext: string; sort_order: number; }
interface SolutionHighlight { id: string; icon: string; text: string; sort_order: number; }
interface TimelineStep { id: string; icon: string; title: string; description: string; sort_order: number; }
interface Learning { id: string; icon: string; title: string; description: string; sort_order: number; }
interface Mentor { id: string; title: string; bio: string; quote: string; }
interface MentorCredential { id: string; icon: string; text: string; sort_order: number; }
interface RoadmapPhase { id: string; icon: string; days: string; title: string; description: string; sort_order: number; }
interface Qualification { id: string; text: string; type: string; sort_order: number; }
interface FAQ { id: string; question: string; answer: string; sort_order: number; }

// ─── Editable Field ─────────────────────────────────────────
const EditableField = ({ label, value, onChange, multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) => (
  <div className="space-y-1">
    <Label className="text-xs text-muted-foreground uppercase tracking-wide">{label}</Label>
    {multiline ? (
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="text-sm min-h-[70px] resize-none" />
    ) : (
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="text-sm" />
    )}
  </div>
);

// ─── Collapsible Section Panel ──────────────────────────────
const SectionPanel = ({ icon, title, description, children, defaultOpen = false }: {
  icon: React.ReactNode; title: string; description: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="overflow-hidden border border-border">
      <button onClick={() => setOpen(!open)} className="w-full text-left">
        <CardHeader className="py-4 px-5 hover:bg-card/80 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">{icon}</div>
              <div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription className="text-xs">{description}</CardDescription>
              </div>
            </div>
            {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </CardHeader>
      </button>
      {open && (
        <CardContent className="px-5 pb-5 pt-0 border-t border-border">
          <div className="pt-4">{children}</div>
        </CardContent>
      )}
    </Card>
  );
};

// ─── Generic CRUD List ──────────────────────────────────────
interface CRUDField { key: string; label: string; multiline?: boolean; placeholder?: string; }

const CRUDList = ({ items, setItems, table, fields, onAdd }: {
  items: any[];
  setItems: (items: any[]) => void;
  table: string;
  fields: CRUDField[];
  onAdd: () => any;
}) => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<Record<string, any>>({});

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setDraft({ ...draft, [item.id]: { ...item } });
  };

  const updateDraft = (id: string, key: string, value: string) => {
    setDraft({ ...draft, [id]: { ...draft[id], [key]: value } });
  };

  const handleAdd = async () => {
    const newItem = onAdd();
    setSaving(true);
    try {
      const payload: any = { ...newItem };
      delete payload.id;
      const { data, error } = await (supabase as any).from(table).insert(payload).select().single();
      if (error) throw error;
      setItems([...items, data]);
      toast({ title: "Berhasil ditambahkan" });
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleUpdate = async (id: string) => {
    const updated = draft[id];
    if (!updated) return;
    setSaving(true);
    try {
      const payload: any = { ...updated };
      const { error } = await (supabase as any).from(table).update(payload).eq("id", id);
      if (error) throw error;
      setItems(items.map((i) => (i.id === id ? updated : i)));
      setEditingId(null);
      toast({ title: "Berhasil diperbarui" });
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      const { error } = await (supabase as any).from(table).delete().eq("id", id);
      if (error) throw error;
      setItems(items.filter((i) => i.id !== id));
      toast({ title: "Berhasil dihapus" });
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border border-border rounded-lg overflow-hidden">
          {editingId === item.id && draft[item.id] ? (
            <div className="p-4 bg-card space-y-3">
              {fields.map((f) => (
                <EditableField
                  key={f.key}
                  label={f.label}
                  value={String(draft[item.id][f.key] ?? "")}
                  onChange={(v) => updateDraft(item.id, f.key, v)}
                  multiline={f.multiline}
                  placeholder={f.placeholder}
                />
              ))}
              <div className="flex gap-2 pt-1">
                <button onClick={() => handleUpdate(item.id)} disabled={saving} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-accent text-accent-foreground rounded-md hover:opacity-80 transition disabled:opacity-50">
                  {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />} Simpan
                </button>
                <button onClick={() => setEditingId(null)} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-muted text-foreground rounded-md hover:opacity-80 transition">
                  <X className="w-3 h-3" /> Batalkan
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between p-3 bg-card hover:bg-card/80 transition">
              <div className="flex-1 pr-4 space-y-0.5">
                {fields.map((f, fi) => (
                  <p key={f.key} className={fi === 0 ? "text-sm font-medium text-foreground" : "text-xs text-muted-foreground"}>
                    {String(item[f.key] ?? "")}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => startEdit(item)} className="p-1.5 rounded hover:bg-muted transition text-muted-foreground hover:text-foreground">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleAdd} disabled={saving} className="w-full flex items-center justify-center gap-2 text-xs px-4 py-2.5 border border-dashed border-accent/40 text-accent rounded-lg hover:bg-accent/5 transition disabled:opacity-50">
        <Plus className="w-3.5 h-3.5" /> Tambah Baru
      </button>
    </div>
  );
};

// ─── Save Button ────────────────────────────────────────────
const SaveBtn = ({ onClick, disabled, label = "Simpan Perubahan" }: { onClick: () => void; disabled?: boolean; label?: string }) => (
  <Button onClick={onClick} disabled={disabled} className="w-full bg-gradient-gold text-accent-foreground font-semibold text-sm">
    {disabled ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
    {label}
  </Button>
);

// ─── Main Component ─────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // site_settings
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // single-row tables
  const [hero, setHero] = useState<HeroData | null>(null);
  const [mentor, setMentor] = useState<Mentor | null>(null);

  // list tables
  const [stats, setStats] = useState<Stat[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [solutionHighlights, setSolutionHighlights] = useState<SolutionHighlight[]>([]);
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>([]);
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [mentorCredentials, setMentorCredentials] = useState<MentorCredential[]>([]);
  const [roadmapPhases, setRoadmapPhases] = useState<RoadmapPhase[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // Auth guard
  useEffect(() => {
    if (!loading && !user) navigate("/admin/login");
  }, [user, loading, navigate]);

  // Fetch all
  useEffect(() => {
    if (!user) return;
    const fetchAll = async () => {
      const [settingsRes, heroRes, statsRes, problemsRes, solutionRes, timelineRes,
        learningsRes, mentorRes, mentorCredRes, roadmapRes, qualRes, faqRes] = await Promise.all([
        supabase.from("site_settings").select("*"),
        supabase.from("hero_section").select("*").single(),
        supabase.from("stats").select("*").order("sort_order"),
        supabase.from("problems").select("*").order("sort_order"),
        supabase.from("solution_highlights").select("*").order("sort_order"),
        supabase.from("timeline_steps").select("*").order("sort_order"),
        supabase.from("learnings").select("*").order("sort_order"),
        supabase.from("mentors").select("*").single(),
        supabase.from("mentor_credentials").select("*").order("sort_order"),
        supabase.from("roadmap_phases").select("*").order("sort_order"),
        supabase.from("qualifications").select("*").order("sort_order"),
        supabase.from("faqs").select("*").order("sort_order"),
      ]);
      if (settingsRes.data) {
        settingsRes.data.forEach((s: any) => {
          if (s.key === "whatsapp_number") setWhatsappNumber(s.value);
          if (s.key === "whatsapp_message") setWhatsappMessage(s.value);
          if (s.key === "contact_email") setContactEmail(s.value);
        });
      }
      if (heroRes.data) setHero(heroRes.data as any);
      if (statsRes.data) setStats(statsRes.data as any);
      if (problemsRes.data) setProblems(problemsRes.data as any);
      if (solutionRes.data) setSolutionHighlights(solutionRes.data as any);
      if (timelineRes.data) setTimelineSteps(timelineRes.data as any);
      if (learningsRes.data) setLearnings(learningsRes.data as any);
      if (mentorRes.data) setMentor(mentorRes.data as any);
      if (mentorCredRes.data) setMentorCredentials(mentorCredRes.data as any);
      if (roadmapRes.data) setRoadmapPhases(roadmapRes.data as any);
      if (qualRes.data) setQualifications(qualRes.data as any);
      if (faqRes.data) setFaqs(faqRes.data as any);
    };
    fetchAll();
  }, [user]);

  // Save site_settings
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await Promise.all([
        supabase.from("site_settings").upsert({ key: "whatsapp_number", value: whatsappNumber }, { onConflict: "key" }),
        supabase.from("site_settings").upsert({ key: "whatsapp_message", value: whatsappMessage }, { onConflict: "key" }),
        supabase.from("site_settings").upsert({ key: "contact_email", value: contactEmail }, { onConflict: "key" }),
      ]);
      toast({ title: "Pengaturan berhasil disimpan" });
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    }
    setIsSaving(false);
  };

  // Save hero
  const handleSaveHero = async () => {
    if (!hero) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from("hero_section").update({
        badge_text: hero.badge_text, headline: hero.headline,
        headline_highlight: hero.headline_highlight, subheadline: hero.subheadline,
      }).eq("id", hero.id);
      if (error) throw error;
      toast({ title: "Hero berhasil diperbarui" });
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    }
    setIsSaving(false);
  };

  // Save mentor
  const handleSaveMentor = async () => {
    if (!mentor) return;
    setIsSaving(true);
    try {
      const { error } = await supabase.from("mentors").update({
        title: mentor.title, bio: mentor.bio, quote: mentor.quote,
      }).eq("id", mentor.id);
      if (error) throw error;
      toast({ title: "Mentor berhasil diperbarui" });
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    }
    setIsSaving(false);
  };

  const handleSignOut = async () => { await signOut(); navigate("/"); };

  // ── Loading / Access Denied ────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-accent animate-spin" />
    </div>
  );

  if (!isAdmin) return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-6">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-destructive">Akses Ditolak</CardTitle>
          <CardDescription>Anda tidak memiliki akses admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/")} className="w-full">Kembali ke Home</Button>
        </CardContent>
      </Card>
    </div>
  );

  // ── Main Render ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-gold rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h1 className="font-display text-base font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="text-xs px-3 py-1.5 h-auto">
            <LogOut className="w-3.5 h-3.5 mr-1.5" /> Keluar
          </Button>
        </div>
      </header>

      {/* Panels */}
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">

          {/* 1. PENGATURAN UMUM */}
          <SectionPanel defaultOpen icon={<Phone className="w-5 h-5" />} title="Pengaturan Umum" description="WhatsApp & Kontak">
            <div className="space-y-3">
              <EditableField label="Nomor WhatsApp" value={whatsappNumber} onChange={setWhatsappNumber} placeholder="628123456789" />
              <EditableField label="Pesan WhatsApp Default" value={whatsappMessage} onChange={setWhatsappMessage} multiline placeholder="Halo, saya tertarik..." />
              <EditableField label="Email Kontak" value={contactEmail} onChange={setContactEmail} placeholder="info@example.com" />
              <SaveBtn onClick={handleSaveSettings} disabled={isSaving} />
            </div>
          </SectionPanel>

          {/* 2. HERO */}
          <SectionPanel icon={<span className="text-lg">🎯</span>} title="Hero Section" description="Headline utama halaman">
            {hero ? (
              <div className="space-y-3">
                <EditableField label="Badge Text" value={hero.badge_text} onChange={(v) => setHero({ ...hero, badge_text: v })} />
                <EditableField label="Headline" value={hero.headline} onChange={(v) => setHero({ ...hero, headline: v })} />
                <EditableField label="Headline Highlight (Gold)" value={hero.headline_highlight} onChange={(v) => setHero({ ...hero, headline_highlight: v })} />
                <EditableField label="Subheadline" value={hero.subheadline} onChange={(v) => setHero({ ...hero, subheadline: v })} multiline />
                <SaveBtn onClick={handleSaveHero} disabled={isSaving} />
              </div>
            ) : <p className="text-xs text-muted-foreground">Belum ada data.</p>}
          </SectionPanel>

          {/* 3. STATS */}
          <SectionPanel icon={<span className="text-lg">📊</span>} title="Statistik" description="Angka-angka di Hero">
            <CRUDList items={stats} setItems={setStats} table="stats"
              fields={[
                { key: "value", label: "Nilai", placeholder: "15+" },
                { key: "label", label: "Label", placeholder: "Tahun Pengalaman" },
                { key: "sort_order", label: "Urutan" },
              ]}
              onAdd={() => ({ id: "", value: "", label: "", sort_order: stats.length + 1 })}
            />
          </SectionPanel>

          {/* 4. PROBLEMS */}
          <SectionPanel icon={<span className="text-lg">⚠️</span>} title="Masalah Nyata" description="Pain points pengunjung">
            <CRUDList items={problems} setItems={setProblems} table="problems"
              fields={[
                { key: "text", label: "Masalah", placeholder: "Magang cuma jadi admin" },
                { key: "subtext", label: "Deskripsi", placeholder: "Bukan belajar bisnis..." },
                { key: "sort_order", label: "Urutan" },
              ]}
              onAdd={() => ({ id: "", text: "", subtext: "", sort_order: problems.length + 1 })}
            />
          </SectionPanel>

          {/* 5. SOLUTION HIGHLIGHTS */}
          <SectionPanel icon={<span className="text-lg">✨</span>} title="Highlight Solusi" description="Poin unggulan program">
            <CRUDList items={solutionHighlights} setItems={setSolutionHighlights} table="solution_highlights"
              fields={[
                { key: "icon", label: "Icon (nama)", placeholder: "Wallet" },
                { key: "text", label: "Teks", placeholder: "Tanpa Modal" },
                { key: "sort_order", label: "Urutan" },
              ]}
              onAdd={() => ({ id: "", icon: "", text: "", sort_order: solutionHighlights.length + 1 })}
            />
          </SectionPanel>

          {/* 6. TIMELINE */}
          <SectionPanel icon={<span className="text-lg">📍</span>} title="Alur Program (Timeline)" description="Langkah-langkah program">
            <CRUDList items={timelineSteps} setItems={setTimelineSteps} table="timeline_steps"
              fields={[
                { key: "icon", label: "Icon", placeholder: "Filter" },
                { key: "title", label: "Judul", placeholder: "Seleksi Ketat" },
                { key: "description", label: "Deskripsi", placeholder: "Hanya yang siap bertumbuh" },
                { key: "sort_order", label: "Urutan" },
              ]}
              onAdd={() => ({ id: "", icon: "", title: "", description: "", sort_order: timelineSteps.length + 1 })}
            />
          </SectionPanel>

          {/* 7. LEARNINGS */}
          <SectionPanel icon={<span className="text-lg">📚</span>} title="Kurikulum" description="Apa yang akan dipelajari">
            <CRUDList items={learnings} setItems={setLearnings} table="learnings"
              fields={[
                { key: "icon", label: "Icon", placeholder: "Crown" },
                { key: "title", label: "Judul", placeholder: "Leadership & Mental Owner" },
                { key: "description", label: "Deskripsi", placeholder: "Membangun mindset...", multiline: true },
                { key: "sort_order", label: "Urutan" },
              ]}
              onAdd={() => ({ id: "", icon: "", title: "", description: "", sort_order: learnings.length + 1 })}
            />
          </SectionPanel>

          {/* 8. MENTOR */}
          <SectionPanel icon={<span className="text-lg">👨‍🏫</span>} title="Mentor" description="Informasi mentor utama">
            {mentor ? (
              <div className="space-y-3">
                <EditableField label="Judul" value={mentor.title} onChange={(v) => setMentor({ ...mentor, title: v })} />
                <EditableField label="Bio" value={mentor.bio} onChange={(v) => setMentor({ ...mentor, bio: v })} multiline />
                <EditableField label="Kutipan" value={mentor.quote} onChange={(v) => setMentor({ ...mentor, quote: v })} multiline />
                <SaveBtn onClick={handleSaveMentor} disabled={isSaving} />
              </div>
            ) : <p className="text-xs text-muted-foreground">Belum ada data.</p>}
          </SectionPanel>

          {/* 9. MENTOR CREDENTIALS */}
          <SectionPanel icon={<span className="text-lg">🏆</span>} title="Kredensial Mentor" description="Pencapaian mentor">
            <CRUDList items={mentorCredentials} setItems={setMentorCredentials} table="mentor_credentials"
              fields={[
                { key: "icon", label: "Icon", placeholder: "Award" },
                { key: "text", label: "Teks", placeholder: "15+ Tahun Pengalaman" },
                { key: "sort_order", label: "Urutan" },
              ]}
              onAdd={() => ({ id: "", icon: "", text: "", sort_order: mentorCredentials.length + 1 })}
            />
          </SectionPanel>

          {/* 10. ROADMAP */}
          <SectionPanel icon={<span className="text-lg">🗺️</span>} title="Roadmap 90 Hari" description="Fase-fase program">
            <CRUDList items={roadmapPhases} setItems={setRoadmapPhases} table="roadmap_phases"
              fields={[
                { key: "icon", label: "Icon", placeholder: "Brain" },
                { key: "days", label: "Periode", placeholder: "Hari 1–30" },
                { key: "title", label: "Judul Fase", placeholder: "Mental & Fundamental" },
                { key: "description", label: "Deskripsi", placeholder: "Membangun fondasi...", multiline: true },
                { key: "sort_order", label: "Urutan" },
              ]}
              onAdd={() => ({ id: "", icon: "", days: "", title: "", description: "", sort_order: roadmapPhases.length + 1 })}
            />
          </SectionPanel>

          {/* 11. QUALIFICATIONS */}
          <SectionPanel icon={<span className="text-lg">✅</span>} title="Kualifikasi" description="Cocok / Tidak cocok">
            <div className="space-y-4">
              <p className="text-xs font-semibold text-accent uppercase tracking-wide">✓ Cocok untuk</p>
              <CRUDList
                items={qualifications.filter((q) => q.type === "fit")}
                setItems={(updated) => setQualifications([...updated, ...qualifications.filter((q) => q.type === "not_fit")])}
                table="qualifications"
                fields={[
                  { key: "text", label: "Teks", placeholder: "Mau belajar dengan serius" },
                  { key: "sort_order", label: "Urutan" },
                ]}
                onAdd={() => ({ id: "", text: "", type: "fit", sort_order: qualifications.filter((q) => q.type === "fit").length + 1 })}
              />
              <p className="text-xs font-semibold text-destructive uppercase tracking-wide mt-4">✗ Tidak cocok jika</p>
              <CRUDList
                items={qualifications.filter((q) => q.type === "not_fit")}
                setItems={(updated) => setQualifications([...qualifications.filter((q) => q.type === "fit"), ...updated])}
                table="qualifications"
                fields={[
                  { key: "text", label: "Teks", placeholder: "Hanya cari sertifikat" },
                  { key: "sort_order", label: "Urutan" },
                ]}
                onAdd={() => ({ id: "", text: "", type: "not_fit", sort_order: qualifications.filter((q) => q.type === "not_fit").length + 1 })}
              />
            </div>
          </SectionPanel>

          {/* 12. FAQ */}
          <SectionPanel icon={<span className="text-lg">❓</span>} title="FAQ" description="Pertanyaan sering diajukan">
            <CRUDList items={faqs} setItems={setFaqs} table="faqs"
              fields={[
                { key: "question", label: "Pertanyaan", placeholder: "Apakah program ini gratis?" },
                { key: "answer", label: "Jawaban", placeholder: "Ya, program ini GRATIS...", multiline: true },
                { key: "sort_order", label: "Urutan" },
              ]}
              onAdd={() => ({ id: "", question: "", answer: "", sort_order: faqs.length + 1 })}
            />
          </SectionPanel>

        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;