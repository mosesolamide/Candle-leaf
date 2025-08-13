import { useState } from "react"
import { NavLink } from "react-router"
import { MdOutlineShoppingCart } from "react-icons/md"
import { CiUser, CiMenuBurger } from "react-icons/ci"
import Logo from "../assets/logo.webp"

export default function Navbar() {
    const [openBurger, setOpenBurger] = useState<boolean>(false)
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src={Logo} alt="Candle Leaf logo" className="h-10 w-auto" />
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
              to='/about-us'
              className={ ({isActive}) => isActive? 'text-green-600': ''  }
            >
                Contact Us
            </NavLink>
          </li>
        </ul>
        <ul className="flex space-x-4 text-gray-700 mt-2 md:mt-0">
          <NavLink
            to="/cart"
            className={ ({isActive}) => isActive? 'text-green-600': ''  }
          >
            <MdOutlineShoppingCart
                size={28}
                className="cursor-pointer hover:text-green-600"
            />
          </NavLink>
          <NavLink
            to='/user'
            className={ ({isActive}) => isActive? 'text-green-600': ''  }
          >
            <CiUser
                size={28}
                className="cursor-pointer hover:text-green-600"
            />
          </NavLink>
        </ul>
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
