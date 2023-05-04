import React, { useState } from 'react'
import Follow from './Follow';

export default function FollowWidget({ followThis }) {
    const [showFollow, setShowFollow] = useState(3);

    function dynamicFollow(more, less) {
        if (more) {
            setShowFollow(showFollow + 3);
        }
        if (less) {
            setShowFollow(showFollow - 3);
        }
    }

    return (
        <div className='w-full bg-gray-100 sticky top-20 rounded-xl mt-4 py-4 px-1 '>
            <p className='text-lg font-bold px-2'>Who not to follow:</p>
            {followThis.slice(0, showFollow).map((follow) => (
                <Follow name={follow.name} login={follow.login} img={follow.picture} key={follow.login.username} />
            ))}
            <div className='justify-between flex px-10'>
                <button className='text-sky-500 bg-transparent hover:underline disabled:text-gray-500 disabled:hover:no-underline' onClick={() => dynamicFollow(false, true)} disabled={showFollow <= 3} > Less .. </button>
                <button className='text-sky-500 bg-transparent hover:underline disabled:text-gray-600' onClick={() => dynamicFollow(true, false)} disabled={showFollow >= 12}> More ..</button>

            </div>
        </div>
    );
}
