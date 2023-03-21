interface IInfoProps {
  title: string;
  content: string;
}

interface IInfoWrapperProps {
  children: React.ReactNode;
}

interface IInfoColumnProps {
  children: React.ReactNode;
}

export { IInfoProps, IInfoWrapperProps, IInfoColumnProps };
