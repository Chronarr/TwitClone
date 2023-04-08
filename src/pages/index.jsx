import Feed from '@/components/Feed'
import SideBarLeft from '@/components/SideBarLeft'
import SideBarRight from '@/components/SideBarRight'
import Head from 'next/head'


export default function Home({newsResult}) {
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
        <SideBarRight news={newsResult.articles} total={newsResult.totalResults} />
      </main>

    </>
  )
}

export async function getServerSideProps() {
  const newsResult = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json").then((res) => res.json());
  return{
    props:{
      newsResult,
    }
  }
}
