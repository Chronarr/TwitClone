import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"
import Modal from "react-modal"
import { BiX } from "react-icons/bi"
import { postDataState } from "../../atom/modalPostDataAtom.js"
import { postUserState } from "../../atom/modalPostUserAtom.js"
import { postIdState } from '../../atom/modalPostIdAtom.js'
import Moment from 'react-moment'
import { BsDot } from "react-icons/bs"
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from 'next-auth/react'
import { BiImageAdd, BiPoll, BiSmile, BiCalendar, BiMap, BiTrash } from "react-icons/bi"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router.js'


export default function CommentModal({ user }) {
    const [open, setOpen] = useRecoilState(modalState);
    const [postData, setPostData] = useRecoilState(postDataState);
    const [postUser, setPostUser] = useRecoilState(postUserState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [fileRef, setFileRef] = useState(null);
    const [loading, setLoading] = useState(false);
    const imgPickerRef = useRef(null);
    const router = useRouter();
    function closeModal() {
        setOpen(false)
        setPostData({})
        setPostUser({})
    }

    const submitComment = async () => {

        if (loading) return;

        setLoading(true)

        const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
            userid: session.user.uid,
            text: input,
            timeStamp: serverTimestamp(),
            uidLiked: [],
            uidRetweet: []
        })


        const imageRef = ref(storage, `posts/${postId}/${docRef.id}/image`);
        if (fileRef) {
            await uploadString(imageRef, fileRef, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    postImg: downloadURL
                })
            })

        }

        setInput("")
        setLoading(false)
        setFileRef(null)
        closeModal()
        router.push(`/posts/${postId}`)
    }


    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setFileRef(readerEvent.target.result)
        }


    }

    return (

        <div>{open && (

            <Modal
                style={{ overlay: { zIndex: 100 } }}
                isOpen={open}
                onRequestClose={closeModal}
                className="sm:max-w-2xl w-screen h-screen sm:w-[90%] sm:h-fit sm:absolute sm:top-24 sm:left-[50%] sm:translate-x-[-50%] bg-white border px-4 pt-4 border-gray-200 outline-none rounded-2xl shadow-xl overflow-hidden">
                <div className='h-9 w-9 rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center' onClick={closeModal}>
                    <BiX className='h-7 w-7' />
                </div>
                <div className='flex flex-row m-3'>
                    <div className='flex flex-col flex-1 max-w-[48px]'>
                        {postUser && <img className='rounded-full flex object-cover h-12 w-12 cursor-pointer filter hover:saturate-50' src={postUser.userImg} alt="" />}
                        <div className='flex-1 w-0.5 text-transparent mx-auto bg-gray-300  mt-1'>.</div>

                    </div>
                    <div className='w-[515px] flex flex-col ml-3'>
                        <div className='flex justify-between'>
                            <div className='flex items-center'>
                                {postUser && <p className='font-bold text-sm cursor-pointer hover:underline'>{postUser.name}</p>}
                                {postUser && <p className='text-gray-500 ml-1 text-sm cursor-pointer'>@{postUser.username}</p>}
                                <BsDot className='text-gray-500' />
                                {postData.timeStamp && <p className='text-gray-500 text-sm hover:underline cursor-pointer'>
                                    <Moment fromNow>{(postData.timeStamp.toDate() === "in a few seconds" ? "now" : postData.timeStamp.toDate())}</Moment>
                                </p>}
                            </div>
                        </div>
                        <p>{postData.text} {postData.postImg ? `${postData.postImg}` : ""}</p>
                        <span className='mt-4 mb-6 text-gray-500'>Replying to <span className='text-sky-400 cursor-pointer'>@{postUser.username}</span></span>
                    </div>

                </div >
                <div className='w-full min-h-36  px-3 relative flex'>
                    {loading &&
                        <div className="bg-gray-200 opacity-50 w-full h-full absolute flex inset-0 justify-center items-center z-10">
                            <div className="loader opacity-100">
                                <div class="circle"></div>
                                <div class="circle"></div>
                                <div class="circle"></div>
                                <div class="circle"></div>
                            </div>
                        </div>
                    }
                    <div>
                        <img className='rounded-full object-cover -mt-2 h-12 w-12 cursor-pointer filter hover:saturate-50' src={user.userImg} alt="" />
                    </div>
                    <div className='flex-1'>
                        <div className='flex flex-col items-center min-h-[56px] w-full'>
                            <TextareaAutosize
                                maxLength="280" className="w-full ml-8 mt-2 text-xl outline-none resize-none"
                                placeholder="Tweet your reply"
                                value={input}
                                autoFocus={true}
                                onChange={(e) => setInput(e.target.value)} />
                            {fileRef &&
                                <div className='group relative items-center justify-center'>
                                    <img className='object-scale-down mb-2 mt-6 rounded-2xl cursor-pointer group-hover:grayscale' src={fileRef} />
                                    <div className='absolute inset-0 justify-center items-center z-10 hidden group-hover:flex'>
                                        <BiTrash className='text-4xl text-sky-500 cursor-pointer' onClick={() => setFileRef("")} />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='h-14 ml-2 flex mt-2 min-w-full bottom-0 justify-between'>
                            <div className='flex items-center'>
                                <div onClick={() => imgPickerRef.current.click()}>
                                    <BiImageAdd className='text-sky-500 h-9 w-9 p-2 rounded-full hover:bg-sky-100 cursor-pointer' />
                                    <input
                                        type="file"
                                        className='hidden'
                                        ref={imgPickerRef}
                                        accept="image/*"
                                        onChange={addImageToPost}
                                    />
                                </div>
                                <BiPoll className='text-sky-500 h-9 w-9 p-2 hidden sm:inline-grid rounded-full hover:bg-sky-100 cursor-pointer' />
                                <BiSmile className='text-sky-500 h-9 w-9 p-2 rounded-full hover:bg-sky-100 cursor-pointer' />
                                <BiCalendar className='text-sky-500 h-9 w-9 p-2 rounded-full hidden sm:inline-grid hover:bg-sky-100 cursor-pointer' />
                                <BiMap className='text-sky-500 h-9 w-9 p-2 rounded-full hover:bg-sky-100 cursor-pointer' />
                            </div>
                            <div className='flex h-full item-center'>
                                <p className='mt-3.5 mr-2 text-center'>{input.trim().length}/280</p>
                                <button className='mr-2 rounded-full bg-sky-300 text-white w-20 h-8 my-auto pb-1 font-bold disabled:opacity-50' onClick={submitComment} disabled={!input.trim()}>Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )}
        </div>
    )
}
