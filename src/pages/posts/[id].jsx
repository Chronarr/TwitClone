import { doc, getDoc } from 'firebase/firestore';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import React from 'react'
import { db } from '../../../firebase';
import Head from 'next/head';
import SideBarLeft from '@/components/SideBarLeft';
import SideBarRight from '@/components/SideBarRight';
import PostPage from "@/components/PostPage"

export default function Post({ newsResult, followResult, user }) {
    const { data: session, status } = useSession();
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
                <main className=' mx-auto min-h-screen justify-center flex'>
                    <SideBarLeft user={user} />
                    <PostPage postId={id} user={user} />
                    <SideBarRight news={newsResult.articles} total={newsResult.totalResults} followThis={followResult.results} />
                </main>

            </>
        )
    }
    if (status === "unauthenticated") { router.push("/auth/signin"); }
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    let userDB;
    const newsResult = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json").then((res) => res.json());
    const followResult = await fetch("https://randomuser.me/api/?results=500&inc=name,login,picture").then((res) => res.json());

    if (session) {
        const docRef = doc(db, 'users', session.user.uid);
        const docSnap = await getDoc(docRef);
        userDB = docSnap.data();
    }

    return {
        props: {
            newsResult, followResult, user: userDB || null,
        }
    }
}
