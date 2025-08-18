import { Suspense } from "react"
import { useLoaderData, Await, Link } from "react-router"
import type { Product } from "../hooks/useFunction"
import Loading from "./Loading"

export default function Products({ size }: { size?: number }){
  const { product } = useLoaderData()

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={product}>
        {(productList) => (
          <ul 
            className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] lg:grid-cols-4 gap-4 lg:gap-6 my-8 px-10 md:px-20"
          >
            {productList.data?.slice(0, size || productList.length).map((item:Product) => (
              <li key={item.id}>
                <Link
                  to="preview"
                  state={item}
                >
                  <article 
                    className="shadow-md bg-[#F7F8FA] rounded-md"
                  >
                    <div className="flex justify-center">
                      <img 
                        src={item.image_url} 
                        alt="products available" 
                        className="w-32 md:w-44 h-24 md:h-34" 
                      />
                    </div>
                    <div className="flex justify-between items-center bg-white py-6 px-4 rounded-b-sm">
                      <span className="text-xs font-semibold">{item.name}</span>
                      <span className="text-xs font-semibold text-[#56B280]">${item.price}</span>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Await>
    </Suspense>
  )
}
