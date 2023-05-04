import { collection, documentId, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import PostRenderer from './PostRenderer'
import { db } from '../../firebase'

export default function Bookmarks({ user }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (user.bookmarks.length !== 0) {
            onSnapshot(
                query(collection(db, "posts"), where(documentId(), "in", user.bookmarks), orderBy("timeStamp", "desc")), (snapshot) => {
                    setPosts(snapshot.docs);
                })

        }
    }, [user.bookmarks])

    return (
        <div className={`flex flex-col w-fit border-l border-r h-fit`}>
            <div className={`flex flex-col min-w-[230px] w-[600px] max-w-[600px] relative  bg-white `}>
                <div onClick={() => { router.push("/") }} className='sticky top-0 w-full h-14 border-b bg-opacity-80 backdrop-blur z-30 bg-white border-gray-100'>
                    <div className='flex h-full items-center cursor-pointer'>
                        <div className="ml-4 flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200">
                            <BiArrowBack className=" text-xl" />
                        </div>
                        <div className='ml-4 cursor-pointer flex flex-col item-center h-full w-full '>
                            <h2 className="text-xl font-semibold my-auto pl-4" >Bookmarks</h2>

                        </div>

                    </div>
                </div>
            </div>
            <PostRenderer posts={posts} />
        </div>
    )
}
