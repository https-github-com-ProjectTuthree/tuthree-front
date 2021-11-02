import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import InnerContainer from '../../../components/InnerContainer';
import OuterContainer from '../../../components/OuterContainer';
import Container from './Content';
import Auth from '../../../stores/Account/Auth';

@inject('Auth')
@observer
class index extends Component {
  render() {
    return (
      <>
        <OuterContainer>
          <InnerContainer>{!Auth.token && <Container />}</InnerContainer>
        </OuterContainer>
      </>
    );
  }
}

export default index;
