'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Add interface for the event parameter
interface MouseEvent {
  target: {
    classList: {
      contains: (className: string) => boolean;
    };
  };
}

const Page = () => {
  const [activePreview, setActivePreview] = useState<number | null>(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const webRefs = useRef<(HTMLDivElement | null)[]>([])

  const webs = [
    {
      id: 1,
      url: 'https://www.rabinthapa10.com.np',
      title: 'Old Portfolio',
      description:
        'A creative personal portfolio built with Next.js and GSAP, showcasing my design and development projects with smooth animations and modern aesthetics.',
    },
    {
      id: 2,
      url: 'https://pixalare.com',
      title: 'Pixalare Agency',
      description:
        'A digital agency website designed and developed for a creative studio in Nepal, built to present services, works, and client collaborations with a clean UI.',
    },
    {
      id: 3,
      url: 'https://bestjob.vercel.app/',
      title: 'Best Job',
      description:
        'A frontend job portal concept created using modern web tools, focused on finding internships and job listings with a simple and user-friendly layout.',
    },
    {
      id: 4,
      url: 'https://nm-society.org/',
      title: 'Nepal Mathematical Society',
      description:
        'Developed the frontend for the official NMS website, highlighting organization activities, research updates, and events in a professional layout.',
    },
    {
      id: 5,
      url: 'https://unibytes.xyz/',
      title: 'Uni Bytes',
      description:
        'An educational platform built with WordPress for BCA students, sharing learning resources, notes, and community updates.',
    },
    {
      id: 6,
      url: 'https://rabin31.github.io/Tic-Tac-Toe-Game/',
      title: 'Tic Tac Toe Game',
      description:
        'A simple web-based Tic Tac Toe game built using HTML, CSS, and JavaScript for fun and interactive gameplay.',
    },
    {
      id: 7,
      url: 'https://smc-omega.vercel.app/',
      title: 'SMC',
      description:
        'Frontend design and development for SMC College&apos;s official website with modern UI elements and responsive design.',
    },
    {
      id: 8,
      url: 'https://guffgaff.infinityfreeapp.com/',
      title: 'Guff Gaff',
      description:
        'A real-time chat application built in PHP with AJAX and MySQL as a 4th semester project, featuring private and group messaging.',
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

    webRefs.current.forEach((ref) => {
      if (ref) {
        const preview = ref.querySelector('.web-preview')
        const content = ref.querySelector('.web-content')

        gsap.fromTo(
          preview,
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

  const handlePreviewClick = (id: number) => setActivePreview(id)
  
  // Fixed: Replaced 'any' with proper React MouseEvent type
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('preview-overlay')) {
      setActivePreview(null)
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-[#E8F5E3]">
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      <div className="py-24 sm:py-28 md:py-32 lg:py-38 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <h1
          ref={titleRef}
          className="font-acorn font-semibold text-[#025A4E] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-center"
        >
          Web.
        </h1>
        <p
          ref={descRef}
          className="text-[#4C6763] text-base sm:text-lg font-matter font-medium text-center mt-4 px-4"
        >
          A showcase of websites I&apos;ve designed and developed web applications.
        </p>

        <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20 space-y-12 sm:space-y-16 md:space-y-20">
          {webs.map((web, index) => (
            <div key={web.id} ref={el => { webRefs.current[index] = el }}>
              {/* Website Preview */}
              <div className="px-2 sm:px-4">
                <div
                  onClick={() => handlePreviewClick(web.id)}
                  className="web-preview h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] w-full rounded-xl overflow-hidden shadow-lg border border-[#d4e8d0] bg-white cursor-pointer relative group"
                >
                  <iframe
                    src={web.url}
                    title={web.title}
                    className="w-full h-full pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-black/70 group-hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#025A4E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium">
                      Click to interact
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="web-content h-auto pl-4 sm:pl-12 md:pl-16 lg:pl-24 xl:pl-92 flex flex-col items-start space-y-3 sm:space-y-4 py-12 sm:py-14 md:py-16">
                <h1 className="text-[#025A4E] font-acorn font-semibold text-2xl sm:text-3xl text-left">
                  {web.title}
                </h1>
                <p className="font-matter font-medium text-base sm:text-lg text-[#4F6965] max-w-full sm:max-w-md md:max-w-lg pr-4 sm:pr-0">
                  {web.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {activePreview && (
        <div
          className="preview-overlay fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          onClick={handleClickOutside}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setActivePreview(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white text-[#025A4E] hover:bg-[#025A4E] hover:text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 font-bold text-lg sm:text-xl"
            >
              ×
            </button>
            <iframe
              src={webs.find(l => l.id === activePreview)?.url}
              title={webs.find(l => l.id === activePreview)?.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Page