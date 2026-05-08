import { Link } from 'react-router-dom'

const footerLinks = {
  'Navigation': [
    { to: '/',            label: 'Accueil' },
    { to: '/boutique',    label: 'Boutique' },
    { to: '/a-propos',    label: 'À propos' },
    { to: '/contact',     label: 'Contact' },
  ],
  'Catégories': [
    { to: '/boutique?cat=outils',      label: 'Outils' },
    { to: '/boutique?cat=materiaux',   label: 'Matériaux' },
    { to: '/boutique?cat=plomberie',   label: 'Plomberie' },
    { to: '/boutique?cat=electricite', label: 'Électricité' },
    { to: '/boutique?cat=peinture',    label: 'Peinture' },
    { to: '/boutique?cat=equipements', label: 'Équipements' },
  ],
  'Mon compte': [
    { to: '/panier',   label: 'Mon panier' },
    { to: '/commande', label: 'Commander' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-800 text-charcoal-300">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                <span className="font-display text-white text-xl">SC</span>
              </div>
              <div>
                <span className="font-display text-white text-2xl tracking-widest">SOCOICAM</span>
                <span className="block text-orange-400 text-[10px] font-body font-semibold tracking-[0.2em] uppercase -mt-1">
                  SARL
                </span>
              </div>
            </Link>
            <p className="font-body text-sm leading-relaxed mb-5 text-charcoal-400 max-w-xs">
              Votre quincaillerie de confiance à Yaoundé depuis plus de 15 ans. 
              Matériaux de construction, outils professionnels et équipements de chantier.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Quartier Melen, Avenue des Cocotiers<br />Yaoundé III, Cameroun</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+237699123456" className="hover:text-orange-400 transition-colors">
                  +237 699 123 456
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@socoicam.cm" className="hover:text-orange-400 transition-colors">
                  contact@socoicam.cm
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-body font-semibold text-white text-sm uppercase tracking-widest mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="font-body text-sm text-charcoal-400 hover:text-orange-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Horaires */}
        <div className="mt-10 pt-8 border-t border-charcoal-700 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-body font-semibold text-white text-sm uppercase tracking-widest mb-3">
              Horaires d'ouverture
            </h3>
            <div className="space-y-1 text-sm text-charcoal-400">
              <div className="flex justify-between max-w-xs">
                <span>Lundi – Vendredi</span>
                <span className="text-charcoal-200">07h30 – 18h00</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Samedi</span>
                <span className="text-charcoal-200">08h00 – 17h00</span>
              </div>
              <div className="flex justify-between max-w-xs">
                <span>Dimanche</span>
                <span className="text-red-400">Fermé</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-body font-semibold text-white text-sm uppercase tracking-widest mb-3">
              Paiement accepté
            </h3>
            <div className="flex flex-wrap gap-2">
              {['MTN Mobile Money', 'Orange Money', 'Paiement à la livraison', 'Virement bancaire'].map((m) => (
                <span key={m} className="bg-charcoal-700 text-charcoal-300 text-xs font-body px-2.5 py-1 rounded">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-charcoal-700 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-charcoal-500 font-body">
            © {year} SOCOICAM SARL. Tous droits réservés.
          </p>
          <p className="text-xs text-charcoal-600 font-body">
            RC/YAO/2008/B/1234 · Yaoundé, Cameroun
          </p>
        </div>
      </div>
    </footer>
  )
}
