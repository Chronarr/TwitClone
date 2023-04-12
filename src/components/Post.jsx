import React from 'react'
import { BiDotsHorizontalRounded, BiCheckShield, BiMessageRounded, BiSync, BiHeart, BiBarChart, BiUpload } from "react-icons/bi"
import { BsDot } from "react-icons/bs"

export default function Post({ post }) {
  function nFormat(number) {
    if (number > 5000) {
      return (nFormatter(number))
    } if (number != 0) {
      return (post.comments.toLocaleString("en-US"))
    } else {
      return (0)
    }
  }

  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  return (
    <div key={post.id} className='w-full  flex-col border-b border-gray-200 cursor-pointer hover:bg-gray-50'>
      <div className='flex flex-row m-3'>
        <div>
          <img className='rounded-full object-cover h-12 w-12 cursor-pointer filter hover:saturate-50' src={post.userImg} alt="" />
        </div>
        <div className='w-[515px] flex flex-col ml-3'>
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <p className='font-bold text-sm cursor-pointer hover:underline'>{post.name}</p>
              {post.blue && <BiCheckShield className='rounded-full cursor-pointer bg-sky-200 ml-1' />}
              <p className='text-gray-500 ml-1 text-sm cursor-pointer'>@{post.userName}</p>
              <BsDot className='text-gray-500' />
              <p className='text-gray-500 text-sm hover:underline cursor-pointer'>{post.timeStamp}</p>
            </div>
            <div className='text-gray-500 h-6 w-6 rounded-full cursor-pointer hover:bg-sky-100 group p-1'><BiDotsHorizontalRounded className='group-hover:text-sky-500' /></div>
          </div>
          <p className='col-span-2'>{post.text}</p>
          {post.postImg && <div className='flex flex-grow mt-4 min-w-0 max-h-[510px] '><img className='object-scale-down  rounded-2xl cursor-pointer' src={post.postImg} /></div>}
        </div>

      </div>
      <div className='w-[550px] mb-4 flex ml-16 pl-2'>
        <div className='flex w-24  items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiMessageRounded className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {nFormat(post.comments)}</div>
        <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiSync className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {nFormat(post.reTweets)}</div>
        <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiHeart className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {nFormat(post.likes)}</div>
        <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiBarChart className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> {nFormat(post.views)}</div>
        <div className='flex w-28 items-center text-sm text-gray-500 text-center group hover:text-sky-500'><BiUpload className='h-8 w-8 rounded-full group-hover:bg-sky-100 p-2 mr-1' /> </div>
      </div>
    </div>
  )
}
