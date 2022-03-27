import React, {useEffect, useState} from 'react';
import * as Falcons from 'react-icons/fa';
import * as Aicons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SliderData, linkdata } from './SidebarData';
import './sidebar.scss';
import * as Faicons from 'react-icons/fa'
import * as Ai from 'react-icons/ai'
import { ethers } from "ethers";
import logo from '../../images/logo.png';


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
        <div className='logo_Container'>
        <Falcons.FaBars onClick={showSidebar} color="#fff" className='bars'/>
        <img src={logo} alt='logo' className='logo'/>
        </div>
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
                    <li key={index} className="nav-text"><a href={items.link}>
                    {items.icon}
                    <span>{items.title}</span>
                    </a></li>
                )
            })}
            
            </div>
            <div className='socials_select'>
            <a href="https://t.me/SafeEarnFinanceChat"><Faicons.FaTelegram className="social_icons"/></a>
            <a href="https://twitter.com/SafeEarnFinance/"> <Faicons.FaTwitter className="social_icons"/></a>
            <a href="https://www.facebook.com/SafeEarnFinance/">  <Faicons.FaFacebook className="social_icons"/> </a>
            </div>,

        </ul>
    </nav>
    </>
  )
}

export default Sidebar