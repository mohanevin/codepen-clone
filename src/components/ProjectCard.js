import React from 'react'
import { motion } from 'framer-motion';

const ProjectCard = ({key,project,index}) => {
    return (
        <motion.div
            key={key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-start justify-start gap-4"
        >
            <div
                className="w-full h-full bg-primary rounded-md overflow-hidden"
                style={{ overflow: "hidden", height: "100%" }}
            >
                <iframe
                    title="Result"
                    srcDoc={project.output}
                    style={{ border: "none", width: "100%", height: "100%" }}
                />
            </div>
            <div className="flex items-center justify-start gap-3 w-full">
                <div className="w-14  h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
                    {project?.user?.photoURL ? (
                        <motion.img
                            whileHover={{ scale: 1.2 }}
                            src={project?.user?.photoURL}
                            alt=""
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <p className="text-xl text-white font-semibold capitalize">
                            {project?.user?.email[0]}
                        </p>
                    )}
                </div>

                <div>
                    <p className="text-white text-lg capitalize">{project?.title}</p>
                    <p className="text-primaryText text-sm capitalize">
                        {project?.user?.displayName
                            ? project?.user?.displayName
                            : `${project?.user.email.split("@")[0]}`}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default ProjectCard