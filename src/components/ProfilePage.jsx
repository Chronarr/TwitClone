import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi"
import { db } from "../../firebase";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import PostRenderer from "./PostRenderer";
import CommentComp from "./CommentComp";
import { useRecoilState, } from 'recoil'
import { modalState } from "../../atom/modalAtom.js"


export default function ProfilePage({ user, id }) {
    const router = useRouter();
    const [posts, setPosts] = useState(null);
    const [comments, setComments] = useState([]);
    const [postsLiked, setPostsLiked] = useState([]);
    const [active, setActive] = useState("tweets");
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);

    useEffect(() => {
        onSnapshot(
            query(collection(db, "posts"), where("userid", "==", `${user.uid}`), orderBy("timeStamp", "desc")), (snapshot) => {
                setPosts(snapshot.docs);
            })

    }, [])

    useEffect(() => {
        onSnapshot(
            query(collection(db, "comments"), where("userid", "==", `${user.uid}`), orderBy("timeStamp", "desc")), (snapshot) => {
                setComments(snapshot.docs);
            })

    }, [])

    useEffect(() => {
        onSnapshot(
            query(collection(db, "posts"), where("uidLiked", "array-contains", `${user.uid}`), orderBy("timeStamp", "desc")), (snapshot) => {
                setPostsLiked(snapshot.docs);
            })

    }, [])



    return (
        <div className={`flex flex-col w-fit border-l border-r ${open ? "overflow-hidden h-screen" : "h-full"}`}>
            <div className={`flex flex-col min-w-[230px] w-[600px] max-w-[600px] relative  bg-white `}>
                <div onClick={() => { router.push("/") }} className='sticky top-0 w-full h-14 border-b bg-opacity-80 backdrop-blur z-30 bg-white border-gray-100'>
                    <div className='flex h-full items-center cursor-pointer'>
                        <div className="ml-4 flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200">
                            <BiArrowBack className=" text-xl" />
                        </div>
                        <div className='ml-4 cursor-pointer flex flex-col item-center h-full w-full '>
                            <h2 className="text-xl font-semibold my-auto pl-4" >{user.name}</h2>
                            {active === "tweets" && <p className="pl-4 text-sm font-semibold text-gray-500">{posts && posts.length} Tweets</p>}
                            {active === "replies" && <p className="pl-4 text-sm font-semibold text-gray-500">{comments && comments.length} Comments</p>}
                            {active === "likes" && <p className="pl-4 text-sm font-semibold text-gray-500">{postsLiked && postsLiked.length} Likes</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col min-w-[230px] sm:w-[600px] max-w-[600px] relative bg-white  `}>
                <div>{user.bannerImg ? <img className="h-[199px] w-[599px]" src={user.bannerImg} /> : <div className="flex bg-slate-300 text-transparent aspect-auto min-h-0 min-w-0 select-none w-full h-[199px] ">.</div>}</div>
                <div className="mx-4 mt-3">
                    <div className="flex relative overflow-x-clip h-16 max-h-16">
                        <div className="h-36 w-36 absolute left-0 top-[-135%]">
                            <img className='rounded-full h-full w-full border-4 border-white transition delay-100 object-cover  cursor-pointer filter hover:saturate-50' src={user.userImg} alt="" />
                        </div>
                        {session.user.uid === id ? <div onClick={() => setOpen(true)} className='leading-none absolute right-0 w-24 mx-1 bg-white text-sm font-bold rounded-full cursor-pointer hover:bg-gray-200 text-center pt-2 text-gray-800 border border-gray-300 h-8'>Edit profile</div> : ""}
                    </div>
                    <div>
                        <p className="text-xl font-bold">{user.name}</p>
                        <p className="text-gray-500">@{user.username}</p>
                    </div>
                    <div className="flex space-x-5 mt-2">
                        <div className="cursor-pointer font-bold hover:underline">{user.following.length} <span className="font-normal text-gray-500">Following</span></div>
                        <div className="cursor-pointer font-bold hover:underline">{user.followers.length} <span className="font-normal text-gray-500">Followers</span></div>
                    </div>
                </div>
                <div className="w-full h-20 flex items-end">
                    <div onClick={() => setActive("tweets")} className={`cursor-pointer w-1/3 hover:bg-gray-200 h-16 flex justify-center`}><div className={`${active === "tweets" && "font-bold border-b-4  border-blue-400"} h-full flex items-center`}>Tweets</div></div>
                    <div onClick={() => setActive("replies")} className={`cursor-pointer w-1/3 hover:bg-gray-200 h-16 flex justify-center`}><div className={`${active === "replies" && "font-bold border-b-4  border-blue-400"} h-full flex items-center`}>Replies</div></div>

                    <div onClick={() => setActive("likes")} className={`cursor-pointer w-1/3 hover:bg-gray-200 h-16 flex justify-center`}><div className={`${active === "likes" && "font-bold border-b-4  border-blue-400"} h-full flex items-center`}>Likes</div></div>
                </div>
            </div>
            <div>
                {active === "tweets" && <div>
                    {posts && <PostRenderer posts={posts} />}
                </div>}
                {active === "replies" && <div>
                    <AnimatePresence>
                        {comments.map((commentn) => (
                            <motion.div key={commentn.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                <CommentComp postId={commentn.post} commentn={commentn} key={commentn.id} link={true} />
                            </motion.div>
                        ))}
                    </AnimatePresence></div>}

                {active === "likes" && <div>
                    {postsLiked && <PostRenderer posts={postsLiked} />}</div>}
            </div>
        </div>

    )
}
