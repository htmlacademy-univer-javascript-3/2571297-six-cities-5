import { useState } from 'react';
import { SortOption, SORT_OPTIONS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortOption } from '../../store/action';
import { getSortOptionText } from '../../utils/sort';

export const SortingForm = () => {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  const currentSort = useSelector((state: { sortOption: SortOption }) => state.sortOption);

  const handleFormVisibleToggle = () => {
    setIsOpened((prev) => !prev);
  };

  const handleSortOptionClick = (option: SortOption) => {
    dispatch(changeSortOption(option));
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
