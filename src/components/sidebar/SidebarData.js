import React from "react";
import * as Faicons from 'react-icons/fa';
import * as Ai from 'react-icons/ai'
import {CgWebsite} from 'react-icons/cg'
import {MdSell} from 'react-icons/md'


export const SliderData = [
    {
        title:'Dashboard',
        path:'/',
        icon: <Ai.AiFillDashboard/>
    },
    {
        title:'Calculator',
        path:'/calculator',
        icon: <Ai.AiFillCalculator/>
    },
    {
        title:'SafeSwap',
        path:'/swap',
        icon: <Ai.AiOutlineSwap/>
    },
    {
        title:'Upvote List',
        path:'/upvote',
        icon: <Ai.AiOutlineUnorderedList/>
    },
    {
        title:'FAQ',
        path:'/faq',
        icon: <Ai.AiFillQuestionCircle/>
    }

]

export const linkdata = [

    {
        title:'Website',
        link:'https://safeearnfinance.net/',
        icon: <CgWebsite/>
    },
    {
        title:'Buy Now',
        link:'https://poocoin.app/tokens/0xc257ee8ca00310727b02b07d0cbb11c5672e172a',
        icon: <MdSell/>
    },
  
 ]