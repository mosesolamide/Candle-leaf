import { useState } from 'react'

const Payment = () => {
  const [sameAsShipping, setSameAsShipping] = useState(true);
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h1>
      
      {/* Contact Information */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Contact</h2>
          {/* <button className="text-[#56B280] text-sm font-medium">Edit</button> */}
        </div>
        <p className="text-gray-600">jxa.apagu.xb@uixiy.com</p>
      </div>
      
      {/* Shipping Address */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Ship to</h2>
          {/* <button className="text-[#56B280] text-sm font-medium">Edit</button> */}
        </div>
        <p className="text-gray-600">Via Firenze 23, 92023, Campobello di Licità AG, Italia</p>
      </div>
      
      {/* Shipping Method */}
      <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-700">Method</h2>
          {/* <button className="text-[#56B280] text-sm font-medium">Edit</button> */}
        </div>
        <p className="text-gray-600">Standard Shipping - FREE</p>
      </div>
      
      {/* Payment Method */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Payment method</h2>
        <div className=" p-4 rounded-lg border border-[#56B280]">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-[#56B280] rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-medium text-gray-700">Credit Card</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Holder Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                placeholder="John Doe"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration (MMYY)</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CW</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tax Information */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tax Informations</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">VAT number (optional)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PEC (optional)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>
      </div>
      
      {/* Billing Address */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Billing address</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="sameAsShipping"
              checked={sameAsShipping}
              onChange={() => setSameAsShipping(true)}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-700">
              Same as the shipping address
            </label>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="differentBilling"
              checked={!sameAsShipping}
              onChange={() => setSameAsShipping(false)}
              className="h-4 w-4 rounded"
            />
            <label htmlFor="differentBilling" className="ml-2 block text-sm text-gray-700">
              Use a different address for billing
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment