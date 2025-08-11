import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import AdminDashBoard from "./admin/AdminDashBoard"
import AdminSignIn from "./admin/AdminSignIn"
import ProtectAdmin from "./admin/ProtectAdmin"
import Home from "./pages/Home"

function Router() {
    const router = createBrowserRouter(createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
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