import PropTypes from 'prop-types';

const automobileType = PropTypes.shape({
  id: PropTypes.number,

  marca: PropTypes.string,
  modello: PropTypes.string,
});

export default automobileType;
