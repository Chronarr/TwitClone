import React, { useState } from 'react';
import News from './News';
import { AnimatePresence, motion } from 'framer-motion';

export default function NewsWidget({ news, total }) {
    const [showNews, setShowNews] = useState(4);

    function dynamicNews(more, less) {
        if (more) {
            setShowNews(showNews + 4);
        }
        if (less) {
            setShowNews(showNews - 4);
        }
    }
    return (
        <div className='w-full bg-gray-100 rounded-xl mt-4 py-4 '>
            <div className='flex px-2 flex-row items-end justify-between'><p className='text-lg font-bold pl-1'>News:</p><p className=' text-sm'>{showNews - 4} - {showNews} of {total}</p></div>
            <AnimatePresence>
                {news.slice(0, showNews).map((article) => (
                    <motion.div key={news.indexOf(article)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <News article={article} key={article.id} />
                    </motion.div>
                ))}
            </AnimatePresence>
            <div className='justify-between flex px-10'>
                <button className='text-sky-500 hover:underline disabled:text-gray-500 disabled:hover:no-underline bg-transparent' onClick={() => dynamicNews(false, true)} disabled={showNews <= 4}> Less news.. </button>
                <button className='text-sky-500 hover:underline bg-transparent disabled:text-gray-600' onClick={() => dynamicNews(true, false)} disabled={showNews >= total}>{showNews >= total ? 'No more articles' : 'More news..'}</button>

            </div>
        </div>
    );
}
