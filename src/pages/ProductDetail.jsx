import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getById, getRelated, formatPrice, categories } from '../data/products'
import { useCart } from '../store/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getById(id)
  const related = getRelated(id, 4)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="font-display text-4xl text-charcoal-800 mb-3">Produit introuvable</h1>
          <p className="font-body text-charcoal-500 mb-6">Ce produit n'existe pas ou a été retiré.</p>
          <Link to="/boutique" className="btn-primary">Retour à la boutique</Link>
        </div>
      </div>
    )
  }

  const category = categories.find((c) => c.id === product.category)

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    navigate('/panier')
  }

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-charcoal-100">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm font-body text-charcoal-400">
            <Link to="/" className="hover:text-orange-500 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/boutique" className="hover:text-orange-500 transition-colors">Boutique</Link>
            <span>/</span>
            <Link to={`/boutique?cat=${product.category}`} className="hover:text-orange-500 transition-colors">
              {category?.label}
            </Link>
            <span>/</span>
            <span className="text-charcoal-600 truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="bg-white rounded-2xl overflow-hidden card-shadow aspect-[4/3]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className={`badge-orange text-xs`}>
                {category?.icon} {category?.label}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-charcoal-800 tracking-wide leading-tight mb-3">
              {product.name}
            </h1>

            {/* Stock */}
            <div className="mb-4">
              {product.stock > 5 ? (
                <span className="badge-green">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                  En stock ({product.stock} disponibles)
                </span>
              ) : product.stock > 0 ? (
                <span className="badge-red">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
                  Stock limité — {product.stock} restant{product.stock > 1 ? 's' : ''}
                </span>
              ) : (
                <span className="badge-red">Rupture de stock</span>
              )}
            </div>

            {/* Price */}
            <div className="text-3xl font-body font-bold text-orange-600 mb-5">
              {formatPrice(product.price)}
              <span className="text-sm text-charcoal-400 font-normal ml-2">/ unité</span>
            </div>

            {/* Description */}
            <p className="font-body text-charcoal-600 text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Quantity & Add */}
            {product.stock > 0 && (
              <div className="space-y-3 mb-6">
                <label className="form-label">Quantité</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-charcoal-200 rounded overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-charcoal-600 
                                 hover:bg-charcoal-100 transition-colors font-body text-lg"
                    >
                      −
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center font-body font-semibold text-charcoal-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-charcoal-600 
                                 hover:bg-charcoal-100 transition-colors font-body text-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-charcoal-500 font-body">
                    Total: <strong className="text-charcoal-700">{formatPrice(product.price * quantity)}</strong>
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className={`flex-1 sm:flex-none btn-primary ${added ? '!bg-green-500' : ''}`}
              >
                {added ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Ajouté au panier
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Ajouter au panier
                  </>
                )}
              </button>
              {product.stock > 0 && (
                <button onClick={handleBuyNow} className="flex-1 sm:flex-none btn-dark">
                  Commander maintenant
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-charcoal-100 mt-8 pt-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm font-body text-charcoal-500">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Produit garanti
                </div>
                <div className="flex items-center gap-2 text-sm font-body text-charcoal-500">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Mobile Money
                </div>
                <div className="flex items-center gap-2 text-sm font-body text-charcoal-500">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Livraison Yaoundé
                </div>
                <div className="flex items-center gap-2 text-sm font-body text-charcoal-500">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Livraison 24–48h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specs */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl text-charcoal-800 tracking-wide mb-5">
              Caractéristiques techniques
            </h2>
            <div className="bg-white rounded-xl card-shadow overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-charcoal-50' : 'bg-white'}>
                      <td className="px-5 py-3 font-body font-semibold text-sm text-charcoal-600 w-1/3 border-r border-charcoal-100">
                        {key}
                      </td>
                      <td className="px-5 py-3 font-body text-sm text-charcoal-800">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl text-charcoal-800 tracking-wide mb-6">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
