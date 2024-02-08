import React, { useState } from "react"
import { Menu } from "../interface/menu.tsx"

export const PostPage:React.FC = () => {
    const [ IsRecipe, setIsRecipe ] = useState(false);
    const [ IsHouse, setIsHouse ] = useState(false);
    const [ photos, setPhotos ] = useState([])

    const LocatePhotos = (photo) => {
        return <div>
            <img src="" alt="photos" className="flex items-center justify-center w-[128px] h-[128px] text-[30px] bg-[#F1F2F0] rounded-[50px]"/>
        </div>
    }
    return <div className="flex items-center justify-center">
        <Menu />

        {!IsRecipe && !IsHouse &&
        <div className="absolute left-[40%] top-[20%]">
            <button onClick={() => { setIsRecipe(true) }} className="absolute text-[20px] sm:text-[50px] bg-[#DEF0CA] rounded-[30px] sm:w-0  hover:text-[52px] hover:w-[210px] transition-all">Recipe POST</button>
            <button onClick={() => { setIsHouse(true) }} className="absolute top-[200px] text-[20px] sm:text-[50px] bg-[#B4CE97] rounded-[30px] sm:w-0 hover:text-[52px] hover:w-[210px] transition-all">House POST</button>
        </div>
        }

        { IsRecipe && 
        <div className="flex bg-white rounded-[50px] absolute top-[93px] w-[40%] p-3">
            
            <div className="">
                {photos.map( (each) => LocatePhotos(each) )}
                <label
                htmlFor="photoInput"
                className="flex items-center justify-center w-[128px] h-[128px] text-[30px] bg-[#F1F2F0] rounded-[50px]">+</label>
                <input
                type="file"
                id="photoInput"
                className="hidden"/>
            </div>
        </div>
        }

        { IsHouse &&
        <div>
            this is house post
        </div>
        }
    </div>
}