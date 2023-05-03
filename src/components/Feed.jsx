import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'
import FeedTweet from '@/components/FeedTweet';
import Post from '@/components/Post';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"
import PostRenderer from './PostRenderer';

export default function Feed({ user }) {
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);
    const [feedSelector, setFeedSelector] = useState(true)

    function homeClick() {
        router.reload(router.asPath)
    }

    const [posts, setPosts] = useState([])
    const [posts2, setPosts2] = useState([])
    useEffect(() => {

        onSnapshot(
            query(collection(db, "posts"), orderBy("timeStamp", "desc")), (snapshot) => {
                // Delay the update by 1000ms (1 second)
                setTimeout(() => {
                    setPosts(snapshot.docs);
                }, 100);
            })

        if (user.following.length !== 0) {
            onSnapshot(query(collection(db, "posts"), where("userid", "in", user.following), orderBy("timeStamp", "desc")), (snapshot) => {
                // Delay the update by 1000ms (1 second)
                setTimeout(() => {
                    setPosts2(snapshot.docs);
                }, 100);
            })
        }

    }, [user.following])


    const allSelec = () => {
        setFeedSelector(true)
        router.asPath
    }
    const followSelec = () => {
        setFeedSelector(false)
        router.asPath
    }



    return (
        <div className={`flex flex-col min-w-[600px] max-w-[600px] relative bg-white border-l border-r h-full`}>
            <div className='sticky top-0 w-full h-28 border-b bg-opacity-80 backdrop-blur z-30 bg-white border-gray-100'>
                <div className='flex h-full flex-col'>
                    <div onClick={homeClick} className='cursor-pointer flex item-center h-1/2 w-full '>
                        <h2 className="text-xl font-semibold my-auto pl-4" >Home</h2>
                    </div>
                    <div className='h-1/2 transition-all duration-300 flex w-full justify-between'>
                        <div onClick={allSelec} className="transition-all duration-300 w-1/2 flex justify-center cursor-pointer transition-colors duration-300 hover:bg-gray-200">
                            <div className={`transition-all duration-300 min-w-0 header-btn ${feedSelector ? "border-b-4 border-blue-500" : "text-gray-400"}`}>All</div>
                        </div>
                        <div onClick={followSelec} className="transition-all duration-300 w-1/2 flex justify-center cursor-pointer hover:bg-gray-200">
                            <div className={`min-w-0 transition-all duration-300 header-btn ${!feedSelector ? "border-b-4 border-blue-500" : "text-gray-400"}`}>Following</div>
                        </div>
                    </div>
                </div>
            </div>
            <FeedTweet user={user} />
            {feedSelector ? <PostRenderer posts={posts} /> : <PostRenderer posts={posts2} />}
        </div>
    )
}
