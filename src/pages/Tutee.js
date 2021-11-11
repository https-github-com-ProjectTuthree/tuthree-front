import React, { Component } from 'react';
import TuteeContainer from '../containers/User/Tutee';
import Footer from '../components/Footer';
import { inject, observer } from 'mobx-react';
import Common from '../stores/Common/Common';
import NavContainer from '../components/Nav';
import MovileNavContainer from '../components/MobileNav';

@inject('Common')
@observer
class Tutee extends Component {
  componentDidMount = () => {
    const { history } = this.props;
    console.info(this.props.history);
    // if(this.props.history.action === "pop")
    // if (history.action === 'POP') {
    //   history.goForward();
    // }
    window.onhashchange = function () {
      //blah blah blah
      console.info('b');
    };
  };
  render() {
    return (
      <>
        {Common.width &&
          (Common.width >= 767.98 ? <NavContainer /> : <MovileNavContainer />)}
        <TuteeContainer />
        <Footer />
      </>
    );
  }
}

export default Tutee;
