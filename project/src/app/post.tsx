import React from "react"
import { Menu } from "../interface/menu.tsx"

export const PostPage:React.FC = () => {
    
    
    return <div className="">
        <Menu />
        <div className="h-[100vh] flex items-center justify-center gap-5">
            <button className="bg-[#DEF0CA]">Recipe POST</button>
            <button>House POST</button>
        </div>
        
    </div>
}