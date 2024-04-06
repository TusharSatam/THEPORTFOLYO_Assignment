import { poppins } from '@/app/page';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TimeLine = ({ user }: any) => {
    const education = user?.timeline?.filter((ed: any) => ed?.forEducation === true && ed?.enabled);
    const experience = user?.timeline?.filter((ex: any) => ex?.forEducation === false);

    // Refs for each education and experience entry
    const educationRefs = useRef<Array<HTMLDivElement | null>>([]);
    const experienceRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        const options = {
            threshold: 0.5, // Trigger when 50% of the element is visible
        };

        // Function to animate an entry when it intersects with the viewport
        const animateEntry = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    gsap.fromTo(entry.target, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.5 });
                    observer.unobserve(entry.target);
                }
            });
        };

        // Create an intersection observer for education entries
        const educationObserver = new IntersectionObserver(animateEntry, options);
        educationRefs.current.forEach((ref) => {
            if (ref) {
                educationObserver.observe(ref);
            }
        });

        // Create an intersection observer for experience entries
        const experienceObserver = new IntersectionObserver(animateEntry, options);
        experienceRefs.current.forEach((ref) => {
            if (ref) {
                experienceObserver.observe(ref);
            }
        });

        // Cleanup function
        return () => {
            educationObserver.disconnect();
            experienceObserver.disconnect();
        };
    }, []);

    // Function to format date string to "Month Year" format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    return (
        <section id="timeline" className='flex flex-col w-full pt-[5rem] gap-8'>
            <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 ${poppins.className}`}>Timeline</h1>
            <div className='container flex flex-col lg:flex-row'>
                <div className='education w-full lg:w-1/2'>
                    <h2 className='text-xl underline mb-4'>Education</h2>
                    <div className='educationWrap'>
                        {education?.length > 0 &&
                            education?.map((ed: any, index: number) => (
                                <div
                                    className='flex flex-col lg:flex-row px-4 w-full opacity-0 border-l-2 lg:border-l-0 border-yellow-400 mb-3 lg:mb-0'
                                    ref={(el) => (educationRefs.current[index] = el!)}
                                    key={`${ed?.company_name}${index}`}
                                >
                                    <div className='hidden lg:flex flex-col Time lg:w-2/6 py-2'>
                                        <h3>{formatDate(ed?.startDate)} - {formatDate(ed?.endDate)}</h3>
                                        <p className='text-gray-400 text-sm'>{ed?.company_name}</p>
                                    </div>
                                    <div className='divider  hidden lg:flex w-1/6  flex-col justify-center items-center relative'>
                                        <span className='h-[10px] w-[10px] bg-black border-2 border-yellow-400 absolute top-[16px]  flex rounded-full'></span>
                                        <div className='h-full w-[5px] bg-yellow-400' />
                                    </div>
                                    <div className='details lg:w-3/6 py-2'>
                                        <h3>{ed?.jobTitle}</h3>
                                        <div className='flex flex-col lg:hidden Time lg:w-2/6 py-2'>
                                            <h3>{formatDate(ed?.startDate)} - {formatDate(ed?.endDate)}</h3>
                                            <p className='text-gray-400 text-sm'>{ed?.company_name}</p>
                                        </div>
                                        <p className='text-gray-400 text-sm'>{ed?.bulletPoints}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className='experience  w-full lg:w-1/2'>
                    <h2 className='text-xl underline mb-4'>Experience</h2>
                    <div className='experienceWrap '>
                        {experience?.length > 0 &&
                            experience?.map((ex: any, index: number) => (
                                <div
                                    className='flex flex-col lg:flex-row px-4 w-full opacity-0 border-l-2 lg:border-l-0 border-yellow-400 mb-3 lg:mb-0'
                                    ref={(el) => (experienceRefs.current[index] = el!)}
                                    key={`${ex?.company_name}${index}`}
                                >
                                    <div className='hidden lg:flex flex-col Time lg:w-2/6 py-2'>
                                        <h3>{formatDate(ex?.startDate)} - {formatDate(ex?.endDate)}</h3>
                                        <p className='text-gray-400 text-sm'>{ex?.company_name}</p>
                                    </div>
                                    <div className='divider hidden lg:flex w-1/6  flex-col justify-center items-center relative'>
                                        <span className='h-[10px] w-[10px] bg-black border-2 border-yellow-400 absolute top-[16px]  flex rounded-full'></span>
                                        <div className='h-full w-[5px] bg-yellow-400' />
                                    </div>
                                    <div className='details w-full lg:w-3/6 py-2'>
                                        <h3>{ex?.jobTitle}</h3>
                                        <div className='flex flex-col lg:hidden Time lg:w-2/6 py-2'>
                                            <h3>{formatDate(ex?.startDate)} - {formatDate(ex?.endDate)}</h3>
                                            <p className='text-gray-400 text-sm'>{ex?.company_name}</p>
                                        </div>
                                        <p className='text-gray-400 text-sm'>{ex?.bulletPoints}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimeLine;
