import React, { useRef, useState } from "react";
import CropperComp from "@/components/CropperComp"
import { BiImageAdd } from "react-icons/bi";

export default function CropImg() {
    const [fileRef, setFileRef] = useState(null);
    const imgPickerRef = useRef(null);

    const handleImageUpload = async (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setFileRef(readerEvent.target.result)
        }
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