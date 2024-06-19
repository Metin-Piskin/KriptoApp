import React, { useEffect, useState } from 'react';
import axios from 'axios';//HTTP Istek Kütüphanesi

const useNewsData = (id) => {
    const [newsData, setNewsData] = useState([]);
    const [newsLoading, setNewsLoading] = useState(true);
    const [newsError, setNewsError] = useState(null);
    const [newsStatus, setNewsStatus] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: `https://newsapi.org/v2/everything?q=${id}&pageSize=50`,
                    headers: {
                        accept: 'application/json',
                        'X-Api-Key': process.env.API_KEY_NEWS,
                    },

                };

                const response = await axios.request(options);
                setNewsStatus(response.status);
                if (response.status === 429) {
                    setNewsData([]);
                } else {
                    setNewsData(response.data.articles);
                }
            } catch (err) {
                setNewsStatus(err.response ? err.response.status : 500);
                setNewsError(err.message);
            } finally {
                setNewsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { newsError, newsLoading, newsData, newsStatus };
};

export default useNewsData;