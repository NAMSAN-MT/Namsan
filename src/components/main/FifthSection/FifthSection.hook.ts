import { getDownload } from '@Api/main.api';
import useNavigate from '@Hooks/useNavigate';

const useFifthSection = () => {
  const { handleNavigate } = useNavigate();

  const _download = async () => {
    const link = document.createElement('a');
    link.href = await getDownload('main/Namsans.pdf');
    link.style.display = 'none';

    document.body.appendChild(link);
    link.target = '_blank';
    link.click();
    link.remove();
  };

  const handleNavigateTo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data = event.currentTarget.dataset.id;
    if (data === 'download') {
      _download();
    } else if (data === 'direct') {
      handleNavigate('contact');
    }
  };

  return {
    handleNavigateTo,
  };
};

export default useFifthSection;
