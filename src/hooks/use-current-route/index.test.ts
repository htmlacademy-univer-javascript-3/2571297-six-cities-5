import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrentRoute } from './';
import { AppRoute } from '../../constants';

describe('useCurrentRoute', () => {
  const originalWindow = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: { pathname: AppRoute.Home },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalWindow,
    });
  });

  it('should return current route from pathname', () => {
    const { result } = renderHook(() => useCurrentRoute());
    expect(result.current).toBe(AppRoute.Home);
  });

  it('should return correct route for different pathnames', () => {
    const testRoutes = [
      { pathname: AppRoute.Login, expected: AppRoute.Login },
      { pathname: AppRoute.Favorites, expected: AppRoute.Favorites },
      { pathname: `${AppRoute.Offer}1`, expected: AppRoute.OfferRouter.replace(':id', '1') },
      { pathname: `${AppRoute.Offer}123`, expected: AppRoute.OfferRouter.replace(':id', '123') },
    ];

    testRoutes.forEach(({ pathname, expected }) => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        enumerable: true,
        value: { pathname },
      });

      const { result } = renderHook(() => useCurrentRoute());
      expect(result.current).toBe(expected);
    });
  });

  it('should memoize result for same pathname', () => {
    const { result, rerender } = renderHook(() => useCurrentRoute());
    const firstResult = result.current;

    rerender();
    expect(result.current).toBe(firstResult);
  });

  it('should handle unknown routes', () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: { pathname: '/unknown-route' },
    });

    const { result } = renderHook(() => useCurrentRoute());
    expect(result.current).toBe(AppRoute.NotFound);
  });
});
