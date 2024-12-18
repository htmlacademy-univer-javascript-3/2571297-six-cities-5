import { renderHook } from '@testing-library/react';
import { useAppDispatch } from './';
import { useDispatch } from 'react-redux';
import { vi } from 'vitest';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

describe('useAppDispatch', () => {
  it('should return dispatch function', () => {
    const mockDispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(mockDispatch);

    const { result } = renderHook(() => useAppDispatch());

    expect(result.current).toBe(mockDispatch);
  });
});
