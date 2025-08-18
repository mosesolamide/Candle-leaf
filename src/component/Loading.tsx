import type { JSX } from "react"

export default function Loading():JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}
