import { Suspense } from "react"
import { useLoaderData, Await } from "react-router"
import type { Product } from "./useFunction"

export default function Products({ size }: { size?: number }){
  const { product } = useLoaderData()

  return (
    <Suspense fallback={<p>Loading.....</p>}>
      <Await resolve={product}>
        {(productList) => (
          <ul 
            className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:grid-cols-4 gap-4 lg:gap-6 px-10 md:px-20 my-8"
          >
            {productList.data.slice(0, size || productList.length).map((item:Product) => (
              <li key={item.id}>
                <article className="shadow-md bg-[#F7F8FA] rounded-md">
                  <img src={item.image_url} alt="products available" />
                  <div className="flex justify-between items-center bg-white py-6 px-4 rounded-b-sm">
                    <span className="text-xs font-semibold">{item.name}</span>
                    <span className="text-xs font-semibold text-[#56B280]">${item.price}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Await>
    </Suspense>
  )
}
// Wax: Top grade Soy wax that delivers a smoke less,  consistent burn
// Fragrance: Premium quality ingredients with natural essential oils 
// Burning Time: 70-75 hours
// Dimension: 10cm x 5cm 
