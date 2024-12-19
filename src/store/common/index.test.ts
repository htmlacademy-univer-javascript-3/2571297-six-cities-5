import { describe, it, expect } from 'vitest';
import { commonReducer, initialState } from './index';
import { setActiveCity, setServerError, setSortOption } from './actions';
import { Cities, DEFAULT_SORT_OPTION, SortOption } from '../../constants';

describe('Common Reducer', () => {
  describe('initial state', () => {
    it('should return initial state when passed empty action', () => {
      const result = commonReducer(undefined, { type: '' });
      expect(result).toEqual(initialState);
    });
  });

  describe('setActiveCity', () => {
    it('should update city and reset sort option when setActiveCity', () => {
      const newCity = Cities.Amsterdam;
      const stateWithCustomSort = {
        ...initialState,
        sortOption: SortOption.PriceHighToLow,
      };

      const result = commonReducer(stateWithCustomSort, setActiveCity(newCity));

      expect(result).toEqual({
        city: newCity,
        sortOption: DEFAULT_SORT_OPTION,
        isServerUnavailable: false,
      });
    });

    it('should not affect other state properties when setActiveCity', () => {
      const currentState = { ...initialState };
      const newCity = Cities.Amsterdam;

      const result = commonReducer(currentState, setActiveCity(newCity));

      expect(result.sortOption).toBe(DEFAULT_SORT_OPTION);
    });
  });

  describe('setSortOption', () => {
    it('should update sort option when setSortOption', () => {
      const newSortOption = SortOption.PriceHighToLow;

      const result = commonReducer(initialState, setSortOption(newSortOption));

      expect(result).toEqual({
        ...initialState,
        sortOption: newSortOption,
      });
    });

    it('should not affect city when setSortOption', () => {
      const currentState = { ...initialState };
      const newSortOption = SortOption.PriceHighToLow;

      const result = commonReducer(currentState, setSortOption(newSortOption));

      expect(result.city).toBe(initialState.city);
    });

    it('should handle multiple sort option changes', () => {
      let state = { ...initialState };

      expect(state.sortOption).toBe(DEFAULT_SORT_OPTION);

      state = commonReducer(state, setSortOption(SortOption.PriceHighToLow));
      expect(state.sortOption).toBe(SortOption.PriceHighToLow);

      state = commonReducer(state, setSortOption(SortOption.PriceLowToHigh));
      expect(state.sortOption).toBe(SortOption.PriceLowToHigh);

      state = commonReducer(state, setSortOption(SortOption.TopRatedFirst));
      expect(state.sortOption).toBe(SortOption.TopRatedFirst);

      state = commonReducer(state, setSortOption(SortOption.Popular));
      expect(state.sortOption).toBe(SortOption.Popular);
    });
  });

  describe('combined actions', () => {
    it('should handle city change followed by sort option change', () => {
      let state = { ...initialState };

      state = commonReducer(state, setActiveCity(Cities.Amsterdam));
      expect(state).toEqual({
        city: Cities.Amsterdam,
        sortOption: DEFAULT_SORT_OPTION,
        isServerUnavailable: false,
      });

      state = commonReducer(state, setSortOption(SortOption.PriceHighToLow));
      expect(state).toEqual({
        city: Cities.Amsterdam,
        sortOption: SortOption.PriceHighToLow,
        isServerUnavailable: false,
      });
    });

    it('should handle sort option change followed by city change', () => {
      let state = { ...initialState };

      state = commonReducer(state, setSortOption(SortOption.PriceHighToLow));
      expect(state.sortOption).toBe(SortOption.PriceHighToLow);

      state = commonReducer(state, setActiveCity(Cities.Amsterdam));
      expect(state).toEqual({
        city: Cities.Amsterdam,
        sortOption: DEFAULT_SORT_OPTION,
        isServerUnavailable: false,
      });
    });

    it('should handle setServerError to true', () => {
      const result = commonReducer(initialState, setServerError(true));
      expect(result).toEqual({
        ...initialState,
        isServerUnavailable: true,
      });
    });

    it('should handle setServerError to false', () => {
      const result = commonReducer(initialState, setServerError(false));
      expect(result).toEqual({
        ...initialState,
        isServerUnavailable: false,
      });
    });
  });
});
