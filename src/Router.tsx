import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./component/Layout"
import Home, { loader as homeLoader } from "./pages/Home"

// Only Home is eager (first page), everything else is lazy
function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader,
          // error boundary for this route
          lazy: async () => {
            const mod = await import("./component/Error")
            return { ErrorBoundary: mod.default }
          }
        },
        {
          path: "about-us",
          lazy: async () => {
            const mod = await import("./pages/About")
            return { Component: mod.default }
          }
        },
        {
          path: "contact-us",
          lazy: async () => {
            const mod = await import("./pages/ContactUs")
            return { Component: mod.default }
          }
        },
        {
          path: "cart",
          lazy: async () => {
            const mod = await import("./pages/Cart")
            return { Component: mod.default }
          }
        },
        {
          path: "preview",
          lazy: async () => {
            const mod = await import("./pages/PreviewProduct")
            return { Component: mod.default }
          }
        },
        {
          path:"*",
          lazy: async () => {
            const mod = await import("./pages/NotFound")
            return { Component: mod.default }
          }
        }
      ],
    },

    {
      path: "/sign-up",
      lazy: async () => {
        const mod = await import("./component/SignUp")
        return { Component: mod.default }
      }
    },
    {
      path: "/login",
      lazy: async () => {
        const mod = await import("./component/Login")
        return { Component: mod.default }
      }
    },
    {
      path: "/checkout",
      lazy: async () => {
        const mod = await import("./component/CheckoutLayout")
        return { Component: mod.default }
      },
      children: [
        {
          index: true,
          lazy: async () => {
            const mod = await import("./component/InputContactInfo")
            return { Component: mod.default }
          }
        },
        {
          path: "shipping",
          lazy: async () => {
            const mod = await import("./component/Shipping")
            return{ Component: mod.default }
          }
        },
        {
          path: "payment",
          lazy: async () => {
            const mod = await import("./component/Payment")
            return{ Component: mod.default }
          }
        },
                {
          path: "confirm",
          lazy: async () => {
            const mod = await import("./component/Done")
            return{ Component: mod.default }
          }
        }
      ]
    },

    // Admin routes
    {
      path: "/admin",
      children: [
        {
          path: "sign-in",
          lazy: async () => {
            const mod = await import("./admin/AdminSignIn")
            return { Component: mod.default }
          }
        },
        {
          index: true,
          lazy: async () => {
            const [Protect, Dash] = await Promise.all([
              import("./admin/ProtectAdmin"),
              import("./admin/AdminDashBoard")
            ]);
            return {
              Component: () => (
                <Protect.default>
                  <Dash.default />
                </Protect.default>
              )
            }
          }
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default Router
