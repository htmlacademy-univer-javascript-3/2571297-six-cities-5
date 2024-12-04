import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../constants';
import { OffersList } from '../offers-list';

interface FavoriteLocationProps {
  cityName: string;
  offers: Offer[];
}

export const FavoriteLocation = ({ cityName, offers }: FavoriteLocationProps) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoute.Home}>
          <span>{cityName}</span>
        </Link>
      </div>
    </div>
    <div className="favorites__places">
      <OffersList offers={offers} cardType="favorites" />
    </div>
  </li>
);
