'use server';

import { supabaseServer } from '../lib/supabaseServer';
import { revalidatePath } from 'next/cache';

export async function addTeamMember(data: any) {
  try {
    const { data: member, error } = await supabaseServer
      .from('team_members')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    
    // Revalidate paths that show team members
    revalidatePath('/about/team', 'layout');
    
    return { success: true, data: member };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTeamMember(id: number, data: any) {
  try {
    const { data: member, error } = await supabaseServer
      .from('team_members')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Revalidate paths that show team members
    revalidatePath('/about/team', 'layout');
    
    return { success: true, data: member };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteTeamMember(id: number) {
  try {
    const { error } = await supabaseServer
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    // Revalidate paths that show team members
    revalidatePath('/about/team', 'layout');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function verifyUploadPassword(password: string) {
  const envPassword = process.env.TEAM_UPLOAD_PASSWORD;
  if (!envPassword) return false;
  return password === envPassword;
}
