import React from 'react'
import { MdAppSettingsAlt } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { LuFigma } from "react-icons/lu";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { poppins } from '@/app/page';
interface Service {
  name: string;
  desc: string;
}
const Services = ({ user }: any) => {
  const services = user?.services

  return (
    <section id="services" className=' w-full flex flex-col gap-5 pt-[8rem]'>
      <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 ${poppins.className}`}>Services</h1>
      <h2 className='text-white underline text-lg lg:text-2xl'>What I Do</h2>
      <div className='services flex flex-wrap '>
        {services?.map((service: Service) => (
          <div className='service flex flex-row  justify-start items-center gap-2 w-full lg:w-1/2 p-2 border-gray-400 border-l-2 mt-6 lg:mt-2'>
            {service?.name === "App Development" ? <MdAppSettingsAlt className='text-4xl w-1/4 lg:text-4xl' /> : service?.name === "Web & App " ? <CgWebsite className='text-4xl w-1/4 lg:text-4xl' /> : service?.name === "UI/UX Solutions" ? <LuFigma className='text-4xl w-1/4 lg:text-4xl' /> : <SiHomeassistantcommunitystore className='text-4xl w-1/4 lg:text-4xl' />}
            <div className='w-3/4'>
              <h3 className='text-lg md:text-xl text-yellow-400'>{service?.name}</h3>
              <p className='text-gray-400 text-sm md:text-lg'>{service?.desc}</p>
            </div>
          </div>
        ))
        }


      </div>
    </section>
  )
}

export default Services