import { Link } from '@tanstack/react-router'
import { MoveRight } from 'lucide-react'
import React from 'react'

const Feedback = () => {
    return (
        <div className='feedback text-black p-5 rounded-xl'>
            <h2 className='text-3xl  font-medium mb-2'>
                Hey! 👋🏾
            </h2>
            <p className='text-sm'> We'd like to hear what you think about Provolo.</p>
            <Link
                to="https://forms.gle/vWUuG7tu1HU2ksuT8"
                target='_blank'
                className='bg-white hover:bg-gray-100 transition-all duration-300 p-3 px-6 rounded-md flex items-center gap-3 hover:gap-5 mx-auto text-black mt-10'
            >
                Give Feedback
                <MoveRight size={20} />
            </Link>
        </div>
    )
}

export default Feedback
