import React from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import type { IconType } from "react-icons";

type IconProps = {
  icon: string; // ahora es un string (ej. 'FaBeer', 'MdHome')
  color?: string;
  className?: string;
};

const allIcons: { [key: string]: IconType } = {
  ...FaIcons,
  ...MdIcons,
  ...AiIcons,
  ...RiIcons,
  ...BsIcons,
};

const Icon: React.FC<IconProps> = ({ icon, color = "", className = "" }) => {
  const IconComponent = allIcons[icon];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found`);
    return null;
  }

  return <IconComponent className={`${color} ${className}`} />;
};

export default Icon;
