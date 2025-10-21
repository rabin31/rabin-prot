import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='w-full relative h-auto md:h-[60vh] flex flex-col md:flex-row items-center justify-center py-12 md:py-0'>
       <div className='w-full md:w-[50%] h-auto md:h-[40vh] flex justify-center items-center mb-8 md:mb-0 px-4'>
        <h1 className='font-acorn font-semibold text-base sm:text-lg text-[#4C6763] text-center'>© 2025 Rabin Thapa • Nepal</h1>
       </div>
       <div className='w-full md:w-[50%] h-auto md:h-[40vh] px-8 sm:px-12 md:px-46 flex flex-col sm:flex-row gap-16 sm:gap-24 md:gap-32 lg:gap-40'>
           <div className='space-y-3 sm:space-y-4'>
            <h1 className='font-semibold font-acorn text-base sm:text-lg text-[#025A4E]'>Elsewhere</h1>
            <Link href="https://github.com/rabin31" target='_blank'> <p className='text-[#4C6763] font-matter hover:text-[#025A4E] cursor-pointer text-sm sm:text-base'>Github </p></Link>
            <Link href="https://drive.google.com/file/d/1IPMvfXo0dXz-UDBc6XgsukQcKXvEwGvJ/view?usp=sharing" target='_blank'> <p className='text-[#4C6763] font-matter hover:text-[#025A4E] cursor-pointer text-sm sm:text-base'>CV </p></Link>
            <Link href="https://www.linkedin.com/in/rabin-thapa-a35343260/" target='_blank' > <p className='text-[#4C6763] font-matter hover:text-[#025A4E] cursor-pointer text-sm sm:text-base'>LinkedIn </p></Link>
            <Link href="" target='_blank' > <p className='text-[#4C6763] font-matter hover:text-[#025A4E] cursor-pointer text-sm sm:text-base'>Posts </p></Link>
           </div>

           <div className='space-y-3 sm:space-y-4'>
            <h1 className='font-semibold font-acorn text-base sm:text-lg text-[#025A4E]'>Contact</h1>
            <Link href="/contact"><p className='text-[#4C6763] font-matter hover:text-[#025A4E] cursor-pointer text-sm sm:text-base'>Message</p></Link>
           </div>

       </div>

    </div>
  )
}

export default Footer