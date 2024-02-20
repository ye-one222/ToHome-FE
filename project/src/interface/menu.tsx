import React, { useEffect, useState } from "react";
import '../tailwind.css';
import { Link, NavLink } from "react-router-dom";

export const Menu = (): JSX.Element => {
    const logoUrl = '/img/logo.png';
    const postImgUrl = '/img/pencil.png'
    const [ userId, setUserId ] = useState<string>('')
    const [ IsLogin, setIsLogin ] = useState(false)
    
    const menus = [
        { name: "Main", path: "/" },
        { name: "House", path: "/house" },
        { name: "Search", path: "/search" },
        { name: "My", path: "/mypage"} //나중에는 아마 사용자 id 들어가야 할듯
    ];
    useEffect(() => {
        if(localStorage.getItem("login-token")){
        //로그인 된 상태라면 
        setIsLogin(true)
        fetch(`http://tobehome.kro.kr:8080/${localStorage.getItem("user-id")}`, {
            method: 'GET',
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("login-token")}`,
                "Content-Type":"application/json; charset=utf-8",
            },
        })
        .then((response) => response.json())
        .then((data) => { setUserId(data.nickname) });
    }},[]);
    
    return (
        <div className="MenuCSS flex flex-col items-center absolute right-3/4 top-5 md:w-[210px] h-[600px] bg-[#a0d4684c] rounded-[78px]">
            <div className="flex flex-row items-center justify-center mt-[20px] w-[175px] h-[114px] bg-[#f6ffee] rounded-[50px]">
                <h1 className="ml-5 text-[30px] text-center">To Home</h1>
                <img src={logoUrl} alt="logo" className="w-[88px] h-[83px]"/>
            </div>

            <div className="flex flex-col mt-5 gap-4 ">
                {menus.map((menu, index) => {
                    if( menu.name === "My" && !IsLogin )
                    {
                        return (<button onClick={ () => { alert("로그인을 해주세요!") } } className="flex flex-row items-center justify-center gap-3">
                                <img className="w-[24px] " alt={menu.name} src={`/img/menuBar/${menu.name}MenuIcon.png`}/>                           
                                <div className=" w-[106px] text-[25px] border border-[#DEF0CA] rounded-lg hover:border-white transition-all">
                                    {menu.name}
                                </div>
                            </button>)
                    }
                    else
                    {
                        return (
                        <div className="flex items-center justify-center gap-3">
                            <img className="w-[24px] " alt={menu.name} src={`/img/menuBar/${menu.name}MenuIcon.png`}/> 
                            <NavLink
                                to={menu.path}
                                key={index}
                                className={({ isActive }) =>  { return isActive ? 'text-white rounded-lg bg-[#507e1f] w-full' : ''}}
                            >                           
                                <div className="flex flex-row items-center justify-center w-[106px] text-[25px] border border-[#DEF0CA] rounded-lg hover:border-[#507e1f] transition-all">
                                    {menu.name}
                                </div>
                            </NavLink>
                        </div>
                        )
                    }
                    
                })}
            </div>
            <div className="flex h-[200px] items-center">
                { !IsLogin ? 
                <div className="flex flex-col  gap-4">
                    <Link to={'/login'}><button className="flex justify-center w-[172px] py-[12px] bg-[#B4CE97] text-[white] rounded-[8px] hover:text-[#507e1f] transition-all">
                        Login
                    </button></Link>
                    <Link to={'/signup'}><button className="flex justify-center w-[172px] py-[12px] bg-[#B4CE97] text-[white] rounded-[8px] hover:text-[#507e1f] transition-all">
                        Sign Up
                    </button></Link>
                </div>:
                <div>
                    <h1 className="flex items-center justify-center text-[14px] mb-5">{userId}님 환영합니다!</h1>
                    <Link to={'/'}><button onClick={() => { setIsLogin(false); localStorage.removeItem("login-token"); }} className="flex justify-center w-[172px] py-[12px] bg-[#B4CE97] text-[white] rounded-[8px] hover:text-[#507e1f] transition-all">
                            Logout
                    </button></Link>
                </div>
                }
            </div>
            

            {IsLogin ? 
                <Link to='/post'><img src={postImgUrl} alt = "postImgUrl"/></Link>
                :<img src={postImgUrl} onClick={() => { alert("로그인을 해주세요") }} alt = "postImgUrl"/>
            }
           
        </div>
    );
};

