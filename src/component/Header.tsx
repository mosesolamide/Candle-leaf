import { useState } from "react"
import { NavLink } from "react-router"
import { MdOutlineShoppingCart } from "react-icons/md"
import { CiMenuBurger } from "react-icons/ci"
import { IoIosLogOut } from "react-icons/io"
import { useAuth } from "../context/AuthContext"
import Logo from "./Logo"

export default function Navbar() {
    const { session, signOut, setMessage, setShowMessage } = useAuth()
    const [openBurger, setOpenBurger] = useState<boolean>(false)

    const handleSignout = async () => {
      const { error } = await signOut()
      if (error) {
        console.error("Error signout: ", error)
        setMessage({ success: false, message: `Error signout: ${error}` })
      }
      setMessage({ success: true, message: "You are log out. Goodbye" })
      setShowMessage(true)
    }

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Logo />
      </div>

      {/* Desktop Menu */}
      <div 
        className={`${openBurger?'fixed top-18 right-0 rounded-b-sm z-20 bg-white py-6 px-6':'hidden'} md:static flex flex-col md:flex md:flex-row items-center md:space-y-0 md:space-x-10`}>
        <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-green-600">
            <NavLink
              to='/'
              className={ ({isActive}) => isActive? 'text-green-600': ''  }
            >
                Home
            </NavLink>
          </li>
          <li className="cursor-pointer hover:text-green-600">
            <NavLink
              to='/about-us'
              className={ ({isActive}) => isActive? 'text-green-600': ''  }
            >
                About Us
            </NavLink>
          </li>
          <li className="cursor-pointer hover:text-green-600">
            <NavLink
              to='/contact-us'
              className={ ({isActive}) => isActive? 'text-green-600': ''  }
            >
                Contact Us
            </NavLink>
          </li>
        </ul>
        {!session? (
          <div className="flex gap-4">
            <NavLink
              to='login'
              className="bg-[#56B280] hover:bg-[#36694d] text-white px-4 py-2 rounded-sm"
            >
                Login</NavLink>
            <NavLink
              to='sign-up'
              className="bg-[#56B280] hover:bg-[#36694d] text-white px-4 py-2 rounded-sm"
            >
                SignUp</NavLink>
          </div>
        ):
        (
        <ul className="flex space-x-4 items-center text-gray-700 mt-2 md:mt-0">
          <p>Hi, {session.user.user_metadata.full_name}</p>
          <NavLink
            to="/cart"
            className={ ({isActive}) => isActive? 'text-green-600': ''  }
          >
            <MdOutlineShoppingCart
                size={28}
                className="cursor-pointer hover:text-green-600"
            />
          </NavLink>

          <button
            onClick={handleSignout}
            type="button"
          >
            <IoIosLogOut
                size={28}
                className="cursor-pointer hover:text-green-600"
            />
          </button>
        </ul>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <button 
        className="md:hidden cursor-pointer text-gray-700"
        type="button"
        onClick={ () => setOpenBurger(prev => !prev)}
        aria-label="Open menu"
    >
        <CiMenuBurger size={28} />
      </button>
    </nav>
  )
}
