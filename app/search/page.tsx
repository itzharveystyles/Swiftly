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
          originalPrice: "$89.00",
          description: "Bluetooth On-Ear Headphones with Microphone",
          image: "/black-headphones.png",
          rating: 4,
          reviews: 1234,
          discount: "24% off",
        },
        {
          id: 2,
          name: "Sony WH-CH720N",
          price: "$68.00",
          originalPrice: "$95.00",
          description: "Bluetooth On-Ear Headphones with Microphone",
          image: "/white-headphones.png",
          rating: 4,
          reviews: 856,
          discount: "28% off",
        },
        {
          id: 3,
          name: "Sony WH-CH720N Pro",
          price: "$78.00",
          originalPrice: "$110.00",
          description: "Premium Bluetooth Headphones with ANC",
          image: "/white-headphones-2.png",
          rating: 5,
          reviews: 2341,
          discount: "29% off",
        },
        {
          id: 4,
          name: "Sony WH-CH720N Elite",
          price: "$85.00",
          originalPrice: "$120.00",
          description: "Elite Bluetooth Headphones with Hi-Res Audio",
          image: "/white-headphones-3.png",
          rating: 4,
          reviews: 567,
          discount: "29% off",
        },
        {
          id: 5,
          name: "Bose QuietComfort 45",
          price: "$249.00",
          originalPrice: "$329.00",
          description: "Wireless Noise Cancelling Headphones",
          image: "/black-headphones.png",
          rating: 5,
          reviews: 3456,
          discount: "24% off",
        },
        {
          id: 6,
          name: "Apple AirPods Max",
          price: "$449.00",
          originalPrice: "$549.00",
          description: "Premium Over-Ear Headphones",
          image: "/white-headphones.png",
          rating: 4,
          reviews: 1890,
          discount: "18% off",
        },
        {
          id: 7,
          name: "Sennheiser HD 450BT",
          price: "$129.00",
          originalPrice: "$199.00",
          description: "Wireless Headphones with Active Noise Cancellation",
          image: "/black-headphones.png",
          rating: 4,
          reviews: 987,
          discount: "35% off",
        },
        {
          id: 8,
          name: "Audio-Technica ATH-M50xBT",
          price: "$179.00",
          originalPrice: "$199.00",
          description: "Professional Monitor Headphones",
          image: "/white-headphones-2.png",
          rating: 5,
          reviews: 2134,
          discount: "10% off",
        },
        {
          id: 9,
          name: "JBL Live 650BTNC",
          price: "$99.00",
          originalPrice: "$149.00",
          description: "Wireless Over-Ear Noise Cancelling Headphones",
          image: "/black-headphones.png",
          rating: 4,
          reviews: 756,
          discount: "34% off",
        },
        {
          id: 10,
          name: "Beats Studio3 Wireless",
          price: "$199.00",
          originalPrice: "$349.00",
          description: "Over-Ear Noise Cancelling Headphones",
          image: "/white-headphones-3.png",
          rating: 4,
          reviews: 1567,
          discount: "43% off",
        },
        {
          id: 11,
          name: "Skullcandy Crusher Evo",
          price: "$149.00",
          originalPrice: "$199.00",
          description: "Wireless Over-Ear Headphones with Bass",
          image: "/black-headphones.png",
          rating: 4,
          reviews: 432,
          discount: "25% off",
        },
        {
          id: 12,
          name: "Plantronics BackBeat Pro 2",
          price: "$89.00",
          originalPrice: "$149.00",
          description: "Wireless Noise Canceling Headphones",
          image: "/white-headphones.png",
          rating: 4,
          reviews: 678,
          discount: "40% off",
        },
        {
          id: 13,
          name: "Marshall Major IV",
          price: "$119.00",
          originalPrice: "$149.00",
          description: "Wireless On-Ear Headphones",
          image: "/black-headphones.png",
          rating: 4,
          reviews: 892,
          discount: "20% off",
        },
        {
          id: 14,
          name: "Jabra Elite 85h",
          price: "$199.00",
          originalPrice: "$299.00",
          description: "Wireless Noise-Canceling Headphones",
          image: "/white-headphones-2.png",
          rating: 5,
          reviews: 1456,
          discount: "33% off",
        },
        {
          id: 15,
          name: "Beyerdynamic DT 770 PRO",
          price: "$159.00",
          originalPrice: "$179.00",
          description: "Studio Headphones for Professional Use",
          image: "/black-headphones.png",
          rating: 5,
          reviews: 2789,
          discount: "11% off",
        },
        {
          id: 16,
          name: "AKG K371",
          price: "$129.00",
          originalPrice: "$169.00",
          description: "Professional Studio Headphones",
          image: "/white-headphones-3.png",
          rating: 4,
          reviews: 567,
          discount: "24% off",
        },
        {
          id: 17,
          name: "Focal Listen Professional",
          price: "$199.00",
          originalPrice: "$249.00",
          description: "Professional Monitoring Headphones",
          image: "/black-headphones.png",
          rating: 5,
          reviews: 345,
          discount: "20% off",
        },
        {
          id: 18,
          name: "V-MODA Crossfade M-100",
          price: "$179.00",
          originalPrice: "$229.00",
          description: "Over-Ear Noise-Isolating Headphones",
          image: "/white-headphones.png",
          rating: 4,
          reviews: 678,
          discount: "22% off",
        },
      ]
    } else if (lowerQuery.includes("laptop") || lowerQuery.includes("computer")) {
      return [
        {
          id: 1,
          name: "MacBook Pro 14",
          price: "$1,999.00",
          originalPrice: "$2,199.00",
          description: "Apple M3 Pro chip with 11-core CPU",
          image: "/macbook-pro.png",
          rating: 5,
          reviews: 2341,
          discount: "9% off",
        },
        {
          id: 2,
          name: "Dell XPS 13",
          price: "$1,299.00",
          originalPrice: "$1,499.00",
          description: "Intel Core i7 with 16GB RAM",
          image: "/dell-xps.png",
          rating: 4,
          reviews: 1876,
          discount: "13% off",
        },
        {
          id: 3,
          name: "HP Spectre x360",
          price: "$1,149.00",
          originalPrice: "$1,399.00",
          description: "2-in-1 Convertible Laptop",
          image: "/hp-spectre.png",
          rating: 4,
          reviews: 987,
          discount: "18% off",
        },
        {
          id: 4,
          name: "Lenovo ThinkPad X1",
          price: "$1,899.00",
          originalPrice: "$2,199.00",
          description: "Business Laptop with Intel i7",
          image: "/lenovo-thinkpad.png",
          rating: 5,
          reviews: 1234,
          discount: "14% off",
        },
        {
          id: 5,
          name: "ASUS ZenBook 14",
          price: "$899.00",
          originalPrice: "$1,099.00",
          description: "Ultra-thin laptop with OLED display",
          image: "/macbook-pro.png",
          rating: 4,
          reviews: 756,
          discount: "18% off",
        },
        {
          id: 6,
          name: "Microsoft Surface Laptop 5",
          price: "$1,299.00",
          originalPrice: "$1,599.00",
          description: "Premium laptop with touchscreen",
          image: "/dell-xps.png",
          rating: 4,
          reviews: 543,
          discount: "19% off",
        },
        {
          id: 7,
          name: "Acer Swift 3",
          price: "$649.00",
          originalPrice: "$799.00",
          description: "Lightweight laptop for everyday use",
          image: "/hp-spectre.png",
          rating: 4,
          reviews: 432,
          discount: "19% off",
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
          id: 9,
          name: "MacBook Air M2",
          price: "$1,199.00",
          originalPrice: "$1,299.00",
          description: "Apple M2 chip with 8-core CPU",
          image: "/macbook-pro.png",
          rating: 5,
          reviews: 3456,
          discount: "8% off",
        },
        {
          id: 10,
          name: "Razer Blade 15",
          price: "$2,299.00",
          originalPrice: "$2,699.00",
          description: "Gaming laptop with RTX 4070",
          image: "/dell-xps.png",
          rating: 4,
          reviews: 892,
          discount: "15% off",
        },
        {
          id: 11,
          name: "Framework Laptop",
          price: "$1,399.00",
          originalPrice: "$1,599.00",
          description: "Modular and repairable laptop",
          image: "/hp-spectre.png",
          rating: 4,
          reviews: 234,
          discount: "13% off",
        },
        {
          id: 12,
          name: "System76 Lemur Pro",
          price: "$1,099.00",
          originalPrice: "$1,299.00",
          description: "Linux laptop for developers",
          image: "/lenovo-thinkpad.png",
          rating: 4,
          reviews: 156,
          discount: "15% off",
        },
      ]
    } else {
      return Array.from({ length: 36 }, (_, i) => ({
        id: i + 1,
        name: `Premium ${query} ${i + 1}`,
        price: `$${(Math.random() * 200 + 50).toFixed(2)}`,
        originalPrice: `$${(Math.random() * 100 + 200).toFixed(2)}`,
        description: `High-quality ${query} for everyday use`,
        image: `/generic-product-${(i % 4) + 1}.png`,
        rating: Math.floor(Math.random() * 2) + 4,
        reviews: Math.floor(Math.random() * 2000) + 100,
        discount: `${Math.floor(Math.random() * 30) + 10}% off`,
      }))
    }
  }

  const allProducts = getProductsForQuery(searchQuery)
  const products = allProducts.slice(0, displayedCount)

  const handleLoadMore = () => {
    console.log("[v0] Load More clicked, current count:", displayedCount, "total products:", allProducts.length)
    setDisplayedCount((prev) => {
      const newCount = Math.min(prev + 12, allProducts.length)
      console.log("[v0] New displayed count:", newCount)
      return newCount
    })
  }

  const hasMoreProducts = displayedCount < allProducts.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
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
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowCategories(!showCategories)
                  }}
                >
                  <span>Categories</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showCategories ? "rotate-180" : ""}`} />
                </button>

                {showCategories && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-[100]">
                    <div className="py-2">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleCategoryClick(category.name)
                          }}
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center space-x-3 transition-colors focus:outline-none focus:bg-gray-100"
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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </form>
              <Link
                href="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Account</span>
              </Link>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{searchQuery} For You !</h2>
            <p className="text-gray-600">{allProducts.length} results found</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}?name=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}&category=${encodeURIComponent(searchQuery)}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 block group"
              >
                <div className="aspect-square bg-gray-50 rounded-t-lg p-3 relative overflow-hidden">
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                      {product.discount}
                    </div>
                  )}
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 mb-1 text-sm line-clamp-2 leading-tight">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-bold text-red-600">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMoreProducts && (
            <div className="text-center mt-12 mb-8">
              <Button
                variant="outline"
                className="px-8 py-3 bg-transparent hover:bg-gray-50 transition-colors"
                onClick={handleLoadMore}
              >
                Load More Products ({allProducts.length - displayedCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
