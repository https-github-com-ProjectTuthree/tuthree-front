import React, { Component } from 'react';
import HomeContainer from '../../containers/Admin/Home';
// import Footer from '../../components/Footer';
import { inject, observer } from 'mobx-react';

@inject('Common', 'AdminAuth')
@observer
class Home extends Component {
  componentDidMount = () => {
    const { AdminAuth } = this.props;

    console.info('aaa');
    console.info(AdminAuth.loggedAdminId);
    console.info(localStorage.getItem('adminId'));
    if (localStorage.getItem('adminId')) {
      window.location.href = '/admin/main';
    }
  };
  render() {
    return (
      <>
        {/* <NavContainer /> */}
        <HomeContainer />
        {/* <Footer /> */}
      </>
    );
  }
}

// Signup.propTypes = {};

export default Home;
