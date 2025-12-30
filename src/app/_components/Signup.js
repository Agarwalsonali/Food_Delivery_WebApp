import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RestaurantSignup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [c_password,setC_password]=useState('')
    const [name,setName]=useState('')
    const [city,setCity]=useState('')
    const [address,setAddress]=useState('')
    const [contact,setContact]=useState('')
    const router = useRouter()
    const [error, setError]= useState(false)
    const [passwordError, setPasswordError]= useState(false)

    const handleSignUp=async()=>{
        if(password!=c_password){
            setPasswordError(true)
            return false;
        }else{
            setPasswordError(false)
        }

        if(!email || !password || !c_password || !name || !city || !address || !contact){
            setError(true)
            return false;
        }else{
            setError(false)
        }

       console.log(email,password,c_password,name,city,address,contact);
       let response = await fetch("http://localhost:3000/api/restaurant",{
        method: "POST",
        body: JSON.stringify({email,password,name,city,address,contact})
       })

       response=await response.json()

       if(response.success){
        console.log(response)
        const {result}=response
        delete result.password
        localStorage.setItem("restaurantUser",JSON.stringify(result))
        router.push('/restaurant/dashboard')
       }
    }

  return (
    <>
      <h3>SignUp</h3>
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
                    passwordError && <span className='input-error'>Password and Confirm password not matched</span>
                }
                {
                    error && !password && <span className='input-error'>Please enter valid password</span>
                }
            </div>

            <div className='input-wrapper'>
                <input type='password' placeholder='Confirm password' className='input-field' value={c_password} onChange={(e)=>setC_password(e.target.value)} />
                {
                    passwordError && <span className='input-error'>Password and Confirm password not matched</span>
                }
                {
                    error && !c_password && <span className='input-error'>Please enter valid confirm password</span>
                }
            </div>

            <div className='input-wrapper'>
                <input type='text' placeholder='Enter restaurant name' className='input-field' value={name} onChange={(e)=>setName(e.target.value)} />
                {
                    error && !name && <span className='input-error'>Please enter valid name</span>
                }
            </div>

            <div className='input-wrapper'>
                <input type='text' placeholder='Enter city' className='input-field' value={city} onChange={(e)=>setCity(e.target.value)} />
                {
                    error && !city && <span className='input-error'>Please enter valid city</span>
                }
            </div>

            <div className='input-wrapper'>
                <input type='text' placeholder='Enter full address' className='input-field' value={address} onChange={(e)=>setAddress(e.target.value)}/>
                {
                    error && !address && <span className='input-error'>Please enter valid address</span>
                }
            </div>

            <div className='input-wrapper'>
                <input type='text' placeholder='Enter contact No.' className='input-field' value={contact} onChange={(e)=>setContact(e.target.value)} />
                {
                    error && !contact && <span className='input-error'>Please enter valid contact</span>
                }
            </div>

            <div className='input-wrapper'>
                <button className='button' onClick={handleSignUp}>SignUp</button>
            </div>
      </div>
    </>
  )
}

export default RestaurantSignup
