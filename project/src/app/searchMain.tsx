import React, { useEffect, useState } from "react"
import { Menu } from "../interface/menu.tsx";
import { Link } from "react-router-dom";
import { ListData } from "../interface/ListData.tsx";
import { UserData } from "../interface/UserData.tsx";

const RecipeCard = ({ post_id, title, username, imgurl }) => {
    const [ userInfo, setUserInfo ] = useState<UserData>();
    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/${username}`, {
            method: 'get',
        })
        .then(res => {return res.json()})
        .then(data => {
            setUserInfo(data);
        })
})
    return (
        <Link to={`/recipe/${post_id}`}>
        <div className="flex flex-col">
            <img src={imgurl} alt="imgurl" className="w-[230px] h-[230px] rounded-[20px] hover:scale-105 hover:shadow-2xl transition-transform ease-in-out duration-400" />
            <div className="flex justify-between items-end">
                <h1 className="w-[132px] text-[22px] text-left text-black overflow-hidden h-[30px]">{title}</h1>
                <div className="w-[80px] text-[18px] text-right text-[#00000080] overflow-hidden">{userInfo?.nickname}</div>
            </div>
        </div>
        </Link>
    )
}

export const SearchMainPage:React.FC = ()=>{
    const [ selectedTags, setSelectedTags ] = useState([]);
    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ searchInput, setSearchInput ] = useState<string>('');
    const [ searchResult, setSearchResult ] = useState<string>('');
    const [ isSearchBtnClick, setSearchBtnClick ] = useState(false);

    const [ materialList, setMaterialList ] = useState([]);
    const [ Recipes, setRecipes ] = useState<ListData>();
    const [ allPostId, setAllPostId ] = useState<number[]>([]);

    useEffect(() => {
        //재료 카테고리 목록 조회
        fetch('http://tobehome.kro.kr:8080/api/categories/material', {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((res) => res.json())
        .then((data) => { setMaterialList(data); console.log(data) });

        fetch("http://tobehome.kro.kr:8080/api/posts?page=1&size=100", {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            setRecipes(data);
            console.log(data);
            data.content.map((each, index) => {
                if(each.type === "product"){
                    return (
                        setAllPostId((prevAllPostId) => [...prevAllPostId, each.id])
                    )
                }
            })
            
        })
    }, [])


    const isInclude = ( tag: number, selectedTagArr: number[] ): boolean => {
        if(selectedTagArr.includes(tag)) {
            return true;
        }
        return false;
    }

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const findTag = () => {
        setSearchBtnClick(true);
        const tag = materialList.filter(tag => tag.name===searchInput);
        if(tag.length === 0) {
            setSearchResult('재료 목록에 존재하지 않습니다.');
        }else {
            setSearchResult(tag[0].name);
        }
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
                        const matchingTag = materialList.find(tag => tag.id === each);
                        const tagName = matchingTag? matchingTag.name : '';

                        return (
                            <div key={index} className="relative w-[95px] max-w-[95px] bg-[#507E1F] p-2 pr-3 rounded-[15px] whitespace-nowrap text-white text-center text-[16px]">
                                {tagName}
                                <button
                                    className="absolute right-1 text-red-200 hover:text-red-300 pr-1"
                                    onClick={() => { setSelectedTags((prevSelectedTags) => { return prevSelectedTags.filter(atag => atag !== matchingTag?.id)}) }}
                                >x</button>
                            </div>
                        )
                    })}
                </div>
                
                <hr className="mt-3 w-full border-solid border-gray-300"/>

                <div className="flex flex-row mt-3 gap-2">
                    <input
                        placeholder="재료를 검색해 보세요."
                        className="SearchInputCSS px-2 py-1 rounded-[8px] text-[15px]"
                        value={searchInput}
                        onChange={handleSearchInput}
                    />
                    <button onClick={findTag} className="text-lime-100 bg-lime-500 hover:bg-lime-600 px-3 py-1 text-[15px] rounded-[8px]">검색</button>
                    <button onClick={handleReset} className="text-gray-700 bg-gray-300 hover:bg-gray-400 px-2 py-1 text-[15px] rounded-[8px]">초기화</button>
                </div>

                {!isSearchBtnClick? <div className="mt-4 mb-2 grid grid-cols-3 items-center gap-3">
                    {materialList.map((tag, index) => {
                        return(
                            <div key={index} className="flex text-[#507E1F]">
                                <button
                                    className="w-[90px] max-w-[90px] bg-[#a0d4684c] border border-transparent hover:border-[#507E1F] p-2 rounded-[15px] text-[15px]"
                                    onClick={() => {
                                        setSelectedTags((prevSelectedTags) => {
                                            if (prevSelectedTags.includes(tag.id)) {
                                                return prevSelectedTags;
                                            } else {
                                                return [...prevSelectedTags, tag.id];
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
                </div> : <div className="mt-4 items-center justify-center text-[#507E1F]">
                    {searchResult === '재료 목록에 존재하지 않습니다.'? searchResult :
                    <button
                        className="w-[90px] max-w-[90px] bg-[#a0d4684c] border border-transparent hover:border-[#507E1F] p-2 rounded-[15px] text-[15px]"
                        onClick={() => {
                            const matchingTag = materialList.find(tag => tag.name === searchResult);
                            const tagCategory = matchingTag?.id;
                            setSelectedTags((prevSelectedTags) => {
                                if (prevSelectedTags.includes(tagCategory!)) {
                                    return prevSelectedTags;
                                } else {
                                    return [...prevSelectedTags, tagCategory!];
                                }
                            });
                            setIsUpdated(true);
                        }}
                    >
                        {searchResult}
                    </button>}
                </div>}
            </div>
        </div>

        {/* 레시피들 3열 */}
        {isUpdated? <div className="mt-5 grid grid-cols-3 gap-3">
            {Recipes?.content.map((each, index) => {
                if(isInclude(each.materialCategory, selectedTags)){
                    return (
                        <RecipeCard key={each.id} post_id={each.id} title={each.title} username={each.userId} imgurl={each.imageUrl}/>
                    )
                }
            })}
        </div> 
        : <div className="mt-10 text-[16px] text-[#507E1F]">버튼을 누르면 선택한 재료가 사용된 레시피가 나타납니다.</div>}
    </div>
    )
}