import React, { useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { BiImageAdd, BiPoll, BiSmile, BiCalendar, BiMap, BiTrash } from "react-icons/bi"
import { useSession } from 'next-auth/react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';


export default function FeedTweet({ user }) {
    const { data: session } = useSession();
    const [input, setInput] = useState("");
    const [fileRef, setFileRef] = useState(null);
    const [loading, setLoading] = useState(false);
    const imgPickerRef = useRef(null);

    const submitTweet = async () => {

        if (loading) return;

        setLoading(true)

        const docRef = await addDoc(collection(db, "posts"), {
            userid: session.user.uid,
            text: input,
            timeStamp: serverTimestamp(),
            comments: [],
            uidReTweets: [],
            uidLiked: [],
        })


        const imageRef = ref(storage, `posts/${docRef.id}/image`);
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
        <div className='w-full border-b border-gray-200 min-h-36 mt-2 px-6 relative flex'>
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
                <img className='rounded-full object-cover h-12 w-12 cursor-pointer filter hover:saturate-50' src={user.userImg} alt="" />
            </div>
            <div className='flex-1'>
                <div className='flex flex-col items-center min-h-[56px] w-full'>
                    <TextareaAutosize
                        maxLength="280" className="w-full ml-4 text-xl outline-none resize-none"
                        placeholder="What's happening?"
                        value={input}
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
                <div className='h-14 ml-2 flex  mt-2 min-w-full bottom-0 justify-between  border-t border-gray-200'>
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
                        <button className='mr-2 rounded-full bg-sky-300 text-white w-20 h-8 my-auto pb-1 font-bold disabled:opacity-50' onClick={submitTweet} disabled={!input.trim()}>Tweet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
