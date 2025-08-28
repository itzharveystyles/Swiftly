export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category?: string
}

export const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const items = localStorage.getItem("cart")
  return items ? JSON.parse(items) : []
}

export const addToCart = (item: Omit<CartItem, "quantity">) => {
  const cartItems = getCartItems()
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.push({ ...item, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cartItems))

  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent("cartUpdated"))
}

export const updateCartItemQuantity = (id: string, quantity: number) => {
  const cartItems = getCartItems()
  const item = cartItems.find((cartItem) => cartItem.id === id)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      item.quantity = quantity
      localStorage.setItem("cart", JSON.stringify(cartItems))
      window.dispatchEvent(new CustomEvent("cartUpdated"))
    }
  }
}

export const removeFromCart = (id: string) => {
  const cartItems = getCartItems()
  const filteredItems = cartItems.filter((item) => item.id !== id)
  localStorage.setItem("cart", JSON.stringify(filteredItems))
  window.dispatchEvent(new CustomEvent("cartUpdated"))
}

export const clearCart = () => {
  localStorage.removeItem("cart")
  window.dispatchEvent(new CustomEvent("cartUpdated"))
}

export const getCartTotal = (): number => {
  const cartItems = getCartItems()
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const getCartItemCount = (): number => {
  const cartItems = getCartItems()
  return cartItems.reduce((total, item) => total + item.quantity, 0)
}
