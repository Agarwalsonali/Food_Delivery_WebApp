import Link from "next/link"
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CustomerHeader = (props) => {

    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [user, setUser] = useState(undefined);
    const router = useRouter();

    useEffect(() => {
        // Read browser storage after the initial render so server and client HTML match.
        try {
            const userStorage = JSON.parse(localStorage.getItem("user"));
            setUser(userStorage || undefined);
        } catch {
            setUser(undefined);
        }
    }, []);

    useEffect(() => {
        // Load cart from localStorage on client side only
        if (typeof window !== 'undefined') {
            try {
                const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
                setCartNumber(cartStorage.length > 0 ? cartStorage.length : 0);
                setCartItem(cartStorage.length > 0 ? cartStorage : []);
            } catch {
                setCartNumber(0);
                setCartItem([]);
            }
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

    useEffect(() => {
        if(typeof window !== 'undefined' && props.removeCartData){
            setCartItem((prevCartItem) => {
                const updatedCart = props.removeCartData === true
                    ? []
                    : prevCartItem.filter((item) => item._id !== props.removeCartData);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                setCartNumber(updatedCart.length);
                return updatedCart;
            });
        }
    }, [props.removeCartData]);

    const logout=()=>{
        localStorage.removeItem("user");
        setUser(undefined);
        router.push("/user-auth");
    }

  return (
    <div className='header-wrapper'>
        <div className='logo'> 
            <img style={{width:100}} src='https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png'/>
        </div>
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            {
                user ? 
                <>
                    <li> 
                        <Link href="/myprofile">{user?.name}</Link> 
                    </li>
                    <li><button onClick={logout}>Logout</button></li>
                </>
                :
                <>
                    <li>
                        <Link href="/user-auth">Login</Link>
                    </li>
                    <li>
                        <Link href="/user-auth">SignUp</Link>
                    </li>
                </>
            }
            <li>
                <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber})</Link>
            </li>
            <li>
                <Link href="/">Add Restaurant</Link>
            </li>
        </ul>
    </div>
  )
}

export default CustomerHeader