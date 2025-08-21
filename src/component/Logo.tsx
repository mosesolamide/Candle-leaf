import type { JSX } from "react"
import Logos from "../assets/logo.webp"

export default function Logo({imgUrl}:{imgUrl?:string}):JSX.Element{
    return <img src={!imgUrl? Logos : imgUrl} alt="Candle Leaf logo" className="h-10 w-auto" />
}