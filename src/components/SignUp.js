import React, { useState } from 'react'
import { FaEnvelope, FaUser } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { motion ,AnimatePresence} from "framer-motion";
import { signINwithGoogle } from '../utils/helper';
import { auth } from '../config/firebase.config';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const handleEmailchange = (e) => {
    setEmail(e.target.value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validate = emailRegex.test(e.target.value);
    setIsEmailValid(validate)
  }


  const createNewuser = async () => {
    if (isEmailValid) {


      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }
  const loginWithEmail = async () => {
    if (isEmailValid) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          console.log(userCred?.user.uid);
        })
        .catch((err) => {
          console.log(err.message);
          if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMsg("Invalid Id : User Not Found");
          } else if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMsg("Password Mistach");
          } 
          else if(err.message.includes("invalid-credential"))
          {
            setAlert(true);
            setAlertMsg("Password Mistach");
          }
          else {
            setAlert(true);
            setAlertMsg("Temporarily disabled due to many failed login😕");
          }

          setInterval(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };
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
            <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg" />
          </div>

        </div>
        <AnimatePresence>
            {alert && (
              <motion.p 
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
               className="text-red-500">
                {alertMsg}
              </motion.p>
            )}
          </AnimatePresence>
        {!isLogin ? (
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={loginWithEmail}
            className="flex items-center justify-center  w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500"
          >
            <p className="text-xl text-white">Log In </p>
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={createNewuser}
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
          onClick={signINwithGoogle}
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