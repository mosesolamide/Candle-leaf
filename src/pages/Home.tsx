import type { JSX } from 'react'
import HeroImg from '../assets/hero-pic.webp'
import Products from '../component/Products'
import useFunction from '../component/useFunction'

export async function loader() {
  const { getProducts } = useFunction()
  return { product: getProducts()  }
}
export default function Home(): JSX.Element {
    return (
      <>
        <section className="w-full h-auto max-h-[500px] mb-6 relative" aria-labelledby="hero-title">
            <img
                src={HeroImg}
                alt="hero section img"
                className="w-full h-auto max-h-[500px] object-cover"
            />
            <div 
                className="absolute top-1/2 left-1/2 w-[360px]
                 sm:w-[400px] md:w-[450px] lg:w-[500px] h-[190px] sm:h-[200px] md:h-[230px] px-6
                 bg-white/60 transform -translate-x-1/2 -translate-y-1/2
                  backdrop-blur-md rounded-sm flex flex-col items-center justify-center"
            >
                <span aria-label='flower'>🌱</span>
                <h1 id='hero-title' className='text-2xl font-medium md:text-3xl'>The nature candle</h1>
                <p
                    className='text-xs text-center font-normal mb-2.5 md:mb-4 mt-2 '    
                >
                    All handmade with natural soy wax, Candleaf is a companion for all your pleasure moments
                </p>
                <button
                    aria-label='open discovery page'
                    className='bg-[#56B280] px-6 py-1.5 rounded-sm font-medium text-white mt-2 cursor-pointer'
                >
                    Discovery our collection
                </button>
            </div>
        </section>
        <section>
            <div className='text-center mb-6'>
                <h2 className='font-medium text-2xl'>Products</h2>
                <p className='font-normal mb-4'>Order it for you or for your beloved ones </p>
            </div>
            <Products />
        </section>
      </>
    )
}
