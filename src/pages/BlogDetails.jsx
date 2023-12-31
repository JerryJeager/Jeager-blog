import { useLocation } from "react-router-dom"
import {  doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useEffect, useState } from "react"
import Comments from "../components/Comments"

const BlogDetails = () => {

    const [blogDetails, setBlogDetails] = useState()

    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get("id")

    const getBlogDetails = async () => {
        const docRef = doc(db, "Blogs", id);
        const docSnap = await getDoc(docRef);

       if (docSnap.exists()) {
         console.log("Document data:", docSnap.data());
         setBlogDetails(docSnap.data())
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
       }
    }
    
    useEffect(() => {
        getBlogDetails()
    }, [])


    return (
        <div>
         {
            blogDetails && 
            <div>
                <div className="w-[90%] mx-auto mt-3">
                    <div className="md:w-[90%]">
                        <h2 className="font-bold text-xl text-berkeleyBlue">{blogDetails.title}</h2>
                        <p className="text-slate-600">By: {blogDetails.author}</p>
                        {blogDetails.date && <p className="text-berkeleyBlue text-sm mt-2">{blogDetails.date}</p>}
                         <p className="text-berkeleyBlue text-md mt-4">{blogDetails.body}</p>

                    </div>   
                </div>

                <div>
                    <Comments blogId={id}/>
                </div>
            </div>

         }

        </div>
    )
}
export default BlogDetails