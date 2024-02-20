import React, { useEffect, useState } from "react"
import { MyRecipePage } from "../../interface/myRecipes.tsx"
import { Menu } from "../../interface/menu.tsx"
import { useParams } from "react-router-dom";

type GuestProfilePageParams = {
    id: string
}

export const GuestProfilePage:React.FC = () => {
    const { id } = useParams<GuestProfilePageParams>();
    const [ nickname, setNickname ] = useState<string>('')
    const [ imgUrl, setImgUrl ] = useState<string>('')
    
    useEffect(() => {
        //회원정보 조회
        fetch(`http://tobehome.kro.kr:8080/${id}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ 
                setNickname(data.nickname)
                setImgUrl(data.imageUrl)
            }
            else{ alert(data.message) }
        });
    },[]);

    return <div className="flex flex-col items-center justify-center">
        
        <Menu />

        <div className="absolute top-[40px] h-[110px] flex gap-3 w-1/4 min-w-[400px] max-w-[604px] p-3 bg-[#F2F8E9] border border-white rounded-xl">
            <img className='bg-white rounded-[20px] w-[80px] h-[80px]' alt="myPage" src={`${imgUrl ? imgUrl:'/img/logo.png'}`}/>
            <div className="flex flex-col mt-auto">
                <h1 className="text-[#507e1f] text-[30px] font-semibold">{nickname}</h1>
            </div>
        </div>
        <div className="absolute top-[200px] left-[27%] bg-white rounded-[30px] w-1/2 p-5">
            <MyRecipePage userId={id!}/>
        </div>
    
    </div>
}