import type { JSX, ReactNode } from "react"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router"

export default function ProtectAdmin({children}: {children:ReactNode}):JSX.Element{
    const { session, isLoading } = useAuth()

    if(isLoading){
         return <div>Loading...</div>
    }

    if(!session) {
        return <Navigate to="sign-in" />
    }

    return <>{children}</>
}