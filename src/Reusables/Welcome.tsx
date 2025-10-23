import { useState } from "react";
import ConfettiCanvas from "@/components/welcome/ConfettiCanvas";
import WelcomeDialog from "@/components/welcome/WelcomeDialog";

export default function Welcome() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ConfettiCanvas />
      <WelcomeDialog isOpen={isOpen} onClose={handleClose} />
    </>
  );
}