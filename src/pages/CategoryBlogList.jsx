import { useLocation, NavLink } from "react-router-dom"
import {  doc, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../firebase"
import { useState, useEffect } from "react"
import { colRef } from "../firebase"



const CategoryBlogList = () => {

     const location = useLocation()
     const [blogList, setBlogList] = useState([])

    const queryParams = new URLSearchParams(location.search)
    const category = queryParams.get("category")

    
    // queries
    const q = query(colRef, where("category", "==", `${category}`))
    
     useEffect(() => {
        onSnapshot(q, (snapshot) => {
            let blogs = []
           snapshot.docs.forEach(doc => {
            blogs.push({...doc.data(), id: doc.id})
           })
           setBlogList(blogs)
           console.log(blogs)
        })
    }, [])

    return (
        <div className="w-[90%] mx-auto">
            <h2 className="text-berkeleyBlue text-lg mt-2">{category} Posts</h2>

            {/* blog posts */}
            <div className="mt-3 ">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
            {
                blogList.map((blog) => (
                    <div className="rounded-sm shadow-md bg-white p-2" key={blog.id}>
                 <h2 className="text-2xl font-bold text-center">{blog.title}</h2>
                 <div className="bg-white flex justify-between border-t-2 border-slate-500 mt-4 pt-2">
                    <div>{blog.author}</div>
                    <div className="flex justify-between gap-2">
                        <div><NavLink to={`/BlogDetails?id=${blog.id}`}>Read more </NavLink></div>
                        <div><i className="fa-regular fa-heart"></i></div>
                        {/* <div>like</div> */}
                    </div>
                 </div>
              </div>
                ))
            }

           </div>

        </div>

        </div>
    )
}

export default CategoryBlogList
