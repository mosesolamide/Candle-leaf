import type { JSX } from "react"

export default function Shipping(): JSX.Element {
  return (
    <div className="flex flex-col items-center p-4 md:p-6 lg:p-10">
      <div className="w-full max-w-3xl space-y-6">
        {/* Contact + Ship To */}
        <div className="border rounded-lg divide-y bg-white shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-3 text-sm md:text-base">
            <span className="mb-2 md:mb-0">
              <strong>Contact: </strong> joe.spagnuolo@uxby.com
            </span>
            {/* <button className="text-[#56B280] underline text-sm">Edit</button> */}
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between p-3 text-sm md:text-base">
            <span className="mb-2 md:mb-0">
              <strong>Ship to: </strong> Via Firenze 23, 92023, Campobello di
              Licata AG, Italia
            </span>
            {/* <button className="text-[#56B280] underline text-sm">Edit</button> */}
          </div>
        </div>

        {/* Shipping Method */}
        <div>
          <h2 className="font-medium mb-3 text-base md:text-lg">
            Shipping method
          </h2>
          <div className="border rounded-lg p-3 flex flex-col md:flex-row md:justify-between md:items-center gap-2 bg-white shadow-sm">
            <label className="flex items-center gap-2 text-sm md:text-base">
              <input
                type="radio"
                name="shipping"
                className="accent-[#56B280]"
              />
              <span>Standard Shipping</span>
            </label>
            <span className="font-medium text-sm md:text-base">Free</span>
          </div>
        </div>
      </div>
    </div>
  )
}
