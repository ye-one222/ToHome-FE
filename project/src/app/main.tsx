import React from "react"
import { Link } from "react-router-dom"

export const MainPage:React.FC = ()=>{
    return <div>
        <Link to="/mypage">
            <button className="text-[60px] text-blue-600">hello welcome to ToHome</button>
        </Link>
    </div>
}