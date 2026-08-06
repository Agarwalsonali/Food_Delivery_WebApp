import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/Footer";

export default function Home() {
  return (
      <main>
        <CustomerHeader/>
        <h1>Food Delivery App</h1>
        <RestaurantFooter />
      </main>
  );
}
