"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import { useParams } from "next/navigation";

const Page=()=>{
    const params = useParams();
    const name = params.name;
    return(
        <div>
            <CustomerHeader/>
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
        </div>
    )
}

export default Page;