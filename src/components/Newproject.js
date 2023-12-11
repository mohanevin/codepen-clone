import React, { useState, useEffect } from 'react'
import SplitPane from 'react-split-pane'
import { FaChevronDown, FaCss3, FaHeart, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Link } from 'react-router-dom'
import { logo } from '../assets'
import { motion } from 'framer-motion'
import { MdCheck, MdOutlineEdit } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import UserProfile from './UserProfile';
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'


const Newproject = () => {
    const user=useSelector((store)=>store.user)
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [output, setOutput] = useState("");
    const [title, setTitle] = useState("Untitled");
    const [isTitle, setIsTitle] = useState(false);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        updateOutput();
    }, [html, css, js]);
    const saveProgram = async () => {
        const id = `${Date.now()}`;
        const _doc = {
          id: id,
          title: title,
          html: html,
          css: css,
          js: js,
          output: output,
          user: user,
        };
    
        console.log(_doc);
        await setDoc(doc(db, "Projects", id), _doc)
          .then((res) => {
            setAlert(true);
          })
          .catch((err) => console.log(err));
        setInterval(() => {
          setAlert(false);
        }, 3000);
      };
    const updateOutput = () => {
        const combinedOutput = `
          <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
          </html>
        `;
        setOutput(combinedOutput);
    };
    return (
        <>
            <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>
                {alert && <Alert status={"Success"} alertMsg={"Project Saved..."} />}
                <header className="w-full flex items-center justify-between px-12 py-4 ">
                    <div className="flex items-center justify-center gap-6">
                        <Link to={"/home/projects"}>
                            <img className="w-32 h-auto object-contain" src={logo} />
                        </Link>
                        <div className="flex flex-col items-start justify-start">
                            {/* title */}
                            <div className="flex items-center justify-center gap-3">
                                {isTitle ? (
                                    <motion.input
                                        key={"TitleInput"}
                                        type="text"
                                        className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base  outline-none border-none"
                                        placeholder="Your Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                ) : (
                                    <motion.p
                                        key={"TitleLabel"}
                                        className="px-3 py-2  text-white text-lg"
                                    >
                                        {title}
                                    </motion.p>
                                )}


                                {isTitle ? (
                                    <motion.div
                                        key={"MdCheck"}
                                        className="cursor-pointer"
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsTitle(false)}
                                    >
                                        <MdCheck className="text-2xl text-emerald-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={"MdEdit"}
                                        className="cursor-pointer"
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsTitle(true)}
                                    >
                                        <MdOutlineEdit className="text-2xl text-primaryText" />
                                    </motion.div>
                                )}

                            </div>
                            
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={saveProgram}
                            className="px-4 py-4 bg-primaryText rounded-xl cursor-pointer text-base text-primary font-semibold"
                        >
                            Save
                        </motion.button>
                        {user && <UserProfile/>}
                    </div>
                </header>
                <div>
                    <SplitPane split='horizontal' minSize={100} maxSize={-100} defaultSize={"50%"}>
                        <SplitPane split='vertical' minSize={500}>
                            <div className="w-full h-full flex flex-col items-start justify-start">
                                <div className="w-full flex items-center justify-between">
                                    <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                                        <FaHtml5 className="text-xl text-red-500" />
                                        <p className="text-primaryText font-semibold border-t-gray-500">
                                            HTML
                                        </p>
                                    </div>
                                    <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                                        <FcSettings className="text-xl" />
                                        <FaChevronDown className="text-xl text-primaryText" />
                                    </div>
                                </div>
                                <div className='w-full px-2'>
                                    <CodeMirror height="600px" value={html} theme={"dark"} extensions={[javascript({ jsx: true })]} onChange={(val, viewUpdate) => { setHtml(val) }} />;
                                </div>
                            </div>
                            <SplitPane split='vertical' minSize={500}>
                                <div className="w-full h-full flex flex-col items-start justify-start">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                                            <FaCss3 className="text-xl text-sky-500" />
                                            <p className="text-primaryText font-semibold border-t-gray-500">
                                                CSS
                                            </p>
                                        </div>
                                        <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                                            <FcSettings className="text-xl" />
                                            <FaChevronDown className="text-xl text-primaryText" />
                                        </div>
                                    </div>
                                    <div className='w-full px-2'>
                                        <CodeMirror height="600px" value={css} theme={"dark"} extensions={[javascript({ jsx: true })]} onChange={(val, viewUpdate) => { setCss(val) }} />;
                                    </div>
                                </div>
                                <div className="w-full h-full flex flex-col items-start justify-start">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                                            <FaJs className="text-xl text-yellow-500" />
                                            <p className="text-primaryText font-semibold border-t-gray-500">
                                                JS
                                            </p>
                                        </div>
                                        <div className="cursor-pointer flex items-center justify-center gap-4 px-4">
                                            <FcSettings className="text-xl" />
                                            <FaChevronDown className="text-xl text-primaryText" />
                                        </div>
                                    </div>
                                    <div className='w-full px-2'>
                                        <CodeMirror height="600px" value={js} theme={"dark"} extensions={[javascript({ jsx: true })]} onChange={(val, viewUpdate) => { setJs(val) }} />;
                                    </div>
                                </div>
                            </SplitPane>
                        </SplitPane>
                        <div className='bg-white' style={{ overflow: "hidden", height: "100%" }}>
                            <iframe
                                title='Result'
                                srcDoc={output}
                                style={{ border: "none", width: "100%", height: "100%" }}
                            >

                            </iframe>
                        </div>
                    </SplitPane>
                </div>

            </div>
        </>
    )
}

export default Newproject