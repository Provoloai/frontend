import { Link } from "@tanstack/react-router";
import { WELCOME_CONFIG } from "@/constants/welcome";
import type { WelcomeContentProps } from "@/types/welcome";

const WelcomeContent: React.FC<WelcomeContentProps> = ({ onContinue }) => {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="text-center">
        <div className="w-full flex items-center flex-col">
          <div className=" flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 sm:mx-0 sm:size-10 text-primary">
            <WELCOME_CONFIG.icon />
          </div>
        </div>

        <div className="text-center sm:mt-0 sm:text-left w-full">
          <h3 className="text-2xl/9 font-medium tracking-tight text-gray-900 text-center mt-4">
            {WELCOME_CONFIG.title}
          </h3>

          <p className="my-5 text-am text-center">
            {WELCOME_CONFIG.message}
          </p>

          {WELCOME_CONFIG.features && (
            <ul className="text-sm text-gray-600 space-y-2 mb-6 text-left inline-block">
              {WELCOME_CONFIG.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="bg-gray-100 p-1 rounded-md"><WELCOME_CONFIG.featureIcon size={15}/></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <Link
            to={WELCOME_CONFIG.continueLink}
            onClick={onContinue}
            className="w-full py-3 px-6 text-white rounded-lg flex items-center justify-center space-x-2 transition duration-150 ease-in-out btn-primary"
          >
            {WELCOME_CONFIG.continueText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;
