import supabase from "../supabase-client"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  wax: string
  weight: number
  dimension: string
  burning_time: string
  fragrance: string
  created_at?: string
}

export type CartItem = Omit<Product, "id"> & {
  product_id: string
  quantity: number
}

export default function useFunction() {
  const { setMessage, setShowMessage, session } = useAuth()
  const [cart, setCart] = useState<CartItem[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const addCart = async (product: any) => {
    try {
      if (!session) throw new Error("You have to login first")
      const { error: cartErr } = await supabase
        .from("cart")
        .insert(product)

      if (cartErr) throw cartErr

      setMessage({ success: true, message: "Successfully Added Product to cart" })
      setShowMessage(true)
    } catch (err: any) {
      setShowMessage(true)
      setMessage({
        success: false,
        message: err?.message || "Failed to add product",
      })
    }
  }

  async function fetchCart() {
    try {
      const { data, error } = await supabase
        .from("cart")
        .select(`
          product_id,
          name,
          price,
          image_url,
          wax,
          weight,
          dimension,
          burning_time,
          fragrance,
          quantity:quantity.sum()
        `)

      if (error) throw error
      setCart(data as CartItem[])
    } catch (err: any) {
      setShowMessage(true)
      setMessage({
        success: false,
        message: err?.message || "Failed to fetch cart",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("product_id", id)

      if (error) throw error

      setCart(prev => prev ? prev.filter(item => item.product_id !== id) : prev)
      setMessage({ success: true, message: "Successfully removed from cart" })
      setShowMessage(true)
    } catch (err: any) {
      setMessage({
        success: false,
        message: err.message || "Failed to delete from cart",
      })
      setShowMessage(true)
    }
  }

    // Function to update quantity
    const updateQuantity = async (id: string, sign: string) => {
      try{
       const item = cart && cart.find(i => i.product_id === id)
        if (!item) return
  
        // Decide new quantity
        let newQuantity = sign === "+" ? item.quantity + 1 : item.quantity - 1
        if (newQuantity < 1) newQuantity = 1 // prevent going below 1
  
        // Update UI
        setCart(prev =>
          prev && prev.map(i =>
            i.product_id === id ? { ...i, quantity: newQuantity } : i
          )
        )
  
        // Update in Supabase
        const { error } = await supabase
          .from("cart")
          .update({ quantity: newQuantity })
          .eq("product_id", id)
  
        if (error) {
          // go back to the previous quantity
          setCart(prev =>
            prev && prev.map(i =>
              i.product_id === id ? { ...i, quantity: item.quantity } : i
            )
          ) 
          throw error.message
        }
      }catch(err:any){
        setMessage({
          success: false,
          message: err.message || "Failed to delete from cart",
        })
        setShowMessage(true)
      }
    }

  useEffect(() => {
    fetchCart()
  }, [])

  return { addCart, handleDelete, fetchCart, loading, cart, updateQuantity }
}
