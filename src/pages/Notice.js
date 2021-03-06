import React, { Component } from 'react';
import NoticeContainer from '../containers/User/Notice';
import Footer from '../components/Footer';
import { inject, observer } from 'mobx-react';
import Common from '../stores/Common/Common';
import NavContainer from '../components/Nav';
import MovileNavContainer from '../components/MobileNav';

@inject('Common')
@observer
class Notice extends Component {
  componentDidMount = () => {
    console.info('mount');
  };
  componentWillUnmount = () => {
    console.info('um');
  };
  render() {
    return (
      <>
        {Common.width &&
          (Common.width >= 767.98 ? <NavContainer /> : <MovileNavContainer />)}
        <NoticeContainer />
        <Footer />
      </>
    );
  }
}

// Signup.propTypes = {};

export default Notice;
