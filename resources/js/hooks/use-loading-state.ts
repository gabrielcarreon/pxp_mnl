import { useState } from 'react';

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const start = () => {
    setIsLoading(true);
  };
  const end = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    start,
    end,
  };
};
