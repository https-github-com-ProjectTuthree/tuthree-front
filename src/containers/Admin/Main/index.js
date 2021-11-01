import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import MainContainer from './Content';

@inject('AdminAuth')
@observer
class index extends Component {
  componentDidMount = () => {
    console.info('Admin Main Didmount');
  };
  render() {
    console.info('BBBBBBBBBBBBB');
    return (
      <>
        <MainContainer />
      </>
    );
  }
}

export default index;
