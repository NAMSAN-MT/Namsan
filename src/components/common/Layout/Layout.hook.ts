const useLayout = () => {
  const handleTopEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // FIXME: 애니메이션 추가
    window.scrollTo(0, 0);
  };

  return {
    handleTopEvent,
  };
};

export default useLayout;
