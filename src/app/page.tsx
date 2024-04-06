"use client"
import { Poppins, Roboto } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import gsap from 'gsap';
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Services from "@/components/Services/Services";
import Hero from "@/components/Hero/Hero";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import Projects from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import TimeLine from "@/components/Timeline/TimeLine";

// Define types for portfolio data
interface PortfolioData {
  about: any; // Define the correct type for the 'about' data
  services: any[]; // Define the correct type for the 'services' data
  testimonials: any[]; // Define the correct type for the 'testimonials' data
}

// Register fonts
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function App(): JSX.Element {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        setPortfolioData(response.data.user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Track cursor position
  const cursorRef = useRef<HTMLDivElement>(null);

  const moveCursor = (e: React.MouseEvent) => {
    const cursor = cursorRef.current;

    if (cursor) {
      cursor.style.left = `${e.clientX - 16}px`;
      cursor.style.top = `${e.clientY - 16}px`;
      if (e.target) {
        if ((e.target as HTMLElement).classList.contains("hover-effect")) {
          cursor.classList.add("hovered");
        } else {
          cursor.classList.remove("hovered");
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.fromTo(".J", { x: 100, opacity: 0 }, { x: 0, opacity: 1 })
      .fromTo(".O", { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.75")
      .fromTo(".H", { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.75")
      .fromTo(".N", { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.75");

  }, []);

  if (loading || !portfolioData) {
    return (
      <div className="splash-screen flex min-h-screen  w-full items-center justify-center bg-black text-white text-4xl">
        <span className="J opacity-0">J</span>
        <span className="O opacity-0">o</span>
        <span className="H opacity-0">h</span>
        <span className="N opacity-0">n</span>
      </div>
    );
  }

  return (
    <div onMouseMove={moveCursor} className={`${roboto.className} relative flex min-h-screen w-full flex-col items-center justify-center bg-black text-white`}>
      <Navbar />
      <div className="flex flex-col max-w-[1400px] w-full mx-auto px-4">
        <Hero user={portfolioData} />
        <About user={portfolioData} />
        <Services user={portfolioData} />
        <Skills user={portfolioData} />
        <Projects user={portfolioData} />
        <TimeLine user={portfolioData} />
        <Testimonials user={portfolioData} />
        <Contact user={portfolioData} />
      </div>
      <div className="custom-cursor" ref={cursorRef}></div>
    </div>
  );
}
