import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  marca: PropTypes.string,
  modello: PropTypes.string,
});

export const formValues = PropTypes.shape({
  marca: PropTypes.string,
  modello: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  marca: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  modello: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  marca: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  modello: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
