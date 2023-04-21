import { deleteDoc, doc, getDoc, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiDotsHorizontalRounded, BiCheckShield, BiMessageRounded, BiSync, BiHeart, BiUpload } from "react-icons/bi"
import { BsDot } from "react-icons/bs"
import { db, storage } from '../../firebase'
import Moment from 'react-moment'
import { useSession } from 'next-auth/react'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import PostPageHeader from './PostPageHeader'
import PostPageTweet from './PostPageTweet'
import { AnimatePresence, motion } from 'framer-motion'
import CommentComp from './CommentComp'






export default function Post({ postId, user }) {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [postUser, setPostUser] = useState(null);
  const [postData, setPostData] = useState(null);
  const [comments, setComments] = useState([])

  useEffect(() => {

    onSnapshot(doc(db, "posts", postId), (doc2) => {
      setPostData(doc2.data())
    })


  }, []);

  useEffect(() => {
    async function fetchData() {
      if (postData && postData.userid) { // Add a check for postData
        const docRef = doc(db, "users", postData.userid);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        setPostUser(user);
      }
    }
    fetchData();
  }, [postData]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "comments"), where("post", "==", `${postId}`), orderBy("timeStamp", "desc")), (snapshot) => {
        setComments(snapshot.docs);
      })
  }, [])

  async function likePost() {
    if (postData.uidLiked.includes(session.user.uid)) {
      const index = postData.uidLiked.indexOf(session.user.uid)
      postData.uidLiked.splice(index, 1)
      updateDoc(doc(db, "posts", postId), {
        uidLiked: postData.uidLiked,
      })
    } else {
      postData.uidLiked.push(session.user.uid)
      updateDoc(doc(db, "posts", postId), {
        uidLiked: postData.uidLiked,
      })
    }
  }

  async function deletePost() {

    if (window.confirm("Are you sure?")) {
      if (postData.userid === session.user.uid) {
        await deleteDoc(doc(db, "posts", postId))
        if (postData.postImg) {
          deleteObject(ref(storage, `posts/${postId}/image`))
        }
      } else {
        return
      }
    }
  }

  function openModal() {
    setModalPostData(postData)
    setModalPostUser(postUser)
    setModalPostId(postId)
    setOpen(true)
  }

  return (
    <div className={`flex flex-col min-w-[230px] max-w-[600px] relative bg-white border-l border-r h-full`}>
      <PostPageHeader />
      {postData && <div key={postId} className='w-full  flex-col border-b border-gray-200'>
        <div className='flex flex-row m-3'>
          <div>
            {postUser && <img className='rounded-full object-cover h-12 w-12 cursor-pointer filter hover:saturate-50' src={postUser.userImg} alt="" />}
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
              <div className='text-gray-500 h-6 w-6 rounded-full cursor-pointer hover:bg-sky-100 group p-1' onClick={deletePost}><BiDotsHorizontalRounded className='group-hover:text-sky-500' /></div>
            </div>
            <p className='col-span-2'>{postData.text}</p>
            {postData.postImg && <div className='flex flex-grow mt-4 min-w-0 max-h-[510px] '><img className='object-scale-down  rounded-2xl cursor-pointer' src={postData.postImg} /></div>}
          </div>

        </div >
        <div className='w-[550px] mb-4 flex ml-16 pl-2'>
          <div className='flex w-24  items-center text-sm text-gray-500 text-center group hover:text-sky-500' onClick={openModal}><BiMessageRounded className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {comments.length}</div>
          <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiSync className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {postData.uidReTweets.length}</div>
          {postData.uidLiked.includes(session.user.uid) ? <div className='flex w-28 items-center text-sm text-red-500 text-center group rounded-full' onClick={likePost} key={postId}><BiHeart className='h-8 w-8 rounded-full group-hover:bg-red-100 p-2 mr-1' /> {postData.uidLiked.length}</div> : <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500' onClick={likePost} key={postId}><BiHeart className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {postData.uidLiked.length}</div>}
          <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiUpload className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> </div>
        </div>
      </div >}
      {postUser && postUser.uid ? <PostPageTweet user={user} postId={postId} postUser={postUser} /> : ""}
      <AnimatePresence>
        {comments.map((commentn) => (
          <motion.div key={commentn.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <CommentComp postId={postId} commentn={commentn} key={commentn.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
