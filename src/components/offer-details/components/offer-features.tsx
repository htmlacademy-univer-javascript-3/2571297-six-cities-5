type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
};

export const OfferFeatures = ({ type, bedrooms, maxAdults, price }: OfferFeaturesProps) => (
  <>
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{type}</li>
      <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
      <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
    </ul>
    <div className="offer__price">
      <b className="offer__price-value">&euro;{price}</b>
      <span className="offer__price-text">&nbsp;night</span>
    </div>
  </>
);
