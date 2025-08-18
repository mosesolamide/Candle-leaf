import type { JSX } from "react"
import useFunction from "../hooks/useFunction"
import Loading from "../component/Loading"
import { Link } from "react-router"
import { RiDeleteBinLine, RiShoppingCartLine } from "react-icons/ri"

export default function Cart(): JSX.Element {
  const { handleDelete, loading, cart, updateQuantity } = useFunction()
  const total = cart?.reduce((acc, item) => {
    return acc + item.quantity * item.price
  }, 0)


  if (loading) {
    return <Loading />
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <RiShoppingCartLine className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Looks like you haven’t added anything yet. Browse our products and find something you love
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center my-16">
      <div className="flex flex-col gap-2">
        Your cart item
        <Link to="/" className="text-[#56B280] underline">Back to shopping</Link>
      </div>

      <table className="w-full max-w-7xl mt-4">
        <thead>
          <tr className="text-xs md:text-sm font-medium">
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {cart.map(item => (
            <tr key={item.product_id} className="text-center border-b border-gray-400 text-xs sm:text-sm font-medium">
              <td className="py-4">
                <img src={item.image_url} alt="" className="w-[40px] sm:w-[50px] md:w-[60px] mx-auto" />
              </td>
              <td className="py-4">{item.name}</td>
              <td className="py-4">${item.price}</td>
              <td className="py-4">
                <button
                  onClick={() => updateQuantity(item.product_id, "-")}
                  className="px-1 md:px-3 py-1 cursor-pointer"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product_id, "+")}
                  className="px-1 md:px-3 py-1 cursor-pointer"
                >
                  +
                </button>
              </td>
              <td className="py-4">${item.quantity * item.price}</td>
              <td className="py-4 cursor-pointer">
                <RiDeleteBinLine onClick={() => handleDelete(item.product_id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-4 mt-4 items-center">
        <span className="font-bold">Sub-total:</span>
        <span>${total}</span>
        <button className="px-6 py-1 bg-[#56B280] text-white rounded-sm">Checkout</button>
      </div>
    </div>
  )
}
