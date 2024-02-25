import React, { useEffect, useState } from "react"
import { Menu } from "../interface/menu.tsx"
import { PostData } from "../interface/PostData.tsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.js";
import { Link } from "react-router-dom";


interface goodsBtnType {
    x: number;
    y: number;
    postId: number;
}

export const PostPage:React.FC = () => {
    const [newRecipe, setNewRecipe ] = useState<PostData>({
        id: 0,
        userId: 0,
        title: '',
        shortDescription: '',
        content: '',
        type: '',
        materialCategory: 0,
        furnitureCategory: 0,
        imageUrl: '',
        imageUrl2: '',
        imageUrl3: '',
        createdAt: '', //아니면 Date?
        updatedAt: '',
        rel:[]
    });
    const [ iLikes, setILikes ] = useState<PostData[]>([])
    
    const [ IsRecipe, setIsRecipe ] = useState(false);
    const [ IsHouse, setIsHouse ] = useState(false);
    
    const [ photosSrc, setPhotosSrc ] = useState<string[]>([])
    const [ imgBase64, setImgBase64 ] = useState('')
    
    const [ Source, setSource ] = useState<string|null>(null)//
    const [ addSourceInput, setAddSourceInput ] = useState<string>('')
    const [ Furniture, setFurniture ] = useState<string|null>(null)//
    const [ addFurnitureInput, setAddFurnitureInput ] = useState<string>('')
    
    const [ bestSource, setBestSource ] = useState([])
    const [ bestFurniture, setbestFurniture ] = useState([])

    const [ IsHousePhoto, setIsHousePhoto ] = useState(false)
    const [ goodsBtn, setGoodsBtn ] = useState<goodsBtnType[]>([])
    const [ addGoodsClick, setAddGoodsClick ] = useState(false)
    const [ xy, setXY ] = useState({x:0, y:0})
    const [ goodsPostId, setGoodsPostId ] = useState<number|null>(null)

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
        .then((data) => { setBestSource(data) });
        //가구 카테고리 목록 전체 조회
        fetch('http://tobehome.kro.kr:8080/api/categories/furniture', {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { setbestFurniture(data) });
        //내가 좋아요한 게시글들 조
        fetch(`http://tobehome.kro.kr:8080/api/posts/likedByUser/${localStorage.getItem("user-id")}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setILikes(data.filter(post => post.type==="product")); 
        });
    },[]);
    
    //post 
    const handlePost = () => {
        if( photosSrc.length === 0 || newRecipe.title === '' 
            || newRecipe.shortDescription === '' || newRecipe.content === ''){ 
                alert(" 게시글 작성을 마무리해주세요 ") }
        else{
            console.log(newRecipe)
            fetch('http://tobehome.kro.kr:8080/api/posts', {
                method: 'post',
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                    "Content-Type":"application/json; charset=utf-8",
                    "user_id" : localStorage.getItem("user-id") as string,
                },
                body: JSON.stringify({
                    title: newRecipe.title,
                    shortDescription: newRecipe.shortDescription,
                    content: newRecipe.content,
                    type: newRecipe.type,
                    materialCategory: newRecipe.materialCategory,
                    furnitureCategory: newRecipe.furnitureCategory,
                    imageUrl: newRecipe.imageUrl,
                    imageUrl2: newRecipe.imageUrl2,
                    imageUrl3: newRecipe.imageUrl3,
                    rel: newRecipe.rel,
                })
            })
            .then((response) => { return response.json() })
            .then((data) => { 
                if(data){ }
                else{ alert(data.message) }
            });
        }
    }

    const LocatePhotos = (photosrc) => {
        return <div>
            <img src={photosrc} alt="photos" className="flex items-center justify-center min-w-[128px] h-[128px] text-[30px] bg-[#F1F2F0] rounded-[50px]"/>
        </div>
    }

    const uploadFB = async (e) =>{
        setIsHousePhoto(true)
        const uploaded_file = await uploadBytes(
         ref(storage,`photos/${e.target.files[0].name}`
         ),e.target.files[0]
        );
        const file_url = await getDownloadURL(uploaded_file.ref);
        setPhotosSrc([...photosSrc, file_url])
        if( photosSrc.length === 0 ){ setNewRecipe({ ...newRecipe, imageUrl: file_url }) }
        if( photosSrc.length === 1 ){ setNewRecipe({ ...newRecipe, imageUrl2: file_url }) }
        if( photosSrc.length === 2 ){ setNewRecipe({ ...newRecipe, imageUrl3: file_url }) }
    }

    const Input3Component = (props:string) => {
        return <div className="flex flex-col gap-5 ">
            <input 
            type="text"
            onChange={(e) => { setNewRecipe({ ...newRecipe, title: e.currentTarget.value }) }}
            placeholder="제목을 입력하세요"
            className="bg-[#DEF0CA] text-[30px] text-[#507E1F] p-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[80px] focus:outline-none active:translate-y-1"/>
            <input 
            type="text"
            onChange={(e) => { setNewRecipe({ ...newRecipe, shortDescription: e.currentTarget.value }) }}
            placeholder={`${props}에 대해 간단히 설명해주세요!`}
            className="bg-[#F8FBF4] text-[20px] text-[#507E1F] p-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[50px] focus:outline-none active:translate-y-1"/>
            <textarea 
            onChange={(e) => { setNewRecipe({ ...newRecipe, content: e.currentTarget.value }) }}
            placeholder={`${props}에 대한 설명을 자세하게 해주세요!`}
            className="bg-[#F8FBF4] text-[20px] text-[#507E1F] p-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[400px] focus:outline-none resize-none active:translate-y-1">
            </textarea>
        </div>
    }

    const UsedComponent = ( props:string, best ) => {

        let flag = true
        if(props === '주사용재료'){ flag = true }
        else { flag = false }

        return <div>
                <div className={`mt-10 ${flag ? 'bg-[#F8FBF4]':'bg-[#DEF0CA]'} rounded-[30px] border-b border-b-[#73974C] p-10`}>
                    <h1 className="text-[30px] text-[#507E1F]">{props}</h1>
                    <div className="flex overflow-x-auto min-h-[40px]">
                        { (flag ? Source:Furniture) && 
                        <div className="flex items-center gap-2 h-[40px] bg-[#507E1F] text-white rounded-[30px] p-2 mr-3 whitespace-nowrap">
                            <div>{(flag ? Source:Furniture)}</div>
                            <button 
                            onClick={ () => { (flag ? setSource:setFurniture)(null)}} 
                            className=" text-red-200 hover:text-red-300">
                                x</button>
                        </div> }
                    </div>
                </div>
                <div className={`${flag ? 'bg-[#F8FBF4]':'bg-[#DEF0CA]'} rounded-[30px] p-10`}>

                    <input
                    type="text"
                    onChange={(event) => { (flag ? setAddSourceInput:setAddFurnitureInput)(event?.target.value) }}
                    placeholder={`${props}를 입력하세요`}
                    value={ (flag ? addSourceInput:addFurnitureInput) }
                    className={`text-[#507E1F] ${flag ? 'bg-[#DEF0CA]':'bg-[#F8FBF4]'} rounded-[30px] pl-5 h-[40px] placeholder:text-[#507E1F] focus:outline-none`}/>
                    
                    <button 
                    onClick={() => { 
                        (flag ? setSource:setFurniture)((flag ? addSourceInput:addFurnitureInput))
                        //무조건 추가해보고 상태 400이면 안하는거로
                        fetch(`http://tobehome.kro.kr:8080/api/categories/${flag ? 'material':'furniture'}`, {
                            method: 'post',
                            headers: {
                                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                                "Content-Type":"application/json; charset=utf-8",
                            },
                            body: JSON.stringify({
                                name: (flag ? addSourceInput:addFurnitureInput)
                            })
                        })
                            .then((res) => { if(res.status === 201){ return res.json() } })
                            .then((data) => { 
                                if(flag){ setNewRecipe({ ...newRecipe, materialCategory: data.id }) }
                                else{ setNewRecipe({ ...newRecipe, furnitureCategory: data.id })}
                            });
                        }} 
                    className="bg-[#B4CE97] h-[40px] w-[50px] rounded-[30px] text-[15px] text-[#507E1F] p-1">
                        추가
                    </button>
                    
                    <div className="flex flex-row gap-3 mt-5 overflow-x-auto">
                        <h1 className="text-[15px] text-[#507E1F]">Best!</h1>
                    {best.map((each) => {
                        return <button 
                        onClick={() => { (flag ? setSource:setFurniture)(each.name); 
                            if(flag){ setNewRecipe({ ...newRecipe, materialCategory: each.id }) }
                            else{ setNewRecipe({ ...newRecipe, furnitureCategory: each.id })}
                        }}
                        className={`${flag ? 'bg-[#DEF0CA]':'bg-[#F8FBF4]'} text-[#507E1F] rounded-[30px] p-2 active:-translate-y-1 whitespace-nowrap`}>
                            { each.name !== '' && each.name }
                        </button>
                    })}
                    </div>
                </div>
            </div>
    }

    const handlePhotoClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if( goodsPostId )
        {
            const boundingRect = event.currentTarget.getBoundingClientRect();
            //console.log(event.clientX, event.clientY)
            const newBtn:goodsBtnType = { x:event.clientX - boundingRect.left, y:event.clientY - boundingRect.top, postId:goodsPostId }
            setGoodsBtn([...goodsBtn, newBtn])
            setGoodsPostId(null)
            //goodsBtn을 newRecipe.rel에 추가
            setNewRecipe({...newRecipe, rel:[...newRecipe.rel, {p:newBtn.postId, x:newBtn.x, y: newBtn.y}]} )
        }
    }
   
    const GoodsBtnComponent: React.FC<goodsBtnType> = ({ x, y, postId }) => {
        const [ goodsBtnClick, setGoodsBtnClick ] = useState(false)
        const [ thisRecipe, setThisRecipe ] = useState<PostData>()
        useEffect(()=>{
            fetch(`http://tobehome.kro.kr:8080/api/posts/${postId}`, {
                method: 'get',
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                    "Content-Type":"application/json; charset=utf-8"
                }
            })
            .then(res => {return res.json()})
            .then(data => {
                setThisRecipe(data)
            })
        },[])
    
        return <div>
            <button 
            onMouseEnter={() => {  setGoodsBtnClick(true) }}
            onMouseLeave={() => {  setGoodsBtnClick(false) }}
            style={{ position: 'absolute', top: y+40 , left: x+40, opacity : 0.7,}} 
            className={`flex items-center justify-center text-white bg-[#507E1F] rounded-[30px] w-5 h-5 `}>+</button>
            { goodsBtnClick && 
            <div 
            onMouseEnter={() => {  setGoodsBtnClick(true) }}
            onMouseLeave={() => {  setGoodsBtnClick(false) }}
            style={{ position: 'absolute', top: y+55 , left: x+40, opacity : 0.8,}} 
            className="flex bg-white border border-dashed border-[#507E1F] rounded-[30px] text-[#507E1F] p-3">
                <h1>{thisRecipe?.title}</h1>
            </div>}
        </div>
    }
    
    const GoodsLineComponent:React.FC<goodsBtnType> = ({ x, y, postId}) => {
        const [ thisRecipe, setThisRecipe ] = useState<PostData>()
        useEffect(()=>{
            fetch(`http://tobehome.kro.kr:8080/api/posts/${postId}`, {
                method: 'get',
                headers: {
                    "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                    "Content-Type":"application/json; charset=utf-8"
                }
            })
            .then(res => {return res.json()})
            .then(data => {
                setThisRecipe(data)
            })
        },[])

        const handleDeleteGoods = () => {
            setGoodsBtn(goodsBtn.filter((each) => each.postId !== postId || each.x !== x || each.y !== y))
            //newRecipe에서도 빼야 함 
            setNewRecipe({...newRecipe, rel:newRecipe.rel.filter(item => item.p !== postId)})
        }

        return <div className="flex items-center justify-center w-full gap-3">
            <button 
            onClick={ handleDeleteGoods } 
            className="bg-red-100 border border-[#DC5858] text-[#DC5858] text-[40px] rounded-[50px] h-[60px] w-[60px] hover:bg-red-200 transition-all">
                -</button>
            <div className="flex gap-5 pl-5 bg-[#ECF6E1] rounded-[30px] border border-[#507E1F] w-full py-2">
                <img src="/img/logo.png" alt="postimg" className="w-[50px] h-[50px] bg-zinc-200 rounded-[20px]"/>
                <h1 className="flex items-center justify-center text-[#507E1F] text-[20px]">{thisRecipe?.title}</h1>
            </div>
        </div>
    }

    const handleGoodsClick = (e:PostData) => {
        //여기서 게시글 정보 찾고 
        setGoodsPostId(e.id);
        setAddGoodsClick(false)
    }

    return <div className="flex items-center justify-center min-h-[200vh] bg-[#F8FBF4]">
        <Menu />

        {!IsRecipe && !IsHouse &&
        <div className="absolute left-[40%] top-[20%]">
            <button onClick={() => { setIsRecipe(true); setNewRecipe({ ...newRecipe, type: 'product' }) }} className="absolute text-[20px] sm:text-[50px] bg-[#DEF0CA] rounded-[30px] sm:w-0  hover:text-[52px] hover:w-[210px] transition-all">Recipe POST</button>
            <button onClick={() => { setIsHouse(true); setNewRecipe({ ...newRecipe, type: 'interior' }) }} className="absolute top-[200px] text-[20px] sm:text-[50px] bg-[#B4CE97] rounded-[30px] sm:w-0 hover:text-[52px] hover:w-[210px] transition-all">House POST</button>
        </div>
        }

        { IsRecipe && 
        <div className="absolute top-[93px] w-[50%] lg:w-[40%] bg-white rounded-[50px] p-10">
            <Link to='/mypage'><button 
            onClick={ handlePost } 
            className="absolute -top-[60px] left-[80%] bg-[#E9F3DE] rounded-[4px] text-[#507E1F] text-[16px] w-[139px] h-[50px] font-semibold shadow-md hover:w-[145px] hover:h-[55px] hover:left-[79%] hover:-top-[62px] active:translate-y-1">
                POST</button></Link>
            <div className="flex flex-row overflow-x-auto gap-5">
                { photosSrc.map( (each) => LocatePhotos(each) ) }
                <label
                htmlFor="photoInput"
                className="flex items-center justify-center min-w-[128px] h-[128px] text-[30px] bg-[#F1F2F0] rounded-[50px] hover:bg-[#DBDCDB] transition-all">+</label>
                <input
                type="file"
                id="photoInput"
                onChange={ uploadFB }
                className="hidden"/>
            </div>
            <h1 className="text-[20px] text-[#507E1F] border-b border-b-[#73974C] pb-5">
                사용할 사진을 최대 3개 삽입하세요</h1>
            <div className="mt-[30px] border-b border-b-[#73974C] pb-10">
                { Input3Component('레시피') }
            </div>

            { UsedComponent('대표 가구 종류', bestFurniture) }
            { UsedComponent('주사용재료', bestSource) }

        </div>
        }
        { IsHouse &&
        <div className="absolute top-[93px] w-[50%] lg:w-[40%] bg-white rounded-[50px] p-10">
            <Link to='/mypage'><button 
            onClick={ handlePost } 
            className="absolute -top-[60px] left-[80%] bg-[#E9F3DE] rounded-[4px] text-[#507E1F] text-[16px] w-[139px] h-[50px] font-semibold shadow-md hover:w-[145px] hover:h-[55px] hover:left-[79%] hover:-top-[62px] active:translate-y-1">
                POST</button></Link>
            <div className="w-full flex items-center justify-center">
                { IsHousePhoto ?
                <div onMouseMove={(e) => { setXY({x:e.clientX - 550, y:e.clientY -100}) }}>
                    { goodsPostId && 
                        <h1 className="absolute top-4 left-40 justify-center text-[15px]">
                            사진위에 원하는 위치에 클릭해서 소품을 추가해주세요!
                        </h1>
                    }
                    <img 
                    src={ photosSrc[0] } 
                    onClick={ handlePhotoClick }
                    alt="photos" 
                    className="max-w-full max-h-30% rounded-[50px] mb-5"/>
                    <div className="flex flex-col items-center gap-4">
                        { goodsBtn.map((each, index) => <GoodsLineComponent key={index} x={each.x} y={each.y} postId={each.postId} />) }
                        <div className="flex items-center justify-center gap-3 w-full">
                            <button 
                            onFocus={() => { setAddGoodsClick(true) }} 
                            className="bg-[#85A563] rounded-[30px] text-white text-[30px] w-[60px] h-[60px]">
                                +
                            </button>
                            <button 
                            onFocus={() => { setAddGoodsClick(true) }} 
                            className="bg-[#ECF6E1] border border-dashed border-[#507E1F] rounded-[30px] text-[#507E1F] w-full h-[60px]">
                                사용한 레시피를 추가하세요!
                            </button>
                        </div>
                        { addGoodsClick && 
                        <div className="-mt-3 grid grid-cols-4 w-full p-4 gap-2 border border-[#507E1F] rounded-[30px] max-h-[270px] overflow-y-auto">
                            {iLikes.map((each) => { 
                                return <div onClick={() => { handleGoodsClick(each) } } className="flex flex-col gap-1">
                                    <img src={each.imageUrl} alt="post" className="max-w-[100px] max-h-[100px] bg-zinc-100 rounded-[30px]"/>
                                    <h1 className="text-[10px]">{each.title}</h1>
                                </div>})
                            }
                        </div>} 
                        { goodsPostId && <div 
                            style={{ position:"absolute", left:xy.x - 5 , top:xy.y + 5, opacity: 0.7 }}
                            className="flex items-center justify-center text-white bg-[#507E1F] rounded-[30px] w-5 h-5">
                                +</div>}
                    </div>
                    { goodsBtn.map((each,index) =>  <GoodsBtnComponent key={index} x={each.x} y={each.y} postId={each.postId} />)}
                </div>:
                <div >
                    <label
                    htmlFor="photoInput"
                    className="text-[20px] py-5 px-20 bg-[#F1F2F0] rounded-[50px] hover:bg-[#DBDCDB] transition-all">인테리어 사진 선택</label>
                    <input
                    type="file"
                    id="photoInput"
                    onChange={ uploadFB }
                    className="hidden"/>
                </div>
                }

            </div>
            <div className="mt-[30px] border-b border-b-[#73974C] pb-10">
                { Input3Component('집') }
            </div>

            { UsedComponent('대표 가구 종류', bestFurniture) }
            { UsedComponent('주사용재료', bestSource) }
        </div>
        }
    </div>
}