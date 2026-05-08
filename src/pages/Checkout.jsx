import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { formatPrice } from '../data/products'

const ARRONDISSEMENTS = [
  'Yaoundé I',
  'Yaoundé II',
  'Yaoundé III',
  'Yaoundé IV',
  'Yaoundé V',
  'Yaoundé VI',
  'Yaoundé VII',
]

const PAYMENT_METHODS = [
  { id: 'mtn',      label: 'MTN Mobile Money',      icon: '📱', desc: 'Paiement via MTN MoMo' },
  { id: 'orange',   label: 'Orange Money',           icon: '🟠', desc: 'Paiement via Orange Money' },
  { id: 'livraison',label: 'Paiement à la livraison',icon: '🤝', desc: 'Payez à la réception' },
]

const emptyForm = {
  nom: '', prenom: '', telephone: '', email: '',
  quartier: '', arrondissement: '', ville: 'Yaoundé', pays: 'Cameroun',
  notes: '', paiement: 'livraison',
}

export default function Checkout() {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [orderRef, setOrderRef] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const deliveryFee = totalPrice >= 50000 ? 0 : 3000
  const grandTotal  = totalPrice + deliveryFee

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-cream pt-16 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="font-display text-4xl text-charcoal-800 tracking-wide mb-3">Panier vide</h1>
          <p className="font-body text-charcoal-500 mb-6">
            Ajoutez des produits à votre panier avant de commander.
          </p>
          <Link to="/boutique" className="btn-primary">Aller à la boutique</Link>
        </div>
      </div>
    )
  }

  const validate = () => {
    const e = {}
    if (!form.nom.trim())       e.nom       = 'Nom requis'
    if (!form.prenom.trim())    e.prenom    = 'Prénom requis'
    if (!form.telephone.trim()) e.telephone = 'Numéro de téléphone requis'
    else if (!/^(\+?237)?[0-9]{8,9}$/.test(form.telephone.replace(/\s/g, '')))
      e.telephone = 'Numéro invalide (ex: +237 699 123 456)'
    if (!form.quartier.trim())       e.quartier       = 'Quartier requis'
    if (!form.arrondissement)        e.arrondissement = 'Arrondissement requis'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => { const c = {...er}; delete c[field]; return c })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))
    const ref = `SCM-${Date.now().toString(36).toUpperCase()}`
    setOrderRef(ref)
    clearCart()
    setSuccess(true)
    setSubmitting(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Success Screen ────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-cream pt-16 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl card-shadow p-10 max-w-md w-full text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-3xl text-charcoal-800 tracking-wide mb-2">
            Commande confirmée !
          </h1>
          <p className="font-body text-charcoal-500 text-sm mb-4">
            Merci pour votre commande. Notre équipe vous contactera sous peu.
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
            <p className="text-xs font-body text-charcoal-500 mb-0.5">Numéro de commande</p>
            <p className="font-body font-bold text-orange-600 text-lg tracking-widest">{orderRef}</p>
          </div>
          <div className="space-y-2 text-sm font-body text-charcoal-600 mb-8">
            <p>📞 Nous vous appellerons au <strong>{form.telephone || 'votre numéro'}</strong></p>
            <p>📍 Livraison : {form.quartier}, {form.arrondissement}</p>
            <p>💳 Paiement : {PAYMENT_METHODS.find((p) => p.id === form.paiement)?.label}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="btn-secondary text-sm">Accueil</Link>
            <Link to="/boutique" className="btn-primary text-sm">
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Checkout Form ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Header */}
      <div className="bg-charcoal-800 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-5xl text-white tracking-wide">Commander</h1>
          <p className="font-body text-charcoal-400 mt-1">
            {totalItems} article{totalItems > 1 ? 's' : ''} · {formatPrice(grandTotal)}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal info */}
              <div className="bg-white rounded-xl card-shadow p-6">
                <h2 className="font-display text-xl text-charcoal-800 tracking-wide mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full text-sm flex items-center justify-center font-body font-bold">1</span>
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Nom <span className="text-red-500">*</span></label>
                    <input type="text" value={form.nom} onChange={handleChange('nom')}
                      placeholder="DUPONT" className={`form-input ${errors.nom ? 'border-red-400 focus:ring-red-400' : ''}`} />
                    {errors.nom && <p className="text-red-500 text-xs mt-1 font-body">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className="form-label">Prénom <span className="text-red-500">*</span></label>
                    <input type="text" value={form.prenom} onChange={handleChange('prenom')}
                      placeholder="Jean" className={`form-input ${errors.prenom ? 'border-red-400 focus:ring-red-400' : ''}`} />
                    {errors.prenom && <p className="text-red-500 text-xs mt-1 font-body">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label className="form-label">Téléphone <span className="text-red-500">*</span></label>
                    <input type="tel" value={form.telephone} onChange={handleChange('telephone')}
                      placeholder="+237 699 123 456"
                      className={`form-input ${errors.telephone ? 'border-red-400 focus:ring-red-400' : ''}`} />
                    {errors.telephone && <p className="text-red-500 text-xs mt-1 font-body">{errors.telephone}</p>}
                  </div>
                  <div>
                    <label className="form-label">Email (optionnel)</label>
                    <input type="email" value={form.email} onChange={handleChange('email')}
                      placeholder="jean@exemple.cm" className="form-input" />
                  </div>
                </div>
              </div>

              {/* Delivery address */}
              <div className="bg-white rounded-xl card-shadow p-6">
                <h2 className="font-display text-xl text-charcoal-800 tracking-wide mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full text-sm flex items-center justify-center font-body font-bold">2</span>
                  Adresse de livraison
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="form-label">Quartier / Rue <span className="text-red-500">*</span></label>
                    <input type="text" value={form.quartier} onChange={handleChange('quartier')}
                      placeholder="Ex: Melen, Bastos, Omnisport..."
                      className={`form-input ${errors.quartier ? 'border-red-400 focus:ring-red-400' : ''}`} />
                    {errors.quartier && <p className="text-red-500 text-xs mt-1 font-body">{errors.quartier}</p>}
                  </div>
                  <div>
                    <label className="form-label">Arrondissement <span className="text-red-500">*</span></label>
                    <select value={form.arrondissement} onChange={handleChange('arrondissement')}
                      className={`form-input ${errors.arrondissement ? 'border-red-400 focus:ring-red-400' : ''}`}>
                      <option value="">Sélectionner...</option>
                      {ARRONDISSEMENTS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    {errors.arrondissement && <p className="text-red-500 text-xs mt-1 font-body">{errors.arrondissement}</p>}
                  </div>
                  <div>
                    <label className="form-label">Ville</label>
                    <input type="text" value={form.ville} readOnly
                      className="form-input bg-charcoal-50 text-charcoal-500 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="form-label">Pays</label>
                    <input type="text" value={form.pays} readOnly
                      className="form-input bg-charcoal-50 text-charcoal-500 cursor-not-allowed" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="form-label">Instructions de livraison (optionnel)</label>
                    <textarea value={form.notes} onChange={handleChange('notes')}
                      placeholder="Exemple: Bâtiment rouge, 2e étage, sonner 2 fois..."
                      rows={3}
                      className="form-input resize-none" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl card-shadow p-6">
                <h2 className="font-display text-xl text-charcoal-800 tracking-wide mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full text-sm flex items-center justify-center font-body font-bold">3</span>
                  Mode de paiement
                </h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((m) => (
                    <label key={m.id}
                      className={`flex items-center gap-4 border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        form.paiement === m.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-charcoal-200 hover:border-orange-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paiement"
                        value={m.id}
                        checked={form.paiement === m.id}
                        onChange={handleChange('paiement')}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <div className="font-body font-semibold text-charcoal-800 text-sm">{m.label}</div>
                        <div className="font-body text-charcoal-500 text-xs">{m.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl card-shadow p-6 sticky top-20">
                <h2 className="font-display text-xl text-charcoal-800 tracking-wide mb-4">
                  Ma commande
                </h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.name}
                        className="w-12 h-12 object-cover rounded bg-charcoal-50 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs text-charcoal-700 truncate">{item.name}</p>
                        <p className="text-xs text-charcoal-400 font-body">Qté: {item.quantity}</p>
                      </div>
                      <span className="font-body font-semibold text-charcoal-800 text-xs flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-charcoal-100 pt-3 space-y-2 text-sm font-body">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Sous-total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Livraison</span>
                    <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                      {deliveryFee === 0 ? 'GRATUITE' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-charcoal-100">
                    <span className="text-charcoal-800">Total</span>
                    <span className="text-orange-600">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center mt-5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Traitement...
                    </>
                  ) : (
                    <>
                      Confirmer la commande
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-charcoal-400 font-body text-center mt-3">
                  En commandant, vous acceptez nos conditions générales de vente.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
