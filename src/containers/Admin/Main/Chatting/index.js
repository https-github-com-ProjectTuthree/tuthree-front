import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Content from './Content';
import MobileContent from './MobileContent';
import Common from '../../../../stores/Common/Common';

@inject('Common')
@observer
class index extends Component {
  render() {
    return <>{Common.width > 767.98 ? <Content /> : <MobileContent />}</>;
  }
}

export default index;
