"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, ShoppingCart, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/auth-utils"
import { addToCart } from "@/lib/cart-utils"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showCategories, setShowCategories] = useState(false)
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

  const handleCategoryClick = (category: string) => {
    router.push(`/search?q=${encodeURIComponent(category)}`)
    setShowCategories(false)
  }

  const handleAddToCart = (product: { id: string; name: string; price: number; image: string; category?: string }) => {
    addToCart(product)
    alert(`${product.name} added to cart!`)
  }

  const categories = [
    { name: "Headphones", icon: "🎧" },
    { name: "Laptops", icon: "💻" },
    { name: "Books", icon: "📚" },
    { name: "Shoes", icon: "👟" },
    { name: "Furniture", icon: "🪑" },
    { name: "Tech", icon: "📱" },
    { name: "Phones", icon: "📞" },
    { name: "Watches", icon: "⌚" },
  ]

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
              <div className="relative">
                <div
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  <span>Categories</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showCategories ? "rotate-180" : ""}`} />
                </div>

                {showCategories && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => handleCategoryClick(category.name)}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center space-x-3"
                        >
                          <span className="text-lg">{category.icon}</span>
                          <span>{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <Link href="/product/headphones-premium" className="block">
              <img
                src="/premium-wireless-headphones.png"
                alt="Premium Headphones"
                className="w-full h-48 object-cover cursor-pointer"
              />
              <div className="p-6 h-52 grid grid-rows-[auto_1fr_auto] gap-3">
                <h3 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-amber-700">
                  Premium Wireless Headphones
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Experience crystal-clear audio with our top-rated headphones
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-700">$129.99</span>
                  <Button
                    className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleAddToCart({
                        id: "headphones-premium",
                        name: "Premium Wireless Headphones",
                        price: 129.99,
                        image: "/premium-wireless-headphones.png",
                        category: "Headphones",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <Link href="/product/laptop-ultra-thin" className="block">
              <img
                src="/modern-laptop-computer.png"
                alt="Modern Laptop"
                className="w-full h-48 object-cover cursor-pointer"
              />
              <div className="p-6 h-52 grid grid-rows-[auto_1fr_auto] gap-3">
                <h3 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-amber-700">
                  Ultra-Thin Laptop
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Powerful performance in a sleek, portable design
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-700">$899.99</span>
                  <Button
                    className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleAddToCart({
                        id: "laptop-ultra-thin",
                        name: "Ultra-Thin Laptop",
                        price: 899.99,
                        image: "/modern-laptop-computer.png",
                        category: "Laptops",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <Link href="/product/shoes-athletic-running" className="block">
              <img
                src="/stylish-running-shoes.png"
                alt="Running Shoes"
                className="w-full h-48 object-cover cursor-pointer"
              />
              <div className="p-6 h-52 grid grid-rows-[auto_1fr_auto] gap-3">
                <h3 className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-amber-700">
                  Athletic Running Shoes
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">Comfort and style for your active lifestyle</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-700">$79.99</span>
                  <Button
                    className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleAddToCart({
                        id: "shoes-athletic-running",
                        name: "Athletic Running Shoes",
                        price: 79.99,
                        image: "/stylish-running-shoes.png",
                        category: "Shoes",
                      })
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Swiftly?</h2>
            <p className="text-lg text-gray-600">We're committed to providing the best shopping experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly with our express shipping options</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Shop with confidence knowing your data is protected</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully curated products from trusted brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-amber-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-amber-100 text-lg mb-8">Subscribe to get special offers, free giveaways, and updates</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1 bg-white border-0" />
            <Button className="bg-white text-amber-700 hover:bg-gray-100 px-8">Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-400 mb-4">Swiftly</h3>
              <p className="text-gray-400">Your trusted partner for quality products and exceptional service.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Fashion
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Home & Garden
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sports
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Swiftly. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showCategories && <div className="fixed inset-0 z-40" onClick={() => setShowCategories(false)} />}
    </div>
  )
}
