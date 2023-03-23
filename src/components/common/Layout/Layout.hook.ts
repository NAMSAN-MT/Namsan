const useLayout = () => {
  const handleTopEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    handleTopEvent,
  };
};

export default useLayout;
