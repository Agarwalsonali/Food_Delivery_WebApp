import Link from "next/link"
import { useState } from "react";
import { useEffect } from "react";

const CustomerHeader = (props) => {

    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        // Load cart from localStorage on client side only
        if (typeof window !== 'undefined') {
            const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
            setCartNumber(cartStorage.length > 0 ? cartStorage.length : 0);
            setCartItem(cartStorage.length > 0 ? cartStorage : []);
        }
    }, []);

    useEffect(() => {
        if(typeof window !== 'undefined' && props.cartData?.resto_id){
            setCartItem((prevCartItem) => {
                let updatedCart = [];

                if (prevCartItem.length && prevCartItem[0].resto_id === props.cartData.resto_id) {
                    updatedCart = [...prevCartItem, props.cartData];
                } else {
                    updatedCart = [props.cartData];
                }

                localStorage.setItem("cart", JSON.stringify(updatedCart));
                setCartNumber(updatedCart.length);
                return updatedCart;
            });
        }
    }, [props.cartData]);

  return (
    <div className='header-wrapper'>
        <div className='logo'> 
            <img style={{width:100}} src='https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png'/>
        </div>
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/">Login</Link>
            </li>
            <li>
                <Link href="/">SignUp</Link>
            </li>
            <li>
                <Link href="/">Cart({cartNumber})</Link>
            </li>
            <li>
                <Link href="/">Add Restaurant</Link>
            </li>
        </ul>
    </div>
  )
}

export default CustomerHeader