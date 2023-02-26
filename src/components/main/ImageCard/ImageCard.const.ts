import main1 from '@Images/main1.png';
import main2 from '@Images/main2.png';
import main3 from '@Images/main3.png';
import main4 from '@Images/main4.png';
import main5 from '@Images/main5.png';
import main6 from '@Images/main6.png';

const ImageCardList1 = [
  {
    title: '송무·중재',
    url: main1,
  },
  {
    title: '금융',
    url: main2,
  },
  {
    title: '기업법무',
    url: main3,
  },
] as const;

const ImageCardList2 = [
  {
    title: '송무·중재',
    url: main4,
  },
  {
    title: '건축·건설',
    url: main5,
  },
  {
    title: '분쟁해결',
    url: main6,
  },
] as const;

export { ImageCardList1, ImageCardList2 };
