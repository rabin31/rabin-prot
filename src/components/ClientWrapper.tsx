'use client'
import Preloader from './Preloader'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Always ensure scroll is enabled when component mounts/updates
    document.body.style.overflow = 'unset'
    
    // Check if this is the first time opening the website
    const isFirstVisit = !sessionStorage.getItem('websiteVisited')
    
    if (isFirstVisit) {
      // First time visiting the website - show preloader
      setShowPreloader(true)
      document.body.style.overflow = 'hidden'
      // Mark that user has visited the website
      sessionStorage.setItem('websiteVisited', 'true')
    } else {
      // Not first visit - skip preloader
      setShowPreloader(false)
      document.body.style.overflow = 'unset'
    }
  }, [pathname])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
    // Re-enable scroll when preloader completes
    document.body.style.overflow = 'unset'
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {!showPreloader && children}
    </>
  )
}