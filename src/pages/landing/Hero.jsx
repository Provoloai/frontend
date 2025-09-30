import React from 'react'
import CustomButton from '../../Reusables/CustomButton'
import { MoveRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'


export const Hero = () => {
    return (
        <div className="bg-white">

            <div className="relative isolate px-6 pt-5 lg:px-8">
                <div className="mx-auto max-w-7xl lg:p-36 p-16 sm:py-48 lg:py-40 rounded-2xl homeBg">
                    <div className="text-center">
                        <h1 className="tracking-tight text-balance text-white lg:text-7xl md:text-7xl text-4xl font-medium">
                            Supercharge Your Upwork Profile with AI.
                        </h1>
                        <p className="my-8 text-2xl font-normal text-pretty text-white ">
                        Let your portfolio speak louder.
                        </p>

                        <Link
                            to="/signup"
                            className='bg-white hover:bg-gray-100 transition-all duration-300 p-3 px-6 rounded-md flex items-center gap-3 hover:gap-5 mx-auto w-fit text-sm'
                        >
                            Optimize My Profile
                            <MoveRight size={20} />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}
