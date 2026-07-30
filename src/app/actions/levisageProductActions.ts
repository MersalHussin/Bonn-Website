'use server';

import { supabaseServer } from '../lib/supabaseServer';
import { revalidatePath } from 'next/cache';

export async function getLeVisageProducts() {
  try {
    const { data, error } = await supabaseServer
      .from('levisage_products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLeVisageProduct(id: string) {
  try {
    const { data, error } = await supabaseServer
      .from('levisage_products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addLeVisageProduct(data: any) {
  try {
    const { data: product, error } = await supabaseServer
      .from('levisage_products')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath('/levisage/admin', 'layout');
    revalidatePath('/brands/leVisagePlus/products', 'page');
    
    return { success: true, data: product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateLeVisageProduct(id: string, data: any) {
  try {
    const { data: product, error } = await supabaseServer
      .from('levisage_products')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    revalidatePath('/levisage/admin', 'layout');
    revalidatePath('/brands/leVisagePlus/products', 'page');
    
    return { success: true, data: product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteLeVisageProduct(id: string) {
  try {
    const { error } = await supabaseServer
      .from('levisage_products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    revalidatePath('/levisage/admin', 'layout');
    revalidatePath('/brands/leVisagePlus/products', 'page');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
