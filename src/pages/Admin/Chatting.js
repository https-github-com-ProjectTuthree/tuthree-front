import React, { Component } from 'react';
import ChattingContainer from '../../containers/Admin/Main/Chatting';

import { inject, observer } from 'mobx-react';
import AdminNav from '../../components/AdminNav';
import MobAdminNav from '../../components/AdminMobNav';
import Common from '../../stores/Common/Common';

@inject('Common')
@observer
class Chatting extends Component {
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
