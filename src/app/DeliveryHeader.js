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
            src='/food-shopping-logo-template-design_460848-10299.avif'
            alt='Food Delivery'
            style={{ width: 100, height: 60, objectFit: 'contain', mixBlendMode: 'multiply' }}
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