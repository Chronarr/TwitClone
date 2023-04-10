import React from 'react'
import { getProviders, signIn } from "next-auth/react"

export default function signin({ providers }) {
    return (
        <div className='w-full h-full items-center justify-center flex'>
            <div className='h-[640px] flex-col flex items-center m-4 min-w[320px] w-[600px]'>
                <img className='h-8 w-10' src='/Twitter-logo.svg.png'></img>
                <p className='text-2xl mt-24 font-bold mb-2'>Log on Twit-Clone</p>
                <p className='mb-2 text-xs'>Please login before you can access Twit-Clone!</p>
                <p className='mb-2 text-xs'>This app was created for learning purposes, sorry Elon!</p>
                {Object.values(providers).map((provider) => (
                    <div key={provider.id} className='w-[300px]'>
                        <button onClick={() => signIn(provider.id, { callbackUrl: "/" })} className='w-full h-10 border hover:bg-gray-200 transition-colors border-gray-400 mt-6 rounded-full text-center font-semibold'>Sign in with {provider.name}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const providers = await getProviders(ctx);
    return {
        props: { providers, }
    }
}