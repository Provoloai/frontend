import { Link } from '@tanstack/react-router'
import ComingSoonIllustration from '@/assets/svg/ComingSoonIllustration'

const ComingSoon = () => {
    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full my-auto">
                <div className="p-6 rounded-lg text-center justify-center">
                    
                    <div className='w-full text-center flex justify-center'>
                        <ComingSoonIllustration width="250" height="auto" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-2 mt-10 text-gray-300">
                        We’re Reinventing.
                    </h1>
                    <p className="text-center text-gray-300 w-2/3 mx-auto">
                        Good things take time, and we’re almost ready to share ours with you.
                        Find the latest updates on
                        <Link
                            to='https://x.com/provoloai?s=21'
                            target='_blank'
                            className='underline'
                        >here</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ComingSoon
