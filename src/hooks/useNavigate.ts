import { TUrl } from '@Components/common/GNB/GNB.interface';
import { useRouter } from 'next/router';
import { useLocale } from 'next-intl';

const useNavigate = () => {
  const router = useRouter();
  const locale = useLocale();

  const handleNavigate = async (url: TUrl) => {
    await router.push(`/${locale}/${url}`);
  };

  return {
    handleNavigate,
  };
};

export default useNavigate;
