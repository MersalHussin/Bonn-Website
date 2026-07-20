"use server";

import { supabaseServer } from "../lib/supabaseServer";
import { revalidatePath } from "next/cache";

export async function fetchMessagesAction() {
  try {
    const { data, error } = await supabaseServer
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data || [] };
  } catch (error: any) {
    console.error("Server action fetch error:", error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function toggleMessageReadAction(id: string, currentStatus: boolean) {
  try {
    const { error } = await supabaseServer
      .from("contact_messages")
      .update({ is_read: !currentStatus })
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    console.error("Server action toggle error:", error);
    return { success: false, error: error.message };
  }
}

export async function markMessageReadAction(id: string) {
  try {
    const { error } = await supabaseServer
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    console.error("Server action mark read error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMessageAction(id: string) {
  try {
    const { error } = await supabaseServer
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) throw error;
    
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    console.error("Server action delete error:", error);
    return { success: false, error: error.message };
  }
}
