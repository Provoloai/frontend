import React from 'react'
import freelancerIcon from '../../assets/img/icons.png'
import analytics from '../../assets/img/improvement.png'
import Invite from '../../assets/img/invite.png'
import visibility from '../../assets/img/graph.png'

const Features = () => {
    return (
        <div className="py-10" id='features'>
            <div className="mx-auto max-w-2xl px-6 md:px-6 lg:max-w-7xl lg:p-8">

                <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">

                    <div className="relative lg:row-span-2 h-full">
                        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl h-full" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                            <div className="px-8 pt-8  sm:px-10 sm:pt-10 sm:pb-0">
                                <p className="text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Smarter Copy. Better Results. Instantly
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Stop guessing what works. Provolo applies proven copywriting strategies to improve your profile and proposals automatically.
                                </p>
                            </div>


                            <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm p-5">
                                <div className="flex flex-col flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-10 p-8 h-full rounded-lg border border-gray-50 bg-gray-50 ">

                                    <span className='flex align-middle items-center justify-between w-full'>
                                        <p className='font-medium text-gray-500 text-md'>Proposal Performance</p>
                                    </span>
                                    <span className='flex align-middle items-center justify-between w-full'>
                                        <p className='text-gray-500 text-sm'>Open Rate Boost</p>
                                        {/* <p className='text-gray-500 text-xs py-1 px-2 rounded-md border'>+</p> */}
                                    </span>

                                    <span className="border border-gray-100 w-full lg:mb-auto my-5" />

                                    <img src={analytics} alt="Analytics" className='mt-5' />

                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
                    </div>

                    <div className="relative max-lg:row-start-1 ">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />

                        <div className="relative flex h-fit flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">

                            <div className="px-8 pt-8 sm:px- sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Get More Invitations & Interviews
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Rank higher in search results and convert more views into interviews with persuasive, client-focused copy.
                                </p>
                            </div>

                            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-8 lg:pb-2 relative h-full">
                                
                                <span className='opacity-0'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum saepe, autem cupiditate voluptas, necessitatibus praesentium labore dolore qui, maxime impedit corrupti. Facere eaque in id nesciunt dignissimos repellat incidunt quod.</span>
                                <img src={Invite} alt="Notification" className='rounded-lg absolute w-[45%] lg:top-2 top-16  opacity-50 border-gray-100 border' />
                                <img src={Invite} alt="Notification" className='rounded-lg absolute w-[65%] border-gray-100 border lg:top-6 top-20  opacity-90' />
                                <img src={Invite} alt="Notification" className='rounded-lg absolute w-[85%] shadow lg:top-12 bottom-12 border-gray-100 border' />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
                    </div>

                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-white" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Works for Any Freelancer</p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Whether you're a designer, developer, writer, or marketer, Provolo adapts to your niche.
                                </p>
                            </div>
                            <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2 px-8">
                                <img src={freelancerIcon} alt="Upwork Icons" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
                    </div>
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Optimized to Get You Seen
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Get a headline and overview written to boost performance in Upwork’s search algorithm, and attract more clients.
                                </p>
                            </div>
                            <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm p-5">
                                <div className="flex flex-col flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-10 bg-gray-50 p-8 h-full rounded-lg border border-gray-100">

                                    <img src={visibility} alt="Upwork Icons" />


                                    <span className="border border-gray-100 w-full lg:mt-auto mt-5 mb-5" />

                                    <span className='flex align-middle items-center justify-between w-full'>
                                        <p className='text-gray-500 text-sm'>Profile views</p>
                                        <p className='text-gray-500 text-xs py-1 px-2 rounded-md border border-gray-50'>Last 30 days</p>
                                    </span>
                                    <span className='flex align-middle items-center justify-between w-full'>
                                        <p className='font-medium text-gray-500 text-xl'>308</p>
                                    </span>

                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features
