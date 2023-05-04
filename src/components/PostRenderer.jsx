import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Post from './Post'

export default function PostRenderer({ posts, profilepage }) {
    return (
        <AnimatePresence>
            {posts.map((post) => (
                <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <Post post={post} key={post.id} profilepage={profilepage} />
                </motion.div>
            ))}
        </AnimatePresence>
    )
}
