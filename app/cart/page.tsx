"use client"

import type React from "react"
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/auth-utils"

export default function CartPage() {
  const [searchInput, setSearchInput] = useState("")
  const [address, setAddress] = useState("")
  const [promoCode, setPromoCode] = useState("")
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
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  // Sample cart item - in a real app this would come from state management
  const cartItems = [
    {
      id: 1,
      name: "Sony WH-CH720N",
      price: 68.0,
      quantity: 1,
      image: "/white-headphones-2.png",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
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

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
                <span className="text-gray-600">{cartItems.length} Item(s)</span>
              </div>

              {/* Cart Table Header */}
              <div className="grid grid-cols-4 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-700">
                <div>Product Details</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Subtotal</div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mt-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-4 gap-4 items-center py-4">
                    {/* Product Details */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg p-2">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center font-medium text-gray-900">${item.price.toFixed(2)}</div>

                    {/* Quantity */}
                    <div className="text-center font-medium text-gray-900">{item.quantity}</div>

                    {/* Subtotal */}
                    <div className="text-center font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-amber-800 text-white rounded-lg p-6 space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>

              {/* Select Address */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Address</label>
                <Input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full bg-white text-gray-900 border-0"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm font-medium mb-2">Promo Code</label>
                <Input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full bg-white text-gray-900 border-0"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
              </div>

              {/* Order Breakdown */}
              <div className="space-y-3 pt-4 border-t border-amber-700">
                <div className="flex justify-between">
                  <span>ITEMS {cartItems.length}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SHIPPING</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-amber-700">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button className="w-full bg-white text-amber-800 hover:bg-gray-100 font-semibold py-3 rounded-lg">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
