import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../store/CartContext'

const navLinks = [
  { to: '/',            label: 'Accueil',   exact: true },
  { to: '/boutique',    label: 'Boutique'  },
  { to: '/a-propos',    label: 'À propos'  },
  { to: '/contact',     label: 'Contact'   },
]

export default function Navbar() {
  const { totalItems } = useCart()
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/boutique?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-charcoal-800/95 backdrop-blur-md shadow-lg'
            : 'bg-charcoal-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={() => setMenuOpen(false)}>
              <div className="w-9 h-9 bg-orange-500 rounded flex items-center justify-center">
                <span className="font-display text-white text-lg tracking-wide">SC</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-white text-xl tracking-widest">SOCOICAM</span>
                <span className="block text-orange-400 text-[10px] font-body font-semibold tracking-[0.2em] uppercase -mt-1">
                  SARL
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, exact }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `font-body font-medium text-sm px-4 py-2 rounded transition-all duration-200 ${
                      isActive
                        ? 'text-orange-400 bg-orange-500/10'
                        : 'text-charcoal-200 hover:text-orange-400 hover:bg-white/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-charcoal-300 hover:text-orange-400 transition-colors rounded"
                aria-label="Rechercher"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart */}
              <Link
                to="/panier"
                className="relative p-2 text-charcoal-300 hover:text-orange-400 transition-colors rounded"
                aria-label={`Panier (${totalItems} articles)`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-orange-500 text-white 
                                   text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-scale-in">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-charcoal-300 hover:text-orange-400 transition-colors rounded"
                aria-label="Menu"
                aria-expanded={menuOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar (expands below header) */}
          {searchOpen && (
            <div className="pb-3 animate-slide-down">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un produit..."
                  className="flex-1 bg-charcoal-700 text-white placeholder-charcoal-400 px-4 py-2 rounded 
                             text-sm font-body focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoFocus
                />
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-body font-semibold hover:bg-orange-600 transition-colors">
                  Chercher
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden bg-charcoal-800 border-t border-charcoal-700
                    transform transition-transform duration-300 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-body font-medium px-4 py-3 rounded transition-all duration-200 ${
                  isActive
                    ? 'text-orange-400 bg-orange-500/10'
                    : 'text-charcoal-200 hover:text-orange-400 hover:bg-white/5'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="border-t border-charcoal-700 mt-2 pt-2">
            <Link
              to="/panier"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 font-body font-medium px-4 py-3 text-charcoal-200 hover:text-orange-400 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Panier {totalItems > 0 && <span className="ml-auto bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{totalItems}</span>}
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
