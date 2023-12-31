import React, { useState } from 'react'
import { HiChevronDoubleLeft } from 'react-icons/hi2'
import { motion } from 'framer-motion'
import { Link, Outlet } from 'react-router-dom'
import { logo } from '../assets'
import { MdHome } from "react-icons/md";
import { FaChevronDown, FaSearchengin } from "react-icons/fa6";
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase.config'
import { useNavigate } from 'react-router-dom'
import {  collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,} from 'firebase/firestore'
import Spinner from './Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { adduser } from '../redux/userSlice'
import UserProfile from './UserProfile'
import { addProjects } from '../redux/projectSlice'

const Home = () => {
    const user=useSelector((store)=>store.user)
    console.log(user);
    const [toggleSideBar, setToggleSideBar] = useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const navigate = useNavigate()
    const dispatch=useDispatch()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user.providerData[0]);
                setDoc(doc(db,"users",user?.uid),user.providerData[0]).then(()=>{
                    dispatch(adduser(user.providerData[0]))
                    navigate("/home/projects",{replace:true})
                })
            }
            else {
                navigate("/home/auth",{replace:true})
            }
            setInterval(() => {
                setIsLoading(false);
              }, 2000);
        })
        return ()=> unsubscribe()
    }, [])

    useEffect(() => {
        const projectQuery = query(
          collection(db, "Projects"),
          orderBy("id", "desc")
        );
    
        const unsubscribe = onSnapshot(projectQuery, (querySnap) => {
          const projectsList = querySnap.docs.map((doc) => doc.data());
          dispatch(addProjects(projectsList));
        });
    
        return unsubscribe;
      }, []);
    return (
        <> {isLoading?<div className='w-screen h-screen flex items-center justify-center'><Spinner/></div>:
            <>
            <div className={`w-2 ${toggleSideBar ? "w-2" : "flex-[.2] xl:flex-[.2]"} min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}>
                <motion.div whileTap={{ scale: .9 }} onClick={() => setToggleSideBar(!toggleSideBar)} className='w-8 h-8 bg-secondary absolute -right-6 rounded-tr-lg rounded=br-lg cursor-pointer flex items-center justify-center'>
                    <HiChevronDoubleLeft className='text-white text=xl' />
                </motion.div >
                <div className='overflow-hidden w-full flex flex-col gap-4'>
                    <Link to="/">
                        <img className='w-72 h-auto object-contain' src={logo} alt='logo' />
                    </Link>
                    <Link to="/newproject">
                        <div className='flex items-center justify-center border border-gray-400 rounded-xl px-6 py-3'>
                            <p className='text-white'>Start Coding</p>
                        </div>
                    </Link>
                    {user && <Link
                        to="/home/projects"
                        className="flex items-center justify-center gap-6"
                    >
                        <MdHome className="text-xl text-primaryText" />
                        <p className="text-lg text-primaryText">Home</p>
                    </Link>}

                </div>
            </div>
            <div className='flex-1 min-h-screen max-h-screen overflow-y-scroll w-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12'>
                <div className='w-full flex items-center justify-center gap-3'>
                    <div className='px-4 py-3 rounded-md bg-secondary w-full flex items-center justify-start gap-3'>
                        <FaSearchengin className="text-2xl text-primaryText" />
                        <input className='flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600' placeholder='Search....' />
                    </div>
                    {!user && (
                        <div className="flex items-center justify-center gap-3">
                            <Link
                                to={"/home/auth"}
                                className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                {user && <UserProfile/>}
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
            </>
            }
        </>
    )
}

export default Home