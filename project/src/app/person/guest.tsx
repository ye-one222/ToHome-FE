import React from "react"
import { MyRecipePage } from "../../interface/myRecipes.tsx"
import { Menu } from "../../interface/menu.tsx"

export const GuestProfilePage:React.FC = () => {
    const myId = 'bowoon1216'; const myName = '정보운'; 

    return <div className="flex flex-col items-center justify-center">
        
        <Menu />

        <div className="absolute top-[30px] h-[120px] flex gap-3 w-1/3 min-w-[400px] max-w-[604px] p-3 bg-[#F2F8E9] border border-[#A1BB84] rounded-xl">
            <img className='bg-zinc-100 rounded-[20px] w-[85px]' alt="myPage" src="/img/guest.png"/>
            <div className="flex flex-col mt-auto">
                <h1 className="text-[#507e1f] text-[30px]">{myId}</h1>
                <h1 className="text-[#B1C799] text-[15px]">{myName}</h1>
            </div>
        </div>
        <div className="absolute top-[200px] left-[27%] bg-white rounded-[30px] w-1/2 p-5">
            <MyRecipePage />
        </div>
    
    </div>
}