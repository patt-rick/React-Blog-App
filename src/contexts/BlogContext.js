import React, { createContext, useEffect, useState, useContext } from 'react';
import { Usercontext } from '../contexts/Usercontext';
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"

export const BlogContext = createContext();

const BlogContextProvider = (prop) => {
    const {profile} = useContext(Usercontext)
    const [blogs, setBlogs] = useState([{title:"title",id:9001,body:"initializing"}])
    const blogCollectionRef = collection(db, "blogs")


    const getPosts = async () => {
        const data = await getDocs(blogCollectionRef)
        // console.log(data.docs)
        setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
    }
    useEffect(()=>{
        // console.log("blogcontext.js")
        
        if(profile){
            getPosts();
        }
    },[db])
    

    return ( 
        <BlogContext.Provider value={{blogs, getPosts}}>
            {prop.children}
        </BlogContext.Provider>
     );
}
 
export default BlogContextProvider;