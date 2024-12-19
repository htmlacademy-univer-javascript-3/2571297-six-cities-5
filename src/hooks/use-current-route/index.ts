import { useMemo } from 'react';
import { AppRoute } from '../../constants';

export const useCurrentRoute = () => {
  const currentPath = window.location.pathname as AppRoute;

  return useMemo(() => {
    if (currentPath.startsWith(AppRoute.Offer.slice(0, -2))) {
      return AppRoute.OfferRouter.replace(':id', currentPath.split('/').pop() || '');
    }

    const result = Object.values(AppRoute).find((route) => route === currentPath) as AppRoute | undefined;

    if (!result) {
      return AppRoute.NotFound;
    }

    return result;
  }, [currentPath]);
};
