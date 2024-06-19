import React, { useEffect, useState } from 'react';
import axios from 'axios'; //HTTP Istek Kütüphanesi

const useCoinData = (currentPage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=${currentPage}&price_change_percentage=1h%2C24h%2C7d`,
          headers: {
            accept: 'application/json',
            'x-cg-api-key': process.env.API_KEY,
          },
        };

        const response = await axios.request(options);
        setStatus(response.status);
        if (response.status === 429) {
          setData([]);
        } else {
          setData(response.data);
        }

      } catch (err) {
        setStatus(err.response ? err.response.status : 500);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return { error, loading, data, status };
};

export default useCoinData;
