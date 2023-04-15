import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'
import FeedTweet from '@/components/FeedTweet';
import Post from '@/components/Post';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"

export default function Feed({ user }) {
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);
    function homeClick() {
        router.reload(router.asPath)
    }

    const [posts, setPosts] = useState([])
    useEffect(() => {
        onSnapshot(
            query(collection(db, "posts"), orderBy("timeStamp", "desc")), (snapshot) => {
                // Delay the update by 1000ms (1 second)
                setTimeout(() => {
                    setPosts(snapshot.docs);
                }, 100);
            })
    }, [])


    return (
        <div className={`flex flex-col min-w-[230px] max-w-[600px] relative overflow-x-hidden  bg-white border-l border-r  h-full`}>
            <div className='sticky top-0 w-full h-28 border-b bg-opacity-80 backdrop-blur z-30 bg-white border-gray-100'>
                <div className='flex h-full flex-col'>
                    <div onClick={homeClick} className='cursor-pointer flex item-center h-1/2 w-full '>
                        <h2 className="text-xl font-semibold my-auto pl-4" >Home</h2>
                    </div>
                    <div className='h-1/2 flex w-full justify-between'>
                        <div className="w-1/2 flex justify-center cursor-pointer transition-colors duration-300 hover:bg-gray-200">
                            <button className='min-w-0 header-btn border-b-4 border-blue-500'>For you</button>
                        </div>
                        <div className="w-1/2 flex justify-center cursor-pointer transition-colors duration-300 hover:bg-gray-200">
                            <button className='header-btn text-gray-400'>Following</button>
                        </div>
                    </div>
                </div>
            </div>
            <FeedTweet user={user} />
            <AnimatePresence>
                {posts.map((post) => (
                    <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <Post post={post} key={post.id} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
