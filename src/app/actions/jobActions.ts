'use server';

import { supabaseServer } from '../lib/supabaseServer';
import { revalidatePath } from 'next/cache';

export async function addJob(data: any) {
  try {
    const { data: job, error } = await supabaseServer
      .from('jobs')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    
    // Revalidate paths that show jobs
    revalidatePath('/jobs', 'page');
    revalidatePath('/admin/jobs', 'page');
    
    return { success: true, data: job };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateJob(id: number, data: any) {
  try {
    const payload = { ...data, created_at: new Date().toISOString() };
    const { data: job, error } = await supabaseServer
      .from('jobs')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Revalidate paths that show jobs
    revalidatePath('/jobs', 'page');
    revalidatePath('/admin/jobs', 'page');
    
    return { success: true, data: job };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteJob(id: number) {
  try {
    const { error } = await supabaseServer
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    // Revalidate paths that show jobs
    revalidatePath('/jobs', 'page');
    revalidatePath('/admin/jobs', 'page');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
