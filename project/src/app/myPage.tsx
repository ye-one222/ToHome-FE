import React, { useState } from "react";
import { Menu } from "../interface/menu.tsx";


export const MyPage:React.FC = ()=>{
    const [IsLiked, ] = useState(false);
    const myRecipes = [
        {
            title: 'This is Title1',
            content: 'This is contentssssss111',
            liked: 15
        },
        {
            title: 'This is Title2',
            content: 'This is contentssssss222',
            liked: 8
        },
        {
            title: 'This is Title33',
            content: 'This is contentssssss333',
            liked: 9
        }
    ]
    
    return <div className="h-[100vh] flex flex-col items-center justify-center">
        <Menu />
        <div className="flex items-center w-1/3 max-w-[604px] p-3 border bg-[#F2F8E9] border-[#A1BB84] rounded-xl gap-3 ">
            <div className="flex items-center bg-zinc-100 rounded-sm ">
                <img className='w-[78px]' alt="myPage" src="/img/guest.png"/>
            </div>
            <div>
                <h1 className="text-[#507e1f] text-[30px]">myName</h1>
                <h1 className="text-[#B1C799] text-[20px]">my E-Mail</h1>
            </div>
                
        </div>
        <div className="w-[40vw] max-w-[604px] ml-5">
            <h1 className="text-[#507e1f] text-[30px]">My Recipes - {myRecipes.length}</h1>
            <div className="grid grid-cols-2 gap-5">
                {myRecipes.map((each) => {
                return (<div>{/*<Link to=''> </Link>*/}
                    <img className='w-[260px] bg-white rounded-[20px]' src="/img/menuBar/HouseMenuIcon.png" alt={each.title}/>
                    <div className="max-h-[24px] max-w-[260px] ml-2 flex flex-row">
                        <h1 className="overflow-hidden">{each.title}</h1>
                        <div className="flex flex-row ml-auto">
                            {IsLiked ? 
                                <img className='w-[24px]' src="/img/heart.png" alt="heart"/>:
                                <img className='w-[24px]' src="/img/emptyHeart.png" alt="emptyHeart"/>}
                            <h1>{each.liked}</h1>
                        </div>
                    </div>

                </div>)
            })}
            </div>
        </div>
    </div>
    
}