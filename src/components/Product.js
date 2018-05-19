// Code Product Component Here
import React from 'react';
import PropTypes from 'prop-types';

class Product extends React.Component {
  render() {
    return(
      <div>
        <p>Name: {this.props.name}</p>
        <p>Producer: {this.props.producer}</p>
        <p>Watermark: {this.props.hasWatermark}</p>
        <p>Color: {this.props.color}</p>
        <p>Weight: {this.props.weight}</p>
      </div>
    )
  }
}

function createCustomPropType(isRequired) {
  return function(props, propName, componentName) {
    const prop = props[propName];

    if (prop) {
      if (typeof prop === 'number') {
        return (prop <= 300 && prop >= 80) ? null : new Error(`${propName} in ${componentName} is not between 80 and 300`);
      } else {
        return new Error(`${propName} in ${componentName} is not a number`);
      }
    } else {
      // prop is null
      if (isRequired) {
        return new Error(`${propName} in ${componentName} is required`);
      }
    }
  }
}

const weightCheck = createCustomPropType(false);
weightCheck.isRequired = createCustomPropType(true);

Product.defaultProps = {
  hasWatermark: false,
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  producer: PropTypes.string,
  hasWatermark: PropTypes.bool,
  color: PropTypes.oneOf(['white', 'eggshell-white', 'salmon']).isRequired,
  weight: weightCheck.isRequired
};

export default Product;
