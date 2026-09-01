"use client"
import DeliveryHeader from "../DeliveryHeader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page=()=>{
    
    const router = useRouter();
    useEffect(() => {
        const deliveryStorage = JSON.parse(localStorage.getItem("delivery"));
        if (!deliveryStorage) {
            router.push("/deliverypartner");
        }
    }, []);


    return(
        <div>
            <DeliveryHeader />
            <h1>Delivery Partner Dashboard</h1>
        </div>
    )
}

export default Page;