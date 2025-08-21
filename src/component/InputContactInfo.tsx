import type { JSX } from "react"

export default function InputContactInfo(): JSX.Element {
  return (
    <div className="space-y-6 px-6 md:px-0">
      {/* Contact */}
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 gap-2">
          <h2 className="font-medium text-2xl">Contact</h2>
        </div>

        <input
          type="text"
          placeholder="Email or mobile phone number"
          className="w-full border p-2 rounded-md outline-none focus:ring-2 focus:ring-[#56B280]"
          required
        />

        <label className="flex items-center gap-2 mt-2 text-sm">
          <input type="checkbox" className="accent-[#56B280]"  />
          Add me to Candleaf newsletter for a 10% discount
        </label>
      </div>

      {/* Shipping Address */}
      <div>
        <h2 className="font-medium mb-2">Shipping Address</h2>

        {/* Name fields side by side on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded-md w-full"
            required
          />
          <input
            type="text"
            placeholder="Second Name"
            className="border p-2 rounded-md w-full"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Address and number"
          className="border p-2 rounded-md w-full mb-2"
          required
        />

        <input
          type="text"
          placeholder="Shipping note (optional)"
          className="border p-2 rounded-md w-full mb-2"
          required
        />

        {/* City / Postal / Province */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <input
            type="text"
            placeholder="City"
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="border p-2 rounded-md"
            required
          />
          <select className="border p-2 rounded-md" required>
            <option>Province</option>
          </select>
        </div>

        {/* Country */}
        <select className="border p-2 rounded-md w-full mb-2" required>
          <option>Country/Region</option>
          <option>Italy</option>
          <option>Nigeria</option>
          <option>USA</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-[#56B280]" />
          Save this information for a future fast checkout
        </label>
      </div>
    </div>
  )
}
