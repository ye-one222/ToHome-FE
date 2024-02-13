import React, { useState } from "react"
import { Menu } from "../../../interface/menu.tsx"

type RecipDetailPageParams = {
    id: string
}

export const RecipeDetailPage:React.FC = () => {
    const leftBtnUrl = '/img/leftBtn.png';
    const rightBtnUrl = '/img/rightBtn.png';
    const [ IsScrapped, setIsScrapped ] = useState(false);

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
                        <div className="text-right text-[17px] text-[#000000b2]">username</div>
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
                    <div className="flex text-[18px]">사용재료</div>
                    <div className="flex flex-wrap mt-3 gap-2 min-h-[88px] max-h-[80px]">
                        <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                        <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                        <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                        <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                    </div>
                </div>
            </div>
        </div>
    )
}