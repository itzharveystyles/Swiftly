"use client"

import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { User } from "react-feather"

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-800 cursor-default">Swiftly</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/admin/dashboard"
              className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                const supabase = createClient()
                supabase.auth.signOut().then(() => {
                  window.location.href = "/"
                })
              }}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* My Sales Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Sales</h2>
          </div>

          <div className="p-6">
            {/* Sales Item */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img src="/white-headphones.png" alt="Sony WH-CH720N" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Sony WH-CH720N x 1</h3>
                  <p className="text-sm text-gray-500">Prism Opal</p>
                </div>
              </div>

              {/* Sales Details */}
              <div className="flex items-center space-x-8 text-sm">
                <div>
                  <span className="text-gray-500">Price: </span>
                  <span className="font-medium">$68.00</span>
                </div>
                <div>
                  <span className="text-gray-500">Items: </span>
                  <span className="font-medium">1</span>
                </div>
                <div>
                  <span className="text-gray-500">Method: </span>
                  <span className="font-medium">ABA</span>
                </div>
                <div>
                  <span className="text-gray-500">Date: </span>
                  <span className="font-medium">8/2/2025</span>
                </div>
                <div>
                  <span className="text-gray-500">Payment: </span>
                  <span className="font-medium text-green-600">Success</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
