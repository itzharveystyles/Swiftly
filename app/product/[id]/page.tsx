"use client"

import type React from "react"
import { Search, ShoppingCart, User, ChevronDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getCurrentUser, signOut } from "@/lib/auth-utils"

export default function ProductPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { name?: string; price?: string; image?: string; category?: string }
}) {
  const [searchInput, setSearchInput] = useState("")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getCurrentUser().then((userData) => {
      setUser(userData)
      setLoading(false)
    })
  }, [])

  // Get product details from URL params or use defaults
  const initialProductName = searchParams.name || "Sony WH-CH720N"
  const initialProductPrice = searchParams.price || "$68.00"
  const initialProductImage = searchParams.image || "/white-headphones-2.png"
  const initialProductCategory = searchParams.category || "headphones"

  const [currentProduct, setCurrentProduct] = useState({
    name: initialProductName,
    price: initialProductPrice,
    image: initialProductImage,
    category: initialProductCategory,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const getRelatedProducts = (category: string) => {
    const relatedProductsMap: { [key: string]: any[] } = {
      headphones: [
        { name: "Sony WH-1000XM4", price: "$299.00", image: "/black-headphones.png" },
        { name: "Bose QuietComfort 45", price: "$329.00", image: "/white-headphones.png" },
        { name: "Audio-Technica ATH-M50x", price: "$149.00", image: "/white-headphones-3.png" },
      ],
      laptops: [
        { name: "Dell XPS 13", price: "$999.00", image: "/dell-xps.png" },
        { name: "HP Spectre x360", price: "$1199.00", image: "/hp-spectre.png" },
        { name: "Lenovo ThinkPad X1", price: "$1299.00", image: "/lenovo-thinkpad.png" },
      ],
      books: [
        { name: "To Kill a Mockingbird", price: "$12.99", image: "/mockingbird.png" },
        { name: "1984", price: "$13.99", image: "/1984-book.png" },
        { name: "Pride and Prejudice", price: "$11.99", image: "/pride-prejudice.png" },
      ],
      shoes: [
        { name: "Adidas Ultraboost 22", price: "$180.00", image: "/adidas-ultraboost.png" },
        { name: "Converse Chuck Taylor", price: "$55.00", image: "/converse-chuck.png" },
        { name: "Vans Old Skool", price: "$65.00", image: "/vans-old-skool.png" },
      ],
      phones: [
        { name: "Samsung Galaxy S24", price: "$799.00", image: "/samsung-galaxy.png" },
        { name: "Google Pixel 8", price: "$699.00", image: "/google-pixel.png" },
        { name: "OnePlus 12", price: "$799.00", image: "/oneplus-12.png" },
      ],
    }

    return (
      relatedProductsMap[category] || [
        { name: "Related Product 1", price: "$99.00", image: "/placeholder.svg" },
        { name: "Related Product 2", price: "$129.00", image: "/placeholder.svg" },
        { name: "Related Product 3", price: "$159.00", image: "/placeholder.svg" },
      ]
    )
  }

  const handleRelatedProductClick = (product: any) => {
    setCurrentProduct({
      name: product.name,
      price: product.price,
      image: product.image,
      category: currentProduct.category,
    })
  }

  const relatedProducts = getRelatedProducts(currentProduct.category)

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

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg p-8">
              <Image
                src={currentProduct.image || "/placeholder.svg"}
                alt={currentProduct.name}
                width={400}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Related Products</h3>
              <div className="flex space-x-4">
                {relatedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-100 rounded-lg p-2 cursor-pointer hover:border-2 hover:border-amber-800 transition-all"
                    onClick={() => handleRelatedProductClick(product)}
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentProduct.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <Star className="w-5 h-5 text-gray-300" />
                </div>
                <span className="text-gray-600">(4.0)</span>
              </div>

              {/* Product Description */}
              <div className="text-gray-700 space-y-4 mb-8">
                <p>
                  Discover value that sounds premium: the {currentProduct.name} offers immersive audio, all-day comfort,
                  and long-lasting battery life—all at a budget-friendly price.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>
                    <strong>Ultra-lightweight & Comfortable:</strong> Premium design ensuring comfort during extended
                    use.
                  </li>
                  <li>
                    <strong>Impressive Battery Life & Fast Charging:</strong> Long-lasting performance with quick
                    charging capabilities.
                  </li>
                </ul>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">{currentProduct.price}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  className="bg-amber-800 hover:bg-amber-900 text-white px-8 py-3 rounded-lg font-semibold flex-1"
                  onClick={() => router.push("/cart")}
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-800 text-amber-800 hover:bg-amber-50 px-8 py-3 rounded-lg font-semibold flex-1 bg-transparent"
                  onClick={() => router.push("/cart")}
                >
                  Add To Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
