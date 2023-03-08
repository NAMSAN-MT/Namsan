import useNavigate from '../../../hooks/useNavigate';

const useFifthSection = () => {
  const { handleNavigate } = useNavigate();

  return {
    handleNavigate,
  };
};

export default useFifthSection;
