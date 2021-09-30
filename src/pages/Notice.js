import React, { Component } from 'react';
import NoticeContainer from '../containers/Notice';
import Footer from '../components/Footer';

class Notice extends Component {
  render() {
    return (
      <>
        {/* <NavContainer /> */}
        <NoticeContainer />
        <Footer />
      </>
    );
  }
}

// Signup.propTypes = {};

export default Notice;
