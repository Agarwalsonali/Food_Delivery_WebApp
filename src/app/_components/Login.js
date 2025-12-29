import React from 'react'

const RestaurantLogin = () => {
  return (
    <>
      <h3>Login</h3>
      <div>
            <div className='input-wrapper'>
                <input type='text' placeholder='Enter email' className='input-field'/>
            </div>
            <div className='input-wrapper'>
                <input type='password' placeholder='Enter password' className='input-field' />
            </div>
            <div className='input-wrapper'>
                <button className='button'>Login</button>
            </div>
      </div>
    </>
  )
}

export default RestaurantLogin
