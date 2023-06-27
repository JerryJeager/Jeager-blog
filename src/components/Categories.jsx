const Categories = ()  => {
    return (
        <div className="overflow-x-scroll md:overflow-x-hidden">
            
          <div className="flex justify-between gap-2 w-[90%] mx-auto h-auto mt-3">
            <div className="bg-red p-2 rounded-sm cursor-pointer">Featured</div>
            <div className="bg-pink p-2 rounded-sm cursor-pointer">Html</div>
            <div className="bg-photoBlue p-2 rounded-sm cursor-pointer">Css</div>
            <div className="bg-cerulean p-2 rounded-sm cursor-pointer">React</div>
            <div className="bg-yellow p-2 rounded cursor-pointer">Javascript</div>
            <div className="bg-thistle p-2 rounded cursor-pointer">News</div>
          </div>
        </div>
    )
}

export default Categories