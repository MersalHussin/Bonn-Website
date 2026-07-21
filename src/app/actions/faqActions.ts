"use server";

import { supabaseServer } from "../lib/supabaseServer";
import { revalidatePath } from "next/cache";

export async function fetchFaqQuestionsAction() {
  try {
    const { data, error } = await supabaseServer
      .from("faq_questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching FAQ questions:", error);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (error: any) {
    console.error("Server action fetch error:", error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function toggleFaqReadAction(id: string, currentStatus: boolean) {
  try {
    const { error } = await supabaseServer
      .from("faq_questions")
      .update({ is_read: !currentStatus })
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath("/admin/faq-questions");
    return { success: true };
  } catch (error: any) {
    console.error("Server action toggle error:", error);
    return { success: false, error: error.message };
  }
}

export async function markFaqReadAction(id: string) {
  try {
    const { error } = await supabaseServer
      .from("faq_questions")
      .update({ is_read: true })
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath("/admin/faq-questions");
    return { success: true };
  } catch (error: any) {
    console.error("Server action mark read error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteFaqQuestionAction(id: string) {
  try {
    const { error } = await supabaseServer
      .from("faq_questions")
      .delete()
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath("/admin/faq-questions");
    return { success: true };
  } catch (error: any) {
    console.error("Server action delete error:", error);
    return { success: false, error: error.message };
  }
}
