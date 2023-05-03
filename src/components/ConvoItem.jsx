import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { useRecoilState } from 'recoil';
import { modalActiveConvo } from '../../atom/modalActiveConvo';

export default function ConvoItem({ convo }) {
    const conv = convo.data()
    const { data: session } = useSession();
    const [user2, setUser2] = useState(null)
    const [messages, setMessages] = useState(null)
    const [activeConvo, setActiveConvo] = useRecoilState(modalActiveConvo)
    const [ready, setReady] = useState(false)
    async function monkey() {
        let userArr = conv.users
        let index = userArr.indexOf(session.user.uid)
        let x = userArr.splice(index, 1)
        let otherUser = userArr.toString()
        const docRef = doc(db, "users", otherUser);
        const docSnap = await getDoc(docRef);
        setUser2(docSnap.data())
    }
    if (!user2) {
        monkey()
    }

    useEffect(() => {
        onSnapshot(
            query(collection(db, `conversations/${convo.id}/messages`), orderBy("timeStamp", "desc")), async (snapshot) => {
                setMessages(snapshot.docs);
                setReady(true)
            })
    }, [])
    useEffect(() => {
        if (activeConvo[0] === convo.id && user2 && activeConvo[1] === "") {
            setActiveConvo([convo.id, user2])
        }
        if (!messages && activeConvo[0] != convo.id && ready) {
            deleteDoc(doc(db, `conversations`, convo.id))
        }
    }, [activeConvo, user2])

    return (
        <div className='' onClick={() => setActiveConvo([convo.id, user2])}>{user2 && messages &&
            <div className={`flex h-30 xl:h-20 w-full p-4 cursor-pointer hover:bg-slate-200 ${activeConvo[0] === convo.id ? "bg-slate-100" : "bg-white"} ${!messages[0].data().read && "bg-slate-100"}`}>
                <img className='rounded-full object-cover h-12 w-12 cursor-pointer filter hover:saturate-50' src={user2.userImg} alt="" />
                <div className='mx-3 flex flex-col'>
                    <div className='flex flex-col xl:flex-row'>
                        <p className='line-clamp-1 w-fit flex-1'>{user2.name}</p><p className='text-gray-500 ml-1 truncate'>@{user2.username}</p>
                    </div>
                    <div className={`${messages[0].data().read ? "" : "font-bold"} line-clamp-1`}>{messages[0].data().text}</div>
                </div>
            </div>

        }
        </div>
    )
}
