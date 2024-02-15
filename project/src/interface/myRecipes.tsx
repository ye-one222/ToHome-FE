import React from "react";
import { useState } from "react";

interface MyString{
    userId:string;
}
/*이거를 안해주고 그냥 스트링으로 썼는데
 Type '{ props: string; }' is not assignable to type 'string'
 이에러 나서 인터페이스로 만들어줌 - 해결*/

export const MyRecipePage:React.FC<MyString> = ( {userId} ) => {
    //user_id 인자로 받고 fetch해서 내 게시글들 가져와
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
    console.log(userId)
    const [ IsLiked, ] = useState(false);

    return <div>
    <h1 className="text-[#507e1f] text-[30px] font-semibold">My Recipes - {myRecipes.length}</h1>
    <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto overflow-x-hidden">
    {myRecipes.map((each) => {
        return (
        <div>{/*<Link to=''> </Link>*/}
            <img className='w-[260px] bg-zinc-100 rounded-[20px]' src="/img/logo.png" alt={each.title}/>
            <div className="max-h-[24px] max-w-[260px] ml-2 flex flex-row">
                <h1 className="overflow-hidden">{each.title}</h1>
                <div className="flex flex-row ml-auto mr-1">
                {IsLiked ? 
                    <img className='w-[23px]' src="/img/heart.png" alt="heart"/>:
                    <img className='w-[23px]' src="/img/emptyHeart.png" alt="emptyHeart"/>
                }
                <h1>{each.liked}</h1>
                </div>
            </div>
        </div>)
    })}
    </div>
</div>
}