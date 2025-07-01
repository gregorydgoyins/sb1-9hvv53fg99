import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
  title: string;
  link: string;
}

const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsdata.io/api/1/news', {
          params: {
            apikey: 'YOUR_NEWSDATA_IO_KEY',
            country: 'us',
            category: 'business',
            language: 'en',
          },
        });

        const items = response.data.results || [];
        setNews(items.slice(0, 50).map((item: any) => ({
          title: item.title,
          link: item.link,
        })));
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [news]);

  return (
    <div className="bg-slate-900 text-white py-2 px-4 text-sm overflow-hidden w-full">
      <div className="whitespace-nowrap animate-marquee">
        {news.length > 0 ? (
          <a href={news[index]?.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {news[index]?.title}
          </a>
        ) : (
          'Loading news...'
        )}
      </div>
    </div>
  );
};

export default NewsTicker;
