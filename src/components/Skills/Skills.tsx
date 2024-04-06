import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Skills = ({ user }: any) => {
  const skills = user.skills.sort((a: any, b: any) => a.sequence - b.sequence).filter((e:any)=>e?.enabled);;
  const skillsRef = useRef<HTMLDivElement>(null);

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

    const skillElements = skillsRef.current?.querySelectorAll('.skillContainer');
    if (skillElements) {
      skillElements.forEach((skillElement) => {
        observer.observe(skillElement);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="skills" className='flex flex-col w-full pt-[5rem] gap-8'>
      <h1 className={`text-xl font-semibold lg:text-3xl text-yellow-400 `}>Skills</h1>
      <div ref={skillsRef} className='flex justify-center items-center flex-wrap w-full gap-6'>
        {skills && skills.map((skill: any, index: number) => (
          <div key={`${skill?.name}${index}`} className='skillContainer flex flex-col w-[250px] gap-2 opacity'>
            <div className='flex justify-between'>
              <div className='flex gap-4'>{skill?.name}
                {skill?.image?.url ? <img src={skill?.image?.url} alt={skill?.name} width={24} height={24} className={`${skill?.name==="Three.js" || skill?.name==="Vercel"?"bg-white rounded-lg":""}`}/> : null}
              </div>
              <span>{skill?.percentage}</span>
            </div>
            <progress value={skill?.percentage} max={100} className="progressBar w-full text-yellow-400 bg-yellow-400 border border-yellow-600" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
