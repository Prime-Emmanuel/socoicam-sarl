import { useState } from 'react'

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Notre adresse',
    lines: ['Quartier Melen, Avenue des Cocotiers', 'Yaoundé III, Cameroun'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Téléphone',
    lines: ['+237 699 123 456', '+237 677 456 789'],
    links: ['tel:+237699123456', 'tel:+237677456789'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email',
    lines: ['contact@socoicam.cm', 'vente@socoicam.cm'],
    links: ['mailto:contact@socoicam.cm', 'mailto:vente@socoicam.cm'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Horaires',
    lines: ['Lun – Ven : 07h30 – 18h00', 'Samedi : 08h00 – 17h00', 'Dimanche : Fermé'],
  },
]

export default function Contact() {
  const [form, setForm]       = useState({ nom: '', email: '', sujet: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.nom.trim())     e.nom     = 'Nom requis'
    if (!form.sujet.trim())   e.sujet   = 'Sujet requis'
    if (!form.message.trim()) e.message = 'Message requis'
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
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSent(true)
    setSending(false)
  }

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Hero */}
      <div className="bg-charcoal-800 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-orange-400 text-xs font-body font-semibold uppercase tracking-[0.25em] mb-3">
            Contactez-nous
          </div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wide mb-4">Contact</h1>
          <p className="font-body text-charcoal-300 text-lg max-w-xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions sur nos produits et services.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info + Map */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map(({ icon, title, lines, links }) => (
              <div key={title} className="bg-white rounded-xl card-shadow p-5 flex gap-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <h3 className="font-body font-semibold text-charcoal-800 text-sm mb-1">{title}</h3>
                  {lines.map((line, i) => (
                    links?.[i] ? (
                      <a key={i} href={links[i]}
                        className="block font-body text-sm text-charcoal-600 hover:text-orange-600 transition-colors">
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="font-body text-sm text-charcoal-600">{line}</p>
                    )
                  ))}
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="bg-white rounded-xl card-shadow overflow-hidden">
              <div className="relative h-56 bg-charcoal-100">
                {/* Styled map placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-100 to-charcoal-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <p className="font-body font-semibold text-charcoal-600 text-sm">SOCOICAM SARL</p>
                    <p className="font-body text-charcoal-400 text-xs">Melen, Yaoundé III</p>
                    <a
                      href="https://maps.google.com/?q=Melen+Yaounde+Cameroun"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs font-body font-semibold text-orange-600 
                                 border border-orange-300 rounded px-3 py-1 hover:bg-orange-50 transition-colors"
                    >
                      Ouvrir dans Google Maps
                    </a>
                  </div>
                </div>
                {/* Grid overlay for map-like look */}
                <div className="absolute inset-0 opacity-10"
                  style={{backgroundImage: 'linear-gradient(#9CA3AF 1px, transparent 1px), linear-gradient(90deg, #9CA3AF 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl card-shadow p-8">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-charcoal-800 tracking-wide mb-2">
                    Message envoyé !
                  </h3>
                  <p className="font-body text-charcoal-500 text-sm mb-6">
                    Nous avons bien reçu votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ nom: '', email: '', sujet: '', message: '' }) }}
                    className="btn-secondary text-sm"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl text-charcoal-800 tracking-wide mb-1">
                    Envoyez-nous un message
                  </h2>
                  <p className="font-body text-charcoal-400 text-sm mb-6">
                    Réponse garantie sous 24h ouvrées.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Nom complet <span className="text-red-500">*</span></label>
                        <input type="text" value={form.nom} onChange={handleChange('nom')}
                          placeholder="Jean Dupont"
                          className={`form-input ${errors.nom ? 'border-red-400' : ''}`} />
                        {errors.nom && <p className="text-red-500 text-xs mt-1 font-body">{errors.nom}</p>}
                      </div>
                      <div>
                        <label className="form-label">Email</label>
                        <input type="email" value={form.email} onChange={handleChange('email')}
                          placeholder="jean@exemple.cm" className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Sujet <span className="text-red-500">*</span></label>
                      <input type="text" value={form.sujet} onChange={handleChange('sujet')}
                        placeholder="Ex: Demande de devis, disponibilité produit..."
                        className={`form-input ${errors.sujet ? 'border-red-400' : ''}`} />
                      {errors.sujet && <p className="text-red-500 text-xs mt-1 font-body">{errors.sujet}</p>}
                    </div>
                    <div>
                      <label className="form-label">Message <span className="text-red-500">*</span></label>
                      <textarea value={form.message} onChange={handleChange('message')}
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        className={`form-input resize-none ${errors.message ? 'border-red-400' : ''}`} />
                      {errors.message && <p className="text-red-500 text-xs mt-1 font-body">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
                      {sending ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Quick contact CTA */}
            <div className="mt-5 bg-orange-500 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4">
              <div className="text-3xl">📞</div>
              <div className="flex-1 text-center sm:text-left">
                <div className="font-body font-bold text-white">Besoin d'une réponse immédiate ?</div>
                <div className="font-body text-orange-100 text-sm">Appelez-nous directement</div>
              </div>
              <a href="tel:+237699123456"
                className="bg-white text-orange-600 font-body font-bold px-5 py-2.5 rounded 
                           hover:bg-orange-50 transition-colors text-sm flex-shrink-0">
                +237 699 123 456
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
