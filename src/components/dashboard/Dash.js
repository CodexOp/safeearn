import * as React from 'react'
import './dash.scss';
import * as Ai from 'react-icons/ai'
import {FaWallet} from 'react-icons/fa'
import { ethers } from "ethers";
import routerAbi from '../../abi/router.json'
import addresses from '../../abi/addresses.json'
import tokenAbi from '../../abi/token.json'
 
const Dash = () => {
  let [walletAddress, setAddress]= React.useState("Connect Wallet");
  let [price, setPrice] = React.useState(0);
  let [balance, setBalance] = React.useState(0);
  let [busdBalance, setBusdBalance] = React.useState(0);
  let [totalSupply, setTotalSupply] = React.useState(0);
  let [yourBusdEarning, setYourBusdEarning] = React.useState(0);
  let [unclaimedReward, setUnclaimedReward] = React.useState(0);
  let [totalBusdReward, setTotalBusdReward] = React.useState(0);
  let apy = 383000;

  React.useEffect(() => {

    async function fetchData(){
      await connectMeta();
      getPrice();
      getRewardDetails();
      getTotalSupply();
      getTotalBusdDistributed();
      let _balance = await _getBalance(addresses.token);
      let _busdBalance = await _getBalance(addresses.busd);
      setBalance(_balance);
      setBusdBalance(_busdBalance);
    }
    fetchData();
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
     setAddress(walletAddress);
     console.log("Dashboard");
   } catch (error) {
     console.log(error);
   }
  }

  async function getPrice(){
    try{
      let rpcUrl = addresses.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let router = new ethers.Contract(
        addresses.router,
        routerAbi,
        provider_
      );
      const tokenIn = addresses.token;
      const tokenOut = addresses.wbnb;
      const amountIn = "100000";
      let amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
      let busd = addresses.busd;
      let amounts2 = await router.getAmountsOut(amounts[1], [tokenOut, busd]);
      console.log(`
          tokenIn: ${ethers.utils.formatEther(amountIn.toString())} ${tokenIn} (safeearn)
          tokenOut: ${ethers.utils.formatEther(amounts2[1].toString())} ${busd} (BUSD)
        `);
      setPrice(parseFloat(ethers.utils.formatEther(amounts2[1].toString())).toFixed(8));
    } catch (err) {
      console.log (err);
    }
  }

  async function _getBalance (address){
    try {
      let rpcUrl = addresses.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        address,
        tokenAbi,
        provider_
      );
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []).catch((error) => {
        console.log(error);
      })
      let signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      let balance = await token.balanceOf (walletAddress);
      let decimals = await token.decimals();
      decimals = parseInt(decimals.toString());
      balance = ethers.utils.formatEther(balance, decimals);
      console.log ("balance", balance.toString());
      return parseFloat(balance.toString()).toFixed(2);
    } catch (err){
      console.log (err);
      return 0;
    }
  }

  async function getRewardDetails(){
    try{
      let rpcUrl = addresses.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        addresses.token,
        tokenAbi,
        provider_
      );
      let dividendTrackerAddress = await token.dividendTracker();
      console.log("DividendTrankerAddress", dividendTrackerAddress);
      let dividendTracker = new ethers.Contract(
        dividendTrackerAddress,
        ["function getHolderDetails(address holder) public view returns ( uint256 , uint256 , uint256 , uint256 )"],
        provider_
      );
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []).catch((error) => {
        console.log(error);
      })
      let signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      console.log(walletAddress);
      let share = await dividendTracker.getHolderDetails(walletAddress);
      console.log("Share",share);
      setYourBusdEarning (parseFloat(ethers.utils.formatEther(share[2].toString())).toFixed(2));
      setUnclaimedReward (parseFloat(ethers.utils.formatEther(share[1].toString())).toFixed(2));
    } catch (error) {
      console.log(error);
    }
  }

  async function claimReward (){
    try{
      let rpcUrl = addresses.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        addresses.token,
        tokenAbi,
        provider_
      );
      let dividendTrackerAddress = await token.dividendTracker();
      console.log("DividendTrankerAddress", dividendTrackerAddress);
      let dividendTracker = new ethers.Contract(
        dividendTrackerAddress,
        ["function claimDividend() external"],
        provider_
      );
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []).catch((error) => {
        console.log(error);
      })
      let signer = provider.getSigner();
      let signedDividendTracker =dividendTracker.connect(signer);
      let tx = await signedDividendTracker.claimDividend();
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTotalSupply (){
    let rpcUrl = addresses.rpcUrl;
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let token = new ethers.Contract(
      addresses.token,
      tokenAbi,
      provider_
    );
    let supply = await token.totalSupply();
    console.log("Supply", supply.toString());
    let decimals = await token.decimals();
      decimals = parseInt(decimals.toString());
      while (decimals--){
        supply = supply.div('10');
      }
    setTotalSupply(parseInt(supply));
  }

  async function getTotalBusdDistributed (){
    try{
      let rpcUrl = addresses.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        addresses.token,
        tokenAbi,
        provider_
      );
      let dividendTrackerAddress = await token.dividendTracker();
      console.log("DividendTrankerAddress", dividendTrackerAddress);
      let dividendTracker = new ethers.Contract(
        dividendTrackerAddress,
        ["function totalDistributedRewards() external view returns (uint256)"],
        provider_
      );
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []).catch((error) => {
        console.log(error);
      })
      let signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      console.log(walletAddress);
      let rewards = await dividendTracker.totalDistributedRewards();
      setTotalBusdReward(parseFloat(ethers.utils.formatEther(rewards.toString())).toFixed(2))
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className='dash'>


<div className='container'>
      {/* <div className="block1 wallet_block">
        <div className="inner_block1 walletaddress_box">
          <div className='dashboard-card flex_card'>
            <div className='card_title address_title'>
              <FaWallet className='logo_wallet'/>
            <h2>Wallet Address </h2> -
            </div>
            <div className="card_value address_box">
             <h2>{walletAddress}</h2>
            </div>
          </div>
        </div>
        </div> */}
        </div>


      <div className='container'>
      <div className="block1">
        <div className="inner_block1">
          <div className='dashboard-card'>
            <div className='card_title'>
            <h2>EARN Holdings</h2>
            </div>
            <div className="card_value">
             <h2>${price * balance}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>BUSD Holdings</h2>
            </div>
            <div className="card_value">
             <h2>${busdBalance}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Your BUSD Earnings</h2>
            </div>
            <div className="card_value">
             <h2>${yourBusdEarning}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total BUSD Distributed</h2>
            </div>
            <div className="card_value">
             <h2>${totalBusdReward}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>MarketCap (USD)</h2>
            </div>
            <div className="card_value">
            <h2>{price * totalSupply * 0.9}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Current Price</h2>
            </div>
            <div className="card_value">
             <h2>${price}</h2>
            </div>
          </div>
        </div>
      </div>



{/* second block started */}



      <div className="block2">
      <div className='inner_block2 claim_block'>
      <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Your Unclaimed Rewards (USD)</h2>
            </div>
            <div className="card_value">
             <h2>${unclaimedReward}</h2>
            </div>
            <button className='claim_button' onClick = {claimReward}>Claim Now</button>
          </div>
      </div>

      </div>

      {/* third block started */}


   


      {/* last block */}

      
      <div className="block3 mt-30">
      <div className='inner_block3 block1_supply'>
      <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total Supply</h2>
            </div>
            <div className="card_value">
             <h2> {totalSupply}</h2>
            </div>
          </div>
      </div>

      
        <div className='inner_block3 block2_supply'>
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>APY %</h2>
            </div>
            <div className="card_value">
             <h2>{apy}%</h2>
            </div>
          </div>
      </div>

      </div>
      <div className="block1 wallet_block contract_address">
        <div className="inner_block1 walletaddress_box">
          <div className='dashboard-card flex_card'>
            <div className='card_title address_title'>
              <Ai.AiOutlinePaperClip className='logo_wallet'/>
            <h2>contract Address </h2> -
            </div>
            <div className="card_value address_box">
             <h2>{addresses.token}</h2>
            </div>
          </div>
        </div>
        </div>
    </div>

  
    </div>
  )
}

export default Dash;