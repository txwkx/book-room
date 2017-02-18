import React, { PropTypes } from 'react';

const FormInput = ({ type, name }) => (
  <div class="form-group">
    <label class="label-control">
      <span class="label-text">{name}</span>
    </label>
    <input type={type} name={name} class="form-control" />
  </div>
);

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FormInput;
