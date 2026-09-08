'use client'

import Link from "next/link"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DeliveryHeader = (props) => {

  return (
    <div className='header-wrapper'>
        <div className='logo'> 
          <img
            src='/logo.svg'
            alt='Food Delivery'
            style={{ width: 100, height: 100, objectFit: 'contain' }}
          />
        </div>
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
        </ul>
    </div>
  )
}

export default DeliveryHeader