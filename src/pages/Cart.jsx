import { Link } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { formatPrice } from '../data/products'

export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart()

  const deliveryFee = totalPrice >= 50000 ? 0 : 3000
  const grandTotal  = totalPrice + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-charcoal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-charcoal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="font-display text-4xl text-charcoal-800 tracking-wide mb-3">
            Panier vide
          </h1>
          <p className="font-body text-charcoal-500 mb-8">
            Vous n'avez pas encore ajouté de produits à votre panier.
          </p>
          <Link to="/boutique" className="btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Parcourir la boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Header */}
      <div className="bg-charcoal-800 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-5xl text-white tracking-wide">
            Mon Panier
          </h1>
          <p className="font-body text-charcoal-400 mt-1">
            {totalItems} article{totalItems > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.id}
                className="bg-white rounded-xl p-4 card-shadow flex gap-4 items-start animate-fade-in">
                {/* Image */}
                <Link to={`/boutique/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-charcoal-50"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/boutique/${item.id}`}
                    className="font-body font-semibold text-charcoal-800 text-sm hover:text-orange-600 
                               transition-colors block truncate"
                  >
                    {item.name}
                  </Link>
                  <div className="text-orange-600 font-body font-bold text-base mt-1">
                    {formatPrice(item.price)}
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-charcoal-200 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-charcoal-600 
                                   hover:bg-charcoal-100 transition-colors text-lg"
                        aria-label="Diminuer la quantité"
                      >
                        −
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center font-body font-semibold 
                                       text-charcoal-800 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-charcoal-600 
                                   hover:bg-charcoal-100 transition-colors text-lg"
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-body text-charcoal-500 hidden sm:block">
                      = <strong className="text-charcoal-700">{formatPrice(item.price * item.quantity)}</strong>
                    </span>
                  </div>
                </div>

                {/* Line total + remove */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="font-body font-bold text-charcoal-800 text-sm sm:text-base">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-charcoal-400 hover:text-red-500 transition-colors p-1"
                    aria-label={`Retirer ${item.name} du panier`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <div className="pt-2">
              <Link to="/boutique" className="btn-secondary text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Continuer mes achats
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl card-shadow p-6 sticky top-20">
              <h2 className="font-display text-2xl text-charcoal-800 tracking-wide mb-5">
                Récapitulatif
              </h2>

              <div className="space-y-3 text-sm font-body">
                <div className="flex justify-between text-charcoal-600">
                  <span>Sous-total ({totalItems} art.)</span>
                  <span className="font-semibold text-charcoal-800">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-charcoal-600">
                  <span>Livraison</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : 'font-semibold text-charcoal-800'}>
                    {deliveryFee === 0 ? 'GRATUITE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-charcoal-400 bg-orange-50 rounded p-2">
                    💡 Livraison gratuite à partir de {formatPrice(50000)} d'achats
                  </p>
                )}
              </div>

              <div className="border-t border-charcoal-100 mt-4 pt-4">
                <div className="flex justify-between font-body">
                  <span className="font-bold text-charcoal-800 text-base">Total</span>
                  <span className="font-bold text-orange-600 text-xl">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <Link to="/commande" className="btn-primary w-full justify-center mt-5 text-sm">
                Passer la commande
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Payment methods */}
              <div className="mt-4 pt-4 border-t border-charcoal-100">
                <p className="text-xs text-charcoal-400 font-body text-center mb-2">Paiement sécurisé</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {['MTN Money', 'Orange Money', 'À la livraison'].map((m) => (
                    <span key={m} className="bg-charcoal-50 text-charcoal-500 text-[10px] font-body 
                                             font-semibold px-2 py-0.5 rounded">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
