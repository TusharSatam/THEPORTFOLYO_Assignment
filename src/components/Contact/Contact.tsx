import { poppins } from '@/app/page'
import React, { useRef } from 'react'
import { MdPhoneInTalk } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import gsap from 'gsap';

const Contact = ({ user }: any) => {
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const addressRef = useRef(null);

    const handleHover = (ref: any) => {
        gsap.to(ref.current, { y: -5, duration: 0.3 });
    };

    const handleHoverOff = (ref: any) => {
        gsap.to(ref.current, { y: 0, duration: 0.3 });
    };

    return (
        <section id="contact" className='pt-[5rem] flex  flex-col  gap-8 '>
            <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 ${poppins.className}`}>Contact</h1>
            <div className='flex flex-col-reverse lg:flex-row w-full min-h-[40vh] justify-center items-center gap-1 lg:gap-[3rem] mt-[1rem] lg:mt-[4rem] mb-[3rem] lg:mb-[8rem]'>
                <div className='form flex flex-col lg:flex-row justify-center items-center'>
                    <form>
                        <div className='flex gap-3 my-4 flex-col lg:flex-row'>
                            <div className='flex flex-col gap-3'>
                                <input placeholder='Full Name' type='text' required className='bg-transparent border-2 h-[40px] p-2 w-[300px]  border-gray-400' />
                                <input placeholder='Email Address' type='email' required className='bg-transparent border-2 h-[40px] p-2 w-[300px]  border-gray-400' />
                                <input placeholder='Subject' type='text' required className='bg-transparent border-2 h-[40px] p-2 w-[300px]  border-gray-400' />
                            </div>
                            <textarea placeholder='Message' className='bg-transparent resize-none border-2 w-[300px] p-2' />
                        </div>
                        <button className='bg-yellow-400 py-2 px-4 hover:bg-transparent hover:border-2 border-yellow-400 hover:text-white text-black font-semibold'>Send Message</button>
                    </form>
                </div>
                <div className='info flex flex-row flex-wrap lg:flex-nowrap lg:flex-col justify-center gap-3 '>
                    <div className='bg-gray-400 h-[100px] lg:h-[130px] min-w-[220px] lg:min-w-[300px] px-3 lg:px-6 flex justify-center items-center flex-col text-lg gap-3'
                        onMouseEnter={() => handleHover(emailRef)} onMouseLeave={() => handleHoverOff(emailRef)} ref={emailRef}>
                        <MdOutlineEmail className='text-3xl' />
                        {user?.about?.contactEmail}
                    </div>
                    <div className='bg-gray-400 h-[100px] lg:h-[130px] min-w-[220px] lg:min-w-[300px] px-3 lg:px-6 flex justify-center items-center flex-col text-lg gap-3'
                        onMouseEnter={() => handleHover(phoneRef)} onMouseLeave={() => handleHoverOff(phoneRef)} ref={phoneRef}>
                        <MdPhoneInTalk className='text-3xl' />
                        {user?.about?.phoneNumber}
                    </div>
                    <div className='bg-gray-400 h-[100px] lg:h-[130px] min-w-[220px] lg:min-w-[300px] px-3 lg:px-6 flex justify-center items-center flex-col text-lg gap-3'
                        onMouseEnter={() => handleHover(addressRef)} onMouseLeave={() => handleHoverOff(addressRef)} ref={addressRef}>
                        <FaRegAddressCard className='text-3xl' />
                        {user?.about?.address}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;
