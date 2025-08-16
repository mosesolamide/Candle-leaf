import { useActionState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router"

export default function SignUp() {

    const { signUpNewUser, setMessage, setShowMessage, signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    const [error, submitAction, isPending] = useActionState(
    async (_prevError: string | null, formData: FormData) => {
      const email = formData.get("email")?.toString()
      const password = formData.get("password")?.toString()
      const name = formData.get("name")?.toString()
      
      if (!email || !password || !name) {
        return "Email, FullName and password are required"
      }

      const result = await signUpNewUser(email,password,name)
      
      if (!result.success && result.error) {
        return result.error
      }
      setMessage({ success: true, message: "Successfully Sign Up" })
      setShowMessage(true)
      navigate('/login')
      return null
    },
    null
  )

  return (
    <section className="bg-[#F7F8FA] py-16 px-6 flex justify-center">
      <form action={submitAction} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#56B280] outline-none"
          name="name"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#56B280] outline-none"
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-[#56B280] outline-none"
          name="password"
        />

        <button
          type="submit"
          className="bg-[#56B280] text-white w-full py-2 rounded-sm font-medium cursor-pointer"
          disabled={isPending}
        >
          {isPending? "Signin you up": "Sign Up"}
        </button>

        <div className="text-center text-sm text-gray-500">or</div>

        <button
          type="button"
          className="bg-red-500 text-white w-full py-2 rounded-sm font-medium cursor-pointer"
          onClick={signInWithGoogle}
        >
          Continue with Google
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-[#56B280] hover:underline">
            Login
          </a>
        </p>
      </form>
    </section>
  )
}
