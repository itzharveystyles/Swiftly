"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa"
import { supabase } from "@/lib/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        // Get user profile to determine role
        const { data: profile } = await supabase.from("user_profiles").select("role").eq("id", data.user.id).single()

        if (profile?.role === "seller") {
          router.push("/admin")
        } else {
          router.push("/")
        }
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-amber-700">
      {/* Simplified Header */}
      <header className="bg-amber-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-white hover:text-gray-100 transition-colors">
              Swiftly
            </Link>

            {/* Signup Button */}
            <Link href="/signup">
              <Button variant="outline" className="bg-white text-amber-700 border-white hover:bg-gray-100">
                Signup
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Log in</h1>
            <p className="text-gray-600">
              New to Design Space?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 underline">
                Sign up for free
              </Link>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            {/* Email Field */}
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-800">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-medium disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="flex justify-center space-x-4">
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <FaFacebook className="h-5 w-5 text-blue-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <FaGithub className="h-5 w-5 text-gray-800" />
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <FaGoogle className="h-5 w-5 text-red-500" />
              </button>
              <button className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                <FaTwitter className="h-5 w-5 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
