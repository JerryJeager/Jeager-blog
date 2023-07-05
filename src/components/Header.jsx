import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"


const Header = () => {

    const navigate = useNavigate()
    
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false)

    const {isLoggedIn} = useSelector(state => state.user)


    const handleClickedHamburger = () => {
        setIsHamburgerClicked(preValue => !preValue)
    }

    useEffect(() => {
        console.log(isLoggedIn)
    }, [])

    return(
        <>
          <div className="py-4 px-[5%] flex gap-7 justify-between items-center shadow-md">
        {/* logo */}
        <NavLink   to='/'>
          <div className="justify-self-center text-lg font-bold">
            <h2 className="text-[#1d3557]">Jeager <span className="text-[#e63946]">Blog</span></h2>
          </div>
        </NavLink>
          <div className="flex gap-2 items-center">
            {/* hamburger menu icon */}
            <div onClick={handleClickedHamburger} className={`cursor-pointer relative ${isHamburgerClicked ? "z-10" : ""}`}>
                <div className={`h-1 w-[27px] bg-black  duration-500 ${isHamburgerClicked ? "translate-x-[-4.5px] translate-y-[6px] rotate-[-405deg] " : ""} `}></div>
                <div className={`h-1 w-[27px] bg-black mt-2 duration-500 ${isHamburgerClicked ? "translate-x-[-4.5px] translate-y-[-6px] rotate-[405deg]" : ""}`}></div>
            </div>

             {/* NavBar */}
            <div className={` transition-all duration-500 ${isHamburgerClicked ? "h-[100vh] w-[60%] md:w-[30%] absolute top-0 bg-white right-[0%]" : "right-[-100%]"}`}>
                <div className={`${isHamburgerClicked ? "flex items-center" : "hidden"}`}>
                    <ul className="text-lg font-bold flex flex-col justify-between mt-[50px] p-4">
                        <li>
                            <NavLink to={'/'} onClick={() => setIsHamburgerClicked(false)} className="hover:text-red">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to={`${isLoggedIn ? '/Create' : '/Login'}`} onClick={() => setIsHamburgerClicked(false)} className="hover:text-red"> Create Blog </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${isLoggedIn ? '/MyBlogs' : '/Login'}`} onClick={() => setIsHamburgerClicked(false)} className="hover:text-red"> My Blogs </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Login'} onClick={() => setIsHamburgerClicked(false)} className="hover:text-red">Sign in</NavLink>
                        </li>
                        
                    </ul>
                </div>
            </div>
          </div>
       </div> 
        </>
    )
}

export default Header;