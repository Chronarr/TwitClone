import SideBarLeft from '@/components/SideBarLeft'
import SideBarRight from '@/components/SideBarRight'
import Head from 'next/head'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import CommentModal from '@/components/CommentModal'
import { useRecoilState, } from 'recoil'
import { modalState } from "../../../atom/modalAtom.js"
import Bookmarks from '@/components/Bookmarks'


export default function Bookmarks({ newsResult, followResult, user }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [open, setOpen] = useRecoilState(modalState);

    onSnapshot(
        query(collection(db, "posts"), orderBy("timeStamp", "desc")), (snapshot) => {
            // Delay the update by 1000ms (1 second)
            setTimeout(() => {
                setPosts(snapshot.docs);
            }, 100);
        })

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
                <main className={`mx-auto min-h-screen ${open ? "overflow-hidden" : ""} justify-center flex`}>
                    <SideBarLeft user={user} />
                    <Bookmarks user={user} />
                    <SideBarRight news={newsResult.articles} total={newsResult.totalResults} followThis={followResult.results} />

                    <CommentModal user={user} />
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
