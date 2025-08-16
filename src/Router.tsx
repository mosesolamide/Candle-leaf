import { lazy } from "react"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router"
import Home, {loader as homeLoader} from "./pages/Home"
import Layout from "./component/Layout"

// route that are not needed when the website first loads
const AdminDashBoard = lazy(() => import("./admin/AdminDashBoard"))
const AdminSignIn = lazy(() => import("./admin/AdminSignIn"))
const ProtectAdmin = lazy( () => import("./admin/ProtectAdmin"))
const Error = lazy( () => import("./component/Error"))
const ContactUs = lazy( () => import("./pages/ContactUs"))
const About = lazy( () => import("./pages/About"))
const SignUp = lazy( () => import("./component/SignUp"))
const Login = lazy( () => import("./component/Login"))

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
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

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