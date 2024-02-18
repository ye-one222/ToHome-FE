import React, { useEffect, useState } from "react"
import { Menu } from "../../../interface/menu.tsx"
import { houses } from '../../../interface/houses.tsx';
import { recipes } from '../../../interface/recipes.tsx';
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick";

type HouseDetailPageParams = {
    id: string
}

const UsedCategory = (type: string, index: number) => {
    return (
        <div className={`mt-10 ${type==="가구 종류"? 'bg-[#DEF0CA]' : 'bg-[#F8FBF4]'} rounded-[30px] border-b border-b-[#73974C] p-10`}>
            <h1 className="text-[30px] text-[#507E1F]">{type}</h1>
            <div className="flex overflow-x-auto min-h-[40px]">
                {type==="가구 종류"? houses[index].furniture_category.map((each, index) => {
                return (
                    <div key={index} className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{each}</div>
                )
                }) : houses[index].material_category.map((each, index) => {
                    return (
                        <div key={index} className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{each}</div>
                    )
                })} 
            </div>
        </div>
    )
}

const CommentComponent = ( { name, comment } ) => {
    return (
        <div className="flex gap-5 mb-8">
            <div className="flex flex-col items-center w-[100px]">
                <div className="w-[64px] h-[64px] bg-[#8181811a] rounded-[20px]">
                    {/* 사진 자리 - 나중에 이걸로 교체
                    <img src={??뭘로해야할까??} alt="Photo" className="w-[67px] h-[67px] rounded-[20px]" />
                    */}
                </div>
                <p>{name}</p>
            </div>
            <div className="w-2/3 bg-[#6C7E59] text-white text-[16px] rounded-[30px] shadow-md p-5">
                {comment}
            </div>
        </div>
    )
}

export const HouseDetailPage:React.FC = () => {
    const imgUrl = '/img/heart.png';
    const [ IsScrapped, setIsScrapped ] = useState(false);
    const { id } = useParams<HouseDetailPageParams>();
    const index = houses.findIndex(recipe => recipe.post_id.toString() === id);
    const [ isValidComment, setIsValidComment ] = useState(false);
    const [ newComment, setNewComment ] = useState<string>('');
    const [ isGoodsClick, setGoodsClick ] = useState(false);
    const [ goodsIndex, setGoodsIndex ] = useState<number>();
    const [ recipeTitle, setRecipeTitle ] = useState<string>('');
    //url도 있어야함

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    }

    useEffect(() => {
        const invalidComment =
            newComment === ''

        setIsValidComment(!invalidComment)
    }, [newComment])
    
    const postComment = () => {
        //벡이랑 연결 후
    }

    const findRecipe = ( id: number ) => {
        const recipe = recipes.filter(recipe => recipe.post_id===id);
        setRecipeTitle(recipe[0].title);
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="flex flex-col items-center">
            <Menu/>
            <div className="flex-col justify-center mt-4 w-[650px] min-h-[700px] bg-[#ffffffb2] rounded-[52px] p-6">
                <div className="flex items-center justify-center gap-10 relative">
                    <img src={imgUrl} alt="Photo" className="w-[512px] h-[512px] max-w-[512px] max-h-[512px] rounded-[52px]" />
                    {houses[index].relatedRecipes.map((each, index) => {
                        return (
                            <div className="absolute" style={{top: `${each.location.y}px`, left: `${each.location.x}px`}}>
                                <button
                                    key={index}
                                    className="bg-[#85A563] rounded-[30px] text-white text-[18px] w-[24px] h-[24px]"
                                    onMouseEnter={() => {
                                        setGoodsClick(true);
                                        setGoodsIndex(index);
                                        findRecipe(each.post_id);
                                    }}
                                    onMouseLeave={() => {
                                        setGoodsClick(false);
                                    }}
                                >+
                                </button>
                                {isGoodsClick && index===goodsIndex &&
                                <Link to={`/recipe/${each.post_id}`}>
                                    <div 
                                        className="flex bg-white rounded-[30px] text-[#507E1F] p-3"
                                        style={{opacity : 0.8}}
                                        onMouseEnter={() => { setGoodsClick(true) }}
                                        onMouseLeave={() => { setGoodsClick(false) }}
                                        >
                                        {/* 이미지도 넣을까? */}
                                        {recipeTitle}
                                    </div>
                                </Link>}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-2 flex items-center justify-end gap-1">
                    <div className="flex-col">
                        <div className="text-right text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-right text-[17px] text-[#000000b2]">{houses[index].username}</div>
                    </div>
                    <div className="w-[50px] h-[50px] bg-[#8181811a] rounded-[20px]">
                        {/* 사진 자리 - 나중에 이걸로 교체
                        <img src={??뭘로해야할까??} alt="Photo" className="w-[67px] h-[67px] rounded-[20px]" />
                        */}
                    </div>
                    {IsScrapped? 
                    <button onClick={() => { setIsScrapped(false) }}>
                        <img className='w-[50px]' src="/img/heart.png" alt="heart"/>
                    </button> :
                    <button onClick={() => { setIsScrapped(true) }}>
                        <img className='w-[50px]' src="/img/emptyHeart.png" alt="heart"/>
                    </button>}
                    
                </div>

                <div className="flex flex-col p-5">
                    <h1 className="min-h-[45px] text-[40px] font-bold text-[#6C9441] overflow-y-hidden">{houses[index].title}</h1>
                    <hr className="w-full bg-black mt-2 mb-2"/>
                    <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">{houses[index].short_description}</div>
                    <div className="flex bg-[#F8FBF4] rounded-[52px] p-8">
                        <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">{houses[index].content}</div>
                    </div>
                    
                    <hr className="w-full bg-black mt-10 mb-2"/>
                    {UsedCategory('가구 종류',index)}
                    {UsedCategory('사용재료',index)}
                </div>
            </div>

            {/* 댓글 */}
            <div className="flex-col justify-center mt-4 w-[650px] min-h-[400px] bg-[#ffffffb2] rounded-[52px] p-10">
                <p className="text-[30px] text-[#507E1F] ml-2 mb-5">댓글</p>
                <div className="flex gap-3 justify-center mb-8">
                    <textarea
                        required
                        placeholder="댓글을 작성해주세요." 
                        className="p-2 rounded-lg resize-none border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-transparent h-1/2 w-5/6 mb-2"
                        onChange={handleCommentChange}
                    />
                    <button
                        className={`flex items-center justify-center rounded-[4px] text-[16px] p-3 ${isValidComment? 'bg-[#E9F3DE] text-green-700 hover:bg-[#CFEAB2]' : 'bg-gray-100 text-gray-400'}`}
                        disabled={!isValidComment}
                        onClick={postComment}
                    >작성
                    </button>
                </div>
                {houses[index].comments.map((each, index) => {
                    return (
                        <CommentComponent key={index} name={each.name} comment={each.comment}/>
                    )
                })}
            </div>
        </div>
    )
}