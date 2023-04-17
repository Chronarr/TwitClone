import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';


export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    if (status === "authenticated") {
        (async () => {

            const docRef = doc(db, "users", session.user.uid)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                router.push("/");
            } else {

                await setDoc(docRef, {
                    uid: session.user.uid,
                    name: session.user.name,
                    username: session.user.username,
                    email: session.user.email,
                    userImg: session.user.image,
                    bannerImg: "",
                    bio: "",
                    location: "",
                    webPage: "",
                    birthDate: null,
                    pro: false

                })

                router.push("/");
            }

        })();
        return (
            <>{loading &&
                <div className="bg-gray-200 opacity-50 w-screen h-screen absolute flex inset-0 justify-center items-center z-10">
                    <div className="loader opacity-100">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </div>}
            </>)
    }
    if (status === "loading") {
        return (
            <>{loading &&
                <div className="bg-gray-200 opacity-50 w-screen h-screen absolute flex inset-0 justify-center items-center z-10">
                    <div className="loader opacity-100">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </div>}
            </>)
    }
    if (status === "unauthenticated") {
        router.push("/auth/signin")
    }


}