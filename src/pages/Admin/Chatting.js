import React, { Component } from 'react';
import ChattingContainer from '../../containers/Admin/Main/Chatting';

import { inject, observer } from 'mobx-react';
import AdminNav from '../../components/AdminNav';
import MobAdminNav from '../../components/AdminMobNav';
import Common from '../../stores/Common/Common';

@inject('Common', 'AdminAuth')
@observer
class Chatting extends Component {
  componentDidMount = () => {
    const { AdminAuth } = this.props;

    console.info('aaa');
    console.info(AdminAuth.loggedAdminId);
    if (!localStorage.getItem('adminId')) {
      alert('관리자 계정으로 로그인하세요.');
      window.location.href = '/admin';
    }
  };
  render() {
    return (
      <>
        {Common.width &&
          (Common.width >= 767.98 ? <AdminNav /> : <MobAdminNav />)}
        <ChattingContainer />
      </>
    );
  }
}

export default Chatting;
