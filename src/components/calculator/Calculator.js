import * as React from 'react';
import './calculator.scss';
import { ethers } from "ethers";
import routerAbi from '../../abi/router.json'
import addresses from '../../abi/addresses.json'
import tokenAbi from '../../abi/token.json'

const Calculator = () => {
  
  let apy = 383000;
  let [price, setPrice] = React.useState(1);
  let [balance, setBalance] = React.useState(0);
  let [tradeVolume, setTradeVolume] = React.useState(1000);

  React.useEffect(() => {

    async function fetchData(){
      let _balance = await _getBalance(addresses.token);
      setBalance(_balance);
      getPrice()
    }
    fetchData();
  }, []);

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
      let _price = parseFloat(ethers.utils.formatEther(amounts2[1].toString()));
      if (_price ==0) _price =1;
      setPrice(_price);
    } catch (err) {
      console.log (err);
    }
  }
  console.log(balance)

  return (
    <div className="dash">
              <div className="swap">Calculator</div>

             <div className='container'>

{/* last block */}


<div className="block3">
<div className='inner_block_calc'>
<div className='dashboard-card'>
      <div className='card_title'>
      <h2>SafeEarn Balance</h2>
      </div>
      <div className="card_value card_value_acc">
       <h2>
         <input  placeholder='Enter Balance' value= {balance} onChange={(event) =>{
           setBalance(event.target.value);
         }} />
       </h2>
      </div>
      <div className='card_title'>
      <h2>Your Balance In EARN</h2></div>
    </div>
</div>

<div className='inner_block_calc'>
  <div className='dashboard-card'>
      <div className='card_title'>
      <h2>Cost per EARN</h2>
      </div>
      <div className="card_value card_value_acc">
      <h2>
         <input  placeholder='Enter Cost' value= {price} onChange={(event) =>{
           setPrice(event.target.value);
         }} />
       </h2>
      </div>
      <div className='card_title'>
        <h2>in USD</h2>
      </div>
    </div>
</div>
  <div className='inner_block_calc'>
  <div className='dashboard-card'>
      <div className='card_title'>
      <h2>Daily Trade Volume($)</h2>
      </div>
      <div className="card_value card_value_acc">
      <h2>
         <input  placeholder='Enter Value' value= {tradeVolume} onChange={(event) =>{
           setTradeVolume(event.target.value);
         }} />
       </h2>
      </div>
      <div className='card_title'>
      <h2>in USD</h2></div>
    </div>
</div>

</div>


<div className='block4'>
    <div className="row">
      <div className='title_card'>
          <h2>Daily Earning ($)</h2>
      </div>

      <div className='value'>
      <h2>${(apy/365)*balance * tradeVolume/price}</h2>
      </div>
    </div>

    <div className="row">
      <div className='title_card'>
      <h2>Weekly Earning($)</h2>
      </div>

      <div className='value'>
      <h2> ${(apy*7/365)*balance * tradeVolume/price}</h2>
      </div>
    </div>



    <div className="row">
      <div className='title_card'>
          <h2>Monthly Earning($)</h2>
      </div>

      <div className='value'>
      <h2>${(apy*12/365)*balance * tradeVolume/price}</h2>
      </div>
    </div>



    <div className="row">
      <div className='title_card'>
      <h2>Yearly Earning($)</h2>
      </div>

      <div className='value'>
      <h2>${(apy)*balance * tradeVolume/price}</h2>
      </div>
    </div>



    <div className="row">
      <div className='title_card'>
  <h2>APY %</h2>
      </div>

      <div className='value'>
      <h2>{apy}</h2>
      </div>
    </div>



</div>
</div>
    </div>
  )
}

export default Calculator