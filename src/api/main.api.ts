import { getFileFromStorage } from './index.api';

export const getVideo = async (storagePath: string) => {
  return await getFileFromStorage(storagePath);
};
