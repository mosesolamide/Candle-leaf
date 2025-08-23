import type { JSX } from "react"
import Logo from "./Logo"
import { Outlet, Link, useLocation } from "react-router"

export default function CheckoutLayout():JSX.Element{
    const location = useLocation()
    const pathName = location.pathname
    function getNavigation(path: string) {
      switch (path) {
        case "/checkout":
            return { backTo: "/cart", backText: "Return to cart", nextTo: "/checkout/shipping", nextText: "Go to Shipping" }
        case "/checkout/shipping":
            return { backTo: "/checkout", backText: "Return to Details", nextTo: "/checkout/payment", nextText: "Go to Payment" }
        case "/checkout/payment":
            return { backTo: "/checkout/shipping", backText: "Return to Shipping", nextTo: "/checkout/confirm", nextText: "Pay Now" }
        default:
            return { backTo: "/", backText: "", nextTo: "/", nextText: "Continue" }
      }
    }
    const { backTo, backText, nextTo, nextText } = getNavigation(pathName)

    return(
        <div className="min-w-[350px] md:max-w-[550px] md:mx-auto flex flex-col justify-center items-center my-10">
            <Logo />
            <div className="space-x-3 font-medium text-gray-500 mt-6">
                <span>Card {">"}</span>
                <span>Details {">"}</span>
                <span>Shipping {">"}</span>
                <span>Payment</span>
            </div>
            <form action="">
                <Outlet />
            </form>
            <div className="flex w-full justify-between items-center mt-6">
                <Link to={backTo} className="text-[#56B280] underline">
                    {backText}
                </Link>
                <Link to={nextTo} className="bg-[#56B280] text-white px-6 py-2 rounded-sm">
                    {nextText}
                </Link>
            </div>
        </div>
    )
}