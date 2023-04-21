import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiDotsHorizontalRounded, BiCheckShield, BiMessageRounded, BiSync, BiHeart, BiUpload } from "react-icons/bi"
import { BsDot } from "react-icons/bs"
import { db, storage } from '../../firebase'
import Moment from 'react-moment'
import { useSession } from 'next-auth/react'
import { deleteObject, ref } from 'firebase/storage'
import { useRouter } from 'next/router'


export default function CommentComp({ commentn, postId, link }) {
    const { data: session } = useSession();
    const commentData = commentn.data()
    const [postUser, setPostUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const docRef = doc(db, "users", commentData.userid);
            const docSnap = await getDoc(docRef);
            const user = docSnap.data();
            setPostUser(user); // update postUser state once data is fetched
        }

        fetchData();
    }, []);

    async function likeComment() {
        if (commentData.uidLiked.includes(session.user.uid)) {
            const index = commentData.uidLiked.indexOf(session.user.uid)
            commentData.uidLiked.splice(index, 1)
            updateDoc(doc(db, "comments", commentn.id), {
                uidLiked: commentData.uidLiked,
            })
        } else {
            commentData.uidLiked.push(session.user.uid)
            updateDoc(doc(db, "comments", commentn.id), {
                uidLiked: commentData.uidLiked,
            })
        }
    }

    async function deleteComment() {

        if (window.confirm("Are you sure?")) {
            if (commentData.userid === session.user.uid) {
                await deleteDoc(doc(db, "comments", commentn.id))
                if (commentData.postImg) {
                    deleteObject(ref(storage, `posts/${commentn.id}/image`))
                }
            } else {
                return
            }
        }
    }

    function linkMeOn() {
        if (link) {
            router.push(`../posts/${commentData.post}`)
        } else {
            return
        }
    }

    return (
        <div onClick={linkMeOn} key={commentData.id} className='w-full  flex-col border-b border-gray-200 cursor-pointer hover:bg-gray-50' >
            <div className='flex flex-row m-3'>
                <div onClick={(e) => e.stopPropagation()}>
                    {postUser && <img className='rounded-full object-cover h-12 w-12 cursor-pointer filter hover:saturate-50' onClick={() => router.push(`../profile/${postUser.uid}`)} src={postUser.userImg} alt="" />}
                </div>
                <div className='w-[515px] flex flex-col ml-3'>
                    <div className='flex justify-between'>
                        <div className='flex items-center' onClick={(e) => e.stopPropagation()}>
                            {postUser && <p className='font-bold text-sm cursor-pointer hover:underline' onClick={() => router.push(`../profile/${postUser.uid}`)}>{postUser.name}</p>}
                            {postUser && <p className='text-gray-500 ml-1 text-sm cursor-pointer' onClick={() => router.push(`../profile/${postUser.uid}`)}>@{postUser.username}</p>}
                            <BsDot className='text-gray-500' />
                            {commentData.timeStamp && <p className='text-gray-500 text-sm hover:underline cursor-pointer'>
                                <Moment fromNow>{(commentData.timeStamp.toDate() === "in a few seconds" ? "now" : commentData.timeStamp.toDate())}</Moment>
                            </p>}
                        </div>
                        <div >
                            <div className='text-gray-500 h-6 w-6 rounded-full cursor-pointer hover:bg-sky-100 group p-1' onClick={deleteComment}><BiDotsHorizontalRounded className='group-hover:text-sky-500' /></div>
                        </div>
                    </div>
                    <p className='col-span-2'>{commentData.text}</p>
                    {commentData.postImg && <div className='flex flex-grow mt-4 min-w-0 max-h-[510px] '><img className='object-scale-down  rounded-2xl cursor-pointer' src={commentData.postImg} /></div>}
                </div>

            </div >
            <div onClick={(e) => e.stopPropagation()} className='w-[550px] mb-4 flex ml-16 pl-2 pr-16'>
                {commentData.uidLiked.includes(session.user.uid) ? <div className='flex w-1/4 items-center text-sm text-red-500 text-center group rounded-full' onClick={likeComment} key={commentn.id}><BiHeart className='h-8 w-8 rounded-full group-hover:bg-red-100 p-2 mr-1' /> {commentData.uidLiked.length}</div> : <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500' onClick={likeComment} key={commentn.id}><BiHeart className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {commentData.uidLiked.length}</div>}
                <div className='flex w-1/4 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiUpload className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> </div>
            </div>
        </div >
    )
}
