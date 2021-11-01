import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer, Provider } from 'mobx-react';
import authStore from '../stores/Account/Auth';
import AdminCommunity from '../stores/Admin/Community';
import Community from '../stores/Community/Community';

@inject(
  'AdminCommunity',
  'Community',
  'Chatting',
  'MyClass',
  'MyPage',
  'Test2',
  'AdminChatting'
)
@observer
class TextareaContainer extends Component {
  state = {
    minRows: 7,
    maxRows: 100,
    value: '',
    row: 1,
  };
  requestHandler = (event) => {
    const { type, mxh, Chatting, MyClass, idx, MyPage, Test2, AdminChatting } =
      this.props;
    // console.info(mxh);
    // const textareaLineHeight = 17;
    // const { minRows, maxRows } = this.state;
    // const previousRows = event.target.rows;
    // event.target.rows = minRows; // reset number of rows in textarea

    // const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    // console.info(previousRows);
    // console.info(currentRows);
    // if (currentRows === previousRows) {
    //   event.target.rows = currentRows;
    // }

    // if (currentRows >= maxRows) {
    //   event.target.rows = maxRows;
    //   event.target.scrollTop = event.target.scrollHeight;
    // }

    this.setState({
      value: event.target.value,
      // row: currentRows < maxRows ? currentRows : maxRows,
    });

    switch (type) {
      case 'teacherSignup':
        authStore.introductionValue = event.target.value;
        break;
      case 'studentSignup':
        authStore.introductionValue = event.target.value;
        break;
      // case 'noticeTitle':
      //   AdminCommunity.noticeTitle = event.target.value;
      //   break;
      case 'noticeContent':
        AdminCommunity.noticeContent = event.target.value;
        break;
      case 'faqContent':
        AdminCommunity.faqContent = event.target.value;
        break;
      case 'communityContent':
        Community.communityContent = event.target.value;
        break;
      case 'tutoring':
        Chatting.detailContent = event.target.value;
        console.info(Chatting.detailContent);
        break;
      case 'classReport':
        MyClass.reportContent = event.target.value;
        console.info(MyClass.reportContent);
        break;
      case 'reviewWriting':
        MyClass.reviewContent = event.target.value;
        console.info(MyClass.reviewContent);
        break;

      case 'setAnswer':
        MyClass.answerAry[idx].ans = event.target.value;
        console.info(MyClass.answerAry[idx].ans);
        break;

      case 'tutor_info':
        MyPage.detailContent = event.target.value;
        console.info(MyPage.detailContent);
        break;

      case 'chat_msg':
        Chatting.chatMsg = event.target.value;
        Test2.chatMsg = event.target.value;
        console.info(Chatting.chatMsg);
        break;

      case 'admin_chat_msg':
        AdminChatting.chatMsg = event.target.value;

        console.info(AdminChatting.chatMsg);
        break;
      // case 'tutor_info':
      //   MyPage.detailContent = event.target.value;
      //   console.info(MyPage.detailContent);
      //   break;

      default:
        break;
    }
    // authStore.introductionValue = event.target.value;
    console.info(authStore.introductionValue);
    console.info(AdminCommunity.noticeContent);
  };

  render() {
    const { type, placeholder, value, mxh, mih, bd } = this.props;
    console.info(type);
    console.info(mxh);
    return (
      <Provider Auth={authStore}>
        <Textarea
          bd={bd}
          type={type}
          placeholder={`${placeholder}`}
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => {
            e.target.placeholder = `${placeholder}`;
            if (this.state.value === '') {
              this.setState({ rows: 7 });
            }
          }}
          rows={this.state.rows}
          value={value ? value : this.state.value}
          className={'textarea'}
          placeholderStyle={{ fontWeight: '400' }}
          onChange={this.requestHandler}
          mxh={mxh}
          mih={mih}
        />
      </Provider>
    );
  }
}

export default TextareaContainer;

const Textarea = styled.textarea`
  resize: none;
  border: ${(props) =>
    props.type === 'teacherSignup' ||
    props.type === 'studentSignup' ||
    props.type === 'tutoring' ||
    props.bd
      ? '1px solid #c7c7c7'
      : 'none'};
  width: 100%;
  // max-width: 630px;
  padding: 14px 10px;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 17px;
  letter-spzcing: -0.45px;
  color: #282c36;
  border-radius: 5px;
  overflow: auto;
  height: auto;
  min-height: ${(props) => (props.mih ? props.mih : '300')}px;
  font-family: inherit;
  outline: none;
  // max-height: 100px;
  max-height: ${(props) => (props.mxh ? props.mxh : '100')}px
  
  :focus {
    outline: none;
  }
  ::placeholder {
    font-weight: 300;
    font-size: 13px;
    line-height: 22px;
  }
  white-space: pre-line;

  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: ${(props) =>
      props.type === 'teacherSignup' || props.type === 'studentSignup'
        ? '630px'
        : 'nopne'};
    font-size: 11px;
    ::placeholder {
      font-size: 11px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    max-width: ${(props) =>
      props.type === 'teacherSignup' || props.type === 'studentSignup'
        ? '450px'
        : 'none'};
    font-size: 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    max-width: ${(props) =>
      props.type === 'teacherSignup' || props.type === 'studentSignup'
        ? '500px'
        : 'none'};
    width: 100%;
    // max-width: 0;
  }

  @media (min-width: 1300px) {
    max-width: ${(props) =>
      props.type === 'teacherSignup' || props.type === 'studentSignup'
        ? '630px'
        : 'none'};
    width: 100%;
  }
`;
