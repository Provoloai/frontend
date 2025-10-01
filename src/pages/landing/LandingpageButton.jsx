import { Link } from '@tanstack/react-router'
import React from 'react'

const LandingpageButton = ({ to, btnText }) => {
  return (
    <Link
      to={to}
      className='bg-primary hover:bg-primary/90 transition-all duration-300 py-[18px] px-[24px] rounded-full text-sm text-white w-[180px] h-[44px] text-center align-middle flex justify-center items-center'
    >
      {btnText}
    </Link>
  )
}

export default LandingpageButton
