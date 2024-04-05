"use client"
import { poppins } from '@/app/page';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";

import { AiOutlineClose } from "react-icons/ai";
const Navbar: React.FC = () => {
    const [scrolling, setScrolling] = useState<boolean>(false);
    const [isMoboNavOpen, setisMoboNavOpen] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <nav className={`${poppins.className} navbar fixed top-0 z-50 flex items-center justify-between w-full py-4 px-[2rem] lg:px-[6rem] ${scrolling ? 'bg-[#808080b9]' : 'bg-black'} text-white transition-colors duration-300`}>
            {/* Left side */}
            <div className="left-side flex items-center">
                <span className="text-2xl font-bold">JOHN</span>
            </div>

            {/* Center */}
            <div className="center lg:flex-grow lg:flex items-center justify-center  hidden">
                <ul className="flex space-x-6">
                    <li>
                        <Link className="hover:text-yellow-500" href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="#about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="#services">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="/skills">
                            Skills
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="/projects">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="/timeline">
                            Timeline
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="#testimonial">
                            Testimonial
                        </Link>
                    </li>
                </ul>
            </div>
            {/* mobo links */}
            {isMoboNavOpen && <div className=" absolute top-[60px]  left-0  w-full bg-gray-400 center flex flex-col  items-center justify-center lg:hidden py-3 transition-all duration-500">
                <ul className="flex  flex-col h-full w-full text-center justify-center items-center gap-3">
                    <li>
                        <Link className="hover:text-yellow-500" href="#home">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="#about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="#services">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="/skills">
                            Skills
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="/projects">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="/timeline">
                            Timeline
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-yellow-500" href="#testimonial">
                            Testimonial
                        </Link>
                    </li>
                </ul>
            </div>}
            {/* Right side */}
            <div className="right-side lg:flex items-center hidden">
                <Link href="/contact" className='bg-yellow-400 py-2 px-4 hover:bg-transparent  border-2 border-yellow-400 hover:text-white text-black font-semibold'>
                    Contact
                </Link>
            </div>
            <div className='flex lg:hidden' onClick={() => setisMoboNavOpen(!isMoboNavOpen)}>
                {!isMoboNavOpen ? <GiHamburgerMenu /> : <AiOutlineClose />}
            </div>
        </nav>
    );
};

export default Navbar;
