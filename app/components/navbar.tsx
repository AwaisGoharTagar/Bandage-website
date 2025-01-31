"use client";
import Link from "next/link";
import { FaUser, FaSearch, FaShoppingCart, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";


export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="w-full bg-white shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex justify-between items-center px-6 lg:px-16 h-16">
        {/* Logo */}
        <h3 className="font-Montserrat font-semibold text-xl">Bandage</h3>

        {/* Menu Links */}
        <ul className="flex space-x-6 font-Montserrat text-sm text-gray-600">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/shop">Shop</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
        </ul>

        {/* Icons Section */}
        <div className="flex space-x-4 items-center text-[#252B42]">
          <FaUser size={16} />
          <FaSearch size={16} />
          <Link href="/cart" passHref>
            <FaShoppingCart size={16} className="cursor-pointer hover:text-gray-700" />
          </Link>
          <FaEnvelope size={16} />
        </div>
      </div>
      {/* Mobile Navbar */}
      <div className="lg:hidden flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <h3 className="font-Montserrat font-semibold text-xl">Bandage</h3>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-[#252B42]">
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

       {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="bg-white text-black flex flex-col items-center py-4 space-y-3">
          <ul className="space-y-2 font-Montserrat text-base text-black">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/cart" className="flex items-center space-x-2">
                <FaShoppingCart className="text-black w-5 h-5" />
             
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
