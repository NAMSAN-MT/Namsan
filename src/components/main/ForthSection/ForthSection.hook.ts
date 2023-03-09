import useNavigate from '../../../hooks/useNavigate';

const useForthSection = () => {
  const { handleNavigate } = useNavigate();

  return {
    handleNavigate,
  };
};

export default useForthSection;
