import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { FaChevronDown } from "react-icons/fa6";
import { signOut ,Menus} from '../utils/helper';
import { Link } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector((store) => store.user)
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <div className='flex items-center justify-center gap-4 relative'>
      <div className=' w-14 h-14 flex items-center justify-center gap-4 rounded-xl bg-emerald-500 cursor-pointer overflow-hidden'>
        {
          user?.photoURL ? (<> <motion.img src={user?.photoURL} alt={user?.photoURL} whileHover={{ scale: 1.2 }} /></>) : (<p className='capitalize text-xl text-white font-semibold'>{user?.email[0]}</p>)
        }
      </div>
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="px-4 py-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      >
        <FaChevronDown className="text-primaryText " />
      </motion.div>
      {showProfileMenu && (
        <motion.div
          className="bg-secondary px-4 py-3 rounded-xl shadow-md z-10 absolute top-16 right-0 flex flex-col items-start justify-start gap-4 min-w-[225px]"
        >
          {Menus &&
            Menus.map((menu) => (
              <Link
                className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
                to={menu.uri}
              >
                {menu.name}
              </Link>
            ))}
          <motion.p
            onClick={signOut}
            whileTap={{ scale: 0.9 }}
            className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
          >
            Sign out
          </motion.p>
        </motion.div>
      )}
    </div>
  )
}

export default UserProfile