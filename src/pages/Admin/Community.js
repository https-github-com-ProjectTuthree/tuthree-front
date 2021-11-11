import React, { Component } from 'react';
import CommunityContainer from '../../containers/Admin/Main/CommunityManagement';

import { inject, observer } from 'mobx-react';
import AdminNav from '../../components/AdminNav';
import MobAdminNav from '../../components/AdminMobNav';
import Common from '../../stores/Common/Common';

@inject('Common', 'AdminAuth')
@observer
class Community extends Component {
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
        <CommunityContainer />
      </>
    );
  }
}

export default Community;
