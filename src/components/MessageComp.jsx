import { doc, updateDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { db } from '../../firebase'
import Moment from 'react-moment'

export default function MessageComp({ dmdata, user, activeConvo }) {
    const dm = dmdata.data()

    useEffect(() => {
        if (user.uid != dm.from) {
            updateDoc(doc(db, `conversations/${activeConvo[0]}/messages`, dmdata.id), {
                read: true,
            })
            if (user.newDm) {
                updateDoc(doc(db, "users", user.uid), {
                    newDm: false
                })
            }
        }
    })

    return (
        <div className={`flex flex-col ${dm.from === user.uid ? "items-end " : "items-start"} w-full`}>

            <div className={`${dm.from === user.uid ? " rounded-l-lg rounded-tr-lg bg-sky-400" : "rounded-r-lg rounded-tl-lg bg-slate-200"} min-w-min p-3 m-3 mb-0 max-w-xs min-h-10 `} >
                {dm.text}
            </div>
            {dm.timeStamp && <p className='px-3 text-xs text-slate-400'>{dm.read ? "Read" : "Sent"} - <Moment fromNow>{(dm.timeStamp.toDate() === "in a few seconds" ? "now" : dm.timeStamp.toDate())}</Moment></p>}
        </div>
    )
}
