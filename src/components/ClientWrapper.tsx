'use client'
import Preloader from './Preloader'
import { useState, useEffect } from 'react'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    // Check if we're on the client side
    const preloaderShown = sessionStorage.getItem('preloaderShown')
    
    if (preloaderShown === 'true') {
      setShowPreloader(false)
    } else {
      setShowPreloader(true)
    }
  }, [])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
    sessionStorage.setItem('preloaderShown', 'true')
  }

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {!showPreloader && children}
    </>
  )
}