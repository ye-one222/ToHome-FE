import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
//import { Link } from "react-router-dom";


export const LoginPage:React.FC = () => {

    const [ userId,setUserId ] = useState<string|null>(null)
    const [ password,setPassword ] = useState<string|null>(null)
    const [ loginFin, setLoginFin ] = useState<boolean>(false)
    
   /* useEffect(() => {
            fetch("http://tobehome.kro.kr:8080/login", {
                method: 'post',
                body: JSON.stringify({
                    nickname:"nnn",
                    password:"ppp"
                })
            })
            .then(res => {
                if (res.status === 200) {
                    alert("저장 완료");
                } else if (res.status === 400) {
                    alert("res")
                    //console.log(res)
                    return res.json();
                }else{
                    console.log(res.status)
                }
              })
            .then(data => console.log("this is data:",data))
    },[]);*/

    const handleID = (e) => {
        //아이디 입력
        setUserId(e.target.value)
    }
    const handlePW = (e) => {
        //비밀번호 입력
        setPassword(e.target.value)
    }
    const handleLoginBtn = () => {
        //로그인 버튼 눌렀을때
        if(userId && password){
            fetch('http://tobehome.kro.kr:8080/login', {
                method: 'post',
                headers: {
                    "Content-Type":"application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    nickname: userId,
                    password: password
                })
            })
            .then((response) => response.json())
            .then((data) => { 
            if(data.id){
                //login success Let's get token
                console.log(data.token)
                //토큰 받아서 로컬 스트리지 or 세션 스토리지에 저장 + 로그아웃할때 취소
                localStorage.setItem("login-token",data.token)
                localStorage.setItem("user-nickname", userId)
                setLoginFin(true)
            }
            else{
                alert(data.message);
            }
            });
        }
    
    }

    return <div className="LoginPageBg flex justify-center">
        <div>
            <img className="absolute top-0 right-0 max-h-full z-0" alt="LoginFlower" src="/img/loginFlower.svg"/>
            <div className="fixed w-[498px] h-[498px] -bottom-60 right-2/3 -left-40 bg-[#a0d4680d] rounded-[249px]" />
            <div className="fixed w-[650px] h-[650px] -bottom-80 right-2/3 -left-60 bg-[#a0d4680d] rounded-[325px]" />
            <div className="fixed w-[822px] h-[822px] -bottom-96 right-2/3 -left-80 bg-[#a0d4680d] rounded-[411px]" />
        </div>
        <div className="flex flex-col items-center justify-center h-full w-1/4 gap-4 ">
            <img className='w-[146px]' alt="leaf" src='/img/logo.png'/>
            
            <div className="bg-white h-[50px] w-full flex flex-row items-center gap-4 rounded-md">
                <img className='ml-3 w-[23px] h-[23px]' alt="guest" src="/img/guest.png"/>
                <input 
                    onChange={handleID}
                    type="text" 
                    placeholder="ID" 
                    className="LoginInput font-semibold w-full"/>

            </div>
            <div className="bg-white h-[50px] w-full flex flex-row items-center gap-4 rounded-md">
                <img className='ml-3 w-[23px] h-[23px]' alt="guest" src="/img/lock.png"/>
                <input 
                    onChange={handlePW}
                    type="text" 
                    placeholder="password" 
                    className="LoginInput font-semibold w-full"/>
                
            </div>
            <button onClick = {handleLoginBtn} className="bg-white h-[50px] w-full z-30 rounded-md border hover:border-[#507e1f] transition-all">LOG IN</button>
            { loginFin && 
                <Link to='/' className="z-30"><button className="z-30 hover:font-semibold">로그인 완료! 메인화면으로 돌아가기</button></Link>}
        </div>
        
    </div>
}