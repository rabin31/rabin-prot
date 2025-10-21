'use client'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Works from '@/components/Works'
import React from 'react'

const page = () => {
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

export default page