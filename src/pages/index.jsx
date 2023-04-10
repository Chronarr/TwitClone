import Feed from '@/components/Feed'
import SideBarLeft from '@/components/SideBarLeft'
import SideBarRight from '@/components/SideBarRight'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


export default function Home({ newsResult, followResult }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session)
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
          <SideBarLeft />
          <Feed />
          <SideBarRight news={newsResult.articles} total={newsResult.totalResults} followThis={followResult.results} />
        </main>

      </>
    )
  }
  if (status === "unauthenticated") { router.push("/auth/signin"); }
}

export async function getServerSideProps() {
  const newsResult = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json").then((res) => res.json());
  const followResult = await fetch("https://randomuser.me/api/?results=500&inc=name,login,picture").then((res) => res.json());

  return {
    props: {
      newsResult, followResult,
    }
  }
}
