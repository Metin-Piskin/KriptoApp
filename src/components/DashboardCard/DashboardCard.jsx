import React from "react";
import Link from "next/link";
import styles from "./DashboardCard.module.css";
import { IoStar } from "react-icons/io5";//Icon Kütüphanesi
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";//Grafik Kütüphanesi

const DashboardCard = ({ name, id, onClick, price1h, price24h, price7d }) => {
  const handleButtonClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  };
  return (
    <Link href={`/detail/${id}`} className={styles.DashboardCardContiner}>
      <button
        className={styles.DashboardCardStarButton}
        onClick={handleButtonClick}
      >
        <IoStar size={30} color="#0070f3" />
      </button>
      <h3>{name}</h3>
      <LineChart
        width={200}
        height={100}
        data={[
          {
            name: "1h",
            uv: price1h,
          },
          {
            name: "24h ",
            uv: price24h,
          },
          {
            name: "7d",
            uv: price7d,
          },
        ]}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </Link>
  );
};

export default DashboardCard;
