import React, { useEffect, useState } from "react"
import Slider from "react-slick";
import { Menu } from "../interface/menu.tsx";
import { ListData } from '../interface/ListData.tsx';
import { topRecipes } from '../interface/topRecipes.tsx';
import { Link } from "react-router-dom";
import { PostData } from "../interface/PostData.tsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.js";

const TopCard = ( {id} ) => {
    //이렇게 받는지, 아이디만 받아서 id.contents 같이 써야하는지 모르겠음
    //title, short_description, content, material_category, username
    /*const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [contents, setContents] = useState('');
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState('');
*/
    const [ thisRecipe, setThisRecipe ] = useState<PostData>();

    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/${id}`, {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            setThisRecipe(data);
            //console.log(1);
        })
    }, [])

    return (
        <div className="flex items-center w-[650px] h-[480px] bg-[#ffffffb2] rounded-[52px] p-5 gap-4">
            <div className="w-[371px] h-[371px] bg-[#8181811a] rounded-[52px]">
                {/* 사진 자리 - 나중에 이걸로 교체
                <img src={imgURl} alt="Photo" className="w-[482px] h-[482px] rounded-[52px]" />
                */}
            </div>
            
            <div className="flex flex-col max-w-[223px] max-h-[460px] gap-4">
                <h1 className="min-h-[45px] text-[30px] text-[#6C9441] overflow-y-hidden">{thisRecipe?.title}</h1>
                <hr className="w-full bg-black"/>
                <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">{thisRecipe?.shortDescription}</div>
                <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">{thisRecipe?.content}</div>
                
                <div className="flex flex-wrap mt-3 gap-2 min-h-[88px] max-h-[80px]">
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{thisRecipe?.materialCategory}</div>
                </div>

                <div className="mt-2 flex items-center gap-1">
                    <div className="w-[57px] h-[57px] bg-[#8181811a] rounded-[20px]">
                        {/* 사진 자리 - 나중에 이걸로 교체
                        <img src={??뭘로해야할까??} alt="Photo" className="w-[67px] h-[67px] rounded-[20px]" />
                        */}
                    </div>
                    <div className="flex-col">
                        <div className="text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-[20px] text-[#000000b2]">{thisRecipe?.userId}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RecipeCard = ({ post_id, title, username }) => {
    const [ thisRecipe, setThisRecipe ] = useState<PostData>()
    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/${post_id}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { 
            if(data){ setThisRecipe(data) }
            else{ alert(data.message) }
        });
    },[])
    
    return (
        <Link to={`/recipe/${post_id}`}>
        <div className="flex flex-col"> 
            <img src={thisRecipe?.imageUrl} alt="Photo" className="w-[230px] h-[230px] rounded-[20px] hover:scale-105 hover:shadow-2xl transition-transform ease-in-out duration-400" />
            <div className="flex whitespace-nowrap justify-between items-end">
                <h1 className="w-[132px] text-[20px] text-left text-black overflow-hidden">{title}</h1>
                <div className="w-[80px] text-[17px] text-right text-[#00000080] overflow-hidden">{username}</div>
            </div>
        </div>
        </Link>
    )
}

interface LikeCnt {
    id: number,
    cnt: number,
}

export const MainPage:React.FC = ()=>{
    const [ recipesData, setRecipesData ] = useState<ListData>();
    const [ allPostId, setAllPostId ] = useState<number[]>([]);
    const [ likesCntList, setLikesCntList ] = useState<LikeCnt[]>([]);
    const [ topRecipesId, setTopRecipesId ] = useState<number[]>([]);

    useEffect(() => {
        fetch("http://tobehome.kro.kr:8080/api/posts?page=1&size=100", {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            setRecipesData(data);
            data.content.map((each, index) => {
                return (
                    setAllPostId((prevAllPostId) => [...prevAllPostId, each.id])
                )
            })
        })

        allPostId.map((each, index) => {
            return (
                fetch(`http://tobehome.kro.kr:8080/api/posts/${each}/likeCount`, {
                    method: 'get',
                    headers: {
                        "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                        "Content-Type":"application/json; charset=utf-8"
                    }
                })
                .then(res => res.text())
                .then(data => {
                    const intValue = parseInt(data);
                    setLikesCntList((prevLikesCntList) => [...prevLikesCntList, {id: each, cnt: intValue}])
                    //console.log(intValue);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })
            )
        })

        const sortedLikesCntList = [...likesCntList].sort((a, b) => b.cnt - a.cnt);
        const top5RecipesId = sortedLikesCntList.slice(0, 5).map(item => item.id);
        console.log(likesCntList);
        setTopRecipesId(top5RecipesId);

        {/*const fetchData = async (url) => {
            try {
                const response = await fetch(url, {
                    method: 'get',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("login-token")}`,
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                });
                const data = await response.text();
                const integerData = parseInt(data, 10); // 문자열을 정수로 변환
                //console.log(integerData);
                return integerData;
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; // 예외를 다시 던져서 호출하는 곳에서 처리할 수 있도록 함
            }
        };
        
        allPostId.map((each, index) => {
            return (
                setUrls((prevUrls) => [...prevUrls, `http://tobehome.kro.kr:8080/api/posts/${each}/likeCount`])
            )
        });
        
        const fetchDataForUrls = async () => {
            try {
                const responses = await Promise.all(urls.map(url => fetchData(url)));
                console.log(responses);
            } catch (error) {
                console.error('Error fetching data for URLs:', error);
            }
        };
        
    fetchDataForUrls();*/}
    }, []);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    return (
    <div className="flex flex-col items-center">
        <Menu/>

        {/* 상단 명예의 전당 */}
        <div className="flex mt-10 items-center gap-2">
            <Slider {...settings} className="MainSliderCSS">
                {/*topRecipes.map((each, index) => {
                    return (
                        <TopCard key={index} {...each}/>
                    )
                })*/}
                {topRecipesId.map((each, index) => {
                    return (
                        <TopCard key={index} id={each}/>
                    )
                })}
            </Slider>
        </div>

        {/* 레시피들 3열 */}
        <div className="mt-10 grid grid-cols-3 gap-3">
            {recipesData?.content.map((each,index) => {
                const reversedIndex = recipesData.content.length - 1 - index;
                const currentPost = recipesData.content[reversedIndex];

                if(currentPost.type==='product'){
                    return (
                        <RecipeCard
                            key={index}
                            post_id={currentPost.id}
                            title={currentPost.title}
                            username={currentPost.userId}
                        />
                    )
                }else {
                    return null;
                }
            })}
        </div>
    </div>
    )
}