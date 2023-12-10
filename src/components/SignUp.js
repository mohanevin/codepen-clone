import React, { useState } from 'react'
import { FaEnvelope, FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const SignUp = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const handleEmailchange=(e)=>{
    setEmail(e.target.value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validate = emailRegex.test(e.target.value);
    setIsEmailValid(validate)
  }
  return (
    <div className='w-full flex flex-col items-center justify-center py-8'>
      <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="text-sm text-gray-300">Email</label>
          <div className='flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200'>
            <FaUser className="text-text555 text-2xl" />
            <input type='text' placeholder='Email' onChange={handleEmailchange} value={email} className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg" />
          </div>

          <label className="text-sm text-gray-300">Password</label>
          <div className='flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200'>
            <FaEnvelope className="text-text555 text-2xl" />
            <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)}  value={password} className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg" />
          </div>
          
        </div>
        {!isLogin ? (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center  w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Log In </p>
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center  w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign Up </p>
            </motion.div>
          )}
          {!isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Doesn't have an account ?
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Create here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already have an account !
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          )}

          
          <div className="flex items-center justify-center gap-12">
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className=" h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in with Google</p>
          </motion.div>
      </div>
    </div >

  )
}

export default SignUp