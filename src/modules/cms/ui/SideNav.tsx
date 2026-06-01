"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type SideNavProps = {
  expanded?: boolean;
  onToggle?: () => void;
};

const items = [
  { label: "Inicio", href: "/cms/home" },
   { label: "Website", href: "/cms/website" },
  { label: "Blogs", href: "/cms/blogs" },
  { label: "Proyectos", href: "/cms/projects" },
  { label: "Settings", href: "/cms/Settings" },
];

export default function SideNav({ expanded = true, onToggle }: SideNavProps) {
  const pathname = usePathname() || "";

    const [isExpanded, setIsExpanded] = useState(expanded);

    const handleToggle = () => {
        setIsExpanded((prev)=>!prev);
    };
  return (
    <aside className={`hidden md:flex flex-col ${isExpanded ? "w-64" : "w-20"} h-screen bg-gray-900 text-gray-100 fixed left-0 top-0 transition-all duration-150`}>
      <div className="p-4 text-lg font-semibold border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center font-bold">C</div>
          <span className={`ml-3 ${isExpanded ? "inline" : "hidden"}`}>CMS</span>
        </div>
        <button
          aria-expanded={isExpanded}
          onClick={handleToggle}
          className="text-gray-300 hover:text-white p-1 rounded"
        >
          {isExpanded ? "«" : "»"}
        </button>
      </div>

      <nav className="p-2 flex-1 overflow-auto">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 rounded-md my-1 transition-colors duration-150 ${
                active ? "bg-gray-700 text-white" : "text-gray-200 hover:bg-gray-800"
              }`}
            >
              <div className="w-6 h-6 bg-gray-700 rounded-sm flex items-center justify-center text-xs">{item.label.charAt(0)}</div>
              <span className={`ml-3 ${isExpanded ? "inline" : "hidden"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
