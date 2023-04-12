import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../../firebase';


export default function login() {
    const { data: session, status } = useSession();
    const router = useRouter();


    if (status === "authenticated") {
        (async () => {
            const docRef = doc(db, "users", session.user.uid)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                router.push("/");
            } else {
                await setDoc(docRef, {
                    name: session.user.name,
                    username: session.user.username,
                    email: session.user.email,
                    userImg: session.user.image
                })
                router.push("/");
            }
        })();
    }
    if (status === "loading") {
        return (
            <div>Loading....</div>
        )
    }
    if (status === "unauthenticated") {
        router.push("/auth/signin")
    }

}