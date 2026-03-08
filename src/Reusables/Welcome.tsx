import { useState } from "react";
import ConfettiCanvas from "@/old-components/welcome/ConfettiCanvas";
import WelcomeDialog from "@/old-components/welcome/WelcomeDialog";

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