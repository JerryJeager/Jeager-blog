import { useState } from "react"
import {getFirestore, collection, getDocs, addDoc} from "firebase/firestore"
import { colRef } from "../firebase"
import { useNavigate } from "react-router-dom"


const Create = () => {
    const navigate = useNavigate()
    const uniqueId = () => {
        return Math.random().toString(36).substring(2,9)
    }

    const [blogTitle, setBlogTitle] = useState('')
    const [blogBody, setBlogBody] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [category, setCategory] = useState('Featured')
    const [id, setId] = useState()


     const handleSubmit = (e) => {
         e.preventDefault(); 
         setId(uniqueId)
    console.log("Blog Title:", blogTitle);
    console.log("Blog Body:", blogBody);
    console.log("Blog Author:", blogAuthor);
    console.log("Category:", category);


    addDoc(colRef, {
        'author': blogAuthor,
        'body': blogBody,
        'category': category,
        'title': blogTitle,
        
    }).then(() => navigate('/'))

    }

    return (
        <div>
           <h2 className="text-red text-lg mt-6 font-bold text-center">Add a New Blog</h2>

           <div className="w-[90%] mx-auto mt-4">
            <form action="" onSubmit={e => handleSubmit(e)} className="text-berkeleyBlue">
                <label htmlFor="">Blog Title</label>
                <input type="text" className="w-full mb-3 p-2 caret-red" value={blogTitle} onChange={e => {
                    setBlogTitle(e.target.value)
                }} required />

                <label htmlFor="" className="mt-3">Blog body</label>
                <textarea name="" id="" cols="30" rows="5" className="w-full mb-3 p-2 caret-red" value={blogBody} onChange={e => {
                    setBlogBody(e.target.value)
                }} required ></textarea>

                <label htmlFor="" className="mt-3">Blog author</label>
                <input type="text" className="w-full mb-3 p-2 caret-red" value={blogAuthor} onChange={e => {
                    setBlogAuthor(e.target.value)
                }} required  />

                <label htmlFor="" className="mt-3">Category</label>
                <select name="" id="" className="w-full mb-3 p-2" value={category} onChange={e => {
                    setCategory(e.target.value)
                }} required >
                    <option value="Featured">Featured</option>
                    <option value="Html">Html</option>
                    <option value="Css">Css</option>
                    <option value="React">React</option>
                    <option value="Javascript">Javascript</option>
                    <option value="News">News</option>
                </select>
                
                <div className="mx-auto w-[120px]">
                    <button type="submit" className="bg-red p-2 font-bold text-black rounded-sm">Create Blog</button>
                </div>
            </form>
           </div>

        </div>
    )
}

export default Create