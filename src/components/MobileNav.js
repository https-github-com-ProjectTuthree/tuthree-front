import React, { Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import close_ic from '../static/images/Home/close-button.png';
import hamburger_ic from '../static/images/Home/hamburger.png';

import Tutor from '../stores/Matching/Tutor';

import { Link as Connection } from 'react-router-dom';

@inject('Auth', 'Tutor')
@observer
class MobileNav extends React.Component {
  state = {
    token: null,
    url: '/',
    is_profile: false,
    is_open: false,
  };
  componentDidMount = async () => {
    const token = await localStorage.getItem('token');
    this.setState({ token: token });
  };

  menuClick = () => {
    const { is_open } = this.state;
    if (is_open === true) {
      this.setState({ ...this.state, is_open: false });
    } else {
      this.setState({ ...this.state, is_open: true });
    }
  };

  render() {
    const { Auth } = this.props;
    const { is_open } = this.state;
    console.log(this.props);
    return (
      <NavBox>
        {is_open && (
          <Modal>
            <ProfileMenu
              width={this.props.width}
              onClick={() => this.setState({ is_open: false })}
            >
              <ModalHeader>
                <div style={{ marginBottom: 20, width: '100%' }}>
                  <Link to="/">
                    <span>TuThree</span>
                  </Link>
                  <img src={close_ic} style={{ float: 'right' }} />
                </div>
              </ModalHeader>
              <>
                <ModalContent>
                  {/* {Auth.logged_in_partner ? <KSLink url={"project"} content={"프로젝트 관리"} /> : <KSLink url={"producer"} content={"제조사 찾기"} />}
                  <KSLink url={"magazine"} content={"제조 인사이트"} />

                  {Auth.logged_in_user && <KSLink url={"chatting"} content={"채팅하기"} />} */}
                  <Menu>
                    <Link mobile={true} to="/notice">
                      공지사항
                    </Link>
                    <Link
                      mobile={true}
                      to="/tutor"
                      onClick={() => (Tutor.state = 0)}
                    >
                      과외찾기
                    </Link>
                    <Link mobile={true} to="/tutee">
                      학생찾기
                    </Link>
                    <Link mobile={true} to="/community">
                      커뮤니티
                    </Link>
                    <Link
                      mobile={true}
                      to="/myclass"
                      style={{ marginRight: '0px' }}
                    >
                      내강의실
                    </Link>

                    {/* <img src={personImg} alt="마이페이지" /> */}
                  </Menu>
                </ModalContent>
              </>
              {this.state.token ? (
                <ModalContent2>
                  <Link
                    mobile={true}
                    to="/chatting"
                    style={{ marginRight: '0px' }}
                    onClick={() => {
                      localStorage.removeItem('otherPersonId');
                    }}
                  >
                    채팅
                  </Link>

                  <Link
                    mobile={true}
                    to="/mypage"
                    style={{ marginRight: '0px' }}
                  >
                    마이페이지
                  </Link>

                  <Link
                    mobile={true}
                    to="/"
                    style={{ marginRight: '0px' }}
                    onClick={() => Auth.logout()}
                  >
                    로그아웃
                  </Link>
                </ModalContent2>
              ) : (
                <ModalContent2>
                  <Link
                    mobile={true}
                    to="/login"
                    style={{ marginRight: '0px' }}
                  >
                    로그인
                  </Link>
                </ModalContent2>
              )}

              {/* {Auth.logged_in_user ? (
                <Footer>
                  <div> 로그아웃 </div>
                </Footer>
              ) : (
                <Footer>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: 'solid 1px #e1e2e4',
                      height: 32,
                    }}
                  >
                    로그인
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 32,
                    }}
                  >
                    회원가입
                  </div>
                </Footer>
              )} */}
            </ProfileMenu>
          </Modal>
        )}
        <Container>
          <NavWrap2>
            {this.props.src === '../static/images/person.png' ? (
              <BoltLogo>
                <Logo src={this.props.src} />
              </BoltLogo>
            ) : (
              <BoltLogo>
                <Logo src={this.props.src} />
              </BoltLogo>
            )}

            <HeadText>
              <Link to="/" style={{ width: '30%' }}>
                <span>TuThree</span>
              </Link>
            </HeadText>
            <Icon src={hamburger_ic} onClick={this.menuClick} />
          </NavWrap2>
        </Container>
      </NavBox>
    );
  }
}
const Modal = styled.div`
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ProfileMenu = styled.div`
  width: 70%;
  padding: 22px 22px;
  height: 100%;
  position: absolute;
  background-color: white;
  z-index: 10000;
  top: 0;
  right: 0;
  // transform: translate3d(${(props) =>
    props.width ? props.width - 156 : 10}px, calc(55%), 0);
  display: flex;
  flex-direction: column;
  }
`;
const ModalHeader = styled.div`
  width: 100%;
  // height: 160px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px #e1e2e4;
  align-items: center;
  > div {
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.3px;
    color: #111111;
    text-align: center;
    white-space: nowrap;
  }
  img {
    cursor: pointer;
    width: 24px;
    height: 24px;
  }
`;
const ModalContent = styled.button`
  border: none;
  background: none;
  width: 100%;
  padding-top: 20px;
  //   height: 158px;
  // height: 110px;
  display: flex;
  border-bottom: solid 1px #e1e2e4;
  flex-direction: column;
  justify-content: space-evenly;
  > a {
    font-family: NotoSansCJKkr;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.27;
    letter-spacing: -0.38px;
    text-align: left;
    color: #111111;
    cursor: pointer;
  }
`;
const HeadText = styled.div`
  z-index: 9998;
  width: 100%;
  height: 29px;
  position: absolute;
  color: #0a2165;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  left: 0;
  margin-top: 2px;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  justify-content: space-evenly;
  width: 70%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: solid 1px #e1e2e4;
  > div {
    width: 100%;
    font-family: NotoSansCJKkr;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.46;
    letter-spacing: -0.33px;
    text-align: center;
    color: #111111;
    cursor: pointer;
  }
`;
// const FreeButton = styled(Buttonv1)`
//   margin-top: 8px;
//   cursor: pointer;
//   @media (min-width: 0px) and (max-width: 767.98px) {
//     width: 270px;
//     height: 43px;
//   }
//   > span {
//     font-family: NotoSansCJKkr;
//     font-size: 16px;
//     font-weight: bold;
//     font-stretch: normal;
//     font-style: normal;
//     line-height: 1.19;
//     letter-spacing: -0.4px;
//     text-align: center;
//     color: #ffffff;
//   }
// `;
const ModalContent2 = styled.button`
  border: none;
  background: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 27px;
  > a {
    font-family: NotoSansCJKkr;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.3px;
    color: #282c36;
    margin-bottom: 22px;
    cursor: pointer;
  }
`;
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
`;
const NavBox = styled.div`
  position: fixed;
  height: 54px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  z-index: 300;
`;
const NavWrap2 = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  background-color: #ffffff; // #f3f3f3
  padding-left: 18px;
  padding-right: 18px;
`;
const BoltLogo = styled.button`
  background: none;
  border: none;
`;
const Logo = styled.img`
  cursor: pointer;
  z-index: 9999;
`;
const Icon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: none;
  background-color: '#f3f3f3';
  z-index: 9999;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    width: 32px;
    height: 32px;
  }
`;

const Link = styled(Connection)`
  text-decoration: none;
  color: black;
  //   font-size: ${(props) => (props.mobile ? '16' : '18')}px;
  font-family: RobotoBlack;
  font-weight: bold;

  width: 100%;
  box-sizing: border-box;

  text-align: center;
  margin-bottom: ${(props) => (props.mobile ? '20' : '0')}px;
  > span {
    font-family: GongGothicBold;
    font-size: ${(props) => (props.mobile ? '18' : '24')}px;
    font-weight: ${(props) => (props.mobile ? '400' : 'bold')};
    color: #000000;
  }
`;

const Menu = styled.div`
  display: flex;
  // justify-content: space-around;
  // border: 3px solid blue;
  flex-direction: column;
  width: 100%;

  // padding: 10px;
`;

export default MobileNav;
