import { useState, memo, useCallback, useMemo } from 'react';
import { SortOption, SORT_OPTIONS } from '../../constants';
import { getSortOptionText } from '../../utils/sort';
import { useActions, useAppSelector } from '../../hooks';
import { selectCommonData } from '../../store/selectors';

const SortingForm = memo(() => {
  const [isOpened, setIsOpened] = useState(false);
  const { setSortOption } = useActions();
  const currentSort = useAppSelector(selectCommonData).sortOption;

  const handleFormVisibleToggle = useCallback(() => {
    setIsOpened((prev) => !prev);
  }, []);

  const handleSortOptionClick = useCallback((option: SortOption) => {
    setSortOption(option);
    setIsOpened(false);
  }, [setSortOption]);

  const currentSortText = useMemo(() => getSortOptionText(currentSort), [currentSort]);

  const sortOptionsList = useMemo(() => (
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
  ), [currentSort, handleSortOptionClick]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span className="places__sorting-type" tabIndex={0} onClick={handleFormVisibleToggle}>
        {currentSortText}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpened && sortOptionsList}
    </form>
  );
});

SortingForm.displayName = 'SortingForm';

export { SortingForm };
