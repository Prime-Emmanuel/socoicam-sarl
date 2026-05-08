import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity || 1 },
        ],
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== id) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const savedCart = (() => {
    try {
      const raw = localStorage.getItem('socoicam_cart')
      return raw ? JSON.parse(raw) : initialState
    } catch {
      return initialState
    }
  })()

  const [state, dispatch] = useReducer(cartReducer, savedCart)

  useEffect(() => {
    localStorage.setItem('socoicam_cart', JSON.stringify(state))
  }, [state])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const addItem  = (product, qty = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: qty } })

  const removeItem    = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart     = () => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
