'use server';

import { supabaseServer } from '../lib/supabaseServer';
import { revalidatePath } from 'next/cache';

export async function addArtical(data: any) {
  try {
    const { data: artical, error } = await supabaseServer
      .from('articals')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath('/blog', 'layout');
    
    return { success: true, data: artical };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateArtical(id: number, data: any) {
  try {
    const { data: artical, error } = await supabaseServer
      .from('articals')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath('/blog', 'layout');
    
    return { success: true, data: artical };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteArtical(id: number) {
  try {
    const { error } = await supabaseServer
      .from('articals')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    revalidatePath('/blog', 'layout');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
