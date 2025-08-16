import supabase from "../supabase-client"

export type Product = {
  name: string
  description: string
  price: number
  image_url: string
  wax: string
  weight: number
  dimension: string
  burning_time: string
  fragrance: string
  id: string
}

type ProductResult =
  | { success: true; data: Product[] }
  | { success: false; error: string }

export default function useFunction() {
  const getProducts = async (): Promise<ProductResult> => {
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

  return { getProducts }
}
