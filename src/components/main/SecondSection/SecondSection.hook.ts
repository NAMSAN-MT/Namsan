import useNavigate from '../../../hooks/useNavigate';

const useSecondSection = () => {
  const { handleNavigate } = useNavigate();

  return {
    handleNavigate,
  };
};

export default useSecondSection;
