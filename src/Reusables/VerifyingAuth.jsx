import Loader from "./Loader";

const VerifyingAuth = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="text-center">
        <Loader />
      </div>
    </div>
  );
};

export default VerifyingAuth;
