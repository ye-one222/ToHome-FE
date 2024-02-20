import React, { useEffect, useState } from "react";
import { Menu } from "../../interface/menu.tsx";
import { MyRecipePage } from "../../interface/myRecipes.tsx";
import { PostData } from "../../interface/PostData.tsx";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";

const ScrapPage:React.FC = () => {
    const [ iLikes, setILikes ] = useState<PostData[]>([])

    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/likedByUser/${localStorage.getItem("user-id")}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ setILikes(data) }
            else{ /*alert(data.message)*/ }
        });
},[]);

    return <div>
    <h1 className="text-[#507e1f] text-[30px]">Scrap: {iLikes.length}</h1>
    <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto overflow-x-hidden">
    {iLikes.map((each) => {
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

        return (
        <div>
            <Link to={`/recipe/${each.id}`}> 
            <img className='w-[260px] bg-zinc-100 rounded-[20px]' src={each.imageUrl} alt={each.title}/>
            <div className="max-h-[24px] max-w-[260px] ml-2 flex flex-row">
                <h1 className="text-[#507e1f] max-w-[180px] overflow-hidden">{each.title}</h1>
                <div className="flex flex-row ml-auto">
                <img className='w-[23px]' src="/img/heart.png" alt="heart"/>
                <h1 className="text-[#507e1f] text-[15px]">{likeCount}</h1>
                </div>
            </div>
            </Link>
        </div>)
    })}
    </div>
</div>
}

const MyPageEDIT:React.FC<{name:string, email:string, imgUrl:string}> = ({name, email,imgUrl}) => {
    
    const [ newId, setNewId ] = useState<string>(name)
    const [ newImg, setNewImg ] = useState<string>(imgUrl)
    const [ isChanged, setIsChanged ] = useState(false)

    const handleSave = () => {
        if(newId === ''){
            alert("아이디를 입력해주세요!")
        }else if(newId === name){   //이미지 수정
            fetch(`http://tobehome.kro.kr:8080/${localStorage.getItem("user-id")}/image`, {
            method: 'PATCH',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
            body: JSON.stringify({
                newImageUrl: newImg
            })
            })
            .then((res) => { 
                alert("이미지 수정 완료! 새로고침 해주세요:) ")
                setIsChanged(false)
                return res.json()
            })
            .then((data) => { console.log(data.message) });
        }else{
            fetch(`http://tobehome.kro.kr:8080/${localStorage.getItem("user-id")}/nickname`, {
            method: 'PATCH',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
            body: JSON.stringify({
                newNickname: newId,
                newImageUrl: newImg
            })
            })
            .then((res) => { 
                console.log(res)
                if(res.status === 200) { 
                    alert("아이디 수정 완료! 새로고침 해주세요:) ")
                    setIsChanged(false)
                    //userName=newId
                }else{
                    alert("아이디가 중복됩니다. 다른 아이디로 시도하세요 :)")
                }
                return res.json()
            })
            .then((data) => { console.log(data.message) });
        }
       
    }

    const handleCancelBtn = () => {
        setIsChanged(false)
        setNewId(name);
        setNewImg(imgUrl);
    }
    
    const uploadFB = async (e) =>{
        const uploaded_file = await uploadBytes(
         ref(storage,`profile/${e.target.files[0].name}`
         ),e.target.files[0]
        );
        const file_url = await getDownloadURL(uploaded_file.ref);
        setNewImg(file_url)
        setIsChanged(true)
    }

    return <div className="flex flex-col gap-5 max-h-[500px]">
    <div className="flex gap-4 mt-5">
        <img
        src={ newImg ? `${newImg}`:`/img/logo.png` }
        alt='myProfile' 
        className="w-1/3 max-w-[200px] border border-[#DEF0CA] rounded-md"/>
        <div className="flex flex-col">
            <h1 className="text-[#507e1f]">My Profile Photo</h1>
            <label 
            htmlFor="profilePhoto" 
            className="mt-auto mb-2 h-4 bg-zinc-100 rounded-[20px] hover:font-semibold">
                Select Photo</label>
            <input 
            type="file" 
            id="profilePhoto" 
            onChange={ uploadFB }
            className="hidden"/>
        </div>
    </div>
    <div className="flex gap-3">
        <h1 className="flex items-center justify-center w-[50px] text-[#507e1f]">ID</h1>
        <input 
        type="text" 
        placeholder={newId}
        onChange={(e) => { setIsChanged(true); setNewId(e.target.value) }}
        className="MyPageEditInput"/>
    </div>
    <div className="flex gap-3">
        <h1 className="flex items-center justify-center w-[50px] text-[#507e1f]">Email</h1>
        <div className="flex items-center text-[#507e1f] MyPageEditInput">{email}</div>
    </div>
    
    <div className="flex justify-evenly mt-5">
        <button 
        onClick={ handleCancelBtn } 
        className="w-1/3 h-[45px] bg-red-100 text-red-400 rounded-2xl border border-red-100 hover:border-red-400 transition-all">취소</button>
        <button 
        onClick={ handleSave } 
        disabled={ newId === name && newImg === imgUrl }  
        className={`w-1/3 h-[45px] rounded-2xl border transition-all ${isChanged ? 'bg-green-100 text-green-400 border-green-100 hover:border-green-400':'bg-zinc-100 text-zinc-400 border-zinc-100 hover:border-zinc-400'}`}>저장</button>
    </div>
</div>
}

export const MyPage:React.FC = () => {
    const [ userId, setUserId ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ imgUrl, setImgUrl ] = useState<string>('')

    const [ IsMyRecipe, setIsMyRecipe ] = useState(true)
    const [ IsScrap, setIsScrap ] = useState(false)
    
    useEffect(() => {
        //회원정보 조회
        fetch(`http://tobehome.kro.kr:8080/${localStorage.getItem("user-id")}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ 
                setUserId(data.nickname)
                setEmail(data.email)
                setImgUrl(data.imageUrl)
            }
            else{ alert(data.message) }
        });
    },[]);
    
    return <div className=" flex flex-col items-center">

        <Menu />

        <div className="absolute top-[40px] h-[110px] flex gap-3 w-1/4 min-w-[400px] max-w-[604px] p-3 bg-[#F2F8E9] border border-white rounded-xl">
            <img className='bg-white rounded-[20px] w-[80px] h-[80px]' alt="myPage" src={`${imgUrl ? imgUrl:'/img/logo.png'}`}/>
            <div className="flex flex-col mt-auto">
                <h1 className="text-[#507e1f] text-[30px] font-semibold">{userId}</h1>
                <h1 className="text-[#B1C799] text-[15px] font-semibold">{email}</h1>
            </div>
        </div>
        
        <div className="absolute top-[180px] w-[40%] ">

            <div className="flex rounded-[30px] w-full h-[120px] text-[30px] gap-[1px]">
                <button onClick={ () => {setIsMyRecipe(true); setIsScrap(false); } } 
                    className = {`w-1/3 bg-white text-[#507e1f] border-r border-r-[#DEF0CA] hover:bg-[#F2F8E9] hover:font-semibold rounded-[30px] transition-all ${IsMyRecipe ? 'font-semibold':'font-normal'}`}>
                        MY Recipes</button>
                <button onClick={ () => {setIsMyRecipe(false); setIsScrap(true); } } 
                    className={`w-1/3 bg-white text-[#507e1f] border-x border-x-[#DEF0CA] hover:bg-[#F2F8E9] hover:font-semibold rounded-[30px] transition-all ${IsScrap ? 'font-semibold':'font-normal'}`}>
                        Scrap</button>
                <button onClick={ () => {setIsMyRecipe(false); setIsScrap(false); } } 
                    className={`w-1/3 bg-white text-[#507e1f] border-l border-l-[#DEF0CA] hover:bg-[#F2F8E9] hover:font-semibold rounded-[30px] transition-all ${!IsMyRecipe && !IsScrap ? 'font-semibold':'font-normal'}`}>
                        My Page EDIT</button>
            </div>

            <div className="absolute top-[120px] border-t border-t-[#DEF0CA] bg-white rounded-[30px] w-full p-5">
                { IsMyRecipe ? 
                    <MyRecipePage />
                    :
                    IsScrap ? 
                    < ScrapPage />
                    : 
                    < MyPageEDIT name={userId} email={email} imgUrl={imgUrl}/>
                }
            </div>
        </div>
    </div>
}