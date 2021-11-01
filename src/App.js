// import logo from './logo.svg';

// function App() {
//   return <div>Test4[D]</div>;
// }

// export default App;

import React from 'react';
import {
  Home,
  Signup,
  Login,
  Forgotten,
  Notice,
  Community,
  Tutor,
  Tutee,
  Test,
  Test2,
  Chatting,
  MyPage,
  MyClass,
  AdminHome,
  AdminMain,
  AdminCommunity,
  AdminChatting,
} from './pages';
import { BrowserRouter, Route } from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import stores from './stores';
import './stores/index';
import './App.css';
import Common from './stores/Common/Common';
// import Auth from './stores/Account/Auth';
import NavContainer from './components/Nav';
import MovileNavContainer from './components/MobileNav';
import Auth from './stores/Account/Auth';
import AdminAuth from './stores/Admin/Auth';
import IE from './components/IE';
import CheckBrowserModal from './components/CheckBrowswerModal';

// @inject('Common')

// RequestPermission 첫 어플 시작 시 알림 허용 or 불허를 사용자에게 안내합니다.
// 허용하지 않을 시 알람 메시지는 가지 않습니다.
//허가를 요청합니다!

@observer
class App extends React.Component {
  state = {
    width: null,
    ie_user: false,
  };
  componentDidMount = async () => {
    console.info('diddiddid');
    window.addEventListener('resize', this.updateDimensions);
    console.info(localStorage.getItem('token'));
    console.info(localStorage.getItem('userId'));
    console.info(localStorage.getItem('userType'));
    console.info(localStorage.getItem('adminToken'));
    // this.setState({ ...this.state, width: window.innerWidth - 10 });
    console.info(Auth);
    Common.width = window.innerWidth - 10;
    if (localStorage.getItem('token')) {
      Auth.token = localStorage.getItem('token');
      Auth.loggedUserId = localStorage.getItem('userId');
      Auth.loggedUserType = localStorage.getItem('userType');
      Auth.loggedUserName = localStorage.getItem('userName');
    }

    if (localStorage.getItem('adminToken')) {
      console.info('a');
      AdminAuth.token = localStorage.getItem('adminToken');
      AdminAuth.loggedAdminId = localStorage.getItem('adminId');
      AdminAuth.loggedAdminType = localStorage.getItem('adminType');
      AdminAuth.loggedAdminName = localStorage.getItem('adminName');
    }

    console.info(AdminAuth.token);
    const userAgent = window.navigator.userAgent;
    console.info(userAgent);
    console.info(userAgent.indexOf('MSIE ') !== -1);
    console.info(userAgent.indexOf('.NET') !== -1);
    console.info(userAgent.indexOf('Edge') !== -1);

    if (
      userAgent.indexOf('MSIE ') !== -1 ||
      userAgent.indexOf('.NET') !== -1 ||
      userAgent.indexOf('Edge') !== -1
    ) {
      console.log('ie');
      this.setState({
        ...this.state,
        ie_user: true,
      });
    }

    // const script = document.createElement('script');
    // script.src = 'https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js';
    // script.async = true;
    // await document.head.appendChild(script);

    // script.src =
    //   'https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js';

    // await document.head.appendChild(script);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  updateDimensions = () => {
    // this.setState({ ...this.state, width: window.innerWidth - 10 });
    Common.width = window.innerWidth - 10;
  };

  render() {
    return (
      <div>
        {this.state.ie_user && (
          <CheckBrowserModal
            open={this.state.ie_user}
            handleClose={this.closeModal}
          />
        )}

        <Provider {...stores} Common={Common}>
          <BrowserRouter>
            {/* {Common.width &&
              (Common.width >= 767.98 ? (
                <NavContainer />
              ) : (
                <MovileNavContainer />
              ))} */}

            <Route exact path="/" component={Home} />

            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgotten" component={Forgotten} />
            <Route path="/notice" component={Notice} />
            <Route path="/community" component={Community} />
            <Route path="/tutor" component={Tutor} />
            <Route path="/tutee" component={Tutee} />
            <Route path="/test" component={Test} />
            <Route path="/test2" component={Test2} />
            <Route path="/chatting" component={Chatting} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/myclass" component={MyClass} />

            <Route exact path="/admin" component={AdminHome} />
            <Route path="/admin/main" component={AdminMain} />
            <Route path="/admin/community" component={AdminCommunity} />
            <Route path="/admin/chatting" component={AdminChatting} />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
