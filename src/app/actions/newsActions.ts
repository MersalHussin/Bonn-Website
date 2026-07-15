'use server';

import { supabaseServer } from '../lib/supabaseServer';
import { revalidatePath } from 'next/cache';

export async function addNews(data: any) {
  try {
    const { data: newsItem, error } = await supabaseServer
      .from('news')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath('/news', 'layout');
    
    return { success: true, data: newsItem };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateNews(id: number, data: any) {
  try {
    const { data: newsItem, error } = await supabaseServer
      .from('news')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath('/news', 'layout');
    
    return { success: true, data: newsItem };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteNews(id: number) {
  try {
    const { error } = await supabaseServer
      .from('news')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    revalidatePath('/news', 'layout');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
