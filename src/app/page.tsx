'use client'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Works from '@/components/Works'
import Preloader from '@/components/Preloader'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [showPreloader, setShowPreloader] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if this is the first time opening the website
    const isFirstVisit = !sessionStorage.getItem('websiteVisited')
    
    if (isFirstVisit) {
      // First visit - show preloader
      setShowPreloader(true)
      sessionStorage.setItem('websiteVisited', 'true')
    } else {
      // Not first visit - hide preloader immediately
      setShowPreloader(false)
    }
    
    setIsInitialized(true)
  }, [])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
  }

  // Don't render anything until we know whether to show preloader or not
  if (!isInitialized) {
    return null // or a loading spinner if you prefer
  }

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />
  }

  return (
    <div className='relative w-full min-h-screen'>
      <div className='absolute top-0 left-0 w-full z-20'>
        <Navbar/>
      </div>
      <Hero />
      <Works />
      <Footer />
    </div>
  )
}

export default Page