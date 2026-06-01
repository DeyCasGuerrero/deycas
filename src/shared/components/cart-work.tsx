"use client";

import TagsAbout from "@/modules/landing/about/ui/tagsAbout";
import Image from "next/image";
import { FaChevronCircleDown, FaChevronCircleUp, FaGithub, FaLinkedin } from "react-icons/fa";
import MiniCarts from "./mini-carts";
import { useState } from "react";


const info = [
    {
        title: "GitHub",
        icon: {
            name: "FaGithub",
            color: "text-white",
            size: "text-sm"
        },
        size: "text-sm"
    },
    {
        title: "LinkedIn",
        icon: {
            name: "FaLinkedin",
            color: "text-white",
            size: "text-sm"
        },
        size: "text-sm"
    }
]

const repositorio = [
    {
        title: "app-nextjs",
        img: "https://avatars.githubusercontent.com/u/132533056?v=4",
        desciption: "Aplicación Next.js con Tailwind CSS y TypeScript",
        url: "https://github.com/DeyvisCastillo/app-nextjs",
        technology: [
            {
                label: "nextjs",
                Icon: "RiNextjsFill",
            },
            {
                label: "tailwind",
                Icon: "RiTailwindCssFill",
            }
        ],
        createdAt: "2023-03-01",
        updatedAt: "2023-03-01",

    },
    {
        title: "app-react",
        img: "https://avatars.githubusercontent.com/u/132533056?v=4",
        desciption: "Aplicación React con Tailwind CSS y TypeScript",
        url: "https://github.com/DeyvisCastillo/app-react",
        technology: [
            {
                label: "react",
                Icon: "FaReact",
            },
            {
                label: "tailwind",
                Icon: "RiTailwindCssFill",
            }
        ],
        createdAt: "2023-03-01",
        updatedAt: "2023-03-01",
    }
]

export default function CartWork() {

    const [cartsOpen, setCartsOpen] = useState(false);

    return (
        <div className="flex flex-col gap-5 items-center bg-gray-100 px-2 pt-10 pb-4 rounded-lg w-96 h-full">
            <Image className="size-40 rounded-full" src={'https://avatars.githubusercontent.com/u/204729421?s=200&v=4'} alt="perfil company" width={1000} height={1000}></Image>
            <h2 className="text-3xl text-black">
                Company
            </h2>
            <span className="text-xl text-center text-black">
                Software Engineer at Company LLC
            </span>

            <div className="flex flex-col gap-2 items-center w-full">
                <div className="grid gap-4 grid-cols-2 grid-rows-2 ">
                    {info.map((item, index) => (
                        <TagsAbout key={index} icon={item.icon} title={item.title} padding="p-2" size="text-sm" ></TagsAbout>
                    ))}

                </div>

                <div className="flex flex-col gap-2 items-center w-full">
                    <button onClick={() => setCartsOpen(!cartsOpen)} className=" cursor-pointer bodr flex underline items-center justify-center gap-4  text-black p-2 rounded-lg w-full">
                        {cartsOpen ? <FaChevronCircleUp className="transition-all duration-500 ease-in-out " /> : <FaChevronCircleDown className="transition-all duration-500 ease-in-out "/>}
                        See Projects
                    </button>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${cartsOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} 
                    grid gap-4 grid-cols-2 w-full`}>
                    {repositorio.map((item, index) => (
                        <MiniCarts key={index} img={item.img} title={item.title} desciption={item.desciption} technology={item.technology} createdAt={item.createdAt} updatedAt={item.updatedAt}></MiniCarts>
                    ))}

                </div>

            </div>
        </div>
    )
}
