import { supabase } from "@/lib/client"

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  return {
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role || "customer",
  }
}

export async function signOut() {
  await supabase.auth.signOut()
  window.location.href = "/"
}
