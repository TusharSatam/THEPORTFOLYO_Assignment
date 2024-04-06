import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Testimonial {
    image: { url: string };
    review: string;
    name: string;
    position: string;
}

const Testimonials = ({ user }: { user: { testimonials: Testimonial[] } }) => {
    // Ref for the testimonials container
    const testimonialsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Intersection observer options
        const options = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the element is visible
        };

        // Callback function for the intersection observer
        const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Apply GSAP animation to move the testimonial from the bottom
                    gsap.fromTo(entry.target, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.5 });
                    observer.unobserve(entry.target);
                }
            });
        };

        // Create the intersection observer
        const observer = new IntersectionObserver(handleIntersection, options);

        // Observe each testimonial element
        const testimonials = testimonialsRef.current?.querySelectorAll('.testimonial');
        if (testimonials) {
            testimonials.forEach((testimonial) => {
                observer.observe(testimonial);
            });
        }

        // Cleanup function
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section id="testimonial" className='w-full pt-[5rem] '>
            <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 `}>Testimonials</h1>
            <div ref={testimonialsRef} className='testimonials flex flex-row w-full flex-wrap my-8 justify-center lg:gap-4'>
                {user?.testimonials?.filter((e:any)=>e?.enabled).map((testimonial: Testimonial, index: number) => (
                    <div key={index} className='testimonial relative p-3 py-6 lg:w-[580px] flex gap-2 my-4 shadow-md  border boxSd rounded-2xl opacity-0'>
                        <Image priority src={testimonial?.image?.url} alt="reviewerImage" className=' w-[100px] h-[100px] rounded-full ' width={100} height={100} />
                        <div>
                            <p className='text-gray-400 text-sm lg:text-lg'>{testimonial?.review}</p>
                            <div className='reviewerInfo'>
                                <h4 className='font-semibold text-lg text-yellow-400'>{testimonial?.name}</h4>
                                <h4 className=' text-lg text-white'>{testimonial?.position}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
