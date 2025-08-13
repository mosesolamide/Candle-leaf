import type { JSX } from "react"
import { useState, useEffect } from "react"
import type { Product } from "../component/useFunction"
import useFunction from "../component/useFunction"
import { useAuth } from "../context/AuthContext"
import supabase from "../supabase-client"

export default function AvailableProduct(): JSX.Element {
  const { getProducts } = useFunction()
  const { setMessage, setShowMessage } = useAuth()
  const [products, setProducts] = useState<Product[]>([])

  // Get all products
  const getProduct = async () => {
    try {
      const result = await getProducts()
      if (result.success) {
        setProducts(result.data)
      } else {
        setMessage({ success: false, message: result.error })
        setShowMessage(true)
      }
    } catch (err: any) {
      setMessage({
        success: false,
        message: err.message || "Failed to load products",
      })
      setShowMessage(true)
    }
  }

  // Handle input change locally
  const handleInputChange = (index: number, field: keyof Product, value: string | number) => {
    setProducts((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  // Update in Supabase when user leaves input
  const handleSave = async (product: Product) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: product.name,
          price: product.price,
          wax: product.wax,
          weight: product.weight,
          dimension: product.dimension,
          burning_time: product.burning_time,
          fragrance: product.fragrance,
          description: product.description,
        })
        .eq('id', product.id)

      if (error) throw error

      setMessage({ success: true, message: "Product updated successfully" })
      setShowMessage(true)
    } catch (err: any) {
      setMessage({
        success: false,
        message: err.message || "Failed to update product",
      })
      setShowMessage(true)
    }
  }

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq('id',id)

      if (error) throw error
      setProducts((prev) => prev.filter((p) => p.id !== id))

      setMessage({ success: true, message: "Product deleted successfully" })
      setShowMessage(true)
    } catch (err: any) {
      setMessage({
        success: false,
        message: err.message || "Failed to delete product",
      })
      setShowMessage(true)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-4">
      <table className="min-w-[900px] divide-y divide-gray-200 text-sm sm:text-base">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Name",
              "Price",
              "Wax",
              "Weight",
              "Dimension",
              "Burning Time",
              "Fragrance",
              "Description",
              "Image",
              "Actions",
            ].map((heading) => (
              <th
                key={heading}
                className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((item, index) => {
            return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleInputChange(index, "price", Number(e.target.value))}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="text"
                    value={item.wax}
                    onChange={(e) => handleInputChange(index, "wax", e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="text"
                    value={item.weight}
                    onChange={(e) => handleInputChange(index, "weight", e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="text"
                    value={item.dimension}
                    onChange={(e) => handleInputChange(index, "dimension", e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="text"
                    value={item.burning_time}
                    onChange={(e) => handleInputChange(index, "burning_time", e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <input
                    type="text"
                    value={item.fragrance}
                    onChange={(e) => handleInputChange(index, "fragrance", e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <textarea
                    value={item.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    className="border rounded p-1 w-full"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                </td>
                  <td>
                    <button onClick={() => handleSave(item)} 
                      className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Save
                    </button>
                  </td>
                <td className="px-2 sm:px-4 py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
