import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories, formatPrice } from '../data/products'
import ProductCard from '../components/ProductCard'

const SORT_OPTIONS = [
  { value: 'default',   label: 'Pertinence' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc',label: 'Prix décroissant' },
  { value: 'name-asc',  label: 'Nom A–Z' },
  { value: 'name-desc', label: 'Nom Z–A' },
]

const MAX_PRICE = 500000

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Filters
  const [selectedCats, setSelectedCats] = useState(() => {
    const cat = searchParams.get('cat')
    return cat ? [cat] : []
  })
  const [priceRange,  setPriceRange]  = useState([0, MAX_PRICE])
  const [sortBy,      setSortBy]      = useState('default')
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '')

  // Sync URL params → state on mount
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setSelectedCats([cat])
    const q = searchParams.get('q')
    if (q) setSearchQuery(q)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCat = (id) => {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSelectedCats([])
    setPriceRange([0, MAX_PRICE])
    setSortBy('default')
    setSearchQuery('')
    setSearchParams({})
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }

    // Category
    if (selectedCats.length > 0) {
      result = result.filter((p) => selectedCats.includes(p.category))
    }

    // Price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'name-asc':   result.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'name-desc':  result.sort((a, b) => b.name.localeCompare(a.name)); break
      default: break
    }

    return result
  }, [searchQuery, selectedCats, priceRange, sortBy])

  const hasFilters = selectedCats.length > 0 || priceRange[0] > 0 || priceRange[1] < MAX_PRICE || searchQuery.trim()

  const Sidebar = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="form-label">Rechercher</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ex: ciment, perceuse..."
          className="form-input text-sm"
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-body font-semibold text-charcoal-700 text-sm uppercase tracking-wider mb-3">
          Catégories
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length
            return (
              <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat.id)}
                  onChange={() => toggleCat(cat.id)}
                  className="w-4 h-4 rounded border-charcoal-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                />
                <span className="font-body text-sm text-charcoal-600 group-hover:text-charcoal-800 transition-colors flex-1">
                  {cat.icon} {cat.label}
                </span>
                <span className="text-xs text-charcoal-400">{count}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-body font-semibold text-charcoal-700 text-sm uppercase tracking-wider mb-3">
          Budget maximum
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={MAX_PRICE}
            step={5000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-xs text-charcoal-500 font-body">
            <span>0 XAF</span>
            <span className="font-semibold text-orange-600">{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full text-sm font-body font-semibold text-orange-600 border border-orange-300 
                     py-2 rounded hover:bg-orange-50 transition-colors"
        >
          Effacer les filtres
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-cream pt-16">
      {/* Page header */}
      <div className="bg-charcoal-800 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-orange-400 text-xs font-body font-semibold uppercase tracking-[0.2em] mb-2">
                Catalogue complet
              </div>
              <h1 className="font-display text-5xl md:text-6xl text-white tracking-wide">
                Notre Boutique
              </h1>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-charcoal-400 text-sm font-body">
              <span>{filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Mobile filter btn */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-charcoal-200 bg-white 
                       text-charcoal-700 text-sm font-body font-medium px-4 py-2.5 rounded hover:border-orange-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtres {hasFilters && <span className="bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{selectedCats.length + (searchQuery ? 1 : 0)}</span>}
          </button>

          {/* Active filter chips */}
          {selectedCats.map((catId) => {
            const cat = categories.find((c) => c.id === catId)
            return (
              <button key={catId}
                onClick={() => toggleCat(catId)}
                className="flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-body font-semibold 
                           px-2.5 py-1.5 rounded-full hover:bg-orange-200 transition-colors">
                {cat?.label}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )
          })}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="flex items-center gap-1.5 bg-charcoal-100 text-charcoal-700 text-xs font-body font-semibold 
                         px-2.5 py-1.5 rounded-full hover:bg-charcoal-200 transition-colors">
              "{searchQuery}"
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Result count */}
          <span className="text-sm text-charcoal-500 font-body hidden sm:block">
            {filteredProducts.length} résultat{filteredProducts.length !== 1 ? 's' : ''}
          </span>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-charcoal-200 bg-white text-charcoal-700 text-sm font-body 
                       px-3 py-2.5 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-5 card-shadow sticky top-20">
              <Sidebar />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-body font-semibold text-charcoal-700 text-lg mb-2">Aucun produit trouvé</h3>
                <p className="font-body text-charcoal-400 text-sm mb-6">
                  Essayez de modifier vos critères de recherche.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Effacer les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 p-6 overflow-y-auto shadow-2xl animate-slide-down">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-body font-semibold text-charcoal-800 text-lg">Filtres</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-charcoal-500 hover:text-charcoal-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar />
          </div>
        </>
      )}
    </div>
  )
}
