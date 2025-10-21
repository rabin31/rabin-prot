import AboutMe from '@/components/AboutMe'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const AboutPage = () => {
  return (
    <div className='relative w-full min-h-screen'>
      <div className='absolute top-0 left-0 w-full z-20'>
        <Navbar/>
      </div>
      <AboutMe />
      <Footer />
    </div>
  )
}

export default AboutPage