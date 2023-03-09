import useNavigate from '../../../hooks/useNavigate';

const useThirdSection = () => {
  const { handleNavigate } = useNavigate();

  return {
    handleNavigate,
  };
};

export default useThirdSection;
