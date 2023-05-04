import { arrayRemove, arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
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
import { modalState2 } from "../../atom/modalAtom2.js"
import { dmUserState } from '../../atom/modalDmUserState';
import { Button, ButtonGroup } from "@mui/material";


export default function ProfilePage({ user, id }) {
    const router = useRouter();
    const [posts, setPosts] = useState(null);
    const [comments, setComments] = useState([]);
    const [postsLiked, setPostsLiked] = useState([]);
    const [active, setActive] = useState("tweets");
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const [open2, setOpen2] = useRecoilState(modalState2);
    const [dmUser, setDmUser] = useRecoilState(dmUserState);
    const [updater, setUpdater] = useState(false)

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

    function openDm() {
        setDmUser(user)
        setOpen2(true)
    }


    const follow = async () => {


        if (user.followers.includes(session.user.uid)) {
            const index = user.followers.indexOf(session.user.uid)
            user.followers.splice(index, 1)
            await updateDoc(doc(db, "users", user.uid), {
                followers: arrayRemove(session.user.uid),
            })
            await updateDoc(doc(db, "users", session.user.uid), {
                following: arrayRemove(user.uid)
            })

        } else {
            user.followers.push(session.user.uid)
            await updateDoc(doc(db, "users", user.uid), {
                followers: arrayUnion(session.user.uid),
            })
            await updateDoc(doc(db, "users", session.user.uid), {
                following: arrayUnion(user.uid)
            })
            router.replace(router.asPath)
        }
    }


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
                            <img className='rounded-full h-full w-full border-4 border-white object-cover' src={user.userImg} alt="" />
                        </div>
                        {session.user.uid === id ?

                            <ButtonGroup className="absolute right-0 mx-1 rounded-lg h-8 " variant="contained" aria-label="outlined primary button group">
                                <Button className="w-fit transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100">Delete Profile</Button>
                                <Button className="w-fit transition-all duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-size-200 bg-pos-0 hover:bg-pos-100" onClick={() => setOpen(true)}>Edit profile</Button>
                            </ButtonGroup>
                            :
                            // bg-white text-sm font-bold rounded-full cursor-pointer hover:bg-gray-200 text-center pt-2 text-gray-800 border border-gray-300 h-8
                            <ButtonGroup className="absolute right-0 mx-1 rounded-lg h-8" variant="contained" aria-label="outlined primary button group">
                                <Button onClick={follow} className="w-fit transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100">{user.followers.includes(session.user.uid) ? "Unfollow" : "Follow"}</Button>
                                <Button className="w-fit transition-all duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-size-200 bg-pos-0 hover:bg-pos-100" onClick={openDm}>Send message</Button>
                            </ButtonGroup>}
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
                    {posts && <PostRenderer posts={posts} profilepage={true} />}
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
