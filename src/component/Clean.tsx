import type { JSX } from "react"
import Candle from '../assets/candles.png'

export default function Clean():JSX.Element{
    return(
        <>
            <div>
                <h3 className="text-2xl md:text-3xl">Clean and <br />fragrant soy wax</h3>
                <p className="text-[#56B280] font-medium text-xs sm:text-sm mt-2">Made for your home and for your wellness</p>

                <ol className="list-disc mt-6 mb-4 text-xs sm:text-sm md:text-lg">
                    <li><b>Eco-sustainable:</b> All recyclable materials, 0% CO2 emissions</li>
                    <li><b>Hyphoallergenic:</b> 100% natural, human friendly ingredients </li>
                    <li><b>Handmade:</b> All candles are craftly made with love.</li>
                    <li><b>Long burning:</b> No more waste. Created for last long.</li>
                </ol>

                <a
                    aria-label='open learn more'
                    className='bg-[#56B280] px-4 py-1 sm:px-6 sm:py-1.5 text-sm sm:text-lg rounded-sm font-medium text-white mt-2 cursor-pointer'
                >
                    Learn more
                </a>

            </div>
            <div>
                <img src={Candle} alt="images of candles" className="w-[400px] h-[400px]"/>
            </div>
        </>
    )
}