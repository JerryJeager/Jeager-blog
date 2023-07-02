import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"




const Comments = ({ blogId }) => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])
  const {displayName} = useSelector(state => state.user)
  const {isLoggedIn} = useSelector(state => state.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    createUserDoc(blogId)
    console.log(comment)
  }

  const createUserDoc = (id) => {
    const colRef = collection(db, 'Comments')
    addDoc(colRef, {
      displayName: displayName,
      blogId: id,
      comment: comment
    }).then(() => setComment(''))
  }

  const handleCommentChange = (e) => {
    if(!isLoggedIn){
       e.preventDefault()
       navigate('/Login')
    }
    setComment(e.target.value)
  }
    
     useEffect(() => {
        const colRef = collection(db, 'Comments')
        const q = query(colRef, where("blogId", "==", `${blogId}`))
        onSnapshot(q, (snapshot) => {
            let comments = []
           snapshot.docs.forEach(doc => {
            comments.push({...doc.data(), id: doc.id})
           })
           setCommentList(comments)
           console.log(commentList)
        })
    }, [])

  return (
    <div className="mt-3 border-t-2 pb-4 border-slate-500">
      <div className="mt-2 w-[90%] mx-auto">
        <h2 className="text-lg font-bold text-berkeleyBlue">Comments</h2>
        <div className="md:w-[420px]">
          <form action="" onSubmit={handleSubmit}>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Add to the discussion"
              className="w-full p-2 border-berkeleyBlue mt-2 text-berkeleyBlue rounded-sm h-[60px]"
              value={comment}
              onChange={handleCommentChange} 
            ></textarea>
            <button type="submit" className="rounded-sm p-2 mt-2 bg-berkeleyBlue text-white">Send</button>
          </form>

          <div className="mt-3">
            {
                commentList && 
                commentList.map(com => (
                    <div className="p-2 mt-2 border-slate-300 border-2 rounded-md" key={com.id}>
                     <p className="font-semibold text-slate-400 text-sm ">{com.displayName}</p>
                     <p className="mt-2 text-berkeleyBlue">{com.comment}</p>
                    </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments
