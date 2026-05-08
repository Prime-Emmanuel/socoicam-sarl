import { Link } from 'react-router-dom'
import { getFeatured, categories, formatPrice } from '../data/products'
import ProductCard from '../components/ProductCard'

const usp = [
  { icon: '🏆', title: 'Qualité garantie', desc: 'Produits certifiés de marques reconnues' },
  { icon: '🚚', title: 'Livraison Yaoundé', desc: 'Livraison rapide dans tous les quartiers' },
  { icon: '💰', title: 'Prix compétitifs', desc: 'Meilleurs prix du marché en CFA' },
  { icon: '🔧', title: 'Conseil expert', desc: 'Notre équipe technique vous guide' },
  { icon: '📦', title: 'Grand stock', desc: '60+ références toujours disponibles' },
]

const stats = [
  { value: '15+', label: 'Années d\'expérience' },
  { value: '500+', label: 'Produits référencés' },
  { value: '10 000+', label: 'Clients satisfaits' },
  { value: '7', label: 'Arrondissements livrés' },
]

export default function Home() {
  const featured = getFeatured().slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden clip-diagonal bg-charcoal-800">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80"
            alt="Chantier de construction"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/90 via-charcoal-900/70 to-transparent" />
        </div>

        {/* Decorative orange stripe */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 z-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 
                            text-orange-400 text-xs font-body font-semibold uppercase tracking-[0.2em] 
                            px-3 py-1.5 rounded-full mb-6 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Yaoundé, Cameroun
            </div>

            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-wide 
                           mb-4 animate-fade-in-up">
              SOCOICAM
              <span className="block text-orange-500">SARL</span>
            </h1>

            <p className="font-body text-charcoal-300 text-lg md:text-xl leading-relaxed mb-8 
                          animate-fade-in-up stagger-2">
              Votre partenaire de confiance pour la construction.
              <br className="hidden md:block" />
              Outils, matériaux, plomberie, électricité — tout sous un même toit.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-3">
              <Link to="/boutique" className="btn-primary text-base">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Voir la boutique
              </Link>
              <Link to="/contact" className="btn-secondary text-base">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-orange-500/10 backdrop-blur-sm border-t border-orange-500/20 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl text-orange-400 tracking-wide">{value}</div>
                <div className="font-body text-xs text-charcoal-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos catégories</h2>
            <p className="section-subtitle">Tout ce qu'il faut pour votre chantier</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/boutique?cat=${cat.id}`}
                className={`group flex flex-col items-center gap-3 bg-white rounded-xl p-5 
                           card-shadow card-shadow-hover transition-all duration-300 hover:-translate-y-1
                           animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <span className="font-body font-semibold text-charcoal-700 text-sm text-center 
                                 group-hover:text-orange-600 transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title">Produits vedettes</h2>
              <p className="section-subtitle">Sélection de nos meilleurs articles</p>
            </div>
            <Link to="/boutique" className="btn-secondary hidden md:inline-flex">
              Tout voir
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
              />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link to="/boutique" className="btn-primary">
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US BANNER ────────────────────────────────────── */}
      <section className="py-20 bg-charcoal-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'repeating-linear-gradient(45deg, #E8620A 0, #E8620A 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px'}} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-4">
                Pourquoi choisir<br />
                <span className="text-orange-500">SOCOICAM ?</span>
              </h2>
              <p className="font-body text-charcoal-400 text-base leading-relaxed mb-8">
                Depuis 2008, nous accompagnons les professionnels du BTP et les particuliers de Yaoundé 
                avec des produits de qualité et un service de proximité.
              </p>
              <div className="space-y-4">
                {usp.map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center 
                                    flex-shrink-0 text-lg">
                      {icon}
                    </div>
                    <div>
                      <div className="font-body font-semibold text-white text-sm">{title}</div>
                      <div className="font-body text-charcoal-400 text-sm mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80"
                alt="Notre magasin"
                className="w-full rounded-2xl object-cover h-80 lg:h-96"
              />
              <div className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-4 rounded-xl card-shadow">
                <div className="font-display text-3xl tracking-wide">15+</div>
                <div className="font-body text-xs font-semibold">Ans d'expérience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY INFO ────────────────────────────────────── */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Lundi – Samedi',
                desc: 'Ouvert 7h30 à 18h00',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Livraison 24–48h',
                desc: 'Dans tout Yaoundé et environ',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                title: 'MTN & Orange Money',
                desc: 'Paiement mobile sécurisé',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title}
                className="flex items-center gap-4 bg-white rounded-xl p-6 card-shadow">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <div className="font-body font-semibold text-charcoal-800">{title}</div>
                  <div className="font-body text-sm text-charcoal-400">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="bg-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-wide mb-4">
            Prêt à démarrer votre chantier ?
          </h2>
          <p className="font-body text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Parcourez notre catalogue complet et commandez directement en ligne. 
            Livraison rapide à Yaoundé.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/boutique"
              className="bg-white text-orange-600 font-body font-bold px-8 py-3.5 rounded 
                         hover:bg-orange-50 transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Commander maintenant
            </Link>
            <Link to="/contact"
              className="border-2 border-white text-white font-body font-bold px-8 py-3.5 rounded 
                         hover:bg-white hover:text-orange-600 transition-all inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +237 699 123 456
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
