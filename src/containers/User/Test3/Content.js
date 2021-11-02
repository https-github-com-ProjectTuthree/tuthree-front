import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer, Provider } from 'mobx-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as Connection,
} from 'react-router-dom';

import Auth from '../../../stores/Account/Auth';
import Common from '../../../stores/Common/Common';

@inject('Auth', 'Common', 'Test3')
@observer
class Content extends Component {
  onIdHandler = (e) => {
    const { Test3 } = this.props;
    console.log(e.target.value);
    Test3.loginId = e.target.value;
  };

  onPasswordHandler = (e) => {
    const { Test3 } = this.props;
    console.log(e.target.value);

    Test3.loginPassowrd = e.target.value;
  };
  render() {
    const { Test3 } = this.props;
    return (
      <>
        <Container>
          <Name>로그인</Name>
          <InputBox>
            <Input
              id="custom-css-outlined-input"
              placeholder="아이디"
              onChange={(e) => this.onIdHandler(e)}
              style={{ marginBottom: '70px' }}
            />
            <Input
              id="custom-css-outlined-input"
              placeholder="비밀번호"
              type="password"
              onChange={(e) => this.onPasswordHandler(e)}
              //   onChange={Auth.setPassword}
              // onKeyDown={this.handleKeyDown}
            />
          </InputBox>
          <Forgotten>
            <Link to="/forgotten">
              <span>아이디/비밀번호 찾기</span>
            </Link>
          </Forgotten>

          {/* <Link to="/" style={{ marginBottom: '30px' }} onClick={}> */}
          <Button
            background="rgba(235, 114, 82, 0.7)"
            style={{ marginBottom: '30px' }}
            onClick={async () => {
              // await Auth.checkLoginData();
              // if (Auth.loginAuth) {
              Test3.login();
              // }
            }}
          >
            <div>로그인</div>
          </Button>
          {/* </Link> */}
          <Link to="/signup" style={{ marginBottom: '30px' }}>
            <Button border="1px solid black">
              <div>회원가입</div>
            </Button>
          </Link>
          <Button background="#F4EF21">
            <div>카카오 로그인</div>
          </Button>
        </Container>
      </>
    );
  }
}

export default Content;

const Container = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.div`
  font-size: 40px;
  color: #eb7252;
  font-family: RobotoBlack;
  font-weight: bold;
  margin: 110px 0;
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid #000000;
  padding-bottom: 18px;
  outline: none;
  font-size: 15px;
  //   @media (min-width: 0px) and (max-width: 767.98px) {
  //     width: 100%;
  //     margin-top: 0px !important;
  //     margin-bottom: 8px !important;
  //   }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 300px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 400px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 500px;
  }
  @media (min-width: 1300px) {
    width: 500px;
  }
`;

const Forgotten = styled.div`
  margin-top: 42px;
  margin-bottom: 105px;
  width: 500px;
  span {
    display: inline-block;

    font-size: 16px;
    font-weight: 600;
    float: right;

    text-align: center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 300px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 400px;
  }
`;
const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 38px;
  width: 500px;
  height: 60px;
  background-color: ${(props) =>
    props.background ? props.background : 'white'};
  border: ${(props) => (props.border ? props.border : 'none')};
  margin-bottom: ${(props) => (props.mb ? props.mb : '0')}px;
  cursor: pointer;
  div {
    font-size: 20px;
    font-weight: 500;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 250px;
    height: 50px;
    div {
      font-size: 18px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 400px;
  }
`;

const Link = styled(Connection)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  font-family: RobotoBlack;
  font-weight: bold;

  box-sizing: border-box;
  display: block;
  text-align: center;
`;
