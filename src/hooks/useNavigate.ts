import { TUrl } from '@Components/common/GNB/GNB.interface';
import { navigate } from 'gatsby';

const useNavigate = () => {
  const handleNavigate = async (url: TUrl) => {
    await navigate(url);
  };

  return {
    handleNavigate,
  };
};

export default useNavigate;
