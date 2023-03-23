import useNavigate from '@Hooks/useNavigate';

const useFifthSection = () => {
  const { handleNavigate } = useNavigate();

   const handleNavigateTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleNavigate('work');
  };

  return {
    handleNavigateTo,
  };
};

export default useFifthSection;
