import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from "react";
import { MainPage } from "../app/main.tsx"
import { MyPage } from "../app/myPage.tsx"
//import { RouterProvider } from "react-router-dom";

export type FishRouterPath = '/' | '/download' 
const fishRouter = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path:'/mypage',
        element: <MyPage />,
    },
])

// eslint-disable-next-line react/jsx-no-undef
export const FishRouter = () => <RouterProvider router={fishRouter} />

