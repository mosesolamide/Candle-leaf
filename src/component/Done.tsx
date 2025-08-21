import type {JSX} from "react"
import { Link } from "react-router"
import { AiOutlineCheckCircle } from "react-icons/ai"

const PaymentConfirmation = ():JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        {/* Icon */}
        <AiOutlineCheckCircle className="text-[#56B280] text-6xl mx-auto mb-4" />

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          Payment Confirmed
        </h2>

        {/* Order ID */}
        <p className="text-[#56B280] font-medium mt-1">ORDER #2039</p>

        {/* Message */}
        <p className="text-gray-600 mt-4 text-sm">
          Thank you Joe for buying Candleaf. The nature is grateful to you.
          Now that your order is confirmed it will be ready to ship in 2 days.
          Please check your inbox in the future for your order updates.
        </p>

        {/* Button */}
        <div className="flex flex-col gap-4">
            <Link 
                to="/" 
                className="mt-6 w-full bg-[#56B280]
                text-white font-medium py-2 px-4 rounded-lg transition"
            >
            Back to shopping
            </Link>

            {/* Link */}
            <button

            className="mt-4 inline-block text-sm text-[#56B280] cursor-pointer hover:underline"
            >
            Print receipt
            </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmation
