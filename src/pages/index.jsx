import Feed from '@/components/Feed'
import SideBar from '@/components/SideBar'
import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>TwitClone</title>
        <meta name="description" content="Created by Lodberg-Web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full mx-auto min-h-screen flex'>
        <SideBar />
        <Feed />
      </main>

    </>
  )
}
