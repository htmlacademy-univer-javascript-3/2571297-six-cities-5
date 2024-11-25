export enum SortOption {
  Popular,
  PriceLowToHigh,
  PriceHighToLow,
  TopRatedFirst,
}

export const SORT_OPTIONS = [
  SortOption.Popular,
  SortOption.PriceLowToHigh,
  SortOption.PriceHighToLow,
  SortOption.TopRatedFirst,
];

export const DEFAULT_SORT_OPTION = SortOption.Popular;
