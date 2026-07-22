"use server";

import { supabaseServer } from "../lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { DEFAULT_FAQS, FAQItemData } from "../constants/defaultFaqs";

export type { FAQItemData };

/* ============================================================
   ADMIN FAQ MANAGEMENT ACTIONS (Table: faqs)
   ============================================================ */

export async function fetchFaqsAction() {
  try {
    const { data, error } = await supabaseServer
      .from("faqs")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.warn("Notice: Table 'faqs' error or missing, returning default items:", error.message);
      return { success: true, data: DEFAULT_FAQS, isDefault: true };
    }

    if (!data || data.length === 0) {
      return { success: true, data: DEFAULT_FAQS, isDefault: true };
    }

    return { success: true, data: data as FAQItemData[], isDefault: false };
  } catch (error: any) {
    console.error("Server action fetchFaqs error:", error);
    return { success: true, data: DEFAULT_FAQS, isDefault: true };
  }
}

export async function addFaqAction(faqData: Omit<FAQItemData, "id" | "created_at">) {
  try {
    const { data, error } = await supabaseServer
      .from("faqs")
      .insert([faqData])
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/faqs");
    revalidatePath("/faq");
    return { success: true, data };
  } catch (error: any) {
    console.error("Error adding FAQ:", error);
    return { success: false, error: error.message };
  }
}

export async function updateFaqAction(id: string | number, faqData: Partial<FAQItemData>) {
  try {
    const { data, error } = await supabaseServer
      .from("faqs")
      .update(faqData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    revalidatePath("/admin/faqs");
    revalidatePath("/faq");
    return { success: true, data };
  } catch (error: any) {
    console.error("Error updating FAQ:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteFaqAction(id: string | number) {
  try {
    const { error } = await supabaseServer
      .from("faqs")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/admin/faqs");
    revalidatePath("/faq");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting FAQ:", error);
    return { success: false, error: error.message };
  }
}

export async function seedDefaultFaqsAction() {
  try {
    const { error } = await supabaseServer
      .from("faqs")
      .insert(DEFAULT_FAQS);

    if (error) throw error;

    revalidatePath("/admin/faqs");
    revalidatePath("/faq");
    return { success: true };
  } catch (error: any) {
    console.error("Error seeding default FAQs:", error);
    return { success: false, error: error.message };
  }
}

/* ============================================================
   USER SUBMITTED QUESTIONS ACTIONS (Table: faq_questions)
   ============================================================ */

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
