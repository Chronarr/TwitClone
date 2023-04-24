import React, { useRef, useState } from "react";
import Cropper from 'react-easy-crop';
import CropperComp from "@/components/CropperComp"
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../../firebase";
import { BiImageAdd } from "react-icons/bi";

export default function index() {
    const [crop, setCrop] = useState({ x: 0, y: 0 });

    let downloadURL;
    const [fileRef, setFileRef] = useState(null);
    const [loading, setLoading] = useState(false);
    const imgPickerRef = useRef(null);
    const handleImageUpload = async (e) => {
        setFileRef(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div>
            <div className='flex items-center relative'>
                <div onClick={() => imgPickerRef.current.click()}>
                    <BiImageAdd className='text-sky-500 h-9 w-9 p-2 rounded-full hover:bg-sky-100 cursor-pointer' />
                    <input
                        type="file"
                        className='hidden'
                        ref={imgPickerRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>

            </div>
            {fileRef && <CropperComp image={fileRef} />}
        </div>
    )

}