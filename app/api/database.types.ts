export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ceo_prompts: {
        Row: {
          created_at: string
          id: number
          prompt: string
          response: string
        }
        Insert: {
          created_at?: string
          id?: number
          prompt: string
          response: string
        }
        Update: {
          created_at?: string
          id?: number
          prompt?: string
          response?: string
        }
        Relationships: []
      }
      echoes_characters: {
        Row: {
          archived: boolean
          created_at: string
          id: number
          image: string
          name: string
          prompt: string
          slug: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          id?: number
          image: string
          name: string
          prompt: string
          slug: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          id?: number
          image?: string
          name?: string
          prompt?: string
          slug?: string
        }
        Relationships: []
      }
      echoes_conversations: {
        Row: {
          archived: boolean
          characterId: number
          created_at: string
          id: number
          mood: number
          trust: number
          userId: number
        }
        Insert: {
          archived?: boolean
          characterId: number
          created_at?: string
          id?: number
          mood?: number
          trust?: number
          userId: number
        }
        Update: {
          archived?: boolean
          characterId?: number
          created_at?: string
          id?: number
          mood?: number
          trust?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "echoes_userConversations_characterId_fkey"
            columns: ["characterId"]
            isOneToOne: false
            referencedRelation: "echoes_characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "echoes_userConversations_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "echoes_users"
            referencedColumns: ["id"]
          },
        ]
      }
      echoes_history: {
        Row: {
          conversationId: number
          created_at: string
          id: number
          input: string
          priority: number
          response: string | null
        }
        Insert: {
          conversationId: number
          created_at?: string
          id?: number
          input: string
          priority?: number
          response?: string | null
        }
        Update: {
          conversationId?: number
          created_at?: string
          id?: number
          input?: string
          priority?: number
          response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "echoes_history_conversationId_fkey"
            columns: ["conversationId"]
            isOneToOne: false
            referencedRelation: "echoes_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      echoes_users: {
        Row: {
          archived: boolean
          created_at: string
          email: string
          id: number
          username: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          email: string
          id?: number
          username: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          email?: string
          id?: number
          username?: string
        }
        Relationships: []
      }
      prompts: {
        Row: {
          confidence: number
          created_at: string
          id: number
          prompt: string
          report: string
        }
        Insert: {
          confidence: number
          created_at?: string
          id?: number
          prompt: string
          report: string
        }
        Update: {
          confidence?: number
          created_at?: string
          id?: number
          prompt?: string
          report?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
