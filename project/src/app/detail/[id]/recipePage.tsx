import React, { useState } from "react"
import { Menu } from "../../../interface/menu.tsx"
import { recipes } from '../../../interface/recipes.tsx';
import { useParams } from "react-router-dom"
import Slider from "react-slick";

type RecipDetailPageParams = {
    id: string
}

const UsedCategory = (type: string, index: number) => {
    return (
        <div className={`mt-10 ${type==="가구 종류"? 'bg-[#DEF0CA]' : 'bg-[#F8FBF4]'} rounded-[30px] border-b border-b-[#73974C] p-10`}>
            <h1 className="text-[30px] text-[#507E1F]">{type}</h1>
            <div className="flex overflow-x-auto min-h-[40px]">
                {type==="가구 종류"? recipes[index].furniture_category.map((each, index) => {
                return (
                    <div key={index} className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{each}</div>
                )
                }) : recipes[index].material_category.map((each, index) => {
                    return (
                        <div key={index} className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{each}</div>
                    )
                })} 
            </div>
        </div>
    )
}

export const RecipeDetailPage:React.FC = () => {
    const imgUrl = ['/img/logo.png', '/img/hand.png']
    const [ IsScrapped, setIsScrapped ] = useState(false);
    const { id } = useParams<RecipDetailPageParams>();
    const index = recipes.findIndex(recipe => recipe.post_id.toString() === id);

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
                <div className="flex items-center justify-center gap-10">
                    <Slider {...settings} className="DetailSliderCSS">
                        {imgUrl.map((url, index) => {
                            return (
                                <img key={index} src={url} alt="Photo" className="max-w-[512px] max-h-[512px] rounded-[52px]" />
                            )
                        })}
                    </Slider>
                </div>

                <div className="mt-2 flex items-center justify-end gap-1">
                    <div className="flex-col">
                        <div className="text-right text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-right text-[17px] text-[#000000b2]">{recipes[index].username}</div>
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
                    <h1 className="min-h-[45px] text-[40px] font-bold text-[#6C9441] overflow-y-hidden">{recipes[index].title}</h1>
                    <hr className="w-full bg-black mt-2 mb-2"/>
                    <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">{recipes[index].short_description}</div>
                    <div className="flex bg-[#F8FBF4] rounded-[52px] p-8">
                        <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">{recipes[index].content}</div>
                    </div>
                    
                    <hr className="w-full bg-black mt-10 mb-2"/>
                    {UsedCategory('가구 종류', index)}
                    {UsedCategory('사용재료', index)}
                </div>
            </div>
        </div>
    )
}