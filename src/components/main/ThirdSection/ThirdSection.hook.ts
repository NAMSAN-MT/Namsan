import { navigate } from 'gatsby';

const useThirdSection = () => {
  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    void navigate('/work');
  };

  return {
    handleNavigate,
  };
};

export default useThirdSection;
