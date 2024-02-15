import React, { useState } from "react"
import { Menu } from "../../../interface/menu.tsx"
import { useParams } from "react-router-dom"

type RecipDetailPageParams = {
    id: string
}

const recipe = [ //임시
    {   
        post_id: 1,
        title: 'BEST RECIPE1',
        short_description: '이건 요약 내용인데 흘러 넘치면 자동으로 줄바꿈...',
        content: '이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ',
        furniture_category: [1],
        material_category: [1,2,3],
        username: 'User1'
    }
]

const UsedCategory = (type: string) => {
    return (
        <div className={`mt-10 ${type==="가구 종류"? 'bg-[#DEF0CA]' : 'bg-[#F8FBF4]'} rounded-[30px] border-b border-b-[#73974C] p-10`}>
            <h1 className="text-[30px] text-[#507E1F]">{type}</h1>
            <div className="flex overflow-x-auto min-h-[40px]">
                {type==="가구 종류"? recipe[0].furniture_category.map((each, index) => {
                return (
                    <div key={index} className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{each}</div>
                )
                }) : recipe[0].material_category.map((each, index) => {
                    return (
                        <div key={index} className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{each}</div>
                    )
                })} 
            </div>
        </div>
    )
}

export const RecipeDetailPage:React.FC = () => {
    const leftBtnUrl = '/img/leftBtn.png';
    const rightBtnUrl = '/img/rightBtn.png';
    const [ IsScrapped, setIsScrapped ] = useState(false);
    const { id } = useParams<RecipDetailPageParams>();

    return (
        <div className="flex flex-col items-center">
            <Menu/>
            <div className="flex-col justify-center mt-4 w-[650px] min-h-[700px] bg-[#ffffffb2] rounded-[52px] p-6">
                <div className="flex items-center justify-center gap-10">
                    <button className="h-[42px]">
                        <img src={leftBtnUrl} alt="leftBtn" />
                    </button>
                    <div className="w-[400px] h-[400px] bg-[#8181811a] rounded-[52px]">
                        {/* 사진 자리 - 나중에 이걸로 교체
                        <img src={imgURl} alt="Photo" className="w-[482px] h-[482px] rounded-[52px]" />
                        */}
                    </div>
                    
                    <button className="h-[42px]">
                        <img src={rightBtnUrl} alt="rightBtn" />
                    </button>
                </div>

                <div className="mt-2 flex items-center justify-end gap-1">
                    <div className="flex-col">
                        <div className="text-right text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-right text-[17px] text-[#000000b2]">{id}</div>
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
                    <h1 className="min-h-[45px] text-[40px] font-bold text-[#6C9441] overflow-y-hidden">title</h1>
                    <hr className="w-full bg-black mt-2 mb-2"/>
                    <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">이건 내용인데 흘러 넘치면 자동으로 줄바꿈...</div>
                    <div className="flex bg-[#F8FBF4] rounded-[52px] p-8">
                        <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ </div>
                    </div>
                    
                    <hr className="w-full bg-black mt-10 mb-2"/>
                    {UsedCategory('가구 종류')}
                    {UsedCategory('사용재료')}
                </div>
            </div>
        </div>
    )
}