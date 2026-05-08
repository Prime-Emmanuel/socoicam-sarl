import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { formatPrice, categories } from '../data/products'

export default function ProductCard({ product, className = '' }) {
  const { addItem, items } = useCart()
  const [added, setAdded] = useState(false)

  const category = categories.find((c) => c.id === product.category)
  const inCart = items.some((i) => i.id === product.id)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link
      to={`/boutique/${product.id}`}
      className={`group block bg-white rounded-lg overflow-hidden card-shadow card-shadow-hover 
                  transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-charcoal-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`badge-orange text-[10px] font-body font-semibold uppercase tracking-wider`}>
            {category?.label || product.category}
          </span>
        </div>
        {/* Stock badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2.5 right-2.5">
            <span className="badge-red text-[10px]">Stock limité</span>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-black/70 text-white text-sm font-body font-semibold px-3 py-1.5 rounded">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-body font-semibold text-charcoal-800 text-sm leading-snug mb-1 
                       group-hover:text-orange-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-charcoal-400 text-xs font-body line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-body font-bold text-orange-600 text-base">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            aria-label={`Ajouter ${product.name} au panier`}
            className={`flex items-center gap-1.5 text-xs font-body font-semibold px-3 py-2 rounded 
                        transition-all duration-200 active:scale-95
                        ${added
                          ? 'bg-green-500 text-white'
                          : product.stock === 0
                          ? 'bg-charcoal-100 text-charcoal-400 cursor-not-allowed'
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
          >
            {added ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Ajouté
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {inCart ? 'Rajouter' : 'Ajouter'}
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  )
}
