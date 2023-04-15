import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiDotsHorizontalRounded, BiCheckShield, BiMessageRounded, BiSync, BiHeart, BiUpload } from "react-icons/bi"
import { BsDot } from "react-icons/bs"
import { db, storage } from '../../firebase'
import Moment from 'react-moment'
import { useSession } from 'next-auth/react'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"



export default function Post({ post }) {
  const postData = post.data()
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);

  // function nFormat(number) {
  //   if (number > 5000) {
  //     return (nFormatter(number))
  //   } if (number != 0) {
  //     return (postData.comments.toLocaleString("en-US"))
  //   } else {
  //     return (0)
  //   }
  // }

  // function nFormatter(num, digits) {
  //   const lookup = [
  //     { value: 1, symbol: "" },
  //     { value: 1e3, symbol: "k" },
  //     { value: 1e6, symbol: "M" },
  //     { value: 1e9, symbol: "G" },
  //     { value: 1e12, symbol: "T" },
  //     { value: 1e15, symbol: "P" },
  //     { value: 1e18, symbol: "E" }
  //   ];
  //   const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  //   var item = lookup.slice().reverse().find(function (item) {
  //     return num >= item.value;
  //   });
  //   return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  // }

  const [postUser, setPostUser] = useState(null); // initialize postUser to null

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", postData.userid);
      const docSnap = await getDoc(docRef);
      const user = docSnap.data();
      setPostUser(user); // update postUser state once data is fetched
    }

    fetchData();
  }, []);

  async function likePost() {
    if (postData.uidLiked.includes(session.user.uid)) {
      const index = postData.uidLiked.indexOf(session.user.uid)
      postData.uidLiked.splice(index, 1)
      updateDoc(doc(db, "posts", post.id), {
        uidLiked: postData.uidLiked,
      })
    } else {
      postData.uidLiked.push(session.user.uid)
      updateDoc(doc(db, "posts", post.id), {
        uidLiked: postData.uidLiked,
      })
    }
  }

  async function deletePost() {

    if (window.confirm("Are you sure?")) {
      if (postData.userid === session.user.uid) {
        await deleteDoc(doc(db, "posts", post.id))
        if (postData.postImg) {
          deleteObject(ref(storage, `posts/${post.id}/image`))
        }
      } else {
        return
      }
    }
  }
  return (
    <div key={post.id} className='w-full  flex-col border-b border-gray-200 cursor-pointer hover:bg-gray-50'>
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
        <div className='flex w-24  items-center text-sm text-gray-500 text-center group hover:text-sky-500' onClick={() => setOpen(!open)}><BiMessageRounded className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {postData.comments.length}</div>
        <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiSync className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {postData.uidReTweets.length}</div>
        {postData.uidLiked.includes(session.user.uid) ? <div className='flex w-28 items-center text-sm text-red-500 text-center group rounded-full' onClick={likePost} key={post.id}><BiHeart className='h-8 w-8 rounded-full group-hover:bg-red-100 p-2 mr-1' /> {postData.uidLiked.length}</div> : <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500' onClick={likePost} key={post.id}><BiHeart className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {postData.uidLiked.length}</div>}
        <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiUpload className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> </div>
      </div>
    </div >
  )
}
