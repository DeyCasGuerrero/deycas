import Image from "next/image";
import TagsAbout from "./tagsAbout";

const info = [
    {
        title: "Peru",
        icon: {
            name: "FaFlag",
            color: "text-blue-500",
            size: "text-lg"
        },

    },
    {
        title: "He/Him",
        icon: {
            name: "FaUser",
            color: "text-blue-500",
            size: "text-lg"
        },

    },
    {
        title: "I'm currently studying",
        icon: {
            name: "FaGraduationCap",
            color: "text-blue-500",
            size: "text-lg"
        }
    }
]



export default function AboutSections() {
    return (
        <section id="about" className="flex flex-col  items-center justify-center px-10 py-20 gap-8 w-full min-h-screen">
            <Image className="rounded-full size-40 md:h-60 md:w-60" src={'https://avatars.githubusercontent.com/u/132533056?v=4'} alt="perfil" width={1000} height={1000}></Image>
            <div className="flex flex-col items-center justify-center gap-8 w-full">
                <h1 className=" text-5xl  md:text-7xl font-bold text-center text-blue-500">
                    Hey, Hello there!
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white">
                    I'm Froggap
                </h2>
                <span className="text-2xl md:text-4xl text-center text-white">
                    A System Engineer and software developer
                </span>
            </div>
            <div className="w-full max-w-7xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  ">
                {info.map((item, index) => (
                    <TagsAbout
                        icon={item.icon}
                        size="text-lg"
                        padding="p-2"
                        title={item.title}
                        key={index}
                    />
                ))}
            </div>

            <div className="flex flex-col p-4 bg-black/60  items-center justify-center gap-4 rounded-lg w-full">
                <h2 className="text-4xl text-blue-500">About me</h2>
                <p className="text-center text-white">
                    I'm a Software Engineer and a System Engineer. I'm passionate about
                    programming and I love to learn new things. I'm also a big fan of
                    technology and I'm always looking for new ways to improve my skills.
                </p>
            </div>
        </section>
    )
}