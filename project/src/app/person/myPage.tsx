import React, { useState } from "react";
import { Menu } from "../../interface/menu.tsx";
import { MyRecipePage } from "../../interface/myRecipes.tsx";
const myRecipes = [
    {
        title: 'This is Title1',
        content: 'This is contentssssss111',
        liked: 15
    },
    {
        title: 'This is Title2',
        content: 'This is contentssssss222',
        liked: 8
    },
    {
        title: 'This is Title33',
        content: 'This is contentssssss333',
        liked: 9
    },
    {
        title: 'This is Title33',
        content: 'This is contentssssss333',
        liked: 9
    },
    {
        title: 'This is Title33',
        content: 'This is contentssssss333',
        liked: 9
    },
    {
        title: 'This is Title33',
        content: 'This is contentssssss333',
        liked: 9
    },
    {
        title: 'This is Title33',
        content: 'This is contentssssss333',
        liked: 9
    },
    {
        title: 'This is Title33',
        content: 'This is contentssssss333',
        liked: 9
    },
    {
        title: 'This is Title33',
        content: 'This is contentssssss333',
        liked: 9
    },
    
]

const ScrapPage:React.FC = () => {
    return <div>
    <h1 className="text-[#507e1f] text-[30px] font-semibold">Scrap - {myRecipes.length}</h1>
    <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto overflow-x-hidden">
    {myRecipes.map((each) => {
        return (
        <div>{/*<Link to=''> </Link>*/}
            <img className='w-[260px] bg-zinc-100 rounded-[20px]' src="/img/logo.png" alt={each.title}/>
            <div className="max-h-[24px] max-w-[260px] ml-2 flex flex-row">
                <h1 className="overflow-hidden">{each.title}</h1>
                <div className="flex flex-row ml-auto">
                <img className='w-[24px]' src="/img/heart.png" alt="heart"/>
                <h1>{each.liked}</h1>
                </div>
            </div>
        </div>)
    })}
    </div>
</div>
}

const MyPageEDIT:React.FC = () => {
    const myId = 'bowoon1216'; const myName = '정보운'; const myEmail = 'happyanne200212@gmail.com'

    const [ imgFile, setImgFile ] = useState('')
    const [ imgBase64, setImgBase64 ]= useState('')
    const [ IsIdChecked, setIsIdChecked ] = useState(true)
    const [ IsEmailChecked, setIsEmailChecked ] = useState(true)
  
    const handleCheckId = () => {
        //db에 요청 -> 이 아이디 있는지? -> 이걸 form으로 해도됨
        //중복이면
        //alert("아이디가 중복됩니다. 다른 아이디로 시도하세요:]")
        //중복아니면
        alert("저장버튼을 누르면 해당 아이디로 갱신됩니다")
        setIsIdChecked(true)
    }
    const handleCheckEmail = () => {
        //db에 요청 -> Email있는지
        //중복이면
        //alert("이메일이 중복됩니다. 다른 이메일로 시도하세요:]");
        //중복 아니면
        alert("저장버튼을 누르면 해당 이메일로 갱신됩니다")
        setIsEmailChecked(true)
    }
    const handleCancelBtn = () => {
        //모든걸 그대로 , 마이 페이지로 오게끔
        setIsIdChecked(false)
        setIsEmailChecked(false)

    }

    const handleSaveBtn = () => {
        //여기서 새로운 아이디, 이름, 이메일을 서버로 이동
        if(IsEmailChecked&&IsIdChecked){
            //서버로 이동
        }else{
            alert("중복확인을 해주세요")
        }
    }

    const saveImgFile = (event) => {
        //프사 미리보기 -> 외부 사진은 되는데(인터넷) 내컴터는꺼는 안됨...
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;
            if(base64){
                setImgBase64(base64.toString())
            }
        }
        if( event.target.files[0]){
            reader.readAsDataURL(event?.target.files[0])
            setImgFile( event.target.files[0].name )
            
        }
    }


    return <div className="flex flex-col gap-5 max-h-[500px]">
    <div className="flex gap-4 mt-5">
        <img
        src={ imgFile ? `/img/select/${imgFile}`:`/img/logo.png` }
        alt='myProfile' 
        className="w-1/3 max-w-[200px] border border-[#DEF0CA] rounded-md"/>
        <div className="flex flex-col">
            <h1 className="text-[#507e1f]">My Profile Photo</h1>
            <label 
            htmlFor="profilePhoto" 
            className="mt-auto mb-2 h-4 bg-zinc-100 rounded-[20px] hover:font-semibold">
                Select Photo</label>
            <input 
            type="file" 
            id="profilePhoto" 
            onChange={ saveImgFile }
            className="hidden"/>
        </div>
    </div>
    <form className="flex gap-3">
        <input 
        type="text" 
        placeholder={myId} 
        onChange={() => { setIsIdChecked(false) }}
        className="MyPageEditInput"/>
        <button 
        onClick={handleCheckId}  
        disabled={ IsIdChecked } 
        className={ IsIdChecked ? 'CheckSameAfter':'CheckSameBefore'}>
            중복확인</button>
    </form>
    
    <input 
    type="text" 
    placeholder={myName} 
    className="MyPageEditInput"/>
    
    <form className="flex gap-3">
        <input 
        type="text" 
        placeholder={myEmail} 
        onChange={() => { setIsEmailChecked(false) }}
        disabled={ IsEmailChecked } 
        className="MyPageEditInput"/>
        <button 
        onClick={handleCheckEmail} 
        disabled={ IsEmailChecked } 
        className={ IsEmailChecked ? 'CheckSameAfter':'CheckSameBefore'}>
            중복확인</button>
    </form>
    <div className="flex justify-evenly mt-5">
        <button onClick={handleCancelBtn} className="w-1/3 h-[45px] bg-red-100 text-red-400 rounded-2xl border border-red-100 hover:border-red-400 transition-all">취소</button>
        <button onClick={handleSaveBtn} className="w-1/3 bg-[#DEF0CA] text-[#507e1f] rounded-2xl border border-[#DEF0CA] hover:border-[#507e1f] transition-all">저장</button>
    </div>
</div>
}

export const MyPage:React.FC = ()=>{
    const myId = 'bowoon1216'; const myName = '정보운'; const myEmail = 'happyanne200212@gmail.com'
    const [ IsMyRecipe, setIsMyRecipe ] = useState(true)
    const [ IsScrap, setIsScrap ] = useState(false)
    
    
    return <div className=" flex flex-col items-center">

        <Menu />

        <div className="absolute top-[30px] h-[120px] flex gap-3 w-1/3 min-w-[400px] max-w-[604px] p-3 bg-[#F2F8E9] border border-[#A1BB84] rounded-xl">
            <img className='bg-zinc-100 rounded-[20px] w-[85px]' alt="myPage" src="/img/guest.png"/>
            <div className="flex flex-col mt-auto">
                <h1 className="text-[#507e1f] text-[30px]">{myId}</h1>
                <h1 className="text-[#B1C799] text-[15px]">{myName}</h1>
                <h1 className="text-[#B1C799] text-[15px]">{myEmail}</h1>
            </div>
        </div>
        
        <div className="absolute left-[27%] top-[180px] w-1/2 ">

            <div className="flex bg-white rounded-[30px] w-full h-[120px] text-[30px]">
                <button onClick={ () => {setIsMyRecipe(true); setIsScrap(false); } } 
                    className = {`w-1/3 text-[#507e1f] border-r border-r-[#DEF0CA] hover:font-semibold transition-all ${IsMyRecipe ? 'font-semibold':'font-normal'}`}>
                        MY Recipes</button>
                <button onClick={ () => {setIsMyRecipe(false); setIsScrap(true); } } 
                    className={`w-1/3 text-[#507e1f] border-r border-r-[#DEF0CA] hover:font-semibold transition-all ${IsScrap ? 'font-semibold':'font-normal'}`}>
                        Scrap</button>
                <button onClick={ () => {setIsMyRecipe(false); setIsScrap(false); } } 
                    className={`w-1/3 text-[#507e1f] hover:font-semibold transition-all ${!IsMyRecipe && !IsScrap ? 'font-semibold':'font-normal'}`}>
                        My Page EDIT</button>
            </div>

            <div className="absolute top-[120px] border-t border-t-[#DEF0CA] bg-white rounded-[30px] w-full p-5">
                { IsMyRecipe ? 
                    <MyRecipePage userId = ''/>
                    :
                    IsScrap ? 
                        < ScrapPage />
                    : 
                    //My Page EDIT
                    < MyPageEDIT />
                    
                }
            </div>
        </div>

    </div>
}