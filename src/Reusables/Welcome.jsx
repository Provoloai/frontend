import React, { useState, useEffect } from 'react'
import background from "../assets/img/Hello.jpg"
import { Link } from '@tanstack/react-router'


const Welcome = () => {
    const welcomes = [
        "Welcome",           // English
        "Bienvenido",        // Spanish
        "Добро пожаловать",  // Russian
        "Üdvözöljük",        // Hungarian
        "Καλώς ήρθατε",      // Greek
        "Hoş geldiniz",      // Turkish
        "أهلاً وسهلاً",       // Arabic
        "ברוך הבא",          // Hebrew
        "स्वागत है",          // Hindi
        "ยินดีต้อนรับ",      // Thai
        "환영합니다",         // Korean
        "ようこそ",           // Japanese
        "欢迎",               // Simplified Chinese
        "歡迎",               // Traditional Chinese
    ]

    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % welcomes.length)
        }, 2000) // switch every 2s

        return () => clearInterval(interval)
    }, [welcomes.length])

    return (
        <section
            className='w-screen h-screen flex flex-col p-36 align-bottom bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className='h-full flex flex-col'>
                <h1 className='text-8xl transition-opacity duration-700 ease-in-out text-white mt-auto font-bold'>
                    {welcomes[index]}
                </h1>
                <p className='text-3xl w-1/3 text-white'>Provolo, Building The Foundation of Tomorrow, Today.</p>
            </div>
              <Link
                  to={"/"}
                  className='bg-black/30 hover:bg-black/90 transition-all duration-300 py-[18px] px-[24px] rounded-full text-sm text-white hover:text-white w-[180px] h-[44px] text-center align-middle flex justify-center items-center mt-5'
                >
                  Go to Dashboard
                </Link>
        </section>
    )
}

export default Welcome