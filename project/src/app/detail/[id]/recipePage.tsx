import React, { useEffect, useState } from "react"
import { Menu } from "../../../interface/menu.tsx"
import { useParams } from "react-router-dom"
import Slider from "react-slick";
import { PostData } from "../../../interface/PostData.tsx";
import { CommentData } from "../../../interface/CommentData.tsx";

type RecipDetailPageParams = {
    id: string
}

const UsedCategory = (type: string, category: number|undefined) => {
    return (
        <div className={`mt-10 ${type==="가구 종류"? 'bg-[#DEF0CA]' : 'bg-[#F8FBF4]'} rounded-[30px] border-b border-b-[#73974C] p-10`}>
            <h1 className="text-[30px] text-[#507E1F]">{type}</h1>
            <div className="flex overflow-x-auto min-h-[40px]">
                {type==="가구 종류"? 
                <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{category}</div>
                 : <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">{category}</div>
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
            <div className="w-2/3 bg-[#A6CE79] text-white text-[16px] rounded-[30px] shadow-md p-5">
                {comment}
            </div>
        </div>
    )
}

const Image1 = ( url: string ) => {
    return (
        <div>
            <img src={url} alt="Photo" className="max-w-[512px] max-h-[512px] rounded-[52px]" />
        </div>
    )
}

const Image2 = ( url1: string, url2: string ) => {
    const urls = [ url1, url2 ];
    var index = 0;

    const toPrevImg = () => {
        if(index===0) { }
        else if(index===1) { index=0; }
    }

    const toNextImg = () => {
        if(index===0) { index=1; }
        else if(index===1) { }
    }

    return (
        <div>
            <button onClick={toPrevImg}>left</button>
                <img src={urls[index]} alt="Photo" className="max-w-[512px] max-h-[512px] rounded-[52px]" />
            <button onClick={toNextImg}>right</button>
        </div>
    )
}

const Image3 = ( url1: string, url2: string, url3: string ) => {
    const [ thisUrl, setThisUrl ] = useState<string>('');

    const toPrevImg = () => {
        if(thisUrl===url1) { }
        else if(thisUrl===url2) { setThisUrl(url1); }
        else if(thisUrl===url3) { setThisUrl(url2); }
    }

    const toNextImg = () => {
        if(thisUrl===url1) { setThisUrl(url2); }
        else if(thisUrl===url2) { setThisUrl(url3); }
        else if(thisUrl===url3) { }
    }

    return (
        <div>
            <button onClick={toPrevImg}>left</button>
                <img src={url1} alt="Photo" className="max-w-[512px] max-h-[512px] rounded-[52px]" />
            <button onClick={toNextImg}>right</button>
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


export const RecipeDetailPage:React.FC = () => {
    const [ imgUrls, setImgUrls ] = useState<string[]>([]);
    var imgCnt;
    const [ IsScrapped, setIsScrapped ] = useState(false);
    const { id } = useParams<RecipDetailPageParams>();
    const [ isValidComment, setIsValidComment ] = useState(false);
    const [ newComment, setNewComment ] = useState<string>('');
    const [ thisRecipe, setThisRecipe ] = useState<PostData>();
    const [ thisComments, setThisComments ] = useState<CommentData[]>([]);
    const [ isUpdated, setIsUpdated ] = useState(false);
    const [ isOne, setIsOne ] = useState(false);
    const [ isTwo, setIsTwo ] = useState(false);
    const [ isThree, setIsThree ] = useState(false);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
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
        .then(() => {
            setIsUpdated(true);
            setNewComment('');
        })
    }

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
            if(data.imageUrl) { imgCnt=1; setIsOne(true); setIsTwo(false); setIsThree(false); }
            if(data.imageUrl2) { imgCnt=2; setIsOne(false); setIsTwo(true); setIsThree(false); }
            if(data.imageUrl3) { imgCnt=3; setIsOne(false); setIsTwo(false); setIsThree(true); }
        })
    }, []);

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

            {/* 본문 */}
            <div className="flex-col justify-center mt-4 w-[650px] min-h-[700px] bg-[#ffffffb2] rounded-[52px] p-6">
                <div className="flex items-center justify-center gap-10">
                    {isOne && Image1(thisRecipe?.imageUrl!)}
                    {isTwo && Image2(thisRecipe?.imageUrl!, thisRecipe?.imageUrl2!)}
                    {isThree && Image3(thisRecipe?.imageUrl!, thisRecipe?.imageUrl2!, thisRecipe?.imageUrl3!)}
                </div>

                <div className="mt-2 flex items-center justify-end gap-1">
                    <div className="flex-col">
                        <div className="text-right text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-right text-[17px] text-[#000000b2]">{thisRecipe?.userId}</div>
                    </div>
                    <div className="w-[50px] h-[50px] bg-[#8181811a] rounded-[20px]">
                        {/* 사진 자리 - 나중에 이걸로 교체
                        <img src={thisRecipe.} alt="Photo" className="w-[50px] h-[50px] rounded-[20px]" />
                        */}
                    </div>
                    <ScrapButton postid={id}/>
                    
                </div>

                <div className="flex flex-col p-5">
                    <h1 className="min-h-[45px] text-[40px] font-bold text-[#6C9441] overflow-y-hidden">{thisRecipe?.title}</h1>
                    <hr className="w-full bg-black mt-2 mb-2"/>
                    <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">{thisRecipe?.shortDescription}</div>
                    <div className="flex bg-[#F8FBF4] rounded-[52px] p-8">
                        <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">{thisRecipe?.content}</div>
                    </div>
                    
                    <hr className="w-full bg-black mt-10 mb-2"/>
                    {UsedCategory('가구 종류', thisRecipe?.furnitureCategory)}
                    {UsedCategory('사용재료', thisRecipe?.materialCategory)}
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
                        className={`flex items-center justify-center rounded-[4px] text-[16px] p-3 ${isValidComment? 'bg-[#E9F3DE] text-green-700 hover:bg-[#CFEAB2]': 'bg-gray-100 text-gray-400'}`}
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