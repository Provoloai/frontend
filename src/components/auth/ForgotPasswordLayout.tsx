import { Link } from "@tanstack/react-router";
import Logo from "@/Reusables/Logo";
import Vector from "@/assets/img/Vector.png";
import Vector2 from "@/assets/img/Vector2.png";
import type { ForgotPasswordLayoutProps } from "@/types/auth";

const ForgotPasswordLayout: React.FC<ForgotPasswordLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <Link to="/" className="w-fit mx-auto z-50">
        <Logo />
      </Link>
      
      {children}
      
      <img
        alt="Provolo"
        src={Vector}
        className="absolute top-0 left-0 lg:w-1/5 w-1/2 opacity-40"
      />
      <img
        alt="Provolo"
        src={Vector2}
        className="absolute bottom-0 right-0 w-1/3 opacity-40"
      />
    </div>
  );
};

export default ForgotPasswordLayout;
