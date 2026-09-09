'use client'

import Link from "next/link"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DeliveryHeader = (props) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("delivery");
    router.push("/deliverypartner");
  };

  return (
    <div className='header-wrapper'>
        <div className='logo'> 
          <img
            src='/logo.svg'
            alt='Food Delivery'
            style={{ width: 80, height: 80, objectFit: 'contain' }}
            className="header-logo"
          />
        </div>
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <button onClick={handleLogout}>Logout</button>
            </li>
        </ul>
    </div>
  )
}

export default DeliveryHeader