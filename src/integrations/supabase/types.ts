export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      // ──── EXISTING ─────────────────────────
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          key: string
          value: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: Database["public"]["Enums"]["app_role"]
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          role?: Database["public"]["Enums"]["app_role"]
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          created_at?: string | null
        }
        Relationships: []
      }

      // ──── NEW TABLES ───────────────────────
      hero_section: {
        Row: {
          id: string
          badge_text: string | null
          headline: string | null
          headline_highlight: string | null
          subheadline: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          badge_text?: string | null
          headline?: string | null
          headline_highlight?: string | null
          subheadline?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          badge_text?: string | null
          headline?: string | null
          headline_highlight?: string | null
          subheadline?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      stats: {
        Row: {
          id: string
          value: string
          label: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          value: string
          label: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          value?: string
          label?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      problems: {
        Row: {
          id: string
          text: string
          subtext: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          text: string
          subtext?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          text?: string
          subtext?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      solution_highlights: {
        Row: {
          id: string
          icon: string
          text: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          icon: string
          text: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          icon?: string
          text?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      timeline_steps: {
        Row: {
          id: string
          icon: string
          title: string
          description: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          icon: string
          title: string
          description?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          icon?: string
          title?: string
          description?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      learnings: {
        Row: {
          id: string
          icon: string
          title: string
          description: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          icon: string
          title: string
          description?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          icon?: string
          title?: string
          description?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      mentors: {
        Row: {
          id: string
          title: string
          bio: string | null
          quote: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          bio?: string | null
          quote?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          bio?: string | null
          quote?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      mentor_credentials: {
        Row: {
          id: string
          icon: string
          text: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          icon: string
          text: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          icon?: string
          text?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      roadmap_phases: {
        Row: {
          id: string
          icon: string
          days: string
          title: string
          description: string | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          icon: string
          days: string
          title: string
          description?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          icon?: string
          days?: string
          title?: string
          description?: string | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      qualifications: {
        Row: {
          id: string
          text: string
          type: Database["public"]["Enums"]["qualification_type"]
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          text: string
          type: Database["public"]["Enums"]["qualification_type"]
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          text?: string
          type?: Database["public"]["Enums"]["qualification_type"]
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          question: string
          answer: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      qualification_type: "fit" | "not_fit"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      qualification_type: ["fit", "not_fit"],
    },
  },
} as const