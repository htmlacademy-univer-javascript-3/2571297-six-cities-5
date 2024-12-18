import { renderHook } from '@testing-library/react';
import { useActions } from './';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/action';
import { vi } from 'vitest';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../store/action', () => ({
  checkAuth: vi.fn(),
  fetchOffers: vi.fn(),
}));

describe('useActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return bound action creators', () => {
    const mockDispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useActions());

    expect(Object.keys(result.current)).toEqual(Object.keys(actions));
  });

  it('should memoize actions', () => {
    const mockDispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);

    const { result, rerender } = renderHook(() => useActions());
    const firstResult = result.current;

    rerender();
    const secondResult = result.current;

    expect(firstResult).toBe(secondResult);
  });
});
