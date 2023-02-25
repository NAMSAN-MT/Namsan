import { navigate } from 'gatsby';

const useSecondSection = () => {
  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    void navigate('/introduce');
  };

  return {
    handleNavigate,
  };
};

export default useSecondSection;
