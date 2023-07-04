import { NavLink } from "react-router-dom"


const Categories = ()  => {
    

    return (
        <div className="overflow-x-scroll md:overflow-x-hidden">
            
          <div className="flex justify-between gap-2 w-[90%] mx-auto h-auto mt-3">

            <div className="bg-red p-2 rounded-sm cursor-pointer"><NavLink to={'/CategoryBlogList?category=Featured'}>Featured</NavLink></div>

            <div className="bg-pink p-2 rounded-sm cursor-pointer"><NavLink to={'/CategoryBlogList?category=Html'}>Html</NavLink></div>

            <div className="bg-photoBlue p-2 rounded-sm cursor-pointer"><NavLink to={'/CategoryBlogList?category=Css'}>Css</NavLink></div>

            <div className="bg-cerulean p-2 rounded-sm cursor-pointer"><NavLink to={'/CategoryBlogList?category=React'}>React</NavLink></div>

            <div className="bg-yellow p-2 rounded cursor-pointer"><NavLink to={'/CategoryBlogList?category=Javascript'}>Javascript</NavLink></div>

            <div className="bg-thistle p-2 rounded cursor-pointer"><NavLink to={'/CategoryBlogList?category=News'}>News</NavLink></div>

            <div className="bg-[#e5e5e5] p-2 rounded cursor-pointer"><NavLink to={'/CategoryBlogList?category=Other'}>Others</NavLink></div>
          </div>
        </div>
    )
}

export default Categories