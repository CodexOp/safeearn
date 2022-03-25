import React from 'react'
import './dash.scss';
import * as Ai from 'react-icons/ai'
import {FaWallet} from 'react-icons/fa'
 
const Dash = () => {
  return (
    <div className='dash'>


<div className='container'>
      <div className="block1 wallet_block">
        <div className="inner_block1 walletaddress_box">
          <div className='dashboard-card flex_card'>
            <div className='card_title address_title'>
              <FaWallet className='logo_wallet'/>
            <h2>Wallet Address </h2> -
            </div>
            <div className="card_value address_box">
             <h2>0x833aBBF9904E9A3Fe194f7c433F633b1606D159A</h2>
            </div>
          </div>
        </div>
        </div>
        </div>


      <div className='container'>
      <div className="block1">
        <div className="inner_block1">
          <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Token Holdings</h2>
            </div>
            <div className="card_value">
             <h2>$9827</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Busd Holdings</h2>
            </div>
            <div className="card_value">
             <h2>$8546</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>BUSD Earnings</h2>
            </div>
            <div className="card_value">
             <h2>$1521</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>BUSD Distributed</h2>
            </div>
            <div className="card_value">
             <h2>$0000</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Market Volume (USD)</h2>
            </div>
            <div className="card_value">
            <h2>546589</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Current Price</h2>
            </div>
            <div className="card_value">
             <h2>$0.005454</h2>
            </div>
          </div>
        </div>
      </div>



{/* second block started */}



      <div className="block2">
      <div className='inner_block2 claim_block'>
      <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Rewards not claimed (USD)</h2>
            </div>
            <div className="card_value">
             <h2>$54,542</h2>
            </div>
            <button className='claim_button'>Claim Now</button>
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
             <h2> 5M</h2>
            </div>
          </div>
      </div>

      
        <div className='inner_block3 block2_supply'>
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>APY %</h2>
            </div>
            <div className="card_value">
             <h2>434,231%</h2>
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
             <h2>0x833aBBF9904E9A3Fe194f7c433F633b1606D159A</h2>
            </div>
          </div>
        </div>
        </div>
    </div>

  
    </div>
  )
}

export default Dash;