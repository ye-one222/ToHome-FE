import React, { useEffect, useState } from "react"
import Slider from "react-slick";
import { Menu } from "../interface/menu.tsx";
import { ListData } from '../interface/ListData.tsx';
import { Link } from "react-router-dom";
import { PostData } from "../interface/PostData.tsx";

const TopCard = ( {id} ) => {
    const [ userId, setUserId ] = useState<string>('')
    const [ guestId, setGuestId ] = useState<string>('')
    const [ userImgUrl, setUserImgUrl ] = useState<string>('')
    const [ thisRecipe, setThisRecipe ] = useState<PostData>();
    const [ allSource, setAllSource ] = useState<{id:Number, name:string}[]>([])
    const [ allFurniture, setAllFurniture ] = useState<{id:Number, name:string}[]>([])

    useEffect(() => {
        //재료 카테고리 목록 조회
        fetch('http://tobehome.kro.kr:8080/api/categories/material', {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { setAllSource(data) });
        //가구 카테고리 목록 전체 조회
        fetch('http://tobehome.kro.kr:8080/api/categories/furniture', {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { setAllFurniture(data) });
        //해당 레시피들 가져오기 
        fetch(`http://tobehome.kro.kr:8080/api/posts/${id}`, {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            setThisRecipe(data);
            setGuestId(data.userId)
             fetch(`http://tobehome.kro.kr:8080/${data.userId}`, {
                method: 'GET',
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                    "Content-Type":"application/json; charset=utf-8",
                },
            })
            .then((response) => response.json())
            .then((dat1a) => { 
                if(dat1a){ 
                    setUserId(dat1a.nickname)
                    setUserImgUrl(dat1a.imageUrl)
                }
            });
        })
    }, [])

    //재료 이름 받아오기
    const yourSource = allSource.find((each) => each.id === thisRecipe?.materialCategory)
    const yourFurniture = allFurniture.find((each) => each.id === thisRecipe?.furnitureCategory)

    return (
        <Link to={`/recipe/${id}`}><div className="flex items-center w-[700px] h-[480px] bg-[#ffffffb2] rounded-[52px] p-5 gap-4">
            <div className="flex items-center justify-center w-[371px] h-[371px] rounded-[52px]">
                <img src={thisRecipe?.imageUrl} alt="topPhotos" className="w-[482px] max-h-[382px] rounded-[52px]" /> 
            </div>
            
            <div className="flex flex-col max-w-[223px] max-h-[460px] gap-4">
                <h1 className="min-h-[45px] text-[30px] font-semibold text-[#6C9441] overflow-y-hidden">{thisRecipe?.title}</h1>
                <hr className="w-full bg-black"/>
                <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">{thisRecipe?.shortDescription}</div>
                <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">{thisRecipe?.content}</div>
                
                <div className="flex flex-wrap mt-3 gap-2 min-h-[88px] max-h-[80px]">
                    <div>
                        <h1 className="flex items-center justify-center text-[12px] text-[#507E1F]">사용 재료</h1>
                        <div className="flex items-center justify-center w-[75px] h-[40px] bg-[#507E1F] text-[13px] text-center text-[#DEF0CA] rounded-[30px] p-2 opacity-70">{yourSource?.name}</div>  
                    </div>
                    <div>
                        <h1 className="flex items-center justify-center text-[12px] text-[#507E1F]">가구 종류</h1>
                        <div className="flex items-center justify-center w-[75px] h-[40px] bg-[#DEF0CA] text-[13px] text-center text-[#507E1F] rounded-[30px] p-2">{yourFurniture?.name}</div>
                    </div>
                </div>
                <Link to={`/guest/${guestId}`}>
                    <div className="mt-2 flex items-center gap-1">
                        <div className="w-[57px] h-[57px] bg-[#8181811a] rounded-[20px]">
                            <img src={userImgUrl} alt="userProFile" className="w-[67px] h-[67px] rounded-[20px]" />
                        </div>
                        <div className="flex-col p-2">
                            <div className="text-[13px] text-[#000000b2]">made by</div>
                            <div className="text-[20px] text-[#000000b2]">{userId}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div></Link>
    )
}

const RecipeCard = ({ post_id, title, username }) => {
    const [ thisRecipe, setThisRecipe ] = useState<PostData>()
    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/${post_id}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ setThisRecipe(data); }
            else{ alert(data.message) }
        });
    },[])
    
    return (
        <Link to={`/recipe/${post_id}`}>
        <div className="flex flex-col"> 
            <img src={thisRecipe?.imageUrl} alt="imge" className="w-[230px] h-[230px] rounded-[20px] hover:scale-105 hover:shadow-2xl transition-transform ease-in-out duration-400" />
            <div className="flex whitespace-nowrap justify-between items-end">
                <h1 className="w-[132px] text-[20px] text-left text-black overflow-hidden">{title}</h1>
                <div className="w-[80px] text-[17px] text-right text-[#00000080] overflow-hidden">{username}</div>
            </div>
        </div>
        </Link>
    )
}

export const MainPage:React.FC = ()=>{
    const [ recipesData, setRecipesData ] = useState<ListData>();
    const [ allPostId, setAllPostId ] = useState<number[]>([]);
    
    useEffect(() => {
        fetch("http://tobehome.kro.kr:8080/api/posts?page=1&size=100", {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            setRecipesData(data);
            data.content.map((each, index) => {
                if(each.type === "product"){
                    return (
                        setAllPostId((prevAllPostId) => [...prevAllPostId, each.id])
                    )
                }
            })
            
        })
    }, []);

    const top5RecipesId = [...allPostId].sort(() => Math.random() - 0.5).slice(0, 5)
     
    return (
    <div className="flex flex-col items-center">
        <Menu/>
       
        {/* 상단 명예의 전당 */}
        <div className="flex mt-10 items-center gap-2 w-[700px] overflow-x-auto">
            
            {top5RecipesId.map((each, index) => {
                return (
                    <TopCard key={index} id={each}/>
                )
            })}
        </div>

        {/* 레시피들 3열 */}
        <div className="mt-10 grid grid-cols-3 gap-3">
            {recipesData?.content.map((each,index) => {
                const reversedIndex = recipesData.content.length - 1 - index;
                const currentPost = recipesData.content[reversedIndex];

                if(currentPost.type==='product'){
                    return (
                        <RecipeCard
                            key={index}
                            post_id={currentPost.id}
                            title={currentPost.title}
                            username={currentPost.userId}
                        />
                    )
                }else {
                    return null;
                }
            })}
        </div>
    </div>
    )
}