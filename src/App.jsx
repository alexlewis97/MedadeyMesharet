import React, { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import WorldScreen from './screens/WorldScreen.jsx'
import MetricScreen from './screens/MetricScreen.jsx'

export default function App() {
  // view: { type: 'home' | 'world' | 'metric', world, division, unit }
  const [view, setView] = useState({ type: 'home' })

  const activeNav = view.type === 'home' ? '__home' : view.world

  function selectNav(key) {
    if (key === '__home') setView({ type: 'home' })
    else setView({ type: 'world', world: key })
  }

  function openWorld(world) {
    setView({ type: 'world', world })
  }

  // נפתח מסך 3 רק עבור יחידה ספציפית
  function openUnit(world, division, unit) {
    setView({ type: 'metric', world, division, unit })
  }

  return (
    <div className="app">
      <Sidebar active={activeNav} onSelect={selectNav} />
      <main className="main">
        <TopBar />
        {view.type === 'home' && <HomeScreen onOpenWorld={openWorld} />}
        {view.type === 'world' && (
          <WorldScreen world={view.world} onOpenUnit={openUnit} />
        )}
        {view.type === 'metric' && (
          <MetricScreen
            world={view.world}
            division={view.division}
            unit={view.unit}
            onBack={() => setView({ type: 'world', world: view.world })}
          />
        )}
      </main>
    </div>
  )
}
