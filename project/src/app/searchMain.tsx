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
            <div className="flex flex-col items-center w-[650px] h-[264px] max-h-[264px] bg-[#E9F3DE] rounded-[78px] px-8 py-4">
                <p className="text-[#507E1F] text-[13px]">레시피에 사용될 재료를 선택하세요.</p>

                {/* 선택된 재료들 표시 */}
                <div className="flex flex-row mt-1 gap-1">
                    {selectedTags.length === 0 ? <div className="w-[95px] max-w-[95px] p-2 rounded-[15px] whitespace-nowrap text-[#E9F3DE] text-[16px]">EasterEgg^^</div>
                    : selectedTags.map((each, index) => {
                        const matchingTag = tags.find(tag => tag.category === each);
                        const tagName = matchingTag? matchingTag.name : '';

                        return (
                            <div key={index} className="relative w-[95px] max-w-[95px] bg-[#507E1F] p-2 rounded-[15px] whitespace-nowrap text-white text-center text-[16px]">
                                {tagName}
                                <button
                                    className="absolute right-1 text-red-200 hover:text-red-300"
                                    onClick={() => { setSelectedTags((prevSelectedTags) => { return prevSelectedTags.filter(atag => atag !== matchingTag?.category)}) }}
                                >X</button>
                            </div>
                        )
                    })}
                </div>
                
                <hr className="mt-3 w-full border-solid border-gray-300"/>

                <div className="flex flex-row mt-3 gap-2">
                    <input
                        placeholder="재료를 검색해 보세요."
                        className="text-[15px]"
                        value={searchInput}
                        onChange={handleSearchInput}
                    />
                    <button onClick={findTag} className="bg-red-200 px-2 py-1 text-[15px]">검색</button>
                    <button onClick={handleReset} className="bg-red-200 px-2 py-1 text-[15px]">초기화</button>
                </div>

                {!isSearchBtnClick? <div className="mt-4 mb-2 grid grid-cols-3 items-center gap-3">
                    {tags.map((tag, index) => {
                        return(
                            <div key={index} className="flex text-[#507E1F]">
                                <button
                                    className="w-[90px] max-w-[90px] bg-[#a0d4684c] p-2 rounded-[15px] text-[15px]"
                                    onClick={() => {
                                        setSelectedTags((prevSelectedTags) => {
                                            if (prevSelectedTags.includes(tag.category)) {
                                                return prevSelectedTags;
                                            } else {
                                                return [...prevSelectedTags, tag.category];
                                            }
                                        });
                                        setIsUpdated(true);
                                    }}
                                >
                                    {tag.name}
                                </button>
                            </div>
                        )
                    })}
                </div> : <div className="mt-4 items-center justify-center">
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