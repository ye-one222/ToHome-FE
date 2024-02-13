import React, { useState } from "react"
//import { Link } from "react-router-dom"
import { Menu } from "../interface/menu.tsx";

const FilterCard = () => {
    const tags = ['플라스틱', '스티로폼', '캔', '비닐', '종이']; //나중에 더 추가
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
        <div className="grid grid-cols-2 items-center w-[650px] h-[200px] bg-[#a0d4684c] rounded-[78px] p-6">
            {tags.map((tag, index) => {
                return(
                    <div key={index} className="flex gap-1 text-[#507E1F]">
                        <input
                        type="checkbox"
                        className="w-5 h-5 accent-gray-50"
                        onChange={({target: {checked}})=> {
                            if(checked){
                                setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
                            }else{
                                setSelectedTags((prevSelectedTags) =>
                                    prevSelectedTags.filter(atag => atag !== tag)
                                );
                            }
                        }}
                        />
                        {tag}
                    </div>
                )
            })}
        </div>
    )
}

const RecipeCard = () => {
    /*const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
*/
    //fetch로 GET 요청 -> 각각 저장

    return (
        <div className="flex flex-col">
            <div className="w-[230px] h-[230px] bg-[#f1f2f0] rounded-[20px]">
                {/* 사진 자리 - 나중에 이걸로 교체
                <img src={imgUrl} alt="Photo" className="w-[245px] h-[245px] rounded-[20px]" />
                */}
            </div>
            <div className="flex justify-between items-end">
                <h1 className="w-[132px] text-[22px] text-black overflow-hidden">title</h1>
                <div className="w-[80px] text-[18px] text-[#00000080] overflow-hidden">username</div>
            </div>
        </div>
    )
}

export const SearchMainPage:React.FC = ()=>{
    return (
    <div className="flex flex-col items-center">
        <Menu/>

        {/* 상단 필터 박스 */}
        <div className="flex flex-col mt-10 items-center gap-2">
            <p className="text-[#507E1F] text-[15px]">레시피에 사용될 재료를 선택하세요.</p>
            <FilterCard />
        </div>

        {/* 레시피들 3열 */}
        <div className="mt-5 grid grid-cols-3 gap-3">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
        </div>
    </div>
    )
}