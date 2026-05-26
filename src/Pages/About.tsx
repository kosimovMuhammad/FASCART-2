import AboutStats from '@/components/About/AboutStats'
import Section1 from '@/components/About/section1'
import TeamSlider from '@/components/About/TeamSlider'
import Features from '@/components/Hero/Features'
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <>
    <div className={cn('w-full', 'min-h-screen', 'bg-white', 'dark:bg-zinc-950')}>
      <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'w-full')}>
        
       <Section1/>
        <AboutStats/>
        <TeamSlider/>
        <Features/>
      </div>
    </div>
      


    </>
  )
}

export default About