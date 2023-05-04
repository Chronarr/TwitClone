import React, { useEffect, useState } from 'react'
import { modalState2 } from '../../atom/modalAtom2';
import { useRecoilState } from 'recoil';
import Modal from "react-modal"
import { BiX } from 'react-icons/bi';
import { Button, TextareaAutosize } from '@mui/material';
import { dmUserState } from '../../atom/modalDmUserState';
import { useSession } from 'next-auth/react';
import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { modalActiveConvo } from '../../atom/modalActiveConvo';
import { useRouter } from 'next/router';

export default function NewDmModal() {
    const [open2, setOpen2] = useRecoilState(modalState2);
    const [dmUser, setDmUser] = useRecoilState(dmUserState);
    const [activeConvo, setActiveConvo] = useRecoilState(modalActiveConvo);
    const [input, setInput] = useState("")
    const [placeholder, setPlaceHolder] = useState("Type a message...")
    const [loading, setLoading] = useState(false);
    const [doccer, setDoccer] = useState("")
    const [dmChecked, setDmChecked] = useState(false)
    const { data: session } = useSession();
    const router = useRouter()

    setActiveConvo("")
    // SET ACTIVE CONVOMODAL STATE TO ACTIVE CONVO
    useEffect(() => {

        const checkConversationExists = async () => {

            const conversationsRef = collection(db, 'conversations');
            const conversationsQuery = query(conversationsRef, where('users', 'in', [[session.user.uid, dmUser.uid], [dmUser.uid, session.user.uid]]));
            const conversationsSnapshot = await getDocs(conversationsQuery);

            if (conversationsSnapshot.docs.length > 0) {
                setOpen2(false)
                setLoading(false)
                setActiveConvo([conversationsSnapshot.docs[0].id, dmUser.uid])
                setDmUser({})
                router.push("/messages")

            } else {
                setDmChecked(true)
                setLoading(false)
            }
        }


        if (!dmChecked && session?.user?.uid && dmUser?.uid && open2) {
            setLoading(true)
            checkConversationExists();
        }
    }, [dmChecked, session, dmUser, open2]);

    const sendDm = async () => {
        if (loading) return;

        setLoading(true)

        if (!doccer) {
            const docRef = await addDoc(collection(db, "conversations"), {
                users: [dmUser.uid, session.user.uid]
            })
            const docRef2 = await addDoc(collection(db, `conversations/${docRef.id}/messages`), {
                from: session.user.uid,
                read: false,
                text: input,
                timeStamp: serverTimestamp()
            })
            await updateDoc(doc(db, "users", dmUser.uid), {
                newDm: true
            })
            setPlaceHolder("Message sent!")
            setInput("")
            setDmUser({})
            setLoading(false)
            setOpen2(false)
            setActiveConvo([docRef.id, dmUser.uid])
            router.push("/messages")
        } else {

        }
    }

    function closeModal() {
        setOpen2(false)
    }





    return (
        <div>{open2 && (
            <Modal
                style={{ overlay: { zIndex: 100 } }}
                isOpen={open2}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="sm:max-w-2xl w-screen h-screen sm:w-[90%] sm:h-fit sm:absolute sm:top-24 sm:left-[50%] sm:translate-x-[-50%] bg-white border px-4 pt-4 border-gray-200 outline-none rounded-2xl shadow-xl overflow-hidden">
                <div className='flex items-center'>
                    <div className='h-9 w-9 rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center' onClick={closeModal}>
                        <BiX className='h-7 w-7' />
                    </div>
                    <p className='ml-4 text-lg font-bold flex-1'>Send dm to {dmUser.name} - (@{dmUser.username})</p>
                    <p>{input.length} / 280</p>
                </div>
                <div className='min-h-[200px] '>
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
                        maxLength="280" className="w-full mt-4 mb-8 p-2 border text-xl min-h-[150px] outline-none  resize-none"
                        placeholder={placeholder}
                        value={input}
                        onChange={(e) => setInput(e.target.value)} />
                    <div className='w-full justify-end flex px-4 mb-8'>
                        {input.length > 0 ?
                            <Button variant="contained" onClick={sendDm} className='w-24 '>Send</Button>
                            :
                            <Button variant="outlined" className='w-24 '>Send</Button>

                        }
                    </div>
                </div>
            </Modal>)}
        </div>
    )

} 
