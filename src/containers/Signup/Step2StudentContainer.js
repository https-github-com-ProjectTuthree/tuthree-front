import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer, Provider } from 'mobx-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as Connection,
} from 'react-router-dom';
import ProgressContainer from './ProgressContainer';
import SelectComponent from '../../components/Select';

import Auth from '../../stores/Account/Auth';

const birthAry = [];
const emailAry = [
  { label: 'naver.com', value: 1 },
  { label: 'hanmail.net', value: 2 },
  { label: 'hotmail.com', value: 3 },
  { label: 'nate.com', value: 4 },
  { label: 'yahoo.co.kr', value: 5 },
  { label: 'gmail.com', value: 6 },
  { label: '직접 입력', value: 'direct' },
];

const customStyles = {
  dropdownIndicator: () => ({
    backgroundColor: '#fff',
    color: '#000',
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#555555',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 16,
    lineHeight: 1.2,
    border: '1px solid #c7c7c7',
    display: 'flex',
    height: '100%',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

@inject('Auth')
@observer
class Step2StudentContainer extends Component {
  componentDidMount = () => {
    for (let i = 2021; i > 1900; i--) {
      birthAry.push({ label: i, value: i });
    }

    console.log(birthAry);
  };

  handleChange = (e, type) => {
    console.log(e);
    switch (type) {
      case 'email':
        if (e.value === 'direct') {
          Auth.domainType = 2;
        } else {
          Auth.domainType = 1;
        }
        break;
      case 'birth':
        console.log('birth');
        break;
      default:
        break;
    }
  };

  inputHandler = (e, type) => {
    console.log(e.value);
    // console.log(type);
    switch (type) {
      case 'id':
        console.log('id');
        break;
      case 'password':
        console.log('password');
        break;
      case 'passwordConfirm':
        console.log('passwordConfirm');
        break;
      case 'name':
        console.log('name');
        break;
      case 'email':
        console.log('email');
        break;
      case 'phone':
        console.log('phone');
        break;
      case 'certification':
        console.log('certification');
        break;
      case 'gender':
        console.log('gender');
        break;
      case 'birth':
        console.log('birth');
        break;
      default:
        console.log('default');
    }
  };
  render() {
    return (
      <Container>
        <Name>회원가입</Name>
        <ProgressContainer step="2" />
        <MainBox>
          <ItemBox>
            <div>유형</div>
            <Radiobox
              width={80}
              type={Auth.signupType === 0}
              onClick={() => {
                Auth.signupType = 0;
              }}
            >
              <div>
                <div></div>
              </div>
              <span>학생</span>
            </Radiobox>
            <Radiobox
              width={85}
              type={Auth.signupType === 1}
              onClick={() => {
                Auth.signupType = 1;
              }}
            >
              <div>
                <div></div>
              </div>
              <span>학부모</span>
            </Radiobox>
          </ItemBox>

          <ItemBox>
            <div>아이디</div>
            <WrapperBox>
              <Input
                placeholder="아이디"
                onChange={(e) => this.inputHandler(e.target, 'id')}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = '아이디')}
              />
              <OverlapBtn>중복확인</OverlapBtn>
            </WrapperBox>
          </ItemBox>
          <ItemBox>
            <div>비밀번호</div>
            <Input
              placeholder="비밀번호"
              onChange={(e) => this.inputHandler(e.target, 'password')}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = '비밀번호')}
            />
          </ItemBox>
          <ItemBox>
            <div>비밀번호 확인</div>
            <Input
              placeholder="비밀번호 확인"
              onChange={(e) => this.inputHandler(e.target, 'password_confirm')}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = '비밀번호 확인')}
            />
          </ItemBox>
          <ItemBox>
            <div>이름</div>
            <Input
              placeholder="이름"
              // onChange={this.onIdHandler}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = '이름')}
            />
          </ItemBox>
          <ItemBox>
            <div>이메일</div>
            <WrapperBox>
              <Input
                placeholder="이메일"
                // onChange={this.onIdHandler}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = '이메일')}
              />
              <span>@</span>
              <Select
                //  id={this.props.id}
                //  className={this.props.className}
                styles={customStyles}
                //  value={value}
                onChange={(e) => this.handleChange(e, 'email')}
                getOptionLabel={(option) => option.label}
                options={emailAry}
                //  isSearchable={false}
                placeholder="선택하세요."
                ml="15"
                domainType={Auth.domainType}
              />
              {/* <OverlapBtn>중복확인</OverlapBtn> */}
              <Input
                placeholder="직접 입력"
                // onChange={this.onIdHandler}
                domainType={Auth.domainType}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = '직접 입력')}
              />
            </WrapperBox>
          </ItemBox>
          <ItemBox>
            <div>휴대폰 번호</div>
            <WrapperBox>
              <Input
                placeholder="-없이 입력하세요."
                // onChange={this.onIdHandler}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) => (e.target.placeholder = '-없이 입력하세요.')}
              />
              <OverlapBtn>인증번호 요청</OverlapBtn>
            </WrapperBox>
          </ItemBox>
          <ItemBox>
            <div>인증번호</div>
            <WrapperBox>
              <Input
                placeholder="인증번호를 입력하세요."
                // onChange={this.onIdHandler}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) =>
                  (e.target.placeholder = '인증번호를 입력하세요.')
                }
              />
              <OverlapBtn>확인</OverlapBtn>
            </WrapperBox>
          </ItemBox>
          <ItemBox>
            <div>성별</div>
            <Radiobox
              width={80}
              type={Auth.signupGender === 0}
              onClick={() => {
                Auth.signupGender = 0;
              }}
            >
              <div>
                <div></div>
              </div>
              <span>남자</span>
            </Radiobox>
            <Radiobox
              width={80}
              type={Auth.signupGender === 1}
              onClick={() => {
                Auth.signupGender = 1;
              }}
            >
              <div>
                <div></div>
              </div>
              <span>여자</span>
            </Radiobox>
          </ItemBox>
          <ItemBox>
            <div>출생년도</div>
            <Select
              //  id={this.props.id}
              //  className={this.props.className}
              styles={customStyles}
              //  value={value}
              onChange={(e) => this.handleChange(e, 'birth')}
              getOptionLabel={(option) => option.label}
              options={birthAry}
              //  isSearchable={false}
              placeholder="선택하세요."
              domainType={1}
            />
          </ItemBox>
        </MainBox>
        <NextBtn
          onClick={() => {
            console.info('dsfsdf');
            if (Auth.signupType === 0) {
              Auth.step = 3;
              Auth.userType = 2;
            } else {
              Auth.step = 4;
              Auth.userType = 2;
            }
          }}
        >
          <div>다음</div>
        </NextBtn>
      </Container>
    );
  }
}

export default Step2StudentContainer;

const Container = styled.div`
  width: 100%;
  // height: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 300px;
`;

const Name = styled.div`
  font-size: 40px;
  color: #eb7252;
  font-family: RobotoBlack;
  font-weight: bold;
  margin: 110px 0;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 0;
  width: 80%;
  // border: 3px solid green;
  justify-content: center;
  padding: 10px 30px;
  box-sizing: border-box;
`;
const WrapperBox = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
  }
`;
const ItemBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  // justify-content: space-around;
  > div:nth-of-type(1) {
    width: 250px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const OverlapBtn = styled.button`
  background-color: rgba(235, 114, 82, 0.7);
  border-radius: 8px;
  border: none;
  width: 145px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 15px;
  cursor: pointer;
`;
const PasswordBox = styled.div``;
const PasswordConfirmBox = styled.div``;
const NameBox = styled.div``;
const EmailBox = styled.div``;
const PhoneBox = styled.div``;
const CertificationBox = styled.div``;
const GenderBox = styled.div``;
const BirthBox = styled.div``;

const Input = styled.input`
  border: none;
  border: 1px solid #c7c7c7;
  // padding-bottom: 18px;
  outline: none;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
  display: ${(props) => (props.domainType === 1 ? 'none' : 'block')};
  padding-left: 10px;
  :focus {
  }

  //   @media (min-width: 0px) and (max-width: 767.98px) {
  //     width: 100%;
  //     margin-top: 0px !important;
  //     margin-bottom: 8px !important;
  //   }
  //   @media (min-width: 768px) and (max-width: 991.98px) {
  //     width: 100%;
  //   }
  //   @media (min-width: 992px) and (max-width: 1299.98px) {
  //     width: 100%;
  //   }
  @media (min-width: 1300px) {
    width: ${(props) => (props.domainType === 2 ? '145px' : '440px')};
    height: 60px;
    margin-left: ${(props) => (props.domainType === 2 ? '15px' : '0px')};
  }
`;

const Select = styled(SelectComponent)`
  width: 170px;
  height: 60px;
  margin-left: ${(props) => (props.ml ? props.ml : '0')}px;
  display: ${(props) => (props.domainType === 1 ? 'block' : 'none')};
`;

const Radiobox = styled.div`
  display: flex;
  width: ${(props) => (props.width ? props.width : '0')}px;
  // border: 2px solid black;
  cursor: pointer;
  > div:nth-of-type(1) {
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-radius: 50%;
    position: relative;
    > div {
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: ${(props) => (props.type ? 'block' : 'none')};
    }
  }
  > span {
    font-size: 16px;
    margin-left: 10px;
  }
`;

const NextBtn = styled.div`
  width: 200px;
  height: 60px;
  border-radius: 30px;
  background-color: rgba(235, 114, 82, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > div {
    font-size: 20px;
    font-weight: bold;
  }
`;
