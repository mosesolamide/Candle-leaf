import type { JSX, ReactNode } from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "../supabase-client"

type SignInResult =
  | { success: true; data: unknown }
  | { success: false; error: string }

type SignOutResult =
  | { success: true; error:null }
  | { success: false; error: string }

type AuthProps = {
  adminSignIn: (email: string, password: string) => Promise<SignInResult>
  signOut: () => Promise<SignOutResult>
  session: Session | null
  isLoading: boolean
  showMessage: boolean
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>
  message: Message
  setMessage: React.Dispatch<React.SetStateAction<Message>>
  userSignIn: (email: string, password: string) => Promise<SignInResult>
  signUpNewUser: (email: string, password: string, name:string) => any
  signInWithGoogle: () => any
}

type Message = {
      success: boolean
      message: string
    }
  | null

const AuthContext = createContext<AuthProps | undefined>(undefined)

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState<Message>(null)

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        setSession(data.session)
      } catch (error: any) {
        console.error("Error getting session:", error.message)
      } finally{
        setIsLoading(false)
      }
    }

    getInitialSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
        // remove message
      setShowMessage(false)
    }, 3000)
    // clear timout to avoid memory leak
    return () => clearTimeout(timer)
  }, [showMessage])

  const adminSignIn = async (
    email: string,
    password: string
  ): Promise<SignInResult> => {
    try {
      // 1. Sign in
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        return { success: false, error: authError.message }
      }

      // 2. Get user ID from auth session
      const userId = authData.user?.id;
      if (!userId) throw new Error("No user ID found")

      // 3. Check profiles table (single query)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId) // Match auth user ID with profiles table
        .single() // Expect exactly 1 match

      // 4. Verify admin role
      if (profileError || !profile) {
        throw new Error("Access denied: This page is for admin only!!!!!! go back or you will be killed lol")
      }

      if (profile.role !== 'admin') {
        await supabase.auth.signOut() // Revoke session if not admin
        return { 
          success: false, 
          error: "Access denied: This page is for admin only!!!!!! go back or you will be killed lol" 
        }
      }

      // 5. Success
      return { 
        success: true, 
        data: { ...authData, role: 'admin' } 
      }

    } catch (error: any) {
      await supabase.auth.signOut() // Clean up on error
      return { 
        success: false, 
        error: error.message || "Authentication failed" 
      }
    }
  }

  const signOut = async (): Promise<SignOutResult> => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Supabase sign-out error:', error.message)
        return { success: false, error: error.message }
      }
      setSession(null)
      return { success: true, error:null }
    } catch (error: any) {
      console.error('Error signing out:', error)
      return { 
        success: false, 
        error: error?.message || 'Sign out failed' 
      }
    }
  }

  const userSignIn = async (
    email: string,
    password: string
    ): Promise<SignInResult> => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        return { success: false, error: authError.message }
      }
      return { success: true, data: authData }
    } catch (error: any) {
      return { success: false, error: error.message || "Authentication failed" }
    }
  }

    const signUpNewUser = async (email:string, password:string, name:string) => {
    try {
      const { data: authData, error:authErr } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
          },
        },
      })
      if (authErr) {
        console.error('Supabase sign-up error:', authErr.message)
        return { success: false, error: authErr.message }
      }    
      return { success: true, authData }
    } catch (error: any) {
      return { success: false, error: 'An unexpected error occurred. Please try again.' }
    }
  }

  async function signInWithGoogle() {
    try{
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://candle-leaf.pxxl.live/" 
        }
      })

      if (error) {
        console.error("Google Sign-In Error:", error.message)
      }
      return { success: true, data}
    }catch(err: any){
      return { success: false, error: err.message}
    }
  }
  
  return (
    <AuthContext.Provider
      value={{
        adminSignIn,
        session,
        signOut,
        isLoading,
        showMessage,
        setShowMessage,
        message,
        setMessage,
        userSignIn,
        signUpNewUser,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider")
  }
  return context
}