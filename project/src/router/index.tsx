import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
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

export type HomeRouterPath = '/' | '/mypage'|'/login'|'/signup'|'/house'|'/search'|'/post'|'/recipe/:id'|'/house/:id'|'/guest/:id'
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
        path:'/recipe/:id',
        element: <RecipeDetailPage />,
    },
    {
        path:'/house/:id',
        element: <HouseDetailPage />,
    },
    {
        path:'/guest/:id',
        element: <GuestProfilePage />,
    },
])

// eslint-disable-next-line react/jsx-no-undef
export const HomeRouter = () => <RouterProvider router={homeRouter} />

