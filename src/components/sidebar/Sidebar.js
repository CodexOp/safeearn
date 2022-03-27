import React, {useEffect, useState} from 'react';
import * as Falcons from 'react-icons/fa';
import * as Aicons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SliderData, linkdata } from './SidebarData';
import './sidebar.scss';
import * as Faicons from 'react-icons/fa'
import * as Ai from 'react-icons/ai'
import { ethers } from "ethers";

const Sidebar = () => {

    let [address, setAddress]= useState("Connect");

    useEffect(() => {
        console.log("Slide")
        connectMeta();
      }, []);

    async function connectMeta(){
        try{
         if (typeof window.ethereum !== 'undefined') {
           console.log('MetaMask is installed!');
         }else console.log ("Shit man")
         console.log("Connecting to metamask");
         let provider = new ethers.providers.Web3Provider(window.ethereum);
         await provider.send("eth_requestAccounts", []).catch((error) => {
             console.log(error);
         })
         let signer = provider.getSigner();
         const walletAddress = await signer.getAddress();
         setAddress(walletAddress.slice(0, 6)+ "...");
         console.log("Slidebar");
       } catch (error) {
         console.log(error);
       }
      }

    useEffect(()=>{
        if(window.innerWidth >= 1024){
            setSidebar(true)    

           
        }
    }, [])

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => {
        setSidebar(!sidebar)
    }
  return (
      <>
      <div className='navbar_fixed'>
    <div className='navbar'>
        <div to="" className='menu-bars'>
        <Falcons.FaBars onClick={showSidebar} color="#fff" className='bars'/>
        </div>

        <div>
            <Link to="/swap"> <button className='swap_button'>Swap</button></Link>
            <button className='connect_button'>{address}</button>


        </div>
    </div>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
                <Link to="#" className='menu-bars'>
                    <Aicons.AiOutlineClose color="#fff"/>
                </Link>
            </li>




            <h2 className='sidebar_title'>CORE</h2>
            <div className='section1_sidebar'>
            {SliderData.map((items, index)=>{
                return(
                    <li key={index} className="nav-text"><Link to={items.path}>
                    {items.icon}
                    <span>{items.title}</span>
                    </Link></li>
                )
            })}
            </div>




            <h2 className='sidebar_title sidebar_section2'>LINKS</h2>
            <div className='section1_sidebar'>
           

            {linkdata.map((items, index)=>{
                return(
                    <li key={index} className="nav-text"><Link to={items.path}>
                    {items.icon}
                    <span>{items.title}</span>
                    </Link></li>
                )
            })}
            
            </div>
            <div className='socials_select'>
            <Faicons.FaTelegram className="social_icons"/>
            <Faicons.FaTwitter className="social_icons"/>
            <Faicons.FaDiscord className="social_icons"/>
            </div>,

        </ul>
    </nav>
    </>
  )
}

export default Sidebar