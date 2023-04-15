import React from 'react'
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"
import Modal from "react-modal"
import {BiX} from "react-icons/bi"

export default function CommentModal() {
    const [open, setOpen] = useRecoilState(modalState);
    return (

        <div>{open && (

            <Modal 
                style={{overlay: {zIndex:100}}} 
                isOpen={open} 
                onRequestClose={()=> setOpen(false)}
                className="max-w-lg w-[90%] h-[300px] absolute top-24 left-[50%] translate-x-[-50%] bg-white border border-gray-200 outline-none rounded-2xl shadow-xl overflow-hidden">
                    <BiX/>
                    <h1>Comment?</h1>
            </Modal>
        )}
        </div>
    )
}
