'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const titleRef = useRef(null)
  const leftContentRef = useRef(null)
  const formRef = useRef(null)
  const messageRef = useRef(null)

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Left content animation
    gsap.fromTo(leftContentRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Form animation
    gsap.fromTo(formRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Animate message when it changes
  useEffect(() => {
    if (submitStatus !== 'idle' && messageRef.current) {
      gsap.fromTo(messageRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out'
        }
      )
    }
  }, [submitStatus, submitMessage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      const response = await fetch('https://formspree.io/f/mpwyeyjo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _subject: `New contact from ${formData.name} - ${formData.service} service`
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(`Thank you, ${formData.name}! I've received your message and will get back to you soon.`)
        setFormData({
          name: '',
          email: '',
          service: '',
          message: ''
        })
        
        // Auto hide success message after 8 seconds
        setTimeout(() => {
          setSubmitStatus('idle')
          setSubmitMessage('')
        }, 8000)
      } else {
        setSubmitStatus('error')
        setSubmitMessage('Sorry, there was an error sending your message. Please try again or email me directly at hello@rabin.design')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Sorry, there was a connection error. Please check your internet connection and try again.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeMessage = () => {
    setSubmitStatus('idle')
    setSubmitMessage('')
  }

  return (
    <div className='relative w-full min-h-screen'>
      <div className='absolute top-0 left-0 w-full z-20'>
        <Navbar/>
      </div>
      
      <div className='pt-20 sm:pt-24'>
        <div className='relative w-full py-12 sm:py-16 md:py-22'>
          {/* Submission Message */}
          {submitStatus !== 'idle' && (
            <div 
              ref={messageRef}
              className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 ${
                submitStatus === 'success' 
                  ? 'bg-[#025A4E] border-l-4 border-[#034139]' 
                  : 'bg-red-600 border-l-4 border-red-700'
              } text-white px-6 py-4 rounded-lg shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-matter text-sm sm:text-base leading-relaxed">
                    {submitMessage}
                  </p>
                </div>
                <button
                  onClick={closeMessage}
                  className="ml-4 flex-shrink-0 text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Simple Header */}
          <div className='text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6'>
            <h1 
              ref={titleRef}
              className='font-acorn font-semibold text-[#025A4E] text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
            >
              Contact.
            </h1>
          </div>

          {/* Contact Section */}
          <div className='flex flex-col lg:flex-row items-start justify-between max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 gap-8 sm:gap-12 lg:gap-16'>
            
            {/* Left Content */}
            <div 
              ref={leftContentRef}
              className='w-full lg:w-2/5 space-y-6 sm:space-y-8'
            >
              <div>
                <h2 className='font-acorn font-semibold text-[#025A4E] text-3xl sm:text-4xl mb-4 sm:mb-6'>
                  Let's work together
                </h2>
                <p className='font-matter text-base sm:text-lg text-[#4C6763] leading-relaxed'>
                  Have a project in mind? I'd love to hear about it and explore how we can create something amazing together.
                </p>
              </div>

              <div className='space-y-4 sm:space-y-6'>
                <div>
                  <h3 className='font-acorn font-semibold text-[#025A4E] text-lg sm:text-xl mb-2'>Email</h3>
                  <a href="mailto:hello@rabin.design" className='font-matter text-base sm:text-lg text-[#4C6763] hover:text-[#025A4E] transition-colors break-all'>
                    hello@rabin.design
                  </a>
                </div>
                
                <div>
                  <h3 className='font-acorn font-semibold text-[#025A4E] text-lg sm:text-xl mb-3'>Connect</h3>
                  <div className='flex flex-wrap gap-3 sm:gap-4'>
                    <a href="#" className='font-matter text-base sm:text-lg text-[#4C6763] hover:text-[#025A4E] transition-colors'>Dribbble</a>
                    <a href="#" className='font-matter text-base sm:text-lg text-[#4C6763] hover:text-[#025A4E] transition-colors'>LinkedIn</a>
                    <a href="#" className='font-matter text-base sm:text-lg text-[#4C6763] hover:text-[#025A4E] transition-colors'>Instagram</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Form */}
            <div 
              ref={formRef}
              className='w-full lg:w-3/5'
            >
              <form onSubmit={handleSubmit} className='bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm'>
                <div className='space-y-5 sm:space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6'>
                    <div>
                      <label className='font-acorn font-semibold text-[#025A4E] text-base sm:text-lg mb-2 block'>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#E5EBE9] focus:border-[#7AA599] outline-none font-matter text-[#4C6763] transition-colors text-sm sm:text-base'
                        placeholder="Your name"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className='font-acorn font-semibold text-[#025A4E] text-base sm:text-lg mb-2 block'>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#E5EBE9] focus:border-[#7AA599] outline-none font-matter text-[#4C6763] transition-colors text-sm sm:text-base'
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className='font-acorn font-semibold text-[#025A4E] text-base sm:text-lg mb-2 block'>Service</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#E5EBE9] focus:border-[#7AA599] outline-none font-matter text-[#4C6763] transition-colors text-sm sm:text-base'
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select a service</option>
                      <option value="logo">Logo Design</option>
                      <option value="social">Social Media</option>
                      <option value="web">Web Design</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className='font-acorn font-semibold text-[#025A4E] text-base sm:text-lg mb-2 block'>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className='w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#E5EBE9] focus:border-[#7AA599] outline-none font-matter text-[#4C6763] resize-none transition-colors text-sm sm:text-base'
                      placeholder="Tell me about your project..."
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting ? 'bg-[#7AA599] cursor-not-allowed' : 'bg-[#025A4E] hover:bg-[#034139] hover:scale-[1.02] active:scale-[0.98]'
                    } text-white font-acorn font-semibold text-base sm:text-lg py-3 sm:py-3.5 rounded-xl transition-all duration-300 cursor-pointer`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactPage