import { collection, endAt, onSnapshot, orderBy, query, startAt, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from "react-icons/bi"
import { db } from '../../firebase';

export default function Search() {
    const [dropdown, setDropDown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className='group sticky top-4 z-10 mt-2'>
            <div className='flex group-focus-within:bg-white h-12 mx-auto my-0 w-full items-center  rounded-full group-focus-within:border group-focus-within:shadow border-0 border-sky-400 bg-gray-200 '>
                <BiSearchAlt className='h-5 w-5 group-focus-within:text-sky-500 text-gray-400 ml-4 mr-3' />
                <input className='bg-transparent group-focus-within:bg-white outline-none w-64'
                    type="text" value={searchTerm} placeholder='Search Twitter'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setDropDown(true)}
                    onBlur={() => setDropDown(false)}
                />
                <div class={`${dropdown ? "inline" : "hidden"} absolute mt-28 bg-white text-base z-50 list-none divide-y divide-gray-100 ml-0.5 shadow  w-[290px] min-w[290px] max-w-[290px] lg:max-w-[330px] rounded-full lg:w-[330px] lg:min-w-[330px]`}>
                    <ul class="py-1" aria-labelledby="dropdown">

                        <li>
                            <div class="text-sm select-none rounded-full hover:bg-gray-100 text-gray-700 block mx-1 px-2 py-2">This doesnt work....!</div>
                        </li>


                    </ul>
                </div>
            </div>
        </div>
    )
}
