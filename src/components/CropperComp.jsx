import { Slider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Cropper from 'react-easy-crop';
import getCroppedImg from "./Crop";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { useSession } from "next-auth/react";


export default function CropperComp({ image }) {
    const { data: session } = useSession();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [fileRef, setFileRef] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [rotation, setRotation] = useState(0);
    const storage = getStorage();


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    async function onClose() {

        try {
            const croppedImage2 = await getCroppedImg(
                image,
                croppedAreaPixels,
            );
            setCroppedImage(croppedImage2)



        } catch (e) {
            console.error(e);
        }

    }

    async function submitImage() {
        const bannerRef = ref(storage, `images/${session.user.uid}/banner.jpeg`)
        const response = await fetch(croppedImage)
        const blob = await response.blob();
        uploadBytes(bannerRef, blob).then((snapshot) => {
            console.log("Done!")
        })
    }

    return (
        <div className="flex flex-col w-screen h-screen items-center justify-center">
            <button
                style={{
                    display: image === null || croppedImage !== null ? "none" : "block",
                }}
                onClick={onClose}
            >
                Upload
            </button>
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
                        aspect={3 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>}
            <div className="flex flex-col w-[500px] ">
                <label>Zoom
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="zoom"
                        onChange={(e, zoom) => setZoom(zoom)}
                        className=""
                    />
                </label>
            </div>
            <div className="cropped-image-container">
                {croppedImage && (
                    <img className="h-[600px] w-auto" src={croppedImage} alt="cropped" />
                )}
                {croppedImage && <button onClick={submitImage}>close</button>}
            </div>
        </div>
    )

}