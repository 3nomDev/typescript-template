import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useMedia } from 'react-use';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Checks if the user prefers reduced motion through OS settings
 */
export const usePrefersReducedMotion = (): unknown =>
  useMedia('(prefers-reduced-motion: reduce)');
