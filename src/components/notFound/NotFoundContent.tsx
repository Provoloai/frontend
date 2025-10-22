import { Link } from "@tanstack/react-router";
import NotFoundSVG from "./NotFoundSVG";
import { NOT_FOUND_CONFIG } from "@/constants/notFound";

const NotFoundContent: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-6 sm:p-10 max-w-4xl mx-auto w-full my-auto">
        <div className="p-6 rounded-lg text-center justify-center">
          <div className="w-full text-center flex justify-center">
            <NotFoundSVG 
              width={NOT_FOUND_CONFIG.svg.width}
              height={NOT_FOUND_CONFIG.svg.height}
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-2 mt-10 text-gray-400">
            {NOT_FOUND_CONFIG.title}
          </h1>
          <p className="text-center text-gray-400 lg:w-2/3 mx-auto text-sm">
            {NOT_FOUND_CONFIG.description}
          </p>
          <div className="mt-10 items-center justify-center gap-x-6">
            <Link 
              to={NOT_FOUND_CONFIG.buttonLink} 
              type="submit"  
              className="btn-primary w-1/3 mx-auto px-6 py-4 rounded-md text-white text-sm"
            >
              {NOT_FOUND_CONFIG.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundContent;
