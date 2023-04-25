import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"
import Modal from "react-modal"
import { BiX, BiImageAdd } from "react-icons/bi"

import { useSession } from 'next-auth/react'

import { useRouter } from 'next/router.js'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.js'


export default function ProfileEditModal({ user }) {
    const [open, setOpen] = useRecoilState(modalState);
    const { data: session } = useSession();
    let userDB;
    { userDB ? "" : userDB = user }
    const router = useRouter();
    const nameRef = useRef()
    const [name, setName] = useState(userDB.name || "");
    const [nameActive, setNameActive] = useState(false);
    const bioRef = useRef(null)
    const [bio, setBio] = useState(userDB.bio || "");
    const [bioActive, setBioActive] = useState(false);
    const locationRef = useRef(null)
    const [location, setLocation] = useState(userDB.bio || "");
    const [locationActive, setLocationActive] = useState(false);
    const webRef = useRef(null)
    const [web, setWeb] = useState(userDB.webPage || "");
    const [webActive, setWebActive] = useState(false);

    const submitProfile = async () => {

        await updateDoc(doc(db, "users", userDB.uid),
            {
                name: name,
                bio: bio,
                location: location,
                webPage: web

            })
        setOpen(false)
    }


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
                className="sm:max-w-2xl w-screen h-screen sm:w-[90%] sm:h-fit sm:max-h-[800px] sm:absolute sm:top-12 sm:left-[50%] sm:translate-x-[-50%] bg-white border px-4 pt-4 border-gray-200 outline-none rounded-2xl shadow-xl overflow-y-auto">
                <div>
                    <div className='flex w-full h-8 mb-4 items-center'>
                        <div className='h-9 w-9 rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center' onClick={closeModal}>
                            <BiX className='h-7 w-7' />
                        </div>
                        <p className='flex-1 text-2xl ml-10 font-bold'>Edit profile</p>
                        <button onClick={submitProfile} className='w-20 h-10 text-lg leading-none text rounded-full'>Save</button>
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
                        <div>
                            <div onClick={() => nameRef.current.focus()} className={`${nameActive ? "border-sky-400" : ""} rounded-md w-full border group cursor-text transition-all  duration-300 border-gray-300 my-4 h-14`}>
                                <div className={`flex transition-all  duration-300 flex-row ${name || nameActive ? "text-sm" : "text-md"} group-focus:text-sm text-gray-500 w-full justify-between mt-1 h-4`}>
                                    <p className={` mx-2 ${nameActive ? "text-sky-400" : ""} transition-all  duration-300 `}>Name</p>
                                    <p className={`mx-2 ${nameActive ? "inline" : "hidden"} `}>{name.length}/50</p>
                                </div>
                                <input className='outline-none group w-[580px] mt-1 ml-2 mr-2'
                                    ref={nameRef}
                                    value={name}
                                    onFocus={() => setNameActive(true)}
                                    onBlur={() => setNameActive(false)}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    maxLength={50} />
                            </div>
                            <div onClick={() => bioRef.current.focus()} className={`${bioActive ? "border-sky-400" : ""} rounded-md w-full border my-4 group cursor-text transition-all  duration-300 border-gray-300 h-full`}>
                                <div className={`flex transition-all  duration-300 flex-row ${bio || bioActive ? "text-sm" : "text-md"} group-focus:text-sm text-gray-500 w-full justify-between mt-1 h-4`}>
                                    <p className={` mx-2 ${bioActive ? "text-sky-400" : ""} transition-all  duration-300 `}>Bio</p>
                                    <p className={`mx-2 ${bioActive ? "inline" : "hidden"} `}>{bio.length}/160</p>
                                </div>
                                <textarea className='outline-none group resize-none w-[580px] mt-1 ml-2 mr-2 h-[80px] '
                                    ref={bioRef}
                                    value={bio}
                                    onFocus={() => setBioActive(true)}
                                    onBlur={() => setBioActive(false)}
                                    onChange={(e) => setBio(e.target.value)}
                                    type="text"
                                    maxLength={160} />
                            </div>
                            <div onClick={() => locationRef.current.focus()} className={`my-4 ${locationActive ? "border-sky-400" : ""} rounded-md w-full border group cursor-text transition-all  duration-300 border-gray-300 h-14`}>
                                <div className={`flex transition-all  duration-300 flex-row ${location || locationActive ? "text-sm" : "text-md"} group-focus:text-sm text-gray-500 w-full justify-between mt-1 h-4`}>
                                    <p className={` mx-2 ${locationActive ? "text-sky-400" : ""} transition-all  duration-300 `}>Location</p>
                                    <p className={`mx-2 ${locationActive ? "inline" : "hidden"} `}>{location.length}/30</p>
                                </div>
                                <input className='outline-none group w-[580px] mt-1 ml-2 mr-2'
                                    ref={locationRef}
                                    value={location}
                                    onFocus={() => setLocationActive(true)}
                                    onBlur={() => setLocationActive(false)}
                                    onChange={(e) => setLocation(e.target.value)}
                                    type="text"
                                    maxLength={30} />
                            </div>
                            <div onClick={() => webRef.current.focus()} className={`my-4 ${webActive ? "border-sky-400" : ""} rounded-md w-full border group cursor-text transition-all  duration-300 border-gray-300 h-14`}>
                                <div className={`flex transition-all  duration-300 flex-row ${web || webActive ? "text-sm" : "text-md"} group-focus:text-sm text-gray-500 w-full justify-between mt-1 h-4`}>
                                    <p className={` mx-2 ${webActive ? "text-sky-400" : ""} transition-all  duration-300 `}>Website</p>
                                    <p className={`mx-2 ${webActive ? "inline" : "hidden"} `}>{web.length}/100</p>
                                </div>
                                <input className='outline-none group w-[580px] mt-1 ml-2 mr-2'
                                    ref={webRef}
                                    value={web}
                                    onFocus={() => setWebActive(true)}
                                    onBlur={() => setWebActive(false)}
                                    onChange={(e) => setWeb(e.target.value)}
                                    type="text"
                                    maxLength={100} />
                            </div>

                        </div>
                    </div>
                </div>


            </Modal>
        )
        }
        </div >
    )
}
