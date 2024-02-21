import React, { useEffect, useState } from "react"
import { Menu } from "../../../interface/menu.tsx"
import { Link, useParams } from "react-router-dom"
import { PostData } from "../../../interface/PostData.tsx";
import { CommentData } from "../../../interface/CommentData.tsx";
import { UserData } from "../../../interface/UserData.tsx";

type HouseDetailPageParams = {
    id: string
}

const UsedCategory = (type: string, category: number|undefined) => {
    const [ allSource, setAllSource ] = useState<{id:Number, name:string}[]>([])
    const [ allFurniture, setAllFurniture ] = useState<{id:Number, name:string}[]>([])

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
        .then((data) => { setAllSource(data) });
        //가구 카테고리 목록 전체 조회
        fetch('http://tobehome.kro.kr:8080/api/categories/furniture', {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { setAllFurniture(data) });
    })

    const mySource = allSource.find((each) => each.id === category)
    const myFurniture = allFurniture.find((each) => each.id === category)

    return (
        <div className={`mt-10 ${type==="가구 종류"? 'bg-[#DEF0CA]' : 'bg-[#F8FBF4]'} rounded-[30px] border-b border-b-[#73974C] p-10`}>
            <h1 className="text-[30px] text-[#507E1F]">{type}</h1>
            <div className="flex overflow-x-auto min-h-[40px]">
                {type==="가구 종류"? 
                <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{myFurniture?.name}</div>
                 : <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{mySource?.name}</div>
                }
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

interface ScrapButtonProps {
    postid: number;
}

const ScrapButton: React.FC<ScrapButtonProps> = ( { postid } ) => {
    const [iLikes, setILikes] = useState<PostData[]>([]);
    const [isScrapped, setIsScrapped] = useState(false); // 스크랩 여부 상태 추가

    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/likedByUser/${localStorage.getItem("user-id")}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setILikes(data);
                    setIsScrapped(data.some(n => n.id-postid===0));
                } else {
                    /*alert(data.message)*/
                }
            });
    }, [])

    // 스크랩 상태를 변경하는 함수
    const toggleScrapped = () => {
        setIsScrapped(prevScrapped => !prevScrapped);

        fetch(`http://tobehome.kro.kr:8080/api/posts/${postid}/likes`, {
            method: 'POST',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8; int",
                "user_id":localStorage.getItem("user-id")!,
            }
        })
        .catch(error => {
            console.error('Failed to like post:', error);
        });
    };

    return (
        <div>
            {isScrapped? 
            <button onClick={toggleScrapped}>
                <img className='w-[50px]' src="/img/heart.png" alt="heart"/>
            </button> :
            <button onClick={toggleScrapped}>
                <img className='w-[50px]' src="/img/emptyHeart.png" alt="heart"/>
            </button>}
        </div>
    );
};

interface ImagesProps {
    postid: number;
}

const Images: React.FC<ImagesProps> = ( { postid } ) => {
    const [imgCnt,setImgCnt] = useState(0);
    const [url1,setUrl1] = useState('');

    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/${postid}`, {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            if(data.imageUrl) { setUrl1(data.imageUrl) }
        })
    }, []);

    return (
        <div className="flex gap-7 text-[50px] text-[#6C9441]">
            <img src={url1} alt="Photo" className="max-w-[512px] max-h-[512px] rounded-[52px]" />
        </div>
    )
}

interface TitleProps {
    pid: number;
}

const Title: React.FC<TitleProps> = ( { pid } ) => {
    const [ thisTitle, setThisTitle ] = useState('');

    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/${pid}`, {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            setThisTitle(data.title);
            console.log(data.title)
        })
    }, [])

    return (
        <div>{thisTitle}</div>
    )
}

interface RelRecipe {
    p: any;
    x: any;
    y: any;
}

export const HouseDetailPage:React.FC = () => {
    const { id } = useParams<HouseDetailPageParams>();
    const [ isValidComment, setIsValidComment ] = useState(false);
    const [ newComment, setNewComment ] = useState<string>('');
    const [ isGoodsClick, setGoodsClick ] = useState(false);
    const [ goodsIndex, setGoodsIndex ] = useState<number>();
    const [ thisHouse, setThisHouse ] = useState<PostData>();
    const [ thisComments, setThisComments ] = useState<CommentData[]>([]);
    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ relRecipes, setRelRecipes ] = useState<RelRecipe[]>([]);
    const [ userInfo, setUserInfo ] = useState<UserData>();

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
        setIsUpdated(false);
    }

    useEffect(() => {
        const invalidComment =
            newComment === ''

        setIsValidComment(!invalidComment)
    }, [newComment])
    
    const postComment = () => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/${id}/comments`, {
            method: 'post',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8; int",
                "user_id":localStorage.getItem("user-id")!,
            },
            body: JSON.stringify({
                content: newComment
            })
        })
        setIsUpdated(true);
        setNewComment('');
    }

    useEffect(() => {
        fetch(`http://tobehome.kro.kr:8080/api/posts/${id}/comments`, {
            method: 'get',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8"
            }
        })
        .then(res => {return res.json()})
        .then(data => {
            setThisComments(data);
            setIsUpdated(false);
        })
    }, [isUpdated]);

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
            setThisHouse(data);
            setRelRecipes(data.rel);
            fetch(`http://tobehome.kro.kr:8080/${data.userId}`, {
                method: 'get',
            })
            .then(res => {return res.json()})
            .then(data => {
                setUserInfo(data);
            })
        })
    }, []);

    return (
        <div className="flex flex-col items-center">
            <Menu/>
            <div className="flex-col justify-center mt-4 w-[650px] min-h-[700px] bg-[#ffffffb2] rounded-[52px] p-6">
                <div className="flex items-center justify-center gap-10 relative">
                    <Images postid={id}/>

                    {relRecipes.map((each, index) => {
                        return (
                            <div className="absolute" style={{top: `${each.y}px`, left: `${each.x}px`}}>
                                <button
                                    key={index}
                                    className="bg-[#85A563] rounded-[30px] text-white text-[18px] w-[24px] h-[24px]"
                                    onMouseEnter={() => {
                                        setGoodsClick(true);
                                        setGoodsIndex(index);
                                    }}
                                    onMouseLeave={() => {
                                        setGoodsClick(false);
                                    }}
                                >+
                                </button>
                                {isGoodsClick && index===goodsIndex &&
                                <Link to={`/recipe/${each.p}`}>
                                    <div 
                                        className="flex bg-white rounded-[30px] text-[#507E1F] p-3"
                                        style={{opacity : 0.8}}
                                        onMouseEnter={() => { setGoodsClick(true) }}
                                        onMouseLeave={() => { setGoodsClick(false) }}
                                        >
                                        <Title pid={each.p}/>
                                    </div>
                                </Link>}
                            </div>
                        )
                    })}
                </div>

                <div className="mt-2 flex items-center justify-end gap-1">
                    <div className="flex-col">
                        <div className="text-right text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-right text-[17px] text-[#000000b2]">{userInfo?.nickname}</div>
                    </div>
                    <Link to={`/guest/${userInfo?.id}`}>
                        <img src={userInfo?.imageUrl} alt="Photo" className="w-[50px] h-[50px] rounded-[20px]" />
                    </Link>
                    <ScrapButton postid={id}/>
                    
                </div>

                <div className="flex flex-col p-5">
                    <h1 className="min-h-[45px] text-[40px] font-bold text-[#6C9441] overflow-y-hidden">{thisHouse?.title}</h1>
                    <hr className="w-full bg-black mt-2 mb-2"/>
                    <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">{thisHouse?.shortDescription}</div>
                    <div className="flex bg-[#F8FBF4] rounded-[52px] p-8">
                        <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">{thisHouse?.content}</div>
                    </div>
                    
                    <hr className="w-full bg-black mt-10 mb-2"/>
                    {UsedCategory('가구 종류',thisHouse?.furnitureCategory)}
                    {UsedCategory('사용재료',thisHouse?.materialCategory)}
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
                        value={newComment}
                    />
                    <button
                        className={`flex items-center justify-center rounded-[4px] text-[16px] p-3 ${isValidComment? 'bg-[#E9F3DE] text-green-700 hover:bg-[#CFEAB2]' : 'bg-gray-100 text-gray-400'}`}
                        disabled={!isValidComment}
                        onClick={postComment}
                    >작성
                    </button>
                </div>
                {thisComments.map((each, index) => {
                    return (
                        <CommentComponent key={each.id} name={each.userId} comment={each.content}/>
                    )
                })}
            </div>
        </div>
    )
}