import React, { useState } from "react"
import { recipes } from '../interface/recipes.tsx';
import { Menu } from "../interface/menu.tsx";
import { Link } from "react-router-dom";

const RecipeCard = ({ post_id, title, username }) => {
    /*const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
*/
    //fetch로 GET 요청 -> 각각 저장

    return (
        <Link to={`/recipe/${post_id}`}>
        <div className="flex flex-col">
            <div className="w-[230px] h-[230px] bg-[#f1f2f0] rounded-[20px] hover:scale-105 hover:shadow-2xl transition-transform ease-in-out duration-400">
                {/* 사진 자리 - 나중에 이걸로 교체
                <img src={imgUrl} alt="Photo" className="w-[245px] h-[245px] rounded-[20px]" />
                */}
            </div>
            <div className="flex justify-between items-end">
                <h1 className="w-[132px] text-[22px] text-left text-black overflow-hidden">{title}</h1>
                <div className="w-[80px] text-[18px] text-right text-[#00000080] overflow-hidden">{username}</div>
            </div>
        </div>
        </Link>
    )
}

export const SearchMainPage:React.FC = ()=>{
    const [ selectedTags, setSelectedTags ] = useState<number[]>([]);
    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ searchInput, setSearchInput ] = useState<string>('');
    const [ isSearchBtnClick, setSearchBtnClick ] = useState(false);
    const tags = [ //순서는 일단 임의로 정함
        {
            category: 1,
            name: '플라스틱'
        },
        {
            category: 2,
            name: '비닐'
        },
        {
            category: 3,
            name: '종이'
        },
        {
            category: 4,
            name: '유리'
        },
        {
            category: 5,
            name: '스티로폼'
        },
        {
            category: 6,
            name: '캔'
        },
    ]

    const isInclude = ( tagArr: number[], selectedTagArr: number[] ): boolean => {
        for(const tag of tagArr){
            if(selectedTagArr.includes(tag)) {
                return true;
            }
        }
        return false;
    }

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const findTag = () => {
        setSearchBtnClick(true);
        const tag = tags.filter(tag => tag.name===searchInput);

    }

    const handleReset = () => {
        setSearchBtnClick(false);
        setSearchInput('');
    }

    return (
    <div className="flex flex-col items-center">
        <Menu/>

        {/* 상단 필터 박스 */}
        <div className="flex flex-col mt-10 items-center gap-2">
            <div className="flex flex-col items-center w-[650px] bg-[#E9F3DE] rounded-[78px] px-8 py-4">
                <p className="text-[#507E1F] text-[13px]">레시피에 사용될 재료를 선택하세요.</p>

                <div className="flex flex-row gap-2">
                    <input
                        placeholder="재료를 검색해 보세요."
                        className="text-[15px]"
                        value={searchInput}
                        onChange={handleSearchInput}
                    />
                    <button onClick={findTag} className="bg-red-200 px-2 py-1 text-[15px]">검색</button>
                    <button onClick={handleReset} className="bg-red-200 px-2 py-1 text-[15px]">초기화</button>
                </div>

                {!isSearchBtnClick? <div className="mt-4 mb-2 grid grid-cols-3 items-center gap-5">
                    {tags.map((tag, index) => {
                        return(
                            <div key={index} className="flex gap-1 text-[#507E1F]">
                                <input
                                type="checkbox"
                                className="w-5 h-5 accent-gray-50"
                                onChange={({target: {checked}})=> {
                                    if (checked) {
                                        setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag.category]);
                                    } else {
                                        setSelectedTags((prevSelectedTags) =>
                                            prevSelectedTags.filter(atag => atag !== tag.category)
                                        );
                                    }
                                    setIsUpdated(true);
                                }}
                                />
                                {tag.name}
                            </div>
                        )
                    })}
                </div> : <div className="mt-4 items-center justify-center">
                    dfsf
                    {/* 입력한 재료와 똑같은 게 존재하면 그 체크박스 띄워주고 없으면 없다고 표시, 처음에 몇개만 보여주고 ...누르면 전체 보기
                        검색했다가 돌아오면 체크가 해제되네,,,,, 배열 새로 만들어서 저장해야 할 듯*/}
                    </div>}
            </div>
        </div>

        {/* 레시피들 3열 */}
        {isUpdated? <div className="mt-5 grid grid-cols-3 gap-3">
            {recipes.map((each, index) => {
                if(isInclude(each.material_category, selectedTags)){
                    return (
                        <RecipeCard key={each.post_id} {...each}/>
                    )
                }
            })}
        </div> 
        : <div className="mt-10 text-[16px] text-[#507E1F]">버튼을 누르면 선택한 재료가 사용된 레시피가 나타납니다.</div>}
    </div>
    )
}