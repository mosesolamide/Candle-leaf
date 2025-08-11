import { useActionState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function AdminSignIn() {
  const { adminSignIn } = useAuth()
  const navigate = useNavigate()

  const [error, submitAction, isPending] = useActionState(
    async (_prevError: string | null, formData: FormData) => {
      const email = formData.get("email")?.toString()
      const password = formData.get("password")?.toString()
      
      if (!email || !password) {
        return "Email and password are required"
      }
      const result = await adminSignIn(email, password)
      
      if (!result.success && result.error) {
        return result.error
      }
      navigate('/admin')
      return null
    },
    null
  )

  return (
    <div className="min-w-[350px] flex justify-center h-[550px] items-center">
      <form action={submitAction} className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Admin Login Page</h1>
        <label className="flex flex-col font-medium text-xl">
          Email:
          <input type="email" name="email" required className="border-gray-400 border-1 h-10 w-100 rounded-sm" />
        </label>
        <label className="flex flex-col font-medium text-xl">
          Password:
          <input type="password" name="password" required className="border-gray-400 border-1 h-10 w-100 rounded-sm" />
        </label>
        <button 
          type="submit" 
          disabled={isPending}
          className="w-100 bg-green-700 py-4 text-white rounded-sm font-medium cursor-pointer text-lg"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  )
}