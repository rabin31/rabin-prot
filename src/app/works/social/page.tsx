'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Page = () => {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const logoRefs = useRef<(HTMLDivElement | null)[]>([])

  const logos = [
    {
        id: 1,
        img: '/social/social1.png',
        title: 'Overview',
        description: 'Help Scout Docs is a knowledge base tool originally designed for small businesses. In 2021, after a period of dormancy, the product was revived with a newly dedicated team. The goal was to make Docs a product that could scale to large enterprises, while still being easy to use for small businesses. I joined as the teams product designer, focusing on revamping the article composer experience.'
    },
    {
        id: 2,
        img: '/social/social2.png',
        title: 'Pixalare Agency',
        description: 'Help Scout Docs is a knowledge base tool originally designed for small businesses. In 2021, after a period of dormancy, the product was revived with a newly dedicated team. The goal was to make Docs a product that could scale to large enterprises, while still being easy to use for small businesses. I joined as the teams product designer, focusing on revamping the article composer experience.'
    },
    {
        id: 3,
        img: '/social/social3.png',
        title: 'Leiertakerbevis.no',
        description: 'Help Scout Docs is a knowledge base tool originally designed for small businesses. In 2021, after a period of dormancy, the product was revived with a newly dedicated team. The goal was to make Docs a product that could scale to large enterprises, while still being easy to use for small businesses. I joined as the teams product designer, focusing on revamping the article composer experience.'
    },
    {
        id: 4,
        img: '/social/social4.png',
        title: 'Paila Treks',
        description: 'Help Scout Docs is a knowledge base tool originally designed for small businesses. In 2021, after a period of dormancy, the product was revived with a newly dedicated team. The goal was to make Docs a product that could scale to large enterprises, while still being easy to use for small businesses. I joined as the teams product designer, focusing on revamping the article composer experience.'
    },
    {
        id: 5,
        img: '/social/social5.png',
        title: 'Moomin Fits',
        description: 'Help Scout Docs is a knowledge base tool originally designed for small businesses. In 2021, after a period of dormancy, the product was revived with a newly dedicated team. The goal was to make Docs a product that could scale to large enterprises, while still being easy to use for small businesses. I joined as the teams product designer, focusing on revamping the article composer experience.'
    },
  ]

  useEffect(() => {
    // Hero intro animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
    )

    // Logo items scroll animations
    logoRefs.current.forEach((ref) => {
      if (ref) {
        const img = ref.querySelector('.logo-img')

        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.95, y: 60 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className='relative w-full min-h-screen bg-[#E8F5E3]'>
      <div className='absolute top-0 left-0 w-full z-20'>
        <Navbar />
      </div>
      <div className='py-24 sm:py-28 md:py-32 lg:py-38 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto'>
        <h1 
          ref={titleRef}
          className='font-acorn font-semibold text-[#025A4E] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-center'
        >
          Ads.
        </h1>
        <p 
          ref={descRef}
          className='text-[#4C6763] text-base sm:text-lg font-matter font-medium text-center mt-4 px-4'
        >
          Some thoughts, reflections, & notes on design and development, along <br className='hidden sm:block' /> with some latest work in progress.
        </p>

        <div className='mt-12 sm:mt-14 md:mt-16'>
          {logos.map((logo, index) => (
            <div 
              key={logo.id} 
              ref={el => { logoRefs.current[index] = el }}
              className=''
            >
              <div className='px-2 sm:px-4'>
                <div className='logo-img h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-screen w-full rounded-2xl overflow-hidden'>
                  <img src={logo.img} alt={logo.title} className='object-cover h-full w-full' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Page