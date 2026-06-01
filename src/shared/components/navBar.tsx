import Link from "next/link";
import { FaDiscord, FaGithub, FaLightbulb, FaMoon, FaSpotify, FaSun, FaTwitch, FaTwitter } from "react-icons/fa";
import ToggleTheme from "./toggleTheme";


export default function NavBar() {

    return (
        <nav className="flex justify-between text-white items-center w-full h-16 px-4 py-3 backdrop-blur-md bg-black/30 fixed">
            <div className="flex items-center justify-between w-full">
                <div>
                    <span>

                    </span>
                    <div className="flex items-center gap-8 w-full text-xl">
                        <Link href={'/'}>Home /</Link>
                        <Link href={'/#about'}>About /</Link>
                        <Link href={'/projects'}>Projects /</Link>
                        <Link href={'/blogs'}>Blog</Link>
                    </div>
                </div>
                <div className="flex items-center justify-around w-96">
                    <div className="flex items-center gap-4 text-2xl">
                        <Link href={'https://x.com'} target="_blank">
                            <FaTwitter color="#1DA1F2" target="_blank"/>
                        </Link>
                        <Link href={''}>
                            <FaDiscord color="#7289DA" target="_blank"/>
                        </Link>
                        <Link href={'https://open.spotify.com/user/ojxnqcygz7t4cl7fyj2zjkn5q?si=93765fe7ebb24e45'} target="_blank">
                            <FaSpotify color="#1ED760" />
                        </Link>
                        <Link href={'https://www.twitch.tv'} target="_blank"> 
                            <FaTwitch color="#9146FF" />
                        </Link>
                        <Link href={'https://github.com'} target="_blank">
                            <FaGithub color="white"  />
                        </Link>
                    </div>
                    {/* <ToggleTheme></ToggleTheme> */}
                </div>
            </div>
        </nav>
    )
}