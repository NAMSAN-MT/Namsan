import { getMainNewsList } from '@Api/news.api';
import { News } from '@Interface/api.interface';
import { useEffect, useState } from 'react';
import useNavigate from '@Hooks/useNavigate';

const useForthSection = () => {
  const [newsList, setNewsList] = useState<News[]>();

  const { handleNavigate } = useNavigate();

  useEffect(() => {
    const init = async () => {
      const newsList = await getMainNewsList();
      setNewsList(newsList);
    };
    init();
  }, []);

  const handleNavigateTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleNavigate('news');
  };

  return {
    handleNavigateTo,
    newsList,
  };
};

export default useForthSection;
