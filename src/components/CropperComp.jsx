import { Slider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from 'react-easy-crop';
import getCroppedImg from "./Crop";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalCropStatus } from "../../atom/modalCropStatus";
import { BiArrowBack, BiX } from "react-icons/bi";
import { modalCroppedImage } from "../../atom/modalCroppedImage";
import { doc, updateDoc } from "firebase/firestore";



export default function CropperComp({ image, aspect, user, type }) {
    const [picActive, setPicActive] = useRecoilState(modalCropStatus);
    const [croppedImage3, setCroppedImage3] = useRecoilState(modalCroppedImage);
    const { data: session } = useSession();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const storage = getStorage();
    let CroppedImage2


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    async function onClose() {


        try {
            const croppedImage2 = await getCroppedImg(
                image,
                croppedAreaPixels,

            )
            const imageRef = ref(storage, `userimages/${user.uid}/${type}.jpeg`)
            const response = await fetch(croppedImage2)
            const blob = await response.blob();
            await uploadBytes(imageRef, blob).then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                {
                    type === "banner" ?
                    await updateDoc(doc(db, "users", user.uid), {
                        bannerImg: downloadURL
                    })
                    :
                    await updateDoc(doc(db, "users", user.uid), {
                        userImg: downloadURL
                    })
                }
                setCroppedImage3(downloadURL)
                setPicActive(false)
            })

        } catch (e) {
            console.error(e);
        }

    }


    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className='flex w-full h-8 mb-4 items-center'>
                <div className='h-9 w-9 rounded-full cursor-pointer hover:bg-gray-200 flex items-center justify-center' onClick={() => setPicActive(false)}>
                    <BiArrowBack className='h-7 w-7' />
                </div>
                <p className='flex-1 text-2xl ml-10 font-bold'>Edit Media</p>
                <button onClick={onClose} className='w-20 h-10 text-lg leading-none text rounded-full'>Apply</button>
            </div>
            {!croppedImage &&
                <div className=" relative h-[600px] w-[600px]">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        zoomSpeed={4}
                        maxZoom={2}
                        zoomWithScroll={true}
                        showGrid={false}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>}
            <div className="flex flex-col my-4 w-[500px] ">

                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                    className=""
                />

            </div>
        </div>
    )

}