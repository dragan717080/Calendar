import { FC } from "react";
import { BsGithub, BsHouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="text-gray-400 m-5 row gap-10">
      <Link to='https://github.com/dragan717080'>
        <BsGithub className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-gray-200" />
      </Link>
      <Link to='https://three-portfolio-seven.vercel.app/'>
        <BsHouseFill className="h-7 w-7 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-gray-200" />
      </Link>
    </footer>
  )
}

export default Footer;
