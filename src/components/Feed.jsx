import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'
import FeedTweet from '@/components/FeedTweet';
import Post from '@/components/Post';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Feed({ user }) {
    const router = useRouter();
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
                }, 1000);
            })
    }, [])


    return (
        <div className='flex flex-col min-w-[230px] max-w-[600px] overflow-y-auto overflow-x-hidden bg-white border-l border-r  h-full'>
            <header className='sticky w-full h-28 border-b flex flex-col top-0 bg-opacity-80 backdrop-blur z-50 bg-white border-gray-100'>
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
            </header>
            <FeedTweet user={user} />
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}
