import { HeadFC, PageProps } from 'gatsby';
import React, { useEffect } from 'react';
import { getMainNewsList, getNewsList } from '../api/news.api';

const fire: React.FC<PageProps> = () => {
  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    const newsList = await getNewsList({
      conditions: [
        {
          fieldPath: 'agency',
          opStr: '==',
          value: '파이낸셜뉴스',
        },
        {
          fieldPath: 'title',
          opStr: '==',
          value: '[로펌탐방] 법무법인 남산',
        },
      ],
    });
    console.log(newsList);
  };
  return <p>Hello </p>;
};

export default fire;
export const Head: HeadFC = () => <title>Home Page</title>;
