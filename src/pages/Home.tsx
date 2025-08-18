import type { JSX } from 'react'
import { getProducts } from '../supabase-client'
import HeroImg from '../assets/hero-pic.webp'
import Products from '../component/Products'
import Clean from '../component/Clean'
import Luisa from '../assets/luisa.webp'
import Mart from '../assets/mart.webp'
import Edoardo from '../assets/edoardo.webp'

export async function loader() {
  return { product: getProducts()  }
}
export default function Home(): JSX.Element {
    const testimonials = [
      {
        img: Luisa, // replace with image path
        rating: 4,
        text: "I love it! No more air fresheners",
        name: "Luisa",
      },
      {
        img: Mart,
        rating: 4,
        text: "Recommended for everyone",
        name: "Edoardo",
      },
      {
        img: Edoardo,
        rating: 4,
        text: "Looks very natural, the smell is awesome",
        name: "Mart",
      },
    ]
    return (
      <>
        <section className="w-full h-auto max-h-[500px] mb-6 relative" aria-labelledby="hero-title">
            <img
                src={HeroImg}
                alt="hero section img"
                className="w-full h-auto max-h-[500px] object-cover"
            />
            <div 
                className="absolute top-1/2 left-1/2 w-[260px]
                 sm:w-[400px] md:w-[450px] lg:w-[500px] h-[150px] sm:h-[200px] md:h-[230px] px-6
                 bg-white/60 transform -translate-x-1/2 -translate-y-1/2
                  backdrop-blur-md rounded-sm flex flex-col items-center justify-center"
            >
                <span aria-label='flower'>🌱</span>
                <h1 id='hero-title' className='text-xl sm:text-2xl font-medium md:text-3xl'>The nature candle</h1>
                <p
                    className='text-[9px] sm:text-sm text-center font-normal mb-1.5 sm:mb-2.5 md:mb-4 mt-1 sm:mt-2 '    
                >
                    All handmade with natural soy wax, Candleaf is a companion for all your pleasure moments
                </p>
                <button
                    aria-label='open discovery page'
                    className='bg-[#56B280] px-4 py-1 sm:px-6 sm:py-1.5 text-xs sm:text-sm rounded-sm font-medium text-white mt-2 cursor-pointer'
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

        <section 
            className='my-20 bg-[#F7F8FA] py-12 px-6 md:py-20 flex 
            // flex-col gap-10 lg:flex-row items-center justify-center'
        >
            <Clean />
        </section>
        
        <section className=" py-16 px-6">
            <div className="text-center mb-10">
                <h4 className="text-2xl font-semibold mb-2">Testimonials</h4>
                <p className="text-gray-600">Some quotes from our happy customers</p>
            </div>

            {(() => {
                return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((t, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                    >
                        <img
                        src={t.img}
                        alt={`Photo of ${t.name}`}
                        className="w-16 h-16 rounded-full mb-4 object-cover"
                        />
                        <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                            <span
                            key={i}
                            className={`text-lg ${
                                i < t.rating ? "text-green-500" : "text-gray-300"
                            }`}
                            >
                            ★
                            </span>
                        ))}
                        </div>
                        <p className="text-gray-800 mb-2 italic">"{t.text}"</p>
                        <span className="text-sm text-gray-500">{t.name}</span>
                    </div>
                    ))}
                </div>
                )
            })()}
        </section>

        <section>
            <div className="text-center mb-10">
                <h4 className="text-2xl font-semibold mb-2">Popular</h4>
                <p className="text-gray-600">Our top selling product that you may like</p>
            </div>
            <Products size={4} />
        </section>

      </>
    )
}
