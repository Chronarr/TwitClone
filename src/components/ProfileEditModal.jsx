import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"
import Modal from "react-modal"
import { BiX, BiImageAdd } from "react-icons/bi"

import { useSession } from 'next-auth/react'

import { useRouter } from 'next/router.js'


export default function ProfileEditModal({ user }) {
    const [open, setOpen] = useRecoilState(modalState);
    const { data: session } = useSession();
    const router = useRouter();
    function closeModal() {
        setOpen(false)
    }

    return (

        <div>{open && (

            <Modal
                style={{ overlay: { zIndex: 100 } }}
                isOpen={open}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="sm:max-w-2xl w-screen h-screen sm:w-[90%] sm:h-fit sm:absolute sm:top-24 sm:left-[50%] sm:translate-x-[-50%] bg-white border px-4 pt-4 border-gray-200 outline-none rounded-2xl shadow-xl overflow-hidden">
                <div>
                    <div className='flex w-full h-8 mb-4 items-center'>
                        <div className='h-9 w-9 rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center' onClick={closeModal}>
                            <BiX className='h-7 w-7' />
                        </div>
                        <p className='flex-1 text-2xl ml-10 font-bold'>Edit profile</p>
                        <button className='w-20 h-10 text-lg leading-none text rounded-full'>Save</button>
                    </div>
                    <div className={`flex flex-col min-w-[230px] sm:w-[600px] max-w-[600px] relative bg-white  `}>
                        <div>{
                            user.bannerImg ?
                                <div className='relative '>
                                    <img className="h-[199px] w-[599px]" src={user.bannerImg} />
                                    <BiImageAdd className='absolute inset-12 text-xl' />
                                </div>
                                :
                                <div className='relative '>
                                    <div className="flex bg-slate-300 text-transparent aspect-auto min-h-0 min-w-0 select-none w-full h-[200px] ">.</div>
                                    <div className='absolute inset-[50%] '>
                                        <div className="flex absolute w-24 -ml-8 -mt-4 justify-between">
                                            <div className='h-10 w-10 rounded-full p-2 opacity-70 cursor-pointer hover:opacity-100 hover:bg-gray-400 bg-gray-500'><BiImageAdd className='h-6 w-6 z-10 text-white' /></div>
                                            <div className='h-10 w-10 rounded-full p-2 opacity-70 cursor-pointer hover:opacity-100 hover:bg-gray-400 bg-gray-500'><BiX className='h-6 w-6 z-10 text-white' /></div>
                                        </div>
                                    </div>
                                </div>
                        }</div>
                        <div className="mx-4 mt-3">
                            <div className="flex relative overflow-x-clip h-16 max-h-16">
                                <div className="h-36 w-36 absolute left-0 top-[-135%]">
                                    <img className='rounded-full h-full w-full border-4 border-white transition delay-100 object-cover  cursor-pointer filter hover:saturate-50' src={user.userImg} alt="" />
                                    <div className='h-10 w-10 rounded-full p-2 absolute inset-[50%] -ml-5 -mt-5 opacity-70 hover:opacity-100 hover:bg-gray-400 bg-gray-500'><BiImageAdd className='h-6 w-6 z-10 cursor-pointer text-white' /></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </Modal>
        )}
        </div>
    )
}
