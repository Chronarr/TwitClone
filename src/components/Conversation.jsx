import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase';
import MessageComp from './MessageComp';
import { BiAlignRight, BiSend } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { TextareaAutosize } from '@mui/material';

export default function Conversation({ activeConvo, user }) {
  const [messages, setMessages] = useState([])
  const scroller = useRef()
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    scroller.current?.scrollIntoView({ behavior: "smooth" });
  }

  const submitComment = async () => {

    if (loading) return;

    setLoading(true)

    const docRef = await addDoc(collection(db, `conversations/${activeConvo[0]}/messages`), {
      from: user.uid,
      read: false,
      text: input,
      timeStamp: serverTimestamp()
    })

    updateDoc(doc(db, "users", activeConvo[1].uid), {
      newDm: true
    })

    setInput("")
    setLoading(false)
  }

  useEffect(() => {

    if (!loading) {
      onSnapshot(
        query(collection(db, `conversations/${activeConvo[0]}/messages`), orderBy("timeStamp", "asc")), (snapshot) => {
          setMessages(snapshot.docs);
        })

    }

  }, [loading])


  return (
    <div className='w-[600px] flex flex-col border-r max-h-screen'>
      <div className='overflow-y-auto overflow-x-hidden'>
        <div className='flex justify-end sticky top-0 bg-opacity-80 backdrop-blur z-30 bg-white h-12 items-center'><BiAlignRight className='h-4 w-4 mr-2 cursor-pointer' /></div>
        {activeConvo[1] &&
          <div onClick={() => { router.push(`/profile/${activeConvo[1].uid}`) }} className="flex cursor-pointer h-[220px] space-y-1 items-center border-b flex-col w-full hover:bg-slate-100">
            <img className='rounded-full object-cover h-16 w-16 cursor-pointer filter hover:saturate-50' src={activeConvo[1].userImg} alt="" />
            <div>
              <p className='font-bold'>{activeConvo[1].name}</p>
              <p className='text-gray-400'>@{activeConvo[1].username}</p>
            </div>
            <p>Following: {user.following.includes(activeConvo[1].uid) ? "Yes" : "No"}</p>
            <p>Followed by: {user.followers.includes(activeConvo[1].uid) ? "Yes" : "No"}</p>
            <div onClick={(e) => e.stopPropagation()}>
              <p className='cursor-pointer text-slate-500' onClick={scrollToBottom}> -- Scroll to bottom --</p>
            </div>
          </div>}
        <div className=' flex-1 border-b'>{messages.map((dmdata) => (
          <MessageComp dmdata={dmdata} user={user} activeConvo={activeConvo} key={dmdata.id} />
        ))}</div>
        <div ref={scroller} />

      </div>
      <div className=' w-[90%] h-fit my-4 px-4 sticky bottom-0 mx-auto bg-gray-200 flex items-center  rounded-2xl'>
        {loading &&
          <div className="bg-gray-200 opacity-50 w-full h-full absolute flex inset-0 justify-center items-center z-10">
            <div className="loader opacity-100">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        }
        <TextareaAutosize
          className="w-full py-4 bg-transparent outline-none resize-none"
          placeholder="What's happening?"
          value={input}
          onChange={(e) => setInput(e.target.value)} />
        <BiSend className='h-5 w-5 cursor-pointer'
          onClick={submitComment}
          disabled={!input.trim()} />
      </div>
    </div>
  )
}
