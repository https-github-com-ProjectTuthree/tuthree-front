import React, { Component } from 'react';
import styled from 'styled-components';
import InnerContainer from './InnerContainer';
import OuterContainer from './OuterContainer';
import { inject, observer } from 'mobx-react';

import { Link as Connection } from 'react-router-dom';

import personImg from '../static/images/person.png';
import chattingImg from '../static/images//Common/chatting.png';
import Community from '../stores/Community/Community';
import Auth from '../stores/Account/Auth';
import Tutor from '../stores/Matching/Tutor';

@inject('Community', 'Auth', 'Tutor')
@observer
class Nav extends Component {
  state = {
    token: null,
    is_profile: false,
  };
  componentDidMount = async () => {
    const token = await localStorage.getItem('token');
    this.setState({ token: token });
    console.info(this.state.token);
    console.info(this.props.Auth);
  };
  render() {
    return (
      <OuterContainer>
        <InnerContainer>
          <Item>
            <Logo>
              <Link to="/" style={{ width: '30%' }}>
                <span>TuThree</span>
              </Link>
            </Logo>
            <Menu>
              <Link
                to="/notice"
                onClick={() => {
                  Community.type = 1;
                  Community.state = 1;
                }}
              >
                공지사항
              </Link>
              <Link to="/tutor" onClick={() => (Tutor.state = 0)}>
                과외찾기
              </Link>
              <Link to="/tutee">학생찾기</Link>
              <Link
                to="/community"
                onClick={() => {
                  Community.communityState = 1;
                }}
              >
                커뮤니티
              </Link>
              <Link to="/myclass" style={{ marginRight: '0px' }}>
                내강의실
              </Link>

              {/* <img src={personImg} alt="마이페이지" /> */}
            </Menu>
            <Menu
              style={{ width: '25%', justifyContent: 'right', float: 'right' }}
            >
              {Auth.token ? (
                <>
                  <Link
                    to="/chatting"
                    style={{
                      width: '20%',
                      marginRight: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      localStorage.removeItem('otherPersonId');
                    }}
                  >
                    <Img src={chattingImg} alt="채팅" />
                  </Link>
                  <div
                    style={{
                      width: '20%',
                      marginLeft: '0px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      console.info(this.state.token);
                      console.info('is_profile');
                      this.setState({ is_profile: !this.state.is_profile });
                      console.info(this.state.is_profile);
                    }}
                  >
                    <Img src={personImg} alt="마이페이지" />
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  style={{ width: '30%', marginLeft: '0px' }}
                  onClick={() => console.info('login')}
                >
                  <Button
                    bd={true}
                    height={36}
                    pd={true}
                    style={{ width: '100px' }}
                  >
                    <div>로그인</div>
                  </Button>
                </Link>
              )}

              {this.state.is_profile && (
                <ProfileMenu>
                  <div>
                    <div
                      onClick={() => {
                        console.info('logout');
                        Auth.logout();
                      }}
                    >
                      <Button>
                        <div>로그아웃</div>
                      </Button>
                    </div>

                    <div>
                      <Link
                        to="/mypage"
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Button>
                          <div>마이페이지</div>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ProfileMenu>
              )}
            </Menu>
          </Item>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default Nav;

const Link = styled(Connection)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  font-family: RobotoBlack;
  //   margin-right: 72px;
  // width: 100%;
  font-weight: bold;
  // border: 3px solid red;
  width: 100%;
  box-sizing: border-box;
  display: block;
  // padding: 4px 8px;
  // margin: 0 auto;
  text-align: center;
  > span {
    font-family: GongGothicBold;
    font-size: 30px;
    font-weight: bold;
    // color: #eb7252;
    color: #000000;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 14px;
    > span {
      font-size: 22px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 16px;
    > span {
      font-size: 26px;
    }
  }
`;

// const Container = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
//   border: 3px solid green;
//   flex-direction: column;
// `;

const Item = styled.nav`
  //   border: 3px solid black;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  // border: 3px solid orange;
  width: 30%;

  > span {
    font-family: GongGothicBold;
    font-size: 30px;
    font-weight: bold;
    // color: #eb7252;
    color: #000000;
  }
`;
const Menu = styled.div`
  display: flex;
  // justify-content: space-around;
  // border: 3px solid blue;
  width: 70%;

  // padding: 10px;
`;

const Img = styled.img`
  width: 28px;
  height: 28px;
  // margin: 0 100px;
  float: right;
  // border: 3px solid green;
`;

const ProfileMenu = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 40px;
  // width: 14em;
  width: 7em;
  transform: translateX(40px);
  // border: 2px solid #000;
  box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.45);
  z-index: 2;
  > div {
    > div {
      // width: 100px;
      cursor: pointer;
      height: 50px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    > div:nth-of-type(1) {
      border-bottom: 1px solid #707070;
    }
  }
  // > div:nth-of-type(2) {
  //   // cursor: pointer;
  //   padding: 17px 0;
  //   display: flex;
  //   flex-direction: column;

  //   > div {
  //     padding: 6px 20px;

  //     :hover {
  //       background-color: #f3f3f3;
  //       > p {
  //         color: #707070;
  //       }
  //     }
  //   }
  // }
  // > div:nth-of-type(3) {
  //   cursor: pointer;
  //   padding: 6px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   // border-bottom: 2px solid red;
  // }
  // p {
  //   color: #414550;
  //   font-weight: 500;
  // }
`;

const Button = styled.button`
  background: none;
  border: none;
  // border-bottom: 2px solid red;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 50px;
  // width: 100px;
  border: ${(props) => (props.bd ? '1px solid #aaa' : 'none')};
  border-radius: ${(props) => (props.bd ? '50' : '0')}px;
  height: ${(props) => (props.height ? props.height : '0')}px;
  box-sizing: border-box;
  // padding: ${(props) => (props.pd ? '5' : '0')}px;
  > div {
    font-size: 16px;
    font-weight: 500;
  }
`;
