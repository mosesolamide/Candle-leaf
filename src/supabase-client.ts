import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

// Your environment variables (Vite example: import.meta.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
export default supabase

  const getProducts = async () => {
    try {
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (productError) {
        throw productError
      }

      // Ensure we always return an array (not null)
      return { success: true, data: productData  }
    } catch (error: any) {
      console.error("Error fetching product:", error)
      return {
        success: false,
        error: error.message || "Getting product failed",
      }
    }
  }

  export { getProducts }