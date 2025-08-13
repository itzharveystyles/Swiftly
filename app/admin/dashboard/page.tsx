"use client"

import { useState } from "react"
import Link from "next/link"
import { Upload, Plus, X } from "lucide-react"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("add-product")
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([null, null, null, null, null])

  const handleImageUpload = (index: number, file: File | null) => {
    const newImages = [...selectedImages]
    newImages[index] = file
    setSelectedImages(newImages)
  }

  const removeImage = (index: number) => {
    handleImageUpload(index, null)
  }

  const handleAddProduct = () => {
    console.log("Adding product:", { productName, productDescription, category, price, images: selectedImages })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-800">Swiftly</h1>
          </div>

          {/* Back Button */}
          <Link
            href="/admin"
            className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Back
          </Link>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-6 space-y-2">
            <button
              onClick={() => setActiveTab("add-product")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "add-product"
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>

            <button
              onClick={() => setActiveTab("product-list")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "product-list"
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="w-5 h-5 border-2 border-current rounded"></div>
              <span>Product List</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "orders"
                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="w-5 h-5 rounded-full border-2 border-current"></div>
              <span>Orders</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === "add-product" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {/* Product Images */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Image</h3>
                <div className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          handleImageUpload(index - 1, file)
                        }}
                        className="hidden"
                        id={`image-upload-${index}`}
                      />

                      <label
                        htmlFor={`image-upload-${index}`}
                        className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors block relative overflow-hidden"
                      >
                        {selectedImages[index - 1] ? (
                          <>
                            <img
                              src={URL.createObjectURL(selectedImages[index - 1]!) || "/placeholder.svg"}
                              alt={`Product ${index}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault()
                                removeImage(index - 1)
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Upload</span>
                          </>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Name */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Product Name</h3>
                <input
                  type="text"
                  placeholder="Type Here..."
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Product Description */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Product Description</h3>
                <textarea
                  placeholder="Type Here..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Category and Price */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Category</h3>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Product Price</h3>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Add Button */}
              <button
                onClick={handleAddProduct}
                className="bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors font-medium"
              >
                Add
              </button>
            </div>
          )}

          {activeTab === "product-list" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Product List</h2>
              <p className="text-gray-500">Product list functionality coming soon...</p>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders</h2>
              <p className="text-gray-500">Orders management functionality coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
