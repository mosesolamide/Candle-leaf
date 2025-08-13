import type { JSX } from "react"
import { useActionState } from "react"
import { useAuth } from "../context/AuthContext"
import LogoWhite from "../assets/logo_white.webp"
import supabase from "../supabase-client"
import AvailableProduct from "./AvailableProduct"

export default function AdminDashBoard(): JSX.Element {
  const { signOut, setMessage, setShowMessage } = useAuth()

  // Sign out function
  const handleSignout = async () => {
    const { error } = await signOut()
    if (error) {
      console.error("Error signout: ", error)
      setMessage({ success: false, message: `Error signout: ${error}` })
    }
  }

  const [_error, submitAction, isPending] = useActionState(
    async (_prevError: any, formData: FormData) => {
      try {
        const productData = {
          name: formData.get("name")?.toString() || "",
          price: Number(formData.get("price")),
          wax: formData.get("wax")?.toString() || "",
          weight: formData.get("weight")?.toString() || "",
          dimension: formData.get("dimension")?.toString() || "",
          burning_time: formData.get("burning")?.toString() || "",
          fragrance: formData.get("fragrance")?.toString() || "",
          description: formData.get("description")?.toString() || "",
        }

        const image_url = formData.get("image_url") as File

        if (!image_url) {
          setMessage({ success: false, message: "Please select an image" })
          setShowMessage(true)
          return
        }

        if (!image_url.type?.startsWith("image/")) {
          throw new Error("Only image files are allowed (JPEG, PNG, etc)")
        }

        // 1. Upload image to supabase bucket
        const fileName = `product-${Date.now()}-${image_url.name}`
        const { data: uploadImage, error: imageError } = await supabase.storage
          .from("images")
          .upload(fileName, image_url)

        if (imageError) throw imageError

        // 2. Get public UR
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(uploadImage.path)

        // 3. Save product in DB
        const { error: dbError } = await supabase.from("products").insert({
          ...productData,
          image_url: publicUrlData.publicUrl,
        })

        if (dbError) throw dbError

        setMessage({ success: true, message: "Successfully Added Product" })
        setShowMessage(true)
      } catch (err: any) {
        setShowMessage(true)
        setMessage({
          success: false,
          message: err?.message || "Failed to add product",
        })
      }
    },
    null
  )

  return (
    <div className="min-w-[350px] flex flex-col justify-center items-center pb-12">
      {/* Header */}
      <div className="flex justify-between items-center bg-green-600 w-full px-4 py-2">
        <img src={LogoWhite} alt="logo" className="w-40 h-20" />
        <button
          onClick={handleSignout}
          className="bg-white px-6 py-2 rounded-sm font-medium text-lg cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <h1 className="text-2xl font-medium my-4">Admin Dashboard</h1>

      {/* form to add product */}
      <form action={submitAction}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <label className="flex flex-col gap-1 text-lg font-medium">
            Name of Candle:
            <input
              type="text"
              className="border-1 py-2 indent-4 rounded-md"
              name="name"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-lg font-medium">
            Price:
            <input
              type="number"
              className="border-1 py-2 indent-4 rounded-md"
              name="price"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-lg font-medium">
            Upload Image:
            <input
              type="file"
              className="border-1 py-2 indent-4 rounded-md"
              name="image_url"
            />
          </label>
          <label className="flex flex-col gap-1 text-lg font-medium">
            Wax:
            <input
              type="text"
              className="border-1 py-2 indent-4 rounded-md"
              name="wax"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-lg font-medium">
            Weight:
            <input
              type="text"
              className="border-1 py-2 indent-4 rounded-md"
              placeholder="E.g 300kg"
              name="weight"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-lg font-medium">
            Dimension:
            <input
              type="text"
              className="border-1 py-2 indent-4 rounded-md"
              placeholder=" E.g 10cm x 5cm"
              name="dimension"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-lg font-medium">
            Burning Time:
            <input
              type="text"
              className="border-1 py-2 indent-4 rounded-md"
              placeholder="E.g 20-30hrs"
              name="burning"
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-lg font-medium">
            Fragrance:
            <input
              type="text"
              className="border-1 py-2 indent-4 rounded-md"
              name="fragrance"
              required
            />
          </label>
          <div className="flex flex-col gap-1 text-lg font-medium md:col-span-2">
            <label htmlFor="des" className="md:text-center">
              Description
            </label>
            <textarea
              name="description"
              id="des"
              className="border-1 indent-4 rounded-md"
              placeholder="product description"
              required
            ></textarea>
          </div>
        </div>
        <button
          className="w-full bg-green-500 my-2 py-4 text-white font-medium rounded-sm cursor-pointer"
          aria-busy={isPending}
          disabled={isPending}
        >
          {isPending ? "Uploading product..." : "Add Product"}
        </button>
      </form>
      <AvailableProduct />
    </div>
  )
}
