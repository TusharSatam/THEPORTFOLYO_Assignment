import Image from 'next/image'
import React from 'react'
import { FaGithub } from "react-icons/fa";

const Projects = ({ user }: any) => {
    const  projects  = user?.projects.sort((a: any, b: any) => a.sequence - b.sequence).filter((e:any)=>e?.enabled);;
    return (
        <section id="projects" className='flex flex-col w-full pt-[5rem] gap-8'>
            <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 `}>Projects</h1>
            <h2 className='text-white underline text-lg lg:text-2xl'>Featured Projects</h2>
            <div className=' flex justify-center items-center flex-wrap projects mx-auto lg:w-[90%] gap-4'>
                {projects && projects?.map((project: any, index: number) => (
                    <div className='project w-full sm:w-[350px] rounded-lg  overflow-hidden border' key={index}>
                        <div className='w-full h-[200px] relative imageWrap group overflow-hidden'>
                            <div className='absolute left-0 top-0 bg-[#2c2a2a75] h-full w-full hidden group-hover:flex z-10 justify-center items-center'>
                                <a href={project?.githuburl} className='border border-yellow-400 px-4 py-2 flex gap-2 items-center font-semibold text-black bg-yellow-400'>View Code <FaGithub /></a>
                            </div>
                            <Image priority src={project?.image?.url} alt={project.title} width={300} height={300} className='w-full h-[200px] group-hover:scale-110 transition-transform' />
                        </div>
                        <div className='p-3'>
                            <h3 className='text-yellow-400'>{project?.title}</h3>
                            <h4>
                                {project?.techStack.map((tech: any, index: number) => (
                                    <span key={`${tech}${index}`}>{tech} {project?.techStack?.length - 1 !== index ? "," : ""}</span>
                                ))}
                            </h4>
                            <p className='text-sm text-gray-400'>{project?.description}</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </section>
    )
}

export default Projects