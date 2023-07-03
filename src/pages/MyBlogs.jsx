import { NavLink, useNavigate } from "react-router-dom"
import { onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore"
import { useState, useEffect } from "react"
import { colRef, db } from "../firebase"
import { useSelector } from "react-redux"



const MyBlog = () => {

     const [blogList, setBlogList] = useState([])
     const navigate = useNavigate()
     const {uid} = useSelector(state => state.user)

    
    // queries
    const q = query(colRef, where("uid", "==", `${uid}`))

    const deleteBlog = (id) => {
        const docRef = doc(db, 'Blogs', id)
        deleteDoc(docRef)
    }
    
     useEffect(() => {
        onSnapshot(q, (snapshot) => {
            let blogs = []
           snapshot.docs.forEach(doc => {
            blogs.push({...doc.data(), id: doc.id})
           })
           setBlogList(blogs)
        })
    }, [])

    return (
        <div className="w-[90%] mx-auto">
            <h2 className="text-berkeleyBlue text-lg mt-2">My Blogs</h2>

            {/* blog posts */}
            <div className="mt-3 ">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
            { 
                blogList.length > 0 &&
                blogList.map((blog) => (
                    <div className="rounded-sm shadow-md bg-white p-2" key={blog.id}>
                 <h2 className="text-2xl font-bold text-center">{blog.title}</h2>
                 <div className="bg-white flex justify-between border-t-2 border-slate-500 mt-4 pt-2">
                    <div>{blog.author}</div>
                    <div className="flex justify-between gap-2">
                        <div><NavLink to={`/BlogDetails?id=${blog.id}`} className="underline">Read more </NavLink></div>
                        <div onClick={() => {deleteBlog(blog.id)}}><i className="fa-solid fa-trash text-red"></i></div>
                        {/* <div>like</div> */}
                    </div>
                 </div>
              </div>
                ))
            }
            {
                blogList.length == 0 &&
                <div>
                    <p className="text-berkeleyBlue mt-3">You have not posted any Blogs yet!</p>
                    <button onClick={() => navigate('/Create')} className="bg-berkeleyBlue mt-2 text-white p-2 rounded-sm  ">Add Blog</button>
                </div>
            }

           </div>

        </div>

        </div>
    )
}

export default MyBlog
