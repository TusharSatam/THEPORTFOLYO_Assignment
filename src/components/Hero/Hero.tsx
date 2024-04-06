import React, { useEffect, useRef } from 'react';
import styles from "./Hero.module.css";
import Image from 'next/image';
import { gsap } from 'gsap';
import { poppins } from '@/app/page';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const Hero = ({ user }: any) => {
    const heroRef = useRef(null);
    useEffect(() => {
        if (!user || !user.about) return; // Check if user or user.about is not available

        const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.out' } });
        const t2 = gsap.timeline({ defaults: { duration: 1.5, ease: 'power3.out' } });
        tl.fromTo(".nameRef", { opacity: 0, x: -50 }, { opacity: 1, x: 0 })
            .fromTo(".titleRef", { opacity: 0, y: -50 }, { opacity: 1, y: 0 }, '-=0.5')
            .fromTo(".subTitleRef", { opacity: 0, x: -50 }, { opacity: 1, x: 0 }, '-=0.5');

        t2.fromTo(".ProfileImage", { opacity: 0, x: 100, y: -100, rotateY: -90 }, { opacity: 1, x: 0, y: 0, rotateY: 0 })


        const heroSection = heroRef.current;
        ScrollTrigger.create({
            trigger: heroSection,
            start: "top top",
            end: window.innerWidth <= 768 ? "center top" : "+=200px top",
            onLeave: () => {
                gsap.to(".aboutText", { x: -100, opacity: 0, duration: 1 });
                gsap.to(".Image", { x: -100, y: 100, opacity: 0, duration: 1 });
            },
            onEnterBack: () => {
                gsap.to(".aboutText", { x: 0, opacity: 1, duration: 1 });
                gsap.to(".Image", { x: 0, y: 0, opacity: 1, duration: 1.5 });
            }
        });

    }, [user]); // Add user as a dependency for useEffect

    if (!user || !user.about) {
        // Render loading state or placeholder content if user or user.about is not available
        return (
            <section id="hero" className={`h-[90vh] flex justify-center items-center w-full ${styles.container} ${poppins.className}`}>
            </section>
        );
    }

    return (
        <section id="hero" ref={heroRef} className={`h-[100vh] lg:[90vh] flex flex-col md:flex-row gap-3 md:gap-0 justify-center items-center w-full ${styles.container} ${poppins.className} heroSection overflow-hidden`}>

            <div className='hidden md:flex h-full w-1/2 aboutText justify-center items-center  text-left'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-xl nameRef opacity-0'>Hi, I'm <span className='text-yellow-400'>{user.about.name}</span></h2>
                    <h1 className='text-5xl font-semibold titleRef opacity-0'>{user.about.title}</h1>
                    <p className='text-gray-400 subTitleRef opacity-0'>{user.about.subTitle}</p>
                </div>
            </div>
            <div className=' relative md:h-full w-full md:w-1/2 Image flex flex-col md:flex-row justify-center items-center perspective-1000'>
                <Image priority src={user.about.avatar?.url} alt="ProfileImage" width={400} height={300} className=' border-yellow-400 border-2 rounded-full md:rounded-lg ProfileImage opacity-0 transform rotateY-90 h-[400px] w-[300px] lg:w-[400px] lg:h-[500px]' />
                <h2 className='flex md:hidden absolute bottom-[80px] text-xl nameRef opacity-0'>Hi, I'm &nbsp; <span className='text-yellow-400'>{user.about.name}</span></h2>
            </div>
            <div className='aboutText text-center flex  flex-col md:hidden '>
                <h1 className='text-2xl font-semibold titleRef opacity-0 text-white '>{user.about.title}</h1>
                <p className='text-gray-400 subTitleRef opacity-0'>{user.about.subTitle}</p>
            </div>

        </section>
    );
};

export default Hero;
