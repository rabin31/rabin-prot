'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const Page = () => {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const logoRefs = useRef<(HTMLDivElement | null)[]>([])

  const logos = [
    {
      id: 1,
      img: '/logothumb.png',
      title: 'Overview',
      description:
        'A collection of my recent logo designs — each crafted with creativity, storytelling, and balance. All designed using Adobe Illustrator and Photoshop to represent brand identity and visual strategy for various clients.'
    },
    {
      id: 2,
      img: '/logo/logo1.png',
      title: 'Pixalare Agency',
      description:
        'Logo design for Pixalare Agency — a creative design and branding agency based in Nepal. The mark symbolizes digital creativity, collaboration, and innovative design thinking, representing the agency&apos;s modern and bold identity.'
    },
    {
      id: 3,
      img: '/logo/logo2.png',
      title: 'Leiertakerbevis.no',
      description:
        'Logo created for a Norwegian client — Leiertakerbevis.no, a platform focused on house rental verification and tenant trust. The clean and minimal design reflects professionalism, safety, and reliability in the housing market.'
    },
    {
      id: 4,
      img: '/logo/logo3.png',
      title: 'Paila Treks',
      description:
        'A logo design representing trekking and exploration in Nepal. Inspired by mountain silhouettes and natural colors, it captures the adventurous spirit and authenticity of Nepal&apos;s travel and trekking experiences.'
    },
    {
      id: 5,
      img: '/logo/logo4.png',
      title: 'Moomin Fits',
      description:
        'Logo design for Moomin Fits — an online clothing store based in Nepal. The concept blends simplicity and modern streetwear aesthetics to reflect a young, trendy, and confident brand identity.'
    },
    {
      id: 6,
      img: '/logo/logo5.png',
      title: 'Uni Bytes',
      description:
        'An educational platform logo made for BCA students in Nepal. The design emphasizes learning, technology, and community — combining academic symbolism with a digital-inspired modern look.'
    },
    {
      id: 7,
      img: '/logo/logo6.png',
      title: 'DB3 Info Tech',
      description:
        'Logo design for DB3 Info Tech — an IT solutions shop in Nepal. The identity reflects innovation, trust, and technology, using geometric structure and gradient tones to represent digital growth and connectivity.'
    }
  ]

  useEffect(() => {
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

    logoRefs.current.forEach((ref) => {
      if (ref) {
        const img = ref.querySelector('.logo-img')
        const content = ref.querySelector('.logo-content')

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

        gsap.fromTo(
          content,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 75%',
              end: 'top 45%',
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
          Logos.
        </h1>
        <p
          ref={descRef}
          className='text-[#4C6763] text-base sm:text-lg font-matter font-medium text-center mt-4 px-4'
        >
          A showcase of creative logos crafted with precision, strategy, and storytelling.
        </p>

        <div className='mt-12 sm:mt-14 md:mt-16'>
          {logos.map((logo, index) => (
            <div
              key={logo.id}
              ref={el => { logoRefs.current[index] = el }}
              className=''
            >
              <div className='px-2 sm:px-4'>
                <div className='logo-img h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] w-full rounded-2xl overflow-hidden'>
                  <Image 
                    src={logo.img} 
                    alt={logo.title} 
                    width={1200} 
                    height={800}
                    className='object-cover h-full w-full'
                    priority={index === 0} // First image loads with priority
                    loading={index === 0 ? 'eager' : 'lazy'} // First image eager, others lazy
                    placeholder='blur'
                    blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                    sizes='(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px'
                  />
                </div>
              </div>

              <div className='logo-content h-auto pl-4 sm:pl-12 md:pl-16 lg:pl-24 xl:pl-92 flex flex-col items-start space-y-3 sm:space-y-4 py-8 sm:py-10 md:py-12'>
                <h1 className='text-[#025A4E] font-acorn font-semibold text-xl sm:text-2xl md:text-3xl text-left'>
                  {logo.title}
                </h1>
                <p className='font-matter font-medium text-sm sm:text-base md:text-lg text-[#4F6965] max-w-full sm:max-w-md md:max-w-lg pr-4 sm:pr-0'>
                  {logo.description}
                </p>
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