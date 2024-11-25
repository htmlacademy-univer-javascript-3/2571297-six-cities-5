import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { AppRoute } from '../../constants';

export const UserNavigation = () => {
  const favoriteOffers = useSelector((state: RootState) => state.favoriteOffers.offers);
  const { user } = useSelector((state: RootState) => state.auth);

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
