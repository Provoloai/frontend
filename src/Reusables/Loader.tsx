import LogoSvg from "../assets/svg/LogoSvg";

const Loader = () => {
  return (
    <div className="animate-spin-slow bg-gray-200 rounded-full">
      <LogoSvg className="size-16 mx-auto text-white" />
    </div>
  );
};

export default Loader;
