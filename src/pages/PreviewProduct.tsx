import type { JSX } from "react"
import { useState } from "react"
import { useLocation } from "react-router"
import useFunction from "../hooks/useFunction"
import { useAuth } from "../context/AuthContext"
import { MdOutlineShoppingCart } from "react-icons/md"


export default function PreviewProduct():JSX.Element{
    const location = useLocation()
    const { addCart } = useFunction()
    const { session } = useAuth()
    const product = location.state
    const [quantity,setQuantity] = useState<number>(1)

    // object of product needed to pass to addCart function
    const toBeCart = {
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        wax: product.wax,
        weight: product.weight,
        dimension: product.dimension,
        burning_time: product.burning_time,
        fragrance: product.fragrance,
        product_id: product.id,
        user_id: session?.user.id,
        quantity:quantity
    }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left - Product Image */}
      <div className="flex flex-col items-center">
        <img
          src={product.image_url} // replace with your image path
          alt="Spiced Mint Candleaf"
          className="w-full max-w-sm rounded-lg shadow-md"
        />
        <p className="mt-6 text-center text-gray-600">
          All hand-made with natural soy wax,{" "}
          <span className="font-semibold">Candleaf</span> is made for your pleasure moments.
        </p>
        <p className="mt-3 text-sm font-medium text-[#56B280] flex items-center gap-1">
          🚚 FREE SHIPPING
        </p>
      </div>

      {/* Right - Product Info */}
      <div>
        <h1 className="text-2xl font-medium mb-2">{product.name} Candleaf®</h1>
        <p className="text-[#56B280] text-xl font-semibold mb-4">${product.price}</p>

        {/* Purchase Options */}
        <div className="mb-6 space-y-3">
          <label className="flex items-center gap-2">
            <input type="radio" name="purchase" defaultChecked className="cursor-pointer" />
            One time purchase
          </label>

          <label className="flex items-start gap-2">
            <input type="radio" name="purchase" className="cursor-pointer"/>
            <span>
              <strong>Subscribe and delivery every </strong>
              <select className="ml-1 border rounded p-1 text-sm">
                <option>4 weeks</option>
                <option>2 weeks</option>
                <option>1 week</option>
              </select>
              <p className="text-xs text-gray-500">
                Subscribe now and get 10% off every recurring order. Discount applied at checkout.
              </p>
            </span>
          </label>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-medium">Quantity</span>
          <div className="flex items-center border rounded">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 cursor-pointer"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to cart button */}
        <button 
          className="w-full flex items-center justify-center gap-2 bg-[#56B280] 
          cursor-pointer text-white py-3 rounded-lg shadow hover:bg-green-700
           transition"
           onClick={ () => addCart(toBeCart)}

        >
          <MdOutlineShoppingCart size={20} /> Add to cart
        </button>

        {/* Extra Info */}
        <div className="mt-8 space-y-2 text-sm text-gray-600 border-dashed border-1 border-gray-400 p-2 rounded-sm">
          <p>
            <span className="font-semibold">Wax:</span> {product.wax}
          </p>
          <p>
            <span className="font-semibold">Fragrance:</span> {product.fragrance}
          </p>
          <p>
            <span className="font-semibold">Burning Time:</span> {product.burning_time}hrs
            <span className="ml-4 font-semibold">Dimension:</span> {product.dimension}
            <span className="ml-4 font-semibold">Weight:</span> {product.weight}g
          </p>
        </div>
      </div>
    </div>
  )
}