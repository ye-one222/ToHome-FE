import React, { useState } from "react";
import '../tailwind.css';
import { Link, NavLink } from "react-router-dom";

export const Menu = (): JSX.Element => {
    const logoUrl = '/img/logo.png';
    const postImgUrl = '/img/pencil.png'
    const [ IsLogin, setIsLogin ] = useState(false)
    //const [whatActiveBtn, setWhatActiveBtn] = useState('')
    const menus = [
        { name: "Main", path: "/" },
        { name: "House", path: "/house" },
        { name: "Search", path: "/search" },
        { name: "My", path: "/mypage"} //나중에는 아마 사용자 id 들어가야 할듯
    ];

    return (
        <div className="MenuCSS flex flex-col items-center absolute right-3/4 top-5 md:w-[210px] h-[600px] bg-[#a0d4684c] rounded-[78px]">
            <div className="flex flex-row items-center justify-center mt-[20px] w-[175px] h-[114px] bg-[#f6ffee] rounded-[50px]">
                <h1 className="ml-5 text-[30px] text-center">To Home</h1>
                <img src={logoUrl} alt="logo" className="w-[88px] h-[83px]"/>
            </div>

            <div className="flex flex-col mt-5 gap-4 ">
                {menus.map((menu, index) => {
                    return (
                        <NavLink
                            to={menu.path}
                            key={index}
                            className={({ isActive }) =>  { return isActive ? 'text-white rounded-lg bg-[#507e1f]' : ''}}
                        >
                            <div className="flex flex-row items-center justify-center gap-3">
                                <img className="w-[24px] " alt={menu.name} src={`/img/menuBar/${menu.name}MenuIcon.png`}/>                           
                                <div className="w-[106px] text-[25px] tracking-[0] whitespace-nowrap">
                                    {menu.name}
                                </div>
                            </div>
                            
                        </NavLink>
                    )
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
                <button onClick={() => { setIsLogin(false)}} className="flex justify-center w-[172px] py-[12px] bg-[#B4CE97] text-[white] rounded-[8px] hover:text-[#507e1f] transition-all">
                        Logout
                </button>
                }
            </div>
            

            {IsLogin ? 
                <Link to='/post'><img src={postImgUrl} alt = "postImgUrl"/></Link>
                :<img src={postImgUrl} onClick={() => { alert("로그인을 해주세요") }} alt = "postImgUrl"/>
            }
            <Link to='/post'><button >비상용 버튼- post 페이지로 이동</button></Link>
            
        </div>
    );
};
