import React, { useState } from "react"
import { Menu } from "../interface/menu.tsx"

export const PostPage:React.FC = () => {
    const [ IsRecipe, setIsRecipe ] = useState(false);
    const [ IsHouse, setIsHouse ] = useState(false);
    const [ photosSrc, setPhotosSrc ] = useState<string[]>([])
    const [ imgBase64, setImgBase64 ] = useState('')
    const [ sourceAry, setSourceAry ] = useState<string[]>([])
    const [ addSourceInput, setAddSourceInput ] = useState<string>('')
    const bestSource = ['플라스틱','유리','나무']

    const LocatePhotos = (photosrc) => {
        return <div >
            <img src={`/img/select/${photosrc}`} alt="photos" className="flex items-center justify-center w-[128px] h-[128px] text-[30px] bg-[#F1F2F0] rounded-[50px]"/>
        </div>
    }

    const SaveImage = (event) => {
        //여기서 받은 사진 주소를 photosSrc에 푸시
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result;
            if(base64){
                setImgBase64(base64.toString())
            }
        }
        if( event.target.files[0]){
            reader.readAsDataURL(event?.target.files[0])
            setPhotosSrc( [...photosSrc, event.target.files[0].name ] )
            console.log(event.target.files[0].name )
            
        }
    }

    
    return <div className="flex items-center justify-center">
        <Menu />

        {!IsRecipe && !IsHouse &&
        <div className="absolute left-[40%] top-[20%]">
            <button onClick={() => { setIsRecipe(true) }} className="absolute text-[20px] sm:text-[50px] bg-[#DEF0CA] rounded-[30px] sm:w-0  hover:text-[52px] hover:w-[210px] transition-all">Recipe POST</button>
            <button onClick={() => { setIsHouse(true) }} className="absolute top-[200px] text-[20px] sm:text-[50px] bg-[#B4CE97] rounded-[30px] sm:w-0 hover:text-[52px] hover:w-[210px] transition-all">House POST</button>
        </div>
        }

        { IsRecipe && 
        <div className="absolute top-[93px] w-[50%] flex-col lg:items-center lg:justify-center lg:w-[40%] bg-white rounded-[50px] p-10">
            
            <div className="flex flex-row overflow-x-auto gap-5">
                {photosSrc.map( (each) => LocatePhotos(each) )}
                <label
                htmlFor="photoInput"
                className="flex items-center justify-center min-w-[128px] h-[128px] text-[30px] bg-[#F1F2F0] rounded-[50px] hover:bg-[#DBDCDB] transition-all">+</label>
                <input
                type="file"
                id="photoInput"
                onChange={ SaveImage }
                className="hidden"/>
            </div>
            <h1 className="text-[20px] text-[#507E1F] border-b border-b-[#73974C] pb-5">사용할 사진을 삽입하세요</h1>
            
            <div className="flex flex-col mt-[30px] gap-5 border-b border-b-[#73974C] pb-10">
                <input 
                type="text"
                placeholder="제목을 입력하세요"
                className="bg-[#DEF0CA] text-[30px] text-[#507E1F] pl-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[80px] focus:outline-none"/>
                <input 
                type="text"
                placeholder="간단한 레시피 설명을 적어주세요!"
                className="bg-[#F8FBF4] text-[20px] text-[#507E1F] pl-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[50px] focus:outline-none"/>
                <textarea 
                placeholder="자세한 설명을 적어주세요!" 
                className="bg-[#F8FBF4] text-[20px] text-[#507E1F] pl-5 placeholder:text-zinc-300 rounded-[30px] w-full h-[400px] focus:outline-none resize-none">
                </textarea>
            </div>

            <div>
                <div className="mt-10 bg-[#F8FBF4] rounded-[30px] border-b border-b-[#73974C] p-10">
                    <h1 className="text-[30px] text-[#507E1F]">사용 재료</h1>
                    <div className="h-[40px] overflow-x-auto"/*x바에 스크롤 만들고 싶어 ㅠㅠㅠㅠ */>
                    {sourceAry.map((each) => {
                        return <button 
                        onClick={ () => {/*each를 이 배열에서 제거 */} }
                        className="bg-[#507E1F] text-white rounded-[30px] p-2 mr-3">
                            {each}
                        </button>
                    })}
                    </div>
                </div>
                <div className="bg-[#F8FBF4] rounded-[30px] p-10">

                    <input
                    type="text"
                    onChange={(event) => { setAddSourceInput(event?.target.value) }}
                    placeholder="사용 재료를 입력하세요"
                    className="text-[#507E1F] bg-[#DEF0CA] rounded-[30px] pl-5 h-[40px] placeholder:text-[#507E1F] focus:outline-none"/>
                    
                    <button 
                    onClick={() => { setSourceAry([...sourceAry, addSourceInput]) }} 
                    className="bg-[#B4CE97] h-[40px] rounded-[30px] text-[15px] text-[#507E1F] p-1">
                        추가
                    </button>
                    
                    <div className="flex flex-row gap-3 mt-5">
                    {bestSource.map((each) => {
                        return <div className="bg-[#507E1F] text-white rounded-[30px] p-2">
                            {each}
                        </div>
                    })}
                    </div>
                </div>
            </div>
        </div>
        }

        { IsHouse &&
        <div>
            this is house post
        </div>
        }
    </div>
}