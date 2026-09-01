import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RestaurantLogin = () => {
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleLogin = async ()=>{
    if(!email || !password){
      setError(true)
      return
    }

    setError(false)

    let response = await fetch('/api/restaurant',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, login:true})
    })

    if (!response.ok) {
      alert('Login failed')
      return
    }

    const responseData = await response.json()
    if(responseData.success){
      const {result} = responseData;
      delete result.password
      localStorage.setItem('restaurantUser', JSON.stringify(result))
      router.push('/restaurant/dashboard')
    }else{
      alert('Login failed')
    }
  }

  return (
    <>
      <h3>Login</h3>
      <div>
            <div className='input-wrapper'>
                <input type='text' placeholder='Enter email' className='input-field' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                {
                  error && !email && <span className='input-error'>Please enter valid email</span>
                }
            </div>
            <div className='input-wrapper'>
                <input type='password' placeholder='Enter password' className='input-field' value={password} onChange={(e)=>setPassword(e.target.value)} />
                {
                  error && !password && <span className='input-error'>Please enter valid password</span>
                }
            </div>
            <div className='input-wrapper'>
                <button onClick={handleLogin} className='button'>Login</button>
            </div>
      </div>
    </>
  )
}

export default RestaurantLogin
