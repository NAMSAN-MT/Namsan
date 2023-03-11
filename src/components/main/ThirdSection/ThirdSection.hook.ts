import useNavigate from '@Hooks/useNavigate';

const useThirdSection = () => {
  const { handleNavigate } = useNavigate();

  return {
    handleNavigate,
  };
};

export default useThirdSection;
