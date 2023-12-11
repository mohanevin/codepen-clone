import React ,{useState, useEffect} from 'react'
import SplitPane from 'react-split-pane'
import { FaChevronDown, FaCss3, FaHeart, FaHtml5, FaJs } from "react-icons/fa6";
import { FcSettings } from "react-icons/fc";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const Newproject = () => {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [output, setOutput] = useState("");

    useEffect(() => {
        updateOutput();
      }, [html, css, js]);
    
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
                                    <CodeMirror height="600px" value={html} theme={"dark"} extensions={[javascript({ jsx: true })]} onChange={(val, viewUpdate) => {setHtml(val) }} />;
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
                                        <CodeMirror height="600px" value={css} theme={"dark"} extensions={[javascript({ jsx: true })]} onChange={(val, viewUpdate) => {setCss(val) }} />;
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
                                        <CodeMirror height="600px" value={js} theme={"dark"} extensions={[javascript({ jsx: true })]} onChange={(val, viewUpdate) => { setJs(val)}} />;
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