import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"

const Comments = ({ blogId }) => {
    const {uid} = useSelector(state => state.user)
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
    const commentDate = new Date()
    const colRef = collection(db, 'Comments')
     if(comment.trim().length != 0)  //reject sending of comments containing only whitespace
    addDoc(colRef, {
      displayName: displayName,
      blogId: id,
      comment: comment,
      'date': `${commentDate.getDate()}/${commentDate.getMonth() + 1}/${commentDate.getFullYear()}`,
      commentUid: uid
    }).then(() => setComment(''))
  }

  const handleCommentChange = (e) => {
    if(!isLoggedIn){
       e.preventDefault()
       navigate('/Login')
    }
    setComment(e.target.value)
  }

  const deleteBlog = (id) => {
        const docRef = doc(db, 'Comments', id)
        deleteDoc(docRef)
    }

    const handleLike = (id) => {
    const updatedCommentList = commentList.map((com) => {
      if (com.id === id) {
        return {
          ...com,
          isLiked: !com.isLiked,
        }
      }
      return com
    })
    setCommentList(updatedCommentList);
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
                commentList.map((com) => (
                    <div key={com.id}>
                        <div className="p-2 mt-2 border-slate-300 border-2 rounded-md">
                        <p className="font-semibold text-slate-400 text-sm ">{`${com.displayName} -  ${com.date ? com.date: ""}`}</p>
                         <p className="mt-2 text-berkeleyBlue">{com.comment}</p>
                         </div>
                         <div className="flex gap-2 mr-2">
                            {
                                com.commentUid == uid &&
                                <div onClick={() => {deleteBlog(com.id)}}><i className="fa-solid fa-trash text-red"></i></div>
                            }
                        <div onClick={() => handleLike(com.id)}>
                      {/* Toggle the class or render a different element based on the 'isLiked' status */}
                      {com.isLiked ? (
                        <i className="fa-solid fa-heart text-red"></i>
                      ) : (
                        <i className="fa-classic fa-heart text-slate-400"></i>
                      )}
                    </div>
                         </div>
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
