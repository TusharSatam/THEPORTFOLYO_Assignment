import { poppins } from '@/app/page';
import Image from 'next/image';
import React from 'react';

interface Testimonial {
    image: { url: string };
    review: string;
    name: string;
    position: string;
}

const Testimonials = ({ user }: { user: { testimonials: Testimonial[] } }) => {
    return (
        <section id="testimonial" className='w-full lg:pt-[8rem] pt-[2rem] '>
            <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 ${poppins.className}`}>Testimonials</h1>
            <div className='testimonials flex flex-row w-full flex-wrap my-8'>
                {user?.testimonials?.map((testimonial: Testimonial, index: number) => (
                    <div key={index} className='testimonial relative p-3 lg:w-1/2 flex gap-2 my-4 shadow-md boxSd rounded-2xl'>
                        <Image src={testimonial?.image?.url} alt="reviewerImage" className=' w-[100px] h-[100px] rounded-full ' width={100} height={100} />
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
