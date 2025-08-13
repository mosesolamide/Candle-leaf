import type { JSX } from "react";
import { NavLink } from "react-router";
import WhiteLogo from "../assets/logo_white.webp";

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-[#272727] w-full px-12 py-8 text-white">
      <div className="border-t-1 border-white flex flex-col justify-center items-center md:flex-row md:py-6">
        {/* Logo & description */}
        <div className="md:mr-auto">
          <img
            src={WhiteLogo}
            alt="candle leaf logo"
            className="h-16 w-auto"
          />
          <p className="text-sm font-light">
            Your natural candle made for <br /> your home and for your wellness.
          </p>
        </div>

        {/* Footer links */}
        <div className="lg:text-lg flex flex-col md:flex-row justify-center md:items-center">
          {/* Discovery */}
          <ul className="space-y-2 my-6 md:m-0 md:mx-6 lg:mx-8">
            <li className="text-[#56B280] font-medium">Discovery</li>
            <li>
              <NavLink
                to="/new-season"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                New Season
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/most-searched"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                Most Searched
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/most-selled"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                Most Selled
              </NavLink>
            </li>
          </ul>

          {/* About */}
          <ul className="space-y-2 mb-6 md:m-0 md:mx-6 lg:mx-8">
            <li className="text-[#56B280] font-medium">About</li>
            <li>
              <NavLink
                to="/help"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                Help
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shipping"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                Shipping
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/affiliate"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                Affiliate
              </NavLink>
            </li>
          </ul>

          {/* Info */}
          <ul className="space-y-2 mb-6 md:m-0 md:mx-6 lg:mx-8">
            <li className="text-[#56B280] font-medium">Info</li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy-policy"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                Privacy Policies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/terms"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#56B280] underline"
                    : "hover:text-[#56B280] transition-colors"
                }
              >
                Terms and Conditions
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
