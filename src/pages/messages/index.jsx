import SideBarLeft from '@/components/SideBarLeft'
import Head from 'next/head'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import Messaging from '@/components/Messaging'


export default function Messages({ user }) {

  return (
    <>
      <Head>
        <title>TwitClone</title>
        <meta name="description" content="Created by Lodberg-Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`mx-auto min-h-screen justify-center flex`}>
        <div className="hidden lg:inline">

          <SideBarLeft user={user} />
        </div>
        <Messaging user={user} />


      </main>

    </>
  )
}


export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  let userDB;

  if (session) {
    const docRef = doc(db, 'users', session.user.uid);
    const docSnap = await getDoc(docRef);
    userDB = docSnap.data();
  }

  return {
    props: {
      user: userDB || null,
    }
  }
}
