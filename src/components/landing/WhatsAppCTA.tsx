import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface WhatsAppCTAProps {
  variant?: "primary" | "outline";
  className?: string;
  children?: React.ReactNode;
  showArrow?: boolean;
}

const WhatsAppCTA = ({
  variant = "primary",
  className = "",
  children = "DAFTAR SEKARANG",
  showArrow = true,
}: WhatsAppCTAProps) => {
  // Nomor default dalam format internasional
  // 089529002944 -> 6289529002944 (kode negara +62, tanpa 0 di depan)
  const [number, setNumber] = useState("6289529002944");
  const [message, setMessage] = useState("Halo, saya tertarik dengan Program Magang Entrepreneurship.");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [numRes, msgRes] = await Promise.all([
          supabase.from("site_settings").select("value").eq("key", "whatsapp_number").single(),
          supabase.from("site_settings").select("value").eq("key", "whatsapp_message").single(),
        ]);
        
        // Update nomor dan pesan jika ada data dari database
        if (numRes.data?.value) setNumber(numRes.data.value);
        if (msgRes.data?.value) setMessage(msgRes.data.value);
      } catch (error) {
        console.error("Error fetching WhatsApp settings:", error);
        // Gunakan nilai default jika terjadi error
      }
    };
    
    fetchSettings();
  }, []);

  const handleClick = () => {
    const encoded = encodeURIComponent(message);
    const link = `https://wa.me/${number}?text=${encoded}`;
    window.open(link, "_blank");
  };

  if (variant === "outline") {
    return (
      <button
        onClick={handleClick}
        className={`px-8 py-4 font-semibold border border-white/30 text-white rounded-full hover:bg-white/10 transition-all ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`px-8 py-4 font-bold bg-gradient-gold text-gray-900 rounded-full shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 ${className}`}
    >
      {children}
      {showArrow && (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      )}
    </button>
  );
};

export default WhatsAppCTA;