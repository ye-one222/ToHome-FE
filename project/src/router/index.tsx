import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from "react";
import { MainPage } from "../app/main.tsx"
import { MyPage } from "../app/person/myPage.tsx"
import { LoginPage } from '../app/login/login.tsx';
import { SignupPage } from '../app/login/signup.tsx';
import { HouseMainPage } from '../app/houseMain.tsx';
import { SearchMainPage } from '../app/searchMain.tsx';
import { PostPage } from '../app/post.tsx';
import { RecipeDetailPage } from '../app/detail/[id]/recipePage.tsx';
import { HouseDetailPage } from '../app/detail/[id]/housePage.tsx';
import { GuestProfilePage } from '../app/person/guest.tsx';

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
    {
        path:'/login',
        element: <LoginPage />,
    },
    {
        path:'/signup',
        element: <SignupPage />,
    },
    {
        path:'/house',
        element: <HouseMainPage />,
    },
    {
        path:'/search',
        element: <SearchMainPage />,
    },
    {
        path:'/post',
        element: <PostPage />,
    },
    {
        path:'/recipe/1', //일단 임시로
        element: <RecipeDetailPage />,
    },
    {
        path:'/house/1', //일단 임시로
        element: <HouseDetailPage />,
    },
    {
        path:'/guest',
        element: <GuestProfilePage />,
    },
])

// eslint-disable-next-line react/jsx-no-undef
export const HomeRouter = () => <RouterProvider router={homeRouter} />

