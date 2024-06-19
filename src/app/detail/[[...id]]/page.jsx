"use client";

import React from "react";
import Image from "next/image";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"; //Grafik Kütüphanesi

import styles from "./page.module.css";

import useCoinIdData from "@/hooks/useIdGet";
import useNewsData from "@/hooks/useNewsGet";

import Header from "@/components/Header/Header";
import DetailNewsCard from "@/components/DetailNewsCard/DetailNewsCard";

const Page = ({ params }) => {
  const { data, error, loading, status } = useCoinIdData(params.id);
  const { newsData, newsError, newsLoading, newsStatus } = useNewsData(
    params.id
  );

  return (
    <div>
      {status === 200 && data ? (
        <div className={styles.DetailContainer}>
          <Header>
            <Image src={data.image?.large} alt="" width={100} height={100} />
            <h1>{data.name}</h1>
          </Header>
          <div dangerouslySetInnerHTML={{ __html: data.description?.en }} />
          {data.market_data ? (
            <div className={styles.ChartContainer}>
              <LineChart
                width={800}
                height={300}
                className={styles.Chart}
                data={[
                  {
                    name: "24h",
                    uv: data.market_data.price_change_percentage_24h,
                  },
                  {
                    name: "7d",
                    uv: data.market_data.price_change_percentage_7d,
                  },
                  {
                    name: "14d",
                    uv: data.market_data.price_change_percentage_14d,
                  },
                  {
                    name: "30d",
                    uv: data.market_data.price_change_percentage_30d,
                  },
                  {
                    name: "60d",
                    uv: data.market_data.price_change_percentage_60d,
                  },
                  {
                    name: "200d",
                    uv: data.market_data.price_change_percentage_200d,
                  },
                  {
                    name: "1y",
                    uv: data.market_data.price_change_percentage_1y,
                  },
                ]}
              >
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
              <div className={styles.InnerDataContainer}>
                <div>
                  Market Capitalization= ${data.market_data.market_cap?.usd}
                </div>
                <div>Low 24 Hours= ${data.market_data.low_24h?.usd}</div>
                <div>High 24 Hours= ${data.market_data.high_24h?.usd}</div>
              </div>
            </div>
          ) : null}
          <h1 className={styles.NewsTitle}>News</h1>
          <div className={styles.DetailNewsCardAllContainer}>
            {newsData &&
              newsData.map((e, index) => (
                <DetailNewsCard
                  key={index}
                  srcImage={e.urlToImage}
                  Title={e.title}
                  Description={e.description}
                />
              ))}
            {status === 429 && (
              <div>
                <h1>Limit Aşıldı</h1>
              </div>
            )}
            {status === 426 && (
              <div>
                <h1>
                  Status 426 hatası, newsapi.org adresinden alınan verilerin
                  ödeme sistemi ücretsiz olduğunda sadece localhost için CORS
                  etkinleştirilmiş olmasından kaynaklanmaktadır. Bu nedenle
                  haberler sadece yerel ortamda (localhost) erişilebilirken,
                  canlı (production) ortamda erişim sağlanamamaktadır.
                </h1>
              </div>
            )}
            {status === 500 && (
              <div>
                <h1>beklenmeyen bir sorunla karşılaşıldı</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Page;
