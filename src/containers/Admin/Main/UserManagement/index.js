import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import Content from './Content';
import DetailContent from './DetailContent';
import AdminUser from '../../../../stores/Admin/User';

@inject('AdminUser', 'AdminAuth')
@observer
class index extends Component {
  componentDidMount = () => {
    // const { AdminAuth } = this.props;
    // AdminAuth.token = localStorage.getItem('adminToken');
    // console.info('ddd');
    // console.info(AdminAuth.token);
  };
  render() {
    return <>{AdminUser.state === 0 ? <Content /> : <DetailContent />}</>;
  }
}

export default index;
