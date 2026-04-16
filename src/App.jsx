import React from 'react'
import Hero from './components/Hero'
import About from './components/About'

const App = () => {
	return (
		<main className="relative min-h-screen w-screen overflow-x-hidden">
			<Hero></Hero>
			<About></About>
		</main>
	)
}

export default App
