import { Link } from "@tanstack/react-router";
import { Copyright, MoveRight } from "lucide-react";
import Logo from "../../Reusables/Logo";
import AppScreenshot from "../../assets/img/screenshot.png";


export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:py-10">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 lg:rounded-3xl  rounded-0 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">

          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl tracking-tight text-balance text-white sm:text-5xl">
              Built to Help You Win More Jobs
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
              Provolo isn’t just productivity, it’s precision. Make every word work harder with AI-powered copywriting for freelancers who want results.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                to="/signup"
                className='bg-white hover:bg-gray-100 transition-all duration-300 p-3 px-6 rounded-md flex items-center gap-3 hover:gap-5 w-fit text-sm'
              >
                Get Started
                <MoveRight size={20} />
              </Link>
            </div>
          </div>

          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="App screenshot"
              src={AppScreenshot}
              width={2000}
              height={1080}
              className="absolute top-0 left-0 w-228 max-w-none rounded-xl bg-white/5 ring-1 ring-white/10 border-gray-200 border-8"
            />
          </div>
        </div>


        <div className="lg:flex mt-10 lg:justify-between items-center border-t border-gray-200 pt-10 px-6 lg:px-8">

          <div className="flex items-center lg:gap-2 text-md justify-center">
            <Logo />
            <p className="lg:flex hidden align-middle items-center gap-3 text-sm">            <Copyright size={15} />Provolo '25</p>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <Link
              target="_blank"
              to="https://buildsbyesuoladaniel.hashnode.space/provolo/terms-and-conditions"
              className="p-3 flex align-middle gap-3 rounded text-gray-500 hover:text-gray-950 transition-all duration-300 text-sm"
            >
              Terms & Conditions
            </Link>
            <Link
              target="_blank"
              to="https://buildsbyesuoladaniel.hashnode.space/provolo/privacy-policy"
              className="p-3 flex align-middle gap-3 rounded text-gray-500 hover:text-gray-950 transition-all duration-300 text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
