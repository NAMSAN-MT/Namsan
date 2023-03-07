import { navigate } from 'gatsby';

const useForthSection = () => {
  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    void navigate('/news');
  };

  return {
    handleNavigate,
  };
};

export default useForthSection;
