import { PaperClipIcon } from '@heroicons/react/20/solid'
import LandingpageButton from './LandingpageButton';
import vidSeven from "../../assets/vids/vidSeven.MOV";


export default function Description() {

  const FEATURES = [
    "Crafted to grab client attention.",
    "Built to boost algorithm ranking.",
    "Designed to help you win more jobs.",
  ];


  return (
    <section className="py-10 px-5" id="features">
      <div className="mx-auto md:max-w-full lg:max-w-[93.75rem] bg-[#F3F4F5] rounded-3xl lg:h-[600px] lg:p-10 p-5 lg:grid">

        <div className='grid lg:grid-cols-2'>

          <div className='flex flex-col lg:gap-20 gap-10 text-start'>
            <header className='flex flex-col'>
              <p className="font-headingmd lg:text-[28px] text-[18px] mb-3">
                Every Word Works Harder.
              </p>
              <p className='text-[#6B7280] font-heading lg:text-[22px] text-[14px]'>
                Provolo isn’t just about writing faster, it’s about writing smarter.
              </p>
            </header>

            <ol className="list-none lg:text-base text-[14px] text-[#6B7280] flex flex-col gap-6">
              {FEATURES.map((feature, index) => (
                <li key={index} className="flex items-center font-headingmd text-x">
                  <span className="px-2 py-1 bg-[#6B7280]/10 rounded-lg mr-2 text-sm font-headingmd">
                    {index + 1}
                  </span>
                  {feature}
                </li>
              ))}
            </ol>

            <LandingpageButton to={"/signup"} btnText={"Get Started"} />
          </div>
          <div className='flex mt-10 lg:mt-0'>
            <video src={vidSeven} autoPlay loop muted className='m-auto'></video>
          </div>
        </div>
      </div>
    </section>
  )
}
