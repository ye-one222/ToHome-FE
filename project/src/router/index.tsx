import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from "react";
import { MainPage } from "../app/main.tsx"
import { MyPage } from "../app/myPage.tsx"

export type HomeRouterPath = '/' | '/download' 
const homeRouter = createBrowserRouter([
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
export const HomeRouter = () => <RouterProvider router={homeRouter} />

