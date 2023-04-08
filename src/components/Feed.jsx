import { useRouter } from 'next/router'
import React, { useReducer } from 'react'
import FeedTweet from '@/components/FeedTweet';
import Post from '@/components/Post';

export default function Feed() {
    const router = useRouter();
    function homeClick() {
        router.reload()
    }

    const posts = [
        {
            id: 1,
            name: "Mikas Holm Lodberg",
            userName: "supermandmhl",
            userImg: "/hacker.jpg",
            img: "https://images.unsplash.com/photo-1524685794168-52985e79c1f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
            text: "Jeg kan godt lide Minecraft!",
            timeStamp: "2m",
            comments: 3268,
            reTweets: 10000,
            likes: 225611,
            views: 4500000,
            blue: true
        },
        {
            id: 2,
            name: "Allias Holm Lodberg",
            userName: "supermandahl",
            userImg: "/hacker.jpg",
            img: "",
            text: "Jeg vil have en HUGE i pet simulator!!!!!!",
            timeStamp: "Feb 21",
            comments: 7513,
            reTweets: 13051,
            likes: 425611,
            views: 1100000,
            blue: false
        },
        {
            id: 3,
            name: "Villas Holm Lodberg",
            userName: "supermandvhl",
            userImg: "/hacker.jpg",
            img: "https://images.unsplash.com/photo-1514313122851-5167c4fca5d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            text: "Jeg har bowlet idag, det var sjovt. sammen med jonathan",
            timeStamp: "4h",
            comments: 268,
            reTweets: 12000,
            likes: 25611,
            views: 500000,
            blue: true
        }
    ]
    // sm:ml-[65px] lg:ml-[275px]
    return (
        <div className='flex flex-col min-w-[230px] max-w-[600px]  bg-white border-l border-r  h-full'>
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
            <FeedTweet />
            {posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}
