'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Category = 'design' | 'coding'

const Page = () => {
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const videoRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<Category>('design')
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null)

  const youtubeTutorials = [
    {
      id: 1,
      title: "Photoshop Workshop - Day 1 | Beginner's Guide",
      duration: '52:24',
      embedUrl: 'https://www.youtube.com/embed/6-eg3V4cdlQ',
      category: 'design' as const,
      thumbnail: 'https://img.youtube.com/vi/6-eg3V4cdlQ/maxresdefault.jpg'
    },
    {
      id: 2,
      title: "Photoshop Workshop - Day 2 | Mastering Selection Tools & Masking! 🎨✂️",
      duration: '46:51',
      embedUrl: 'https://www.youtube.com/embed/YF-7UZh_wC0',
      category: 'design' as const,
      thumbnail: 'https://img.youtube.com/vi/YF-7UZh_wC0/maxresdefault.jpg'
    },
    {
      id: 3,
      title: "Photoshop Workshop - Day 3 | Mastering Color Correction & Adjustments! 🎨✨",
      duration: '57:45',
      embedUrl: 'https://www.youtube.com/embed/aCbcuGDbL_0',
      category: 'design' as const,
      thumbnail: 'https://img.youtube.com/vi/aCbcuGDbL_0/maxresdefault.jpg'
    }
  ]

  const filteredTutorials = youtubeTutorials.filter(tutorial => 
    tutorial.category === activeCategory
  )

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

    // Video items scroll animations
    videoRefs.current.forEach((ref) => {
      if (ref) {
        const card = ref.querySelector('.video-card')

        gsap.fromTo(
          card,
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

    // Refresh ScrollTrigger when category changes
    ScrollTrigger.refresh()

    // Prevent body scroll when video modal is open
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideo, activeCategory])

  const getVideoId = (embedUrl: string) => {
    const match = embedUrl.match(/embed\/([^?]+)/)
    return match ? match[1] : ''
  }

  const CategoryButton = ({ category, label }: { category: Category, label: string }) => (
    <button
      onClick={() => setActiveCategory(category)}
      className={`px-8 py-3 rounded-full font-matter font-medium text-lg transition-all duration-300 border ${
        activeCategory === category
          ? 'bg-[#025A4E] text-white border-[#025A4E]'
          : 'bg-transparent text-[#025A4E] border-[#025A4E] hover:bg-[#025A4E] hover:text-white'
      }`}
    >
      {label}
    </button>
  )

  const PlayIcon = ({ isHovered = false }: { isHovered?: boolean }) => (
    <div className={`relative ${isHovered ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
      <div className="relative w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
        <svg 
          className="w-6 h-6 text-white ml-0.5" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )

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
          Tutorials.
        </h1>
        <p 
          ref={descRef}
          className='text-[#4C6763] text-base sm:text-lg font-matter font-medium text-center mt-4 px-4'
        >
          Watch my latest YouTube tutorials on design and development. <br className='hidden sm:block' /> 
          Simple, focused learning for modern creators.
        </p>

        {/* Category Toggle - Minimalist */}
        <div className='flex justify-center mt-8 sm:mt-12'>
          <div className='flex gap-4 justify-center'>
            <CategoryButton category="design" label="Design" />
            <CategoryButton category="coding" label="Coding" />
          </div>
        </div>

        <div className='mt-12 sm:mt-14 md:mt-16'>
          {filteredTutorials.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'>
              {filteredTutorials.map((video, index) => (
                <div 
                  key={video.id} 
                  ref={el => { videoRefs.current[index] = el }}
                  className='flex justify-center'
                >
                  <div className='w-full max-w-md'>
                    <div 
                      className='video-card w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden cursor-pointer'
                      onMouseEnter={() => setHoveredVideo(video.id)}
                      onMouseLeave={() => setHoveredVideo(null)}
                      onClick={() => setSelectedVideo(video.embedUrl)}
                    >
                      {/* Video Thumbnail */}
                      <div className='relative aspect-video bg-gray-900 overflow-hidden'>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                        />
                        
                        {/* Play Button */}
                        <div 
                          className='absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300'
                        >
                          <PlayIcon isHovered={hoveredVideo === video.id} />
                        </div>

                        {/* Duration Badge */}
                        <div className='absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium'>
                          {video.duration}
                        </div>

                        {/* Category Badge */}
                        <div className='absolute top-3 left-3'>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            video.category === 'design' 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-blue-500 text-white'
                          }`}>
                            {video.category === 'design' ? 'Design' : 'Coding'}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className='p-5'>
                        <h3 className='font-matter font-medium text-[#025A4E] text-base mb-3 line-clamp-2'>
                          {video.title}
                        </h3>
                        
                        <div className='flex items-center justify-between'>
                          <a 
                            href={`https://www.youtube.com/watch?v=${getVideoId(video.embedUrl)}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm'
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'/>
                            </svg>
                            YouTube
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedVideo(video.embedUrl)
                            }}
                            className='flex items-center gap-2 text-[#025A4E] hover:text-[#028C76] transition-colors hover:cursor-pointer text-sm'
                          >
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/>
                            </svg>
                            Expand
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-16'>
              <div className='text-[#4C6763] text-base font-matter'>
                No tutorials found.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
          onClick={() => setSelectedVideo(null)}
        >
          <div className='relative w-full max-w-4xl'>
            <button 
              className='absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition-colors z-10'
              onClick={() => setSelectedVideo(null)}
            >
              ×
            </button>
            
            <div className='relative aspect-video bg-black rounded-lg overflow-hidden'>
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                className='w-full h-full'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='YouTube video player'
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Page