import React, { useEffect, useRef } from 'react';
import { MdAppSettingsAlt } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { LuFigma } from "react-icons/lu";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { poppins } from '@/app/page';
import gsap from 'gsap';

interface Service {
  name: string;
  desc: string;
}

const Services = ({ user }: any) => {
  const services = user?.services.filter((e:any)=>e?.enabled);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 });
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const serviceElements = servicesRef.current?.querySelectorAll('.service');
    if (serviceElements) {
      serviceElements.forEach((serviceElement) => {
        observer.observe(serviceElement);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="services" className='w-full flex flex-col gap-5 pt-[5rem]'>
      <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 ${poppins.className}`}>Services</h1>
      <h2 className='text-white underline text-lg lg:text-2xl'>What I Do</h2>
      <div ref={servicesRef} className='services flex flex-wrap'>
        {services?.map((service: Service, index: number) => (
          <div key={index} className='service flex flex-row justify-start items-center gap-2 w-full lg:w-1/2 p-2 border-gray-400 border-l-2 mt-6 lg:mt-2 opacity-0'>
            {service?.name === "App Development" ? <MdAppSettingsAlt className='text-4xl w-1/4 lg:text-4xl' /> : service?.name === "Web & App " ? <CgWebsite className='text-4xl w-1/4 lg:text-4xl' /> : service?.name === "UI/UX Solutions" ? <LuFigma className='text-4xl w-1/4 lg:text-4xl' /> : <SiHomeassistantcommunitystore className='text-4xl w-1/4 lg:text-4xl' />}
            <div className='w-3/4'>
              <h3 className='text-lg md:text-xl text-yellow-400'>{service?.name}</h3>
              <p className='text-gray-400 text-sm md:text-lg'>{service?.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
