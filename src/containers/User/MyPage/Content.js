import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import UserInfoContainer from './UserInfo';
import TutoringInfoContainer from './TutoringInfo';
import AltPasswordContainer from './AltPassword';
import WithDrawalContainer from './Withdrawal';
import EnrollmentContainer from './Enrollment';
import BookmarkContainer from './Bookmark';

@inject('MyPage', 'Common', 'Auth')
@observer
class Content extends Component {
  render() {
    const { MyPage, Common, Auth } = this.props;
    return (
      <Container>
        <TabBox>
          <Item onClick={() => (MyPage.state = 1)} active={MyPage.state === 1}>
            <div>회원 정보 관리</div>
          </Item>
          <Item onClick={() => (MyPage.state = 2)} active={MyPage.state === 2}>
            <div>과외 정보 관리</div>
          </Item>
          <Item onClick={() => (MyPage.state = 3)} active={MyPage.state === 3}>
            <div>비밀 번호 변경</div>
          </Item>
          {/* <Item onClick={() => (MyPage.state = 4)} active={MyPage.state === 4}>
            <div>알림 설정</div>
          </Item> */}
          <Item onClick={() => (MyPage.state = 6)} active={MyPage.state === 6}>
            <div>북마크 목록</div>
          </Item>

          {Auth.loggedUserType === 'student' && (
            <Item
              onClick={() => (MyPage.state = 5)}
              active={MyPage.state === 5}
            >
              <div>부모 등록 관리</div>
            </Item>
          )}
          <Item onClick={() => (MyPage.state = 4)} active={MyPage.state === 4}>
            <div>회원 탈퇴</div>
          </Item>
        </TabBox>
        <MainBox>
          {MyPage.state === 1 && <UserInfoContainer />}
          {MyPage.state === 2 && <TutoringInfoContainer />}
          {MyPage.state === 3 && <AltPasswordContainer />}
          {MyPage.state === 4 && <WithDrawalContainer />}
          {MyPage.state === 5 && <EnrollmentContainer />}
          {MyPage.state === 6 && <BookmarkContainer />}
        </MainBox>
      </Container>
    );
  }
}

export default Content;

const Container = styled.div`
  display: flex;
  width: 100%;

  // height: 1000px;
  margin: 100px 0;
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
  }
`;
const TabBox = styled.div`
  width: 15%;
  // border: 2px solid blue;

  flex-direction: column;
  display: flex;
  // justify-content: center;
  align-items: center;
  padding: 30px 15px;
  box-sizing: border-box;
  border-top: 1px solid #888;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 10px 5px;
    flex-direction: row;
    width: 100%;
    border-top: none;
    flex-wrap: wrap;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 20px 10px;
    width: 20%;
    padding: 24px 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 26px 13px;
    width: 20%;
    padding: 28px 14px;
  }
`;

const Item = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  width: 150px;
  height: 50px;
  border: ${(props) => (props.active ? 'none' : '1px solid #707070')};
  display: flex;
  justify-content: center;
  align-items: center;
  // border-collapse: collapse;
  margin-top: -1px;
  background-color: ${(props) =>
    props.active ? 'rgba(235,114,82,1)' : '#fff'};
  > div {
    color: ${(props) => (props.active ? '#fff' : '#000')};
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100px;
    height: 30px;
    margin-right: -1px;
    > div {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 120px;
    height: 40px;
    > div {
      font-size: 14px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 130px;
    height: 40px;
    > div {
      font-size: 15px;
    }
  }
`;
const MainBox = styled.div`
  width: 100%;
`;
