import { FC } from "react";
import { BsGithub, BsHouseFill } from "react-icons/bs";

const Footer: FC = () => {
  return (
    <footer className="text-gray-400 m-5 row gap-10">
      <BsGithub className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-gray-200" />
      <BsHouseFill className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-gray-200" />
    </footer>
  )
}

export default Footer;
