"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/auth-utils"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getCurrentUser().then((userData) => {
      setUser(userData)
      setLoading(false)
    })
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-amber-800 hover:text-amber-900 transition-colors">
                Swiftly
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Deals
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                What's New
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Delivery
              </a>
            </nav>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search Products"
                  className="w-64 pl-10 pr-4 py-2 bg-gray-100 border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </form>
              {loading ? (
                <div className="flex items-center space-x-1 text-gray-700">
                  <User className="h-5 w-5" />
                </div>
              ) : user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer"
                >
                  <User className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">Account</span>
                </Link>
              )}
              <Link
                href="/cart"
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-amber-700 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Grab Up To 50% Off On
                <br />
                Selected Headphone
              </h2>
              <Button className="bg-white text-amber-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
                Shop Now
              </Button>
            </div>
            <div className="flex space-x-4">
              <img
                src="/placeholder-8fifd.png"
                alt="Black headphones"
                className="w-32 h-32 md:w-48 md:h-48 object-contain"
              />
              <img
                src="/white-wireless-headphones.png"
                alt="White headphones"
                className="w-32 h-32 md:w-48 md:h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop Our Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Furniture */}
          <div className="bg-amber-800 rounded-xl p-6 text-white relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-4">Furniture</h3>
            <img
              src="/brown-leather-armchair.png"
              alt="Brown leather chair"
              className="absolute bottom-0 right-0 w-20 h-20 object-contain"
            />
          </div>

          {/* Books */}
          <div className="bg-amber-700 rounded-xl p-6 text-white relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-4">Books</h3>
            <img
              src="/placeholder-br0tb.png"
              alt="Stack of books"
              className="absolute bottom-0 right-0 w-20 h-20 object-contain"
            />
          </div>

          {/* Tech */}
          <div className="bg-amber-600 rounded-xl p-6 text-white relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-4">Tech</h3>
            <img
              src="/modern-tech-gadgets.png"
              alt="Tech devices"
              className="absolute bottom-0 right-0 w-20 h-20 object-contain"
            />
          </div>

          {/* Sneakers */}
          <div className="bg-amber-500 rounded-xl p-6 text-white relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-4">Sneakers</h3>
            <img
              src="/white-sneakers-athletic-shoes-footwear.png"
              alt="White sneakers"
              className="absolute bottom-0 right-0 w-20 h-20 object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
