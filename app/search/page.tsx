"use client"

import type React from "react"
import Link from "next/link"

import { Search, ShoppingCart, User, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, signOut } from "@/lib/auth-utils"

export default function SearchResultsPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const searchQuery = searchParams.q || "Products"
  const [searchInput, setSearchInput] = useState(searchQuery)
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

  const getProductsForQuery = (query: string) => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("headphone") || lowerQuery.includes("audio")) {
      return [
        {
          id: 1,
          name: "Sony WH-CH520",
          price: "$68.00",
          description: "Bluetooth On-Ear Headphones with Microphone",
          image: "/black-headphones.png",
          rating: 4,
        },
        {
          id: 2,
          name: "Sony WH-CH720N",
          price: "$68.00",
          description: "Bluetooth On-Ear Headphones with Microphone",
          image: "/white-headphones.png",
          rating: 4,
        },
        {
          id: 3,
          name: "Sony WH-CH720N",
          price: "$68.00",
          description: "Bluetooth On-Ear Headphones with Microphone",
          image: "/white-headphones-2.png",
          rating: 4,
        },
        {
          id: 4,
          name: "Sony WH-CH720N",
          price: "$68.00",
          description: "Bluetooth On-Ear Headphones with Microphone",
          image: "/white-headphones-3.png",
          rating: 4,
        },
      ]
    } else if (lowerQuery.includes("laptop") || lowerQuery.includes("computer")) {
      return [
        {
          id: 1,
          name: "MacBook Pro 14",
          price: "$1,999.00",
          description: "Apple M3 Pro chip with 11-core CPU",
          image: "/macbook-pro.png",
          rating: 5,
        },
        {
          id: 2,
          name: "Dell XPS 13",
          price: "$1,299.00",
          description: "Intel Core i7 with 16GB RAM",
          image: "/dell-xps.png",
          rating: 4,
        },
        {
          id: 3,
          name: "HP Spectre x360",
          price: "$1,149.00",
          description: "2-in-1 Convertible Laptop",
          image: "/hp-spectre.png",
          rating: 4,
        },
        {
          id: 4,
          name: "Lenovo ThinkPad",
          price: "$899.00",
          description: "Business Laptop with Intel i5",
          image: "/lenovo-thinkpad.png",
          rating: 4,
        },
      ]
    } else if (lowerQuery.includes("book") || lowerQuery.includes("novel")) {
      return [
        {
          id: 1,
          name: "The Great Gatsby",
          price: "$12.99",
          description: "Classic American Literature",
          image: "/great-gatsby.png",
          rating: 5,
        },
        {
          id: 2,
          name: "To Kill a Mockingbird",
          price: "$14.99",
          description: "Harper Lee's Masterpiece",
          image: "/mockingbird.png",
          rating: 5,
        },
        {
          id: 3,
          name: "1984",
          price: "$13.99",
          description: "George Orwell's Dystopian Novel",
          image: "/1984-book.png",
          rating: 5,
        },
        {
          id: 4,
          name: "Pride and Prejudice",
          price: "$11.99",
          description: "Jane Austen's Romance Classic",
          image: "/pride-prejudice.png",
          rating: 5,
        },
      ]
    } else if (lowerQuery.includes("shoe") || lowerQuery.includes("sneaker") || lowerQuery.includes("footwear")) {
      return [
        {
          id: 1,
          name: "Nike Air Max 270",
          price: "$150.00",
          description: "Men's Running Shoes",
          image: "/nike-air-max.png",
          rating: 4,
        },
        {
          id: 2,
          name: "Adidas Ultraboost",
          price: "$180.00",
          description: "Premium Running Sneakers",
          image: "/adidas-ultraboost.png",
          rating: 5,
        },
        {
          id: 3,
          name: "Converse Chuck Taylor",
          price: "$65.00",
          description: "Classic High-Top Sneakers",
          image: "/converse-chuck.png",
          rating: 4,
        },
        {
          id: 4,
          name: "Vans Old Skool",
          price: "$60.00",
          description: "Skateboarding Shoes",
          image: "/vans-old-skool.png",
          rating: 4,
        },
      ]
    } else if (lowerQuery.includes("phone") || lowerQuery.includes("mobile")) {
      return [
        {
          id: 1,
          name: "iPhone 15 Pro",
          price: "$999.00",
          description: "Latest Apple Smartphone",
          image: "/iphone-15-pro.png",
          rating: 5,
        },
        {
          id: 2,
          name: "Samsung Galaxy S24",
          price: "$899.00",
          description: "Android Flagship Phone",
          image: "/samsung-galaxy.png",
          rating: 4,
        },
        {
          id: 3,
          name: "Google Pixel 8",
          price: "$699.00",
          description: "Pure Android Experience",
          image: "/google-pixel.png",
          rating: 4,
        },
        {
          id: 4,
          name: "OnePlus 12",
          price: "$799.00",
          description: "Fast Charging Smartphone",
          image: "/oneplus-12.png",
          rating: 4,
        },
      ]
    } else {
      // Default products for generic searches
      return [
        {
          id: 1,
          name: "Premium Product 1",
          price: "$99.00",
          description: `High-quality ${query} for everyday use`,
          image: "/generic-product-1.png",
          rating: 4,
        },
        {
          id: 2,
          name: "Premium Product 2",
          price: "$129.00",
          description: `Professional ${query} with advanced features`,
          image: "/generic-product-2.png",
          rating: 4,
        },
        {
          id: 3,
          name: "Premium Product 3",
          price: "$89.00",
          description: `Affordable ${query} with great value`,
          image: "/generic-product-3.png",
          rating: 4,
        },
        {
          id: 4,
          name: "Premium Product 4",
          price: "$149.00",
          description: `Luxury ${query} for discerning customers`,
          image: "/generic-product-4.png",
          rating: 5,
        },
      ]
    }
  }

  const products = getProductsForQuery(searchQuery)

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

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-amber-800 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Grab Up To 50% Off On</h2>
            <p className="text-xl md:text-2xl mb-6">Selected Headphone</p>
            <Button className="bg-white text-amber-800 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
              Shop Now
            </Button>
          </div>
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <div className="flex space-x-4">
              <Image
                src="/black-headphones.png"
                alt="Black headphones"
                width={120}
                height={120}
                className="object-contain"
              />
              <Image
                src="/white-headphones.png"
                alt="White headphones"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-gray-700 font-medium">Brands</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-gray-700 font-medium">Price</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span className="text-gray-700 font-medium">Review</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700 font-medium">Filter</span>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{searchQuery} For You !</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}&category=${encodeURIComponent(searchQuery)}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 block"
              >
                <div className="aspect-square bg-gray-100 rounded-t-lg p-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-lg font-bold text-gray-900 mb-2">{product.price}</p>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
