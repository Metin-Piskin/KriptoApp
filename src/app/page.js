"use client";

import React, { useState, useEffect } from 'react';
import { FaSearch, FaBitcoin } from "react-icons/fa"; //Icon Kütüphanesi

import styles from './page.module.css';

import useCoinData from '@/hooks/useGet';
import useNewsData from '@/hooks/useNewsGet';

import Header from '@/components/Header/Header';
import CoinListBar from '@/components/CoinList/CoinListBar/CoinListBar';
import CoinListCard from '@/components/CoinList/CoinListCard/CoinListCard';
import Pagination from '@/components/Pagination/Pagination';
import DashboardCard from '@/components/DashboardCard/DashboardCard';
import HomeNewsCard from '@/components/HomeNewsCard/HomeNewsCard';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: initialData, error, loading, status } = useCoinData(currentPage);
  const { newsData, newsError, newsLoading, newsStatus } = useNewsData('crypto');
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [favorites, setFavorites] = useState([]);
  const totalPages = 148;

  // Favorileri localStorage'dan yükler
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Initial data yüklendiğinde data state'ini güncelle
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  // Favoriler her güncellendiğinde localStorage'e kaydet
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Veriyi anahtar (key) ve yöne göre sıralama
  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  // Veriyi isim ile filtreleme
  const filterData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchName.toLowerCase())
  );

  // Sayfa değiştiğinde currentPage state'ini güncelle
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Favori ekleme işlevi
  const handleAddFavorite = (coin) => {
    const newFavorite = {
      id: coin.id,
      name: coin.name,
      price1h: coin.price_change_percentage_1h_in_currency,
      price24h: coin.price_change_percentage_24h_in_currency,
      price7d: coin.price_change_percentage_7d_in_currency,
    };

    if (!favorites.some(fav => fav.id === newFavorite.id)) {
      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
    }
  };

  // Favori kaldırma işlevi
  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <>
      <Header>
        <FaBitcoin size={65} />
      </Header>
      <div className={styles.HomeContainer}>
        <div className={styles.CoinListAllContainer}>
          <div className={styles.CoinListFilterInputContainer}>
            <FaSearch color='#0070f3' />
            <input
              type="text"
              placeholder="Search"
              className={styles.CoinListFilterInput}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <CoinListBar onSort={sortData} />
          {status === 200 && (
            filterData?.map((item) => (
              <CoinListCard
                id={item.id}
                key={item.id}
                image={item.image}
                name={item.name}
                current_price={item.current_price}
                price_change_24h={item.price_change_24h}
                total_volume={item.total_volume}
                isFavorite={isFavorite(item.id)}
                onClick={() => isFavorite(item.id) ? handleRemoveFavorite(item.id) : handleAddFavorite(item)}
              />
            )))}
          {
            status === 429 && (
              <div>
                <h1>Limit Aşıldı</h1>
              </div>
            )
          }
          {
            status === 500 && (
              <div>
                <h1>beklenmeyen bir sorunla karşılaşıldı</h1>
              </div>
            )
          }
          <div>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        <div className={styles.DashboardAllContainer}>
          <h2>Dashboard</h2>
          {favorites.map(fav => (
            <DashboardCard
              id={fav.id}
              key={fav.id}
              name={fav.name}
              onClick={() => handleRemoveFavorite(fav.id)}
              price1h={fav.price1h}
              price24h={fav.price24h}
              price7d={fav.price7d}
            />
          ))}
        </div>

        <div className={styles.HomeNewsBarContainer}>
          {newsStatus === 200 &&
            newsData?.map((e, index) => {
              return (
                <HomeNewsCard
                  key={index}
                  srcImage={e.urlToImage}
                  Title={e.title}
                />

              )
            })
          }
          {
            newsStatus === 429 && (
              <div>
                <h1>Limit Aşıldı</h1>
              </div>
            )
          }
          {
            newsStatus === 426 && (
              <div className={styles.Status426}>
                <h2 className={styles.Status426h2}>Status 426 hatası, newsapi.org adresinden alınan verilerin ödeme sistemi ücretsiz olduğunda sadece localhost için CORS etkinleştirilmiş olmasından kaynaklanmaktadır. Bu nedenle haberler sadece yerel ortamda (localhost) erişilebilirken, canlı (production) ortamda erişim sağlanamamaktadır.</h2>
              </div>
            )
          }
          {
            newsStatus === 500 && (
              <div>
                <h1>beklenmeyen bir sorunla karşılaşıldı</h1>
              </div>
            )
          }
        </div>
      </div >
    </>
  );
};

export default Home;
