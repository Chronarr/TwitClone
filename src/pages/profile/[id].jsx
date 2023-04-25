import SideBarLeft from '@/components/SideBarLeft'
import SideBarRight from '@/components/SideBarRight'
import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import ProfilePage from '@/components/ProfilePage'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { useEffect, useState } from 'react'
import ProfileEditModal from '@/components/ProfileEditModal'
import { modalState } from "../../../atom/modalAtom.js"
import { useRecoilState } from 'recoil'


export default function Home({ newsResult, followResult, user, user2 }) {
    const { data: session, status } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();
    const { id } = router.query;

    if (status === "loading") {
        <p>Loading....</p>
    }

    if (status === "authenticated") {
        return (
            <>
                <Head>
                    <title>TwitClone</title>
                    <meta name="description" content="Created by Lodberg-Web" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={`mx-auto min-h-screen justify-center flex `}>
                    <SideBarLeft user={user} />
                    {id === session.user.uid ? <ProfilePage user={user} id={id} /> : <ProfilePage user={user2} id={id} />}
                    <SideBarRight news={newsResult.articles} total={newsResult.totalResults} followThis={followResult.results} />

                    <ProfileEditModal user={user} />
                </main>

            </>
        )
    }
    if (status === "unauthenticated") { router.push("/auth/signin"); }
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    const { id } = ctx.query;
    let userDB;
    let user2;
    const newsResult = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json").then((res) => res.json());
    const followResult = await fetch("https://randomuser.me/api/?results=500&inc=name,login,picture").then((res) => res.json());

    if (session) {
        const docRef = doc(db, 'users', session.user.uid);
        const docSnap = await getDoc(docRef);
        userDB = docSnap.data();

    }
    if (session.user.uid != id) {
        const docRef2 = doc(db, 'users', id);
        const docSnap2 = await getDoc(docRef2);
        user2 = docSnap2.data();
    }

    return {
        props: {
            newsResult, followResult, user: userDB, user2: user2 || null
        }
    }
}

