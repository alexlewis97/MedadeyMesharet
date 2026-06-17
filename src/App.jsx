import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import WorldScreen from './screens/WorldScreen.jsx'

export default function App() {
  // view: { type: 'home' | 'world', world }
  const [view, setView] = useState({ type: 'home' })
  // סינון עליון שמשפיע על כל הדף
  const [filters, setFilters] = useState({ division: null, period: 'רבעון אחרון', rank: 'כל הדרגות' })

  const activeNav = view.type === 'home' ? '__home' : view.world

  function selectNav(key) {
    if (key === '__home') setView({ type: 'home' })
    else setView({ type: 'world', world: key })
  }

  function openWorld(world) {
    setView({ type: 'world', world })
  }

  return (
    <div className="app">
      <Sidebar active={activeNav} onSelect={selectNav} />
      <main className="main">
        <TopBar filters={filters} onChange={setFilters} />
        {view.type === 'home' && (
          <HomeScreen onOpenWorld={openWorld} division={filters.division} />
        )}
        {view.type === 'world' && (
          <WorldScreen world={view.world} division={filters.division} />
        )}
      </main>
    </div>
  )
}
