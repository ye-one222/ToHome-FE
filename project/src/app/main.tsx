import React, {  } from "react"
//import { Link } from "react-router-dom"
import { Menu } from "../interface/menu.tsx";
import { Link } from "react-router-dom";

const TopCard = () => {
    //이렇게 받는지, 아이디만 받아서 id.contents 같이 써야하는지 모르겠음
    /*const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [contents, setContents] = useState('');
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState('');
*/
    //fetch로 GET 요청 -> 각각 저장

    //tag 파싱하는 함수 필요할듯

    return (
        <div className="flex items-center w-[650px] h-[480px] bg-[#ffffffb2] rounded-[52px] p-5 gap-4">
            <div className="w-[371px] h-[371px] bg-[#8181811a] rounded-[52px]">
                {/* 사진 자리 - 나중에 이걸로 교체
                <img src={imgURl} alt="Photo" className="w-[482px] h-[482px] rounded-[52px]" />
                */}
            </div>
            
            <div className="flex flex-col max-w-[223px] max-h-[460px] gap-4">
                <h1 className="min-h-[45px] text-[30px] text-[#6C9441] overflow-y-hidden">title</h1>
                <hr className="w-full bg-black"/>
                <div className="min-h-[60px] text-[20px] whitespace-pre-wrap overflow-y-hidden">이건 내용인데 흘러 넘치면 자동으로 줄바꿈...</div>
                <div className="min-h-[70px] text-[15px] whitespace-pre-wrap overflow-y-hidden">이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 이건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ 건 내용인데 흘러 넘치면 자동으로 줄바꿈...ㅇㄹㄴㅁㅇㄹㅇㄴ  ㅋㅋㅋㅋㅋㅋ</div>
                
                <div className="flex flex-wrap mt-3 gap-2 min-h-[88px] max-h-[80px]">
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                    <div className="w-[75px] h-[40px] bg-[#6c9441] text-[13px] text-center text-white rounded-[30px] p-2">플라스틱</div>
                </div>

                <div className="mt-2 flex items-center gap-1">
                    <div className="w-[57px] h-[57px] bg-[#8181811a] rounded-[20px]">
                        {/* 사진 자리 - 나중에 이걸로 교체
                        <img src={??뭘로해야할까??} alt="Photo" className="w-[67px] h-[67px] rounded-[20px]" />
                        */}
                    </div>
                    <div className="flex-col">
                        <div className="text-[13px] text-[#000000b2]">made by</div>
                        <div className="text-[20px] text-[#000000b2]">username</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const RecipeCard = ({ post_id, title, username }) => {
    /*const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
*/
    //fetch로 GET 요청 -> 각각 저장
    const topRecipes = [
        {   
            post_id: 1,
            title: 'BEST RECIPE1',
            username: 'User1'
        },
        {
            post_id: 2,
            title: 'BEST RECIPE2',
            username: 'User2'
        },
        {
            post_id: 3,
            title: 'BEST RECIPE3',
            username: 'User3'
        },
        {
            post_id: 4,
            title: 'BEST RECIPE4',
            username: 'User4'
        },
        {
            post_id: 5,
            title: 'BEST RECIPE5',
            username: 'User5'
        },
    ]

    return (
        <Link to='/recipe/1'>
        <div className="flex flex-col">
            <div className="w-[230px] h-[230px] bg-[#f1f2f0] rounded-[20px] hover:scale-105 hover:shadow-2xl transition-transform ease-in-out duration-400">
                {/* 사진 자리 - 나중에 이걸로 교체
                <img src={imgUrl} alt="Photo" className="w-[245px] h-[245px] rounded-[20px]" />
                */}
            </div>
            <div className="flex justify-between items-end">
                <h1 className="w-[132px] text-[22px] text-black overflow-hidden">{title}</h1>
                <div className="w-[80px] text-[18px] text-[#00000080] overflow-hidden">{username}</div>
            </div>
        </div>
        </Link>
    )
}

export const MainPage:React.FC = ()=>{
    const leftBtnUrl = '/img/leftBtn.png';
    const rightBtnUrl = '/img/rightBtn.png';
    const recipes = [
        {   
            post_id: 1,
            title: 'Title1',
            username: 'User1'
        },
        {
            post_id: 2,
            title: 'Title2',
            username: 'User2'
        },
        {
            post_id: 3,
            title: 'Title3',
            username: 'User3'
        },
        {
            post_id: 4,
            title: 'Title4',
            username: 'User4'
        },
        {
            post_id: 5,
            title: 'Title5',
            username: 'User5'
        },
    ]

    return (
    <div className="flex flex-col items-center">
        <Menu/>

        {/* 상단 명예의 전당 */}
        <div className="flex mt-10 items-center gap-2">
            <button className="h-[42px]">
                <img src={leftBtnUrl} alt="leftBtn" />
            </button>
            <TopCard />
            <button className="h-[42px]">
                <img src={rightBtnUrl} alt="rightBtn" />
            </button>
        </div>

        {/* 레시피들 3열 */}
        <div className="mt-5 grid grid-cols-3 gap-3">
            {recipes.map((each, index) => {
                return (
                    <RecipeCard key={index} {...each}/>
                )
            })}
        </div>
    </div>
    )
}