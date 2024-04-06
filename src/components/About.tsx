import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { poppins } from '@/app/page';
gsap.registerPlugin(ScrollTrigger);
const About = ({ user }: any) => {
    const aboutRef = useRef(null);
    useEffect(() => {
        if (!user || !user.about) return; // Check if user or user.about is not available
        const aboutSection = aboutRef.current;
        const t1 = gsap.timeline({ defaults: { duration: 1.5, ease: 'power3.out' } });
        t1.fromTo(".aboutImage", { opacity: 0, x: 200, y: -200, rotateY: -90 }, { opacity: 1, x: 0, y: 0, rotateY: 0 });
        // Define the timeline for the animation
        const t2 = gsap.timeline({ defaults: { duration: 1.5, ease: 'power3.out' } });
        t2.fromTo(".aboutMe", { opacity: 0, x: 100 }, { opacity: 1, x: 0 });

        // Create a ScrollTrigger to trigger the animation when the about section enters the viewport
        ScrollTrigger.create({
            trigger: aboutSection,
            start:  window.innerWidth <= 768 ? "-=300px top" : "-=300px top", // Start animation when top of aboutSection reaches bottom of viewport
            end: "bottom top", // End animation when bottom of aboutSection leaves top of viewport
            animation: t1, // Use the defined timeline for animation
            toggleActions: "play none none none", // Play animation when entering the viewport, do nothing when leaving
            once: true // Only play animation once
        });
        // Create a ScrollTrigger to trigger the animation when the about section enters the viewport
        ScrollTrigger.create({
            trigger: aboutSection,
            start:  window.innerWidth <= 768 ? "-=200px top" : "-=300px top",  // Start animation when top of aboutSection reaches bottom of viewport
            end: "bottom top", // End animation when bottom of aboutSection leaves top of viewport
            animation: t2, // Use the defined timeline for animation
            toggleActions: "play none none none", // Play animation when entering the viewport, do nothing when leaving
            once: true // Only play animation once
        });
        ScrollTrigger.create({
            trigger: aboutSection,
            start: "top top",
            end: window.innerWidth <= 768 ? "bottom top" : "+=300px top",

            onLeave: () => {
                gsap.to(".aboutMe", { x: 100, opacity: 0, duration: .5 });
                gsap.fromTo(".aboutImage", { x: 0, y: 0, rotateY: 0, opacity: 1 }, { opacity: 0, x: 200, y: -200, rotateY: -180, duration: 1 });
            },
            onEnterBack: () => {
                gsap.to(".aboutMe", { x: 0, opacity: 1, duration: 1 });
                gsap.fromTo(".aboutImage", { opacity: 0, x: 200, y: -200, rotateY: -90 }, { x: 0, y: 0, rotateY: 0, opacity: 1, duration: 1 });
            }
        });

    }, [user]);

    return (
        <section id="about" ref={aboutRef} className='lg:h-screen w-full pt-[5rem]  aboutSection flex text-left overflow-hidden flex-col lg:flex-row gap-6 lg:gap-0'>
            <div className='flex justify-center items-center w-full lg:w-1/2 h-full aboutImage'>
                <Image src={user?.about.avatar?.url} alt="ProfileImage" width={400} height={300} className='border-yellow-400 border-2 rounded-lg ProfileImage opacity-0 transform rotateY-90 h-[400px] w-[300px] lg:w-[400px] lg:h-[500px]' />
            </div>
            <div className='flex flex-col lg:flex-row justify-center items-center w-full lg:w-1/2 h-full aboutMe opacity-0'>
                <div className='flex flex-col gap-3'>
                    <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 ${poppins.className}`}>About Me</h1>
                    <h3 className='text-lg lg:text-2xl'>{user?.about?.subTitle}</h3>
                    <p className='text-gray-400'>{user?.about?.description}</p>
                    <div className='flex flex-wrap '>
                        <div className='w-1/2 mt-2'>Name : <span className='text-gray-400'>{user?.about?.name}</span></div>
                        <div className='w-1/2 mt-2'>Quote : <span className='text-gray-400'>{user?.about?.quote}</span></div>
                        <div className='w-1/2 mt-2'>Phone Number : <span className='text-gray-400'>{user?.about?.phoneNumber}</span></div>
                        <div className='w-1/2 mt-2'>Contact Email : <span className='text-gray-400'>{user?.about?.contactEmail}</span></div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default About