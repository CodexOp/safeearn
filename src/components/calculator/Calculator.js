import React from 'react';
import './calculator.scss';

const Calculator = () => {
  return (
    <div className="dash">
              <div className="swap">Calculator</div>

             <div className='container'>

{/* last block */}


<div className="block3">
<div className='inner_block_calc'>
<div className='dashboard-card'>
      <div className='card_title'>
      <h2>Your Balance($)</h2>
      </div>
      <div className="card_value card_value_acc">
       <h2>
         <input  placeholder='Enter Balance'/>
       </h2>
      </div>
      <div className='card_title'>
      <h2>Your Balance In USD</h2></div>
    </div>
</div>

<div className='inner_block_calc'>
  <div className='dashboard-card'>
      <div className='card_title'>
      <h2>Token Owned</h2>
      </div>
      <div className="card_value card_value_acc">
      <h2>
         <input  placeholder='Enter Balance'/>
       </h2>
      </div>
      <div className='card_title'>
        <h2>Tokens</h2>
      </div>
    </div>
</div>
  <div className='inner_block_calc'>
  <div className='dashboard-card'>
      <div className='card_title'>
      <h2>Cost Per Token($)</h2>
      </div>
      <div className="card_value card_value_acc">
      <h2>
         <input  placeholder='Enter Value'/>
       </h2>
      </div>
      <div className='card_title'>
      <h2>Token Price</h2></div>
    </div>
</div>

</div>


<div className='block4'>
    <div className="row">
      <div className='title_card'>
          <h2>Daily Earning ($)</h2>
      </div>

      <div className='value'>
      <h2>$145</h2>
      </div>
    </div>

    <div className="row">
      <div className='title_card'>
      <h2>Weekly Earning($)</h2>
      </div>

      <div className='value'>
      <h2> $1254</h2>
      </div>
    </div>



    <div className="row">
      <div className='title_card'>
          <h2>Monthly Earning($)</h2>
      </div>

      <div className='value'>
      <h2>$54542</h2>
      </div>
    </div>



    <div className="row">
      <div className='title_card'>
      <h2>Yearly Earning($)</h2>
      </div>

      <div className='value'>
      <h2>$54857</h2>
      </div>
    </div>



    <div className="row">
      <div className='title_card'>
  <h2>APY %</h2>
      </div>

      <div className='value'>
      <h2>Infinite</h2>
      </div>
    </div>



</div>
</div>
    </div>
  )
}

export default Calculator