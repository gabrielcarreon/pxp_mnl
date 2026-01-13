import { useLoadingState } from '@/hooks/use-loading-state';
import { useState } from 'react';
import { SheetContext } from './sheet-context';

export const SheetProvider = ({ children }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const loadingState = useLoadingState();

  return (
    <SheetContext.Provider value={{ sheetOpen, setSheetOpen, loadingState }}>
      {children}
    </SheetContext.Provider>
  );
};
