import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useWhatsAppNumber = () => {
  return useQuery({
    queryKey: ["whatsapp-number"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "whatsapp_number")
        .single();

      if (error) {
        console.error("Error fetching WhatsApp number:", error);
        return "628123456789"; // fallback
      }

      return data?.value || "628123456789";
    },
  });
};

export const getWhatsAppLink = (number: string, message?: string) => {
  const baseUrl = "https://wa.me/";
  const cleanNumber = number.replace(/\D/g, "");
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return `${baseUrl}${cleanNumber}${encodedMessage}`;
};
