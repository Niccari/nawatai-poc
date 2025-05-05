import { FaRegMoon, FaRegSun, FaBell } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { GoTriangleDown } from "react-icons/go";

export const MoonIcon: () => React.ReactElement = () => <FaRegMoon />;
export const SunIcon: () => React.ReactElement = () => <FaRegSun />;
export const LinkIcon: () => React.ReactElement = () => <CiLink />;
export const BellIcon: () => React.ReactElement = () => <FaBell />;
export const TriangleDownIcon: () => React.ReactElement = () => (
  <GoTriangleDown />
);
