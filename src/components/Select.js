import React from 'react';
import Select from 'react-select';

const customStyles = {
  dropdownIndicator: () => ({
    backgroundColor: '#767676',
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#555555',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 16,
    lineHeight: 1.2,
    border: '1px solid #c7c7c7',
    display: 'flex',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

class SelectComp extends React.Component {
  handleChange = (selectedOption) => {
    this.props.onChange(selectedOption);
  };
  handleClick = (click) => {
    this.props.onClick(click);
  };
  handleBlur = (blur) => {
    this.props.onBlur(blur);
  };
  render() {
    const {
      options,
      placeholder,
      styles,
      getOptionLabel,
      defaultValue,
      value,
    } = this.props;
    return (
      <Select
        id={this.props.id}
        className={this.props.className}
        styles={styles ? styles : customStyles}
        value={value}
        onChange={this.handleChange}
        getOptionLabel={(option) =>
          getOptionLabel ? getOptionLabel(option) : option.label
        }
        options={options}
        isSearchable={false}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    );
  }
}

export default SelectComp;
