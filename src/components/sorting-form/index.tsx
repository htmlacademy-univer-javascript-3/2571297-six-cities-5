import { useState } from 'react';
import { SortOption, SORT_OPTIONS } from '../../constants';
import { useSelector } from 'react-redux';
import { getSortOptionText } from '../../utils/sort';
import { RootState } from '../../store/types';
import { useActions } from '../../store/hooks';

export const SortingForm = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { setSortOption } = useActions();
  const currentSort = useSelector((state: RootState) => state.common.sortOption);

  const handleFormVisibleToggle = () => {
    setIsOpened((prev) => !prev);
  };

  const handleSortOptionClick = (option: SortOption) => {
    setSortOption(option);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span className="places__sorting-type" tabIndex={0} onClick={handleFormVisibleToggle}>
        {getSortOptionText(currentSort)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpened && (
        <ul className="places__options places__options--custom places__options--opened">
          {SORT_OPTIONS.map((option) => (
            <li
              key={option}
              className={`places__option ${option === currentSort ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleSortOptionClick(option)}
            >
              {getSortOptionText(option)}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};
