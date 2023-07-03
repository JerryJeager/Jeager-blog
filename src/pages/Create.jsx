import { useState } from "react"
import {getFirestore, collection, getDocs, addDoc} from "firebase/firestore"
import { colRef } from "../firebase"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


const Create = () => {
    const navigate = useNavigate()
    const {uid} = useSelector(state => state.user)
    const {displayName} = useSelector(state => state.user)

    const [blogTitle, setBlogTitle] = useState('')
    const [blogBody, setBlogBody] = useState('')
    const [category, setCategory] = useState('Featured')


     const handleSubmit = (e) => {
         e.preventDefault(); 
    let blogDate = new Date()
    addDoc(colRef, {
        'author': displayName,
        'body': blogBody,
        'category': category,
        'title': blogTitle,
        'uid': uid,
        'date': `${blogDate.getDate()}/${blogDate.getMonth() + 1}/${blogDate.getFullYear()}`
        
    }).then(() => navigate('/'))

    }

    return (
        <div>
           <h2 className="text-red text-lg mt-6 font-bold text-center">Add a New Blog</h2>

           <div className="w-[90%] md:w-[70%] mx-auto mt-4">
            <form action="" onSubmit={e => handleSubmit(e)} className="text-berkeleyBlue">
                <label htmlFor="">Blog Title</label>
                <input type="text" className="w-full mb-3 p-2 caret-red" value={blogTitle} onChange={e => {
                    setBlogTitle(e.target.value)
                }} required />

                <label htmlFor="" className="mt-3">Blog body</label>
                <textarea name="" id="" cols="30" rows="5" className="w-full mb-3 p-2 caret-red" value={blogBody} onChange={e => {
                    setBlogBody(e.target.value)
                }} required ></textarea>

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