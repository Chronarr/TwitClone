import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { BiCog, BiMessageAdd, BiSearchAlt } from 'react-icons/bi'
import { db } from '../../firebase'
import Conversation from './Conversation'
import ConvoItem from './ConvoItem';
import { useRecoilState } from 'recoil';
import { modalActiveConvo } from '../../atom/modalActiveConvo';

export default function Messaging({ user }) {
    const [selectedConvo, setSelectedConvo] = useState("");
    const [dropdown, setDropDown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [settings, setSettings] = useState(false)
    const [conversations, setConversations] = useState(null)
    const [activeConvo, setActiveConvo] = useRecoilState(modalActiveConvo)




    useEffect(() => {
        onSnapshot(
            query(collection(db, "conversations"), where("users", "array-contains", `${user.uid}`)), (snapshot) => {
                setConversations(snapshot.docs);

            })

    }, [])
    useEffect(() => {
        if (conversations && conversations.length > 0 && !activeConvo) {
            setActiveConvo([conversations[0].id, ""])
        }
    }, [conversations, !activeConvo])

    return (
        <div className='flex'>
            <div className={`hidden md:inline w-[320px] xl:w-[380px]  border-x`}>
                <div className="h-[53px] border-b flex items-center px-4 justify-between">
                    <div className="text-2xl font-bold ">Messages</div>
                    <div className="flex"><BiCog className='h-5 w-5 mx-1 cursor-pointer' onClick={() => setSettings(!settings)} /><BiMessageAdd className='h-5 w-5 mx-1 cursor-pointer opacity-50' /></div>
                </div>
                {/* <div className='border-b'>
                    <div className='flex group-focus-within:bg-white h-10 mx-auto my-4 w-[90%] items-center  rounded-full group-focus-within:border group-focus-within:shadow border-0 border-sky-400 bg-gray-200 '>
                        <BiSearchAlt className='h-5 w-5 group-focus-within:text-sky-500 text-gray-400 ml-4 mr-3' />
                        <input className='bg-transparent group-focus-within:bg-white outline-none w-64'
                            type="text" value={searchTerm} placeholder='Search direct messages'
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setDropDown(true)}
                            onBlur={() => setDropDown(false)}
                        />


                </div> */}
                {conversations && <div>
                    {conversations.map((convo) => (
                        <ConvoItem convo={convo} />
                    ))}
                </div>}
            </div>
            {
                settings ?
                    <div className={`${selectedConvo ? "inline" : "hidden lg:inline"} w-[600px] border-r`}>Settings! Wooooo</div> :
                    <Conversation activeConvo={activeConvo} user={user} key={activeConvo} />
            }
        </div >
    )
}
