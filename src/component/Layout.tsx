import type { JSX } from "react"
import { Outlet } from "react-router"
import Header from './Header'
import Footer from "./Footer"

export default function Layout():JSX.Element{
    return(
        <>  
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}