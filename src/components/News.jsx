import React from 'react'
import { useRouter } from 'next/router'

export default function News({ article }) {
    const router = useRouter();
    function articleClick(link) {
        router.push(link)
    }
    return (
        <div className='flex py-2 cursor-pointer hover:underline px-4 hover:bg-gray-200' onClick={() => articleClick(article.url)}>
            <p className='w-2/3 line-clamp-3 leading-7 text-sm'>{article.title}</p>
            <img className='w-[86px] ml-2 h-[86px] object-cover rounded-lg' src={article.urlToImage} alt={" "}></img>
        </div>
    )
}
