import React from 'react'
import { useSelector } from 'react-redux'
import ProjectCard from './ProjectCard'

const Projects = () => {
  const projects=useSelector((store)=>store.projects)
  console.log(projects);
  return (
    <div className='w-full py-6 flex flex-wrap items-center justify-center gap-6'>
      {projects && projects.map((project,index)=>{
        return <ProjectCard key={project.id} project={project} index={index}/>
      })}
    </div>
  )
}

export default Projects