import React from 'react'
import { getProviders, signIn } from "next-auth/react"
import { Button } from '@mui/material';

export default function signin({ providers }) {
    return (
        <div className='w-full h-full items-center justify-center flex'>
            <div className='h-[640px] flex-col flex items-center m-4 min-w[320px] w-[600px]'>
                <img className='h-8 w-10 mt-20' src='/Twitter-logo.svg.png'></img>
                <p className='text-2xl mt-8 font-bold mb-2'>Log on Twit-Clone</p>
                <p className='mb-2 text-xs'>Please login before you can access Twit-Clone!</p>
                <p className='mb-2 text-xs'>This app was created for learning purposes, sorry Elon!</p>
                {Object.values(providers).map((provider) => (
                    <div key={provider.id} className='w-[300px]'>
                        <Button variant="contained" onClick={() => signIn(provider.id, { callbackUrl: "/auth/login" })}
                            className='w-full h-10 border transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100  mt-6 rounded-full text-center font-semibold'>Sign in with {provider.name}</Button>
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