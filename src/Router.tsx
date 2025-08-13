import { lazy } from "react"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router"
import Home, {loader as homeLoader} from "./pages/Home"
import Layout from "./component/Layout"

// route that are not needed when the website first loads
const AdminDashBoard = lazy(() => import("./admin/AdminDashBoard"))
const AdminSignIn = lazy(() => import("./admin/AdminSignIn"))
const ProtectAdmin = lazy( () => import("./admin/ProtectAdmin"))
const Error = lazy( () => import("./component/Error"))

function Router() {
    const router = createBrowserRouter(createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />} >
          <Route 
            index
            element={<Home />} 
            loader={homeLoader}
            errorElement={<Error />}
          />
        </Route>

        {/* Admin route */}
        <Route path="admin">
          {/* Public admin routes */}
          <Route path="sign-in" element={<AdminSignIn />} />
          
          {/* Protected admin routes */}
          <Route 
            index 
            element={
              <ProtectAdmin>
                <AdminDashBoard />
              </ProtectAdmin>
            } 
          />
        </Route>
      </>
    ))
    return <RouterProvider router={router} />   
}

export default Router