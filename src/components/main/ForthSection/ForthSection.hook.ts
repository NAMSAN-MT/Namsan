import { getMainNewsList } from '@Api/news.api';
import { NewsMin } from '@Interface/api.interface';
import { useEffect, useState } from 'react';
import useNavigate from '@Hooks/useNavigate';

const useForthSection = () => {
  const [newsList, setNewsList] = useState<NewsMin[]>();

  const { handleNavigate } = useNavigate();

  const onCallMainNewsList = (limit = 3) => {
    getMainNewsList(limit).then(setNewsList).catch(console.error);
  };

  useEffect(() => {
    onCallMainNewsList(3);
  }, []);

  const handleNavigateTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleNavigate('news');
  };

  return {
    handleNavigateTo,
    newsList,
    onCallMainNewsList,
  };
};

export default useForthSection;
