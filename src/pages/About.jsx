import { Link } from 'react-router-dom'

const values = [
  { icon: '🏗️', title: 'Construction', desc: 'Nous accompagnons vos projets du fondation à la toiture.' },
  { icon: '🤝', title: 'Confiance', desc: 'Partenaire fiable depuis 2008 pour des milliers de clients.' },
  { icon: '🌍', title: 'Local', desc: 'Entreprise camerounaise, ancrée dans le tissu économique de Yaoundé.' },
  { icon: '⚡', title: 'Réactivité', desc: 'Stock permanent, livraison rapide, service client disponible.' },
]

const team = [
  { name: 'Jean-Baptiste MFOU', role: 'Directeur Général', img: 'https://picsum.photos/seed/manager1/200/200' },
  { name: 'Marie-Claire NKOA',  role: 'Responsable Commercial', img: 'https://picsum.photos/seed/manager2/200/200' },
  { name: 'Paul ESSONO',        role: 'Responsable Technique', img: 'https://picsum.photos/seed/manager3/200/200' },
  { name: 'Sandrine ATEBA',     role: 'Service Client', img: 'https://picsum.photos/seed/manager4/200/200' },
]

const milestones = [
  { year: '2008', event: 'Création de SOCOICAM SARL à Yaoundé III' },
  { year: '2011', event: 'Ouverture du dépôt de stockage 1 200 m²' },
  { year: '2015', event: 'Extension au marché de l\'électricité et de la plomberie' },
  { year: '2018', event: 'Certification ISO fournisseurs partenaires' },
  { year: '2022', event: 'Lancement de la vente en ligne SOCOICAM' },
  { year: '2024', event: 'Plus de 10 000 clients fidèles' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Hero */}
      <div className="relative bg-charcoal-800 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=70"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-900/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="text-orange-400 text-xs font-body font-semibold uppercase tracking-[0.25em] mb-3">
            Notre histoire
          </div>
          <h1 className="font-display text-6xl md:text-7xl text-white tracking-wide mb-4">À propos</h1>
          <p className="font-body text-charcoal-300 text-lg max-w-2xl mx-auto">
            SOCOICAM SARL — bâtir la confiance depuis 2008, au cœur de Yaoundé.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-orange-500 text-xs font-body font-semibold uppercase tracking-[0.2em] mb-3">
                Qui sommes-nous
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-charcoal-800 tracking-wide mb-5">
                Votre quincaillerie<br />de référence
              </h2>
              <div className="space-y-4 font-body text-charcoal-600 text-base leading-relaxed">
                <p>
                  Fondée en 2008 à Yaoundé, <strong className="text-charcoal-800">SOCOICAM SARL</strong> est 
                  une société spécialisée dans la vente de matériaux de construction, d'outillage professionnel, 
                  et de fournitures pour le bâtiment.
                </p>
                <p>
                  Notre mission : offrir aux professionnels du BTP, aux artisans et aux particuliers de Yaoundé 
                  et ses environs un accès facile à des produits de qualité à des prix compétitifs, avec 
                  un service de conseil et de livraison rapide.
                </p>
                <p>
                  Avec plus de 500 références en stock permanent, nous couvrons tous les besoins de vos 
                  chantiers : outils, ciment, fer à béton, plomberie, électricité, peinture et équipements lourds.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Link to="/boutique" className="btn-primary">Voir nos produits</Link>
                <Link to="/contact"  className="btn-secondary">Nous contacter</Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1594814657589-6a7a4bfc5c56?w=700&q=80"
                alt="Notre magasin SOCOICAM"
                className="rounded-2xl w-full object-cover h-80 lg:h-96"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl card-shadow p-4 text-center">
                <div className="font-display text-3xl text-orange-600 tracking-wide">2008</div>
                <div className="font-body text-xs text-charcoal-500 font-semibold">Fondée à Yaoundé</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '15+',     label: 'Années d\'expérience' },
              { value: '500+',    label: 'Produits en stock' },
              { value: '10 000+',label: 'Clients satisfaits' },
              { value: '7',       label: 'Arrondissements desservis' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-4xl md:text-5xl text-white tracking-wide">{value}</div>
                <div className="font-body text-orange-100 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Nos valeurs</h2>
            <p className="section-subtitle">Ce qui guide chacune de nos actions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }, i) => (
              <div key={title}
                className={`bg-cream rounded-xl p-6 animate-fade-in-up stagger-${i + 1}`}>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-body font-bold text-charcoal-800 mb-2">{title}</h3>
                <p className="font-body text-charcoal-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Notre parcours</h2>
            <p className="section-subtitle">Les étapes clés de notre développement</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200" />
            <div className="space-y-8">
              {milestones.map(({ year, event }, i) => (
                <div key={year}
                  className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-shrink-0 pl-2 md:pl-0 md:w-1/2 flex md:justify-end md:pr-8">
                    <div className={`bg-white rounded-xl card-shadow p-4 max-w-xs ${i % 2 !== 0 ? 'md:ml-8' : ''}`}>
                      <div className="font-display text-2xl text-orange-600 tracking-wide">{year}</div>
                      <div className="font-body text-sm text-charcoal-700 mt-1">{event}</div>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-orange-500 rounded-full 
                                  -translate-x-1/2 mt-5 ring-2 ring-orange-200" />
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Notre équipe</h2>
            <p className="section-subtitle">Des experts à votre service</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, img }) => (
              <div key={name} className="bg-cream rounded-xl overflow-hidden card-shadow group">
                <div className="overflow-hidden">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-body font-bold text-charcoal-800 text-sm">{name}</h3>
                  <p className="font-body text-orange-600 text-xs mt-0.5 font-semibold">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal-800 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-4xl text-white tracking-wide mb-4">
            Travaillons ensemble
          </h2>
          <p className="font-body text-charcoal-400 mb-8">
            Que vous soyez entrepreneur, architecte ou particulier, SOCOICAM SARL est votre partenaire de confiance.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Nous contacter</Link>
            <Link to="/boutique" className="btn-secondary">Voir la boutique</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
