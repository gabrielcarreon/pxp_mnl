import { ReactNode } from 'react';
import { create } from 'zustand';

export type ConfigProps = {
  variant: 'prompt' | 'warning' | 'danger';
  title?: string;
  message: string;
  confirmFn: () => unknown;
  children?: ReactNode;
};

export type ConfirmReturn = {
  is_open: boolean;
  loading: boolean;
  payload: unknown | null;
  config: ConfigProps;
  setOpen: (state: boolean) => void;
  open: () => void;
  close: () => void;
  reset: () => void;
  setConfig: (data: ConfigProps) => void;
  setPayload: (payload: unknown | null) => void;
  setLoading: (state: boolean) => void;
};

export const useConfirm = create<ConfirmReturn>((set) => ({
  is_open: false,
  loading: false,
  payload: null,
  config: {
    variant: 'prompt',
    message: '',
    title: 'Are you sure?',
    confirmFn: () => {},
    children: null,
  },
  setOpen: (state) => set({ is_open: state }),
  open: () => set({ is_open: true }),
  close: () => set({ is_open: false }),
  reset: () => set({ loading: false, is_open: false, payload: null }),
  setConfig: (data: ConfigProps) => set({ config: data }),
  setPayload: (payload) => set({ payload: payload }),
  setLoading: (state) => set({ loading: state }),
}));
