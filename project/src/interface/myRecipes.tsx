import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostData } from "./PostData.tsx";

export const MyRecipePage:React.FC = ( ) => {
    const [ myRecipes, setMyRecipes ] = useState<PostData[]>([])
    const [ iLikes, setILikes ] = useState<number[]>([])

    useEffect(() => { 
        fetch(`http://tobehome.kro.kr:8080/api/posts/user/${localStorage.getItem("user-id")}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ setMyRecipes(data) }
            else{ alert(data.message) }
        });
        //내가 좋아요 누른 게시글 조회
        fetch(`http://tobehome.kro.kr:8080/api/posts/likedByUser/${localStorage.getItem("user-id")}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data.id){ setILikes(data.id) }
            else{ /*alert(data.message)*/ }
        });
    },[]);

    return <div>
    
    <h1 className="text-[#507e1f] text-[30px] font-semibold">My Recipes - {myRecipes.length}</h1>
    <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto overflow-x-hidden">
    
    {myRecipes.map((each) => {
        let likeCount = 0;
        //게시글 좋아요 수 조회
        fetch(`http://tobehome.kro.kr:8080/api/posts/${each.id}/likeCount`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ likeCount = data }
            else{/* alert(data.message) */}
        });
        console.log(each)
        return (
        <div className="h-[200px]">
            <Link to={`/recipe/${each.id}`}> 
            <img className='bg-zinc-100 rounded-[20px]' src='{each.imageUrl}' alt={each.title}/>
            <div className="max-h-[24px] max-w-[260px] ml-2 flex flex-row">
                <h1 className="overflow-hidden">{each.title}</h1>
                <div className="flex flex-row ml-auto mr-1">
                    { (iLikes.indexOf(each.id) !== -1) ? 
                        <img className='w-[23px]' src="/img/heart.png" alt="heart"/>:
                        <img className='w-[23px]' src="/img/emptyHeart.png" alt="emptyHeart"/>
                    }
                    <h1>{likeCount}</h1>
                </div>
            </div>
            </Link>
        </div>)
    })}
    </div>
</div>
}