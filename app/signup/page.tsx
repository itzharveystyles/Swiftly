"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Link from "next/link"
import { FaFacebook, FaGoogle } from "react-icons/fa"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/client"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"customer" | "seller">("customer")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
          data: {
            role: role,
          },
        },
      })

      if (error) {
        if (
          error.message.includes("already registered") ||
          error.message.includes("already been registered") ||
          error.message.includes("User already registered") ||
          error.message.includes("email address is already registered") ||
          error.message.includes("signup is disabled")
        ) {
          setError("This email address is already registered. Please use a different email or try logging in instead.")
        } else {
          setError(error.message)
        }
        return
      }

      if (data.user) {
        if (data.user.email_confirmed_at) {
          setError("This email is already registered and confirmed. Please log in instead.")
          return
        }

        if (!data.session) {
          setSuccess("Check your email to confirm your account!")
        } else {
          setSuccess("Account created successfully!")
        }
      } else {
        setError("Unable to create account. This email may already be registered. Please try logging in instead.")
      }
    } catch (err) {
      console.error("Signup error:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignup = (provider: string) => {
    console.log("Social signup with:", provider, "Role:", role)

    if (role === "customer") {
      router.push("/")
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen bg-amber-700">
      <header className="bg-amber-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white hover:text-gray-100 transition-colors">
              Swiftly
            </Link>

            <Link href="/login">
              <Button variant="outline" className="bg-white text-amber-700 border-white hover:bg-gray-100">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl relative">
          <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </Link>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create an account</h1>
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 underline">
                Log in
              </Link>
            </p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-3 text-center">I want to join as:</p>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={role === "customer"}
                  onChange={(e) => setRole(e.target.value as "customer" | "seller")}
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    role === "customer"
                      ? "border-amber-500 bg-amber-50 text-amber-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="font-semibold">Customer</div>
                  <div className="text-sm text-gray-600 mt-1">Shop products</div>
                </div>
              </label>

              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="seller"
                  checked={role === "seller"}
                  onChange={(e) => setRole(e.target.value as "customer" | "seller")}
                  className="sr-only"
                />
                <div
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    role === "seller"
                      ? "border-amber-500 bg-amber-50 text-amber-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="font-semibold">Seller</div>
                  <div className="text-sm text-gray-600 mt-1">Sell products</div>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignup("facebook")}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              <FaFacebook className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Continue with Facebook</span>
            </button>

            <button
              onClick={() => handleSocialSignup("google")}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-gray-600 text-sm">Enter your email address to create an account.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-medium disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create an account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
