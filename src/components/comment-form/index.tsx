import { Fragment, useState } from 'react';
import { CommentFormState } from './interfaces';
import { getRatingTitle } from './utils';

const MIN_COMMENT_LENGTH = 50;
const STARS = [5, 4, 3, 2, 1];

export const CommentForm = () => {
  const initialFormState = {
    rating: '',
    review: '',
  };

  const [formData, setFormData] = useState<CommentFormState>(initialFormState);

  const isSubmitDisabled = !formData.rating.length || formData.review.length < MIN_COMMENT_LENGTH;

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Send form data to server
    // eslint-disable-next-line no-console
    console.log(formData);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {STARS.map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating.toString()}
              id={`${rating}-stars`}
              type="radio"
              onChange={handleFieldChange}
            />
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={getRatingTitle(rating)}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={formData.review}
        onChange={handleFieldChange}
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
};
