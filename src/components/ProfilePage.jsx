import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi"
import { db } from "../../firebase";


export default function ProfilePage({ user }) {
    console.log(`${user.uid}`)
    const [posts, setPosts] = useState(null);
    console.log(user)
    useEffect(() => {
        onSnapshot(
            query(collection(db, "posts"), where("userid", "==", `${user.uid}`), orderBy("timeStamp", "desc")), (snapshot) => {

                setTimeout(() => {
                    setPosts(snapshot.docs);
                }, 100);

            })
    }, [])

    console.log(posts)
    return (
        <div className={`flex flex-col min-w-[230px] w-[600px] max-w-[600px] relative   bg-white border-l border-r  h-full`}>
            <div className='sticky top-0 w-full h-14 border-b bg-opacity-80 backdrop-blur z-30 bg-white border-gray-100'>
                <div className='flex h-full'>
                    <BiArrowBack />
                    <div className='cursor-pointer flex flex-col item-center h-1/2 w-full '>
                        <h2 className="text-xl font-semibold my-auto pl-4" >Home</h2>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
