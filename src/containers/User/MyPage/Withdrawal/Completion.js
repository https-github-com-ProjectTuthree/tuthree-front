import React from 'react';
import styled, { keyframes } from 'styled-components';
import { inject, observer } from 'mobx-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as Connection,
} from 'react-router-dom';

@inject('Common', 'Chatting')
@observer
class Completion extends React.Component {
  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, children, width, Common, Chatting } =
      this.props;
    return (
      <ModalBox
        modal={open ? 'openModal modal' : 'modal'}
        style={{ display: open ? 'block' : 'none' }}
      >
        {open ? (
          <>
            {/* <button
              className="close"
              onClick={(e) => {
                console.info('close');
                e.stopPropagation();
                Common.modalActive = false;
              }}
            >
              {' '}
              &times;{' '}
            </button> */}
            <Container>
              <Header>회원탈퇴</Header>
              <Main>회원탈퇴가 완료되었습니다!</Main>
              <Link to="/" onClick={() => (Common.modalActive = false)}>
                <Button>
                  <div>홈으로 가기</div>
                </Button>
              </Link>
            </Container>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default Completion;

const ModalBox = styled.div`
  // display: none;
  position: fixed;
  //top: 40%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  z-index: 101;
  background-color: white;
  //   height: 635px;
  //   height: 800px;
  min-height: 300px;
  padding-bottom: 30px;
  box-sizing: border-box;
  width: 80%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  //   max-height: 75vh;
  //   top: 0;
  overflow-y: scroll !important;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  > button {
    position: absolute;
    right: 0;
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 21px;
    font-weight: 700;
    //margin-left: 10px;
    margin: 10px 10px 0 0;
    float: right;
    color: #000000;
    border-radius: 50%;
    background-color: #f1f1f1;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 95%;
    // position: fixed;
    // z-index: 101;
    // height: 150px;
    // width: 90%;

    // > button {
    //   font-size: 14px;
    //   margin: 10px 10px 0 0;
    // }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const Container = styled.div`
  max-width: 900px;
  width: 90%;
  height: 280px;
  margin: 0 auto;
  border-radius: 0.3rem;
  //background-color: blanchedalmond;
  //border: 1px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 100%;
    width: 90%;
    height: 280px;
  }
`;

const Header = styled.div`
  position: relative;
  padding: 16px;
  //padding-top: 0;
  //background-color: #f1f1f1;
  font-weight: 700;
  // margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid #333;
  font-size: 30px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    position: relative;
    padding: 8px;
    font-weight: 700;
    font-size: 22px;
  }
`;
const Main = styled.div`
  background-color: white;
  font-color: white;
  text-align: center;
  display: flex;

  flex-direction: column;
  //   border: 2px solid red;

  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
  //   font-size: 20px;
  //   font-weight: 600;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    font-size: 16px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  background-color: #fff;
  > div {
    width: 50%;
    height: 30px;
    border-radius: 3px;
    background-color: rgba(235, 114, 82, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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
