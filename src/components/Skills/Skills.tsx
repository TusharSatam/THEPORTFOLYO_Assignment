import { poppins } from '@/app/page'
import Image from 'next/image';
import React from 'react'

const Skills = ({ user }: any) => {
  const Skills = user.skills.sort((a: any, b: any) => a.sequence - b.sequence);
  return (
    <section id="skills" className='flex flex-col w-full pt-[5rem] gap-8'>
      <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 ${poppins.className}`}>Skills</h1>
      <div className='flex justify-center items-center flex-wrap w-full gap-6'>

        {Skills && Skills?.map((skill: any, index: number) => (
          <div className='skillContainer flex flex-col w-[250px] gap-2' key={index}>
            <div className='flex justify-between'>
              <div className='flex gap-4'>{skill?.name}
                {skill?.image?.url ? <Image src={skill?.image?.url} alt={skill?.name} width={24} height={24} /> : null}
              </div>
              <span>{skill?.percentage}</span>
            </div>
            <progress value={skill?.percentage} max={100} className="progressBar w-full text-yellow-400  bg-yellow-400 border border-yellow-600" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills