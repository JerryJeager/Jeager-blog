import {onSnapshot} from "firebase/firestore"
import { colRef } from "../firebase";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Categories from "../components/Categories";


const Home = () => {

    const [blogPosts, setBlogPosts] = useState([])

    useEffect(() => {
        onSnapshot(colRef, (snapshot) => {
            let blogs = []
           snapshot.docs.forEach(doc => {
            blogs.push({...doc.data(), id: doc.id})
           })
           setBlogPosts(blogs)
           console.log(blogs)
        })
    }, [])

    return (
        <div>

        {/* categories */}
            <Categories />

        {/* Blog posts */}

        <div className="w-[90%] mt-3 mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
            {
                blogPosts.map((blog) => (
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

export default Home;