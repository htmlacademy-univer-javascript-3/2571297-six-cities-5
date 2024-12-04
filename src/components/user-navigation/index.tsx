import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks';
import { selectAuthData, selectFavoriteOffersData } from '../../store/selectors';

export const UserNavigation = () => {
  const favoriteOffers = useAppSelector(selectFavoriteOffersData).offers;
  const { user } = useAppSelector(selectAuthData);

  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
          {user && (
            <img
              className="header__avatar user__avatar"
              src={user.avatarUrl}
              width="54"
              height="54"
              alt="User avatar"
            />
          )}
        </div>
        <span className="header__user-name user__name">{user?.email}</span>
        <span className="header__favorite-count">{favoriteOffers.length}</span>
      </Link>
    </li>
  );
};
