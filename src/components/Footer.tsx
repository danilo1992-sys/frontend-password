import { Footer, FooterCopyright, FooterIcon } from "flowbite-react";
import { BsDribbble, BsGithub, BsMailbox } from "react-icons/bs";

export default function Footers() {
  return (
    <Footer container>
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <FooterCopyright by="Danilo Caceres" year={2026} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <FooterIcon href="#" icon={BsGithub} />
          <FooterIcon href="#" icon={BsMailbox} />
          <FooterIcon href="#" icon={BsDribbble} />
        </div>
      </div>
    </Footer>
  );
}
