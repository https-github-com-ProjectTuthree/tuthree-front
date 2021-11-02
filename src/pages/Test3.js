import React, { Component } from 'react';
import LoginContainer from '../containers/User/Test3';
import Footer from '../components/Footer';
import { inject, observer } from 'mobx-react';
import Common from '../stores/Common/Common';
import NavContainer from '../components/Nav';
import MovileNavContainer from '../components/MobileNav';

@inject('Common')
@observer
class Test3 extends Component {
  render() {
    return (
      <>
        {Common.width &&
          (Common.width >= 767.98 ? <NavContainer /> : <MovileNavContainer />)}
        <LoginContainer />
        <Footer />
      </>
    );
  }
}

export default Test3;
