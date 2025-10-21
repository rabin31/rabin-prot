'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar'
import React, { useState, useEffect, useRef } from 'react'
import notesData from '@/app/data/notesData.json'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'; // Import Next.js Image component

gsap.registerPlugin(ScrollTrigger);

interface ContentSection {
  title?: string;
  content: string;
  codeExample?: string;
  bullets?: string[];
  principles?: string[];
  learningAreas?: string[];
}

interface NoteContent {
  intro: string;
  sections: ContentSection[];
  conclusion: string;
}

interface Note {
  id: number;
  title: string;
  description: string;
  content: NoteContent;
  iconBg: string;
  iconType: string;
  author: string;
  publishedDate: string;
  image: string;
}

const NotesPage = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const notesRef = useRef<(HTMLDivElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedNote) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [selectedNote]);

  // Modal open animation
  useEffect(() => {
    if (selectedNote && modalRef.current && modalContentRef.current) {
      // Animate overlay fade in
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      // Animate modal content slide up from bottom
      gsap.fromTo(modalContentRef.current,
        { y: '100%', opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: 'power3.out',
          delay: 0.1
        }
      );
    }
  }, [selectedNote]);

  // GSAP ScrollTrigger animations
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
    );

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Notes cards animation
    notesRef.current.forEach((note, index) => {
      if (note) {
        gsap.fromTo(note,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: note,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderIcon = (iconType: string) => {
    switch(iconType) {
      case 'document':
        return (
          <svg className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
          </svg>
        );
      case 'robot':
        return (
          <span className='text-2xl sm:text-3xl md:text-4xl'>🤖</span>
        );
      case 'fire':
        return (
          <span className='text-2xl sm:text-3xl md:text-4xl'>🔥</span>
        );
      case 'palette':
        return (
          <svg className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' />
          </svg>
        );
      case 'spark':
        return (
          <svg className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M13 10V3L4 14h7v7l9-11h-7z' />
          </svg>
        );
      default:
        return null;
    }
  };

  const closeModal = () => {
    if (modalContentRef.current && modalRef.current) {
      // Animate modal content slide down
      gsap.to(modalContentRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in'
      });

      // Animate overlay fade out
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedNote(null);
        }
      });
    } else {
      setSelectedNote(null);
    }
  };

  // Prevent modal close when clicking inside modal content
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Social share functions
  const shareOnFacebook = () => {
    if (!selectedNote) return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(selectedNote.title);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    
    window.open(facebookShareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    if (!selectedNote) return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(selectedNote.title);
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    
    window.open(twitterShareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    if (!selectedNote) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(selectedNote.title);
    const summary = encodeURIComponent(selectedNote.description);
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
    
    window.open(linkedInShareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative w-full min-h-screen ${selectedNote ? '' : ''}`}>
      {/* Main Page Navbar - Only show when modal is NOT open */}
      {!selectedNote && (
        <div className='absolute top-0 left-0 w-full z-20'>
          <Navbar/>
        </div>
      )}
      
      {/* Modal Overlay */}
      {selectedNote && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-[#FFFFFF]/60 backdrop-blur-md z-40 flex flex-col"
          onClick={closeModal}
        >
          {/* Modal Navbar - Only show when modal IS open */}
          <div className='w-full z-50 bg-transparent'>
            <Navbar/>
          </div>

          {/* Gap between navbar and modal content */}
          <div className="h-16 sm:h-20 md:h-24"></div>

          {/* Modal Content */}
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
            <div 
              ref={modalContentRef}
              className="bg-white/20 backdrop-blur-3xl rounded-xl sm:rounded-2xl w-full max-w-6xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto relative"
              onClick={handleModalClick}
            >
              {/* Sticky Close Button - Top Right */}
              <button 
                onClick={closeModal}
                className="sticky top-2 right-2 sm:top-4 sm:right-4 float-right m-2 sm:m-4 w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-white/60 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-50"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#025A4E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-14 space-y-8">
                {/* Article Header */}
                <div className="text-center">
                  <h1 className='font-acorn font-semibold text-[#025A4E] text-3xl sm:text-4xl md:text-5xl lg:text-[3.3rem] text-center mt-2 sm:mt-4 px-2 leading-tight'>
                    {selectedNote.title}
                  </h1>
                  
                  <div className='flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 my-6 sm:my-8'>
                    <div className='h-10 w-10 sm:h-12 sm:w-12 border-[#025A4E] border-2 rounded-full overflow-hidden'>
                      <Image 
                        src="/rabin.jpg" 
                        alt="Rabin Thapa" 
                        width={48}
                        height={48}
                        className='object-cover h-full w-full'
                      />
                    </div>
                    <div className='flex flex-col sm:flex-row items-center gap-2 text-center'>
                      <p className='text-base sm:text-lg font-semibold text-[#025A4E] font-matter'>{selectedNote.author}</p>
                      <span className='hidden sm:inline text-[#025A4E]'>•</span>
                      <p className='text-base sm:text-md font-medium text-[#025A4E] font-matter'>{selectedNote.publishedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Featured Image */}
                <div className='flex items-center justify-center'>
                  <div className='h-[40vh] w-full sm:h-[50vh] sm:w-[80vw] md:h-[60vh] md:w-[70vw] lg:w-[60vw] rounded-xl sm:rounded-2xl overflow-hidden'>
                    <Image 
                      src={selectedNote.image} 
                      alt={selectedNote.title} 
                      width={800}
                      height={600}
                      className='object-cover w-full h-full'
                    />
                  </div>
                </div>

                {/* Article Content */}
                <div className='px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 space-y-8'>
                  {/* Introduction */}
                  <div className="text-center">
                    <p className='font-matter font-medium text-lg sm:text-xl text-[#4C6763] leading-relaxed'>
                      {selectedNote.content.intro}
                    </p>
                  </div>

                  {/* Sections */}
                  {selectedNote.content.sections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      {section.title && (
                        <h3 className="text-2xl font-matter font-semibold text-[#025A4E]">
                          {section.title}
                        </h3>
                      )}
                      
                      <p className="text-[#4C6763] font-matter leading-relaxed">
                        {section.content}
                      </p>

                      {/* Code Example */}
                      {section.codeExample && (
                        <pre className="bg-[#025A4E]/10 rounded-lg p-4 my-4 overflow-x-auto">
                          <code className="text-sm text-[#025A4E] font-mono">
                            {section.codeExample}
                          </code>
                        </pre>
                      )}

                      {/* Bulleted List */}
                      {section.bullets && (
                        <ul className="list-disc list-inside space-y-2 my-4">
                          {section.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-[#4C6763] font-matter">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Principles List */}
                      {section.principles && (
                        <div className="my-4">
                          <h4 className="font-matter font-semibold text-[#025A4E] mb-3">Key Principles:</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {section.principles.map((principle, idx) => (
                              <li key={idx} className="text-[#4C6763] font-matter">
                                {principle}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Learning Areas */}
                      {section.learningAreas && (
                        <div className="my-4">
                          <h4 className="font-matter font-semibold text-[#025A4E] mb-3">Learning Areas:</h4>
                          <ul className="list-disc list-inside space-y-2">
                            {section.learningAreas.map((area, idx) => (
                              <li key={idx} className="text-[#4C6763] font-matter">
                                {area}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Conclusion */}
                  <div className="mt-8 pt-8 border-t border-[#025A4E]/20">
                    <h3 className="text-2xl font-matter font-semibold text-[#025A4E] mb-4">
                      Conclusion
                    </h3>
                    <p className="text-[#4C6763] font-matter text-lg leading-relaxed">
                      {selectedNote.content.conclusion}
                    </p>
                  </div>
                </div>

                {/* Share Section */}
                <div className='flex items-center justify-center mt-12 px-2 sm:px-4'>
                  <div className='min-h-[12vh] sm:h-[15vh] w-full sm:w-[90vw] md:w-[80vw] lg:w-[65vw] rounded-xl sm:rounded-2xl border-[#025A4E]/50 border-2 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 lg:px-12 gap-4 sm:gap-6'>
                    <p className='text-[#025A4E] text-sm sm:text-base lg:text-lg font-matter font-semibold text-center sm:text-left'>Enjoy this note? Feel free to share!</p>

                    <div className='flex items-center justify-center gap-4 sm:gap-6'>
                      {/* Facebook */}
                      <button 
                        onClick={shareOnFacebook}
                        className='w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#025A4E] hover:bg-[#025A4E]/80 flex items-center justify-center transition-all duration-200 hover:scale-110'
                        aria-label="Share on Facebook"
                      >
                        <svg className='w-4 h-4 sm:w-5 sm:h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
                        </svg>
                      </button>
                      
                      {/* Twitter/X */}
                      <button 
                        onClick={shareOnTwitter}
                        className='w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#025A4E] hover:bg-[#025A4E]/80 flex items-center justify-center transition-all duration-200 hover:scale-110'
                        aria-label="Share on Twitter"
                      >
                        <svg className='w-4 h-4 sm:w-5 sm:h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
                        </svg>
                      </button>
                      
                      {/* LinkedIn */}
                      <button 
                        onClick={shareOnLinkedIn}
                        className='w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#025A4E] hover:bg-[#025A4E]/80 flex items-center justify-center transition-all duration-200 hover:scale-110'
                        aria-label="Share on LinkedIn"
                      >
                        <svg className='w-4 h-4 sm:w-5 sm:h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content - Conditionally blurred and non-interactive when modal is open */}
      <div className={`py-24 sm:py-32 md:py-38 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto ${selectedNote ? 'pointer-events-none' : ''}`}>
        <h1 
          ref={titleRef}
          className='font-acorn font-semibold text-[#025A4E] text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] text-center leading-tight'
        >
          Notes.
        </h1>
        <p 
          ref={subtitleRef}
          className='text-[#4C6763] text-base sm:text-lg font-matter font-medium text-center mt-4 px-4 sm:px-6'
        >
          Some thoughts, reflections, & notes on design and development, along <br className='hidden sm:block' /> with some latest work in progress.
        </p>

        {/* Notes Grid */}
          <div className='mt-12 sm:mt-16 space-y-4 sm:space-y-6 max-w-6xl mx-auto px-0 sm:px-4 md:px-38'>
            {notesData.notes.map((note: Note, index) => (
              <div 
                key={note.id}
                ref={(el) => { notesRef.current[index] = el; }}
                className='bg-white/40 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:bg-white/60 transition-all duration-300 cursor-pointer'
                onClick={() => setSelectedNote(note)}
              >
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 md:gap-8'>
                  {/* Text Content */}
                  <div className='flex-1 order-2 sm:order-1'>
                    <h3 className='text-[#025A4E] text-lg sm:text-xl font-matter font-semibold mb-2'>{note.title}</h3>
                    <p className='text-[#6B7280] text-sm sm:text-base'>
                      {note.description}
                    </p>
                  </div>
                  
                  {/* Icon Circle - Hidden on mobile, visible on sm and above */}
                  <div className={`hidden sm:flex w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ${note.iconBg} rounded-full items-center justify-center flex-shrink-0 order-1 sm:order-2 self-end sm:self-auto`}>
                    {renderIcon(note.iconType)}
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

export default NotesPage