import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

@inject('MyPage', 'Common', 'Auth')
@observer
class Content extends Component {
  inputHandler = (e, type) => {
    console.info(e.value);
  };
  render() {
    const { MyPage, Auth, Common } = this.props;
    return (
      <Container>
        <Header>
          <div>비밀번호 변경</div>
        </Header>
        <Main>
          {/* <Item>
            <Label>기존 비밀번호</Label>
            <ContentBox>
              <Input
                placeholder="기존 비밀번호를 입력하세요."
                onChange={(e) => MyPage.onChangeHandler(e.target, 'new_password')}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) =>
                  (e.target.placeholder = '기존 비밀번호를 입력하세요.')
                }
              />
            </ContentBox>
          </Item> */}

          <Item>
            <Label>새 비밀번호</Label>
            <ContentBox>
              <Input
                value={MyPage.newPwd}
                placeholder="새 비밀번호를 입력하세요."
                onChange={(e) =>
                  MyPage.onChangeHandler(e.target, 'new_password')
                }
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) =>
                  (e.target.placeholder = '새 비밀번호를 입력하세요.')
                }
              />
            </ContentBox>
          </Item>

          <Item>
            <Label>새 비밀번호 확인</Label>
            <ContentBox>
              <Input
                value={MyPage.newPwdConfirm}
                placeholder="새 비밀번호를 한 번 더 입력하세요."
                onChange={(e) =>
                  MyPage.onChangeHandler(e.target, 'new_password_confirm')
                }
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) =>
                  (e.target.placeholder = '새 비밀번호를 한 번 더 입력하세요.')
                }
              />
            </ContentBox>
          </Item>
        </Main>
        <ButtonBox>
          <Button onClick={() => MyPage.alterPassword()}>
            <div>변경</div>
          </Button>
        </ButtonBox>
      </Container>
    );
  }
}

export default Content;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #888;
  height: 100%;
  @media (min-width: 0px) and (max-width: 767.98px) {
    border-top: none;
  }
`;
const Header = styled.div`
  padding: 20px 40px;
  box-sizing: border-box;
  border-left: 1px solid #888;
  //   border-right: 1px solid #888;
  border-bottom: 2px solid #333;
  > div {
    font-size: 32px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 12px 24px;
    > div {
      font-size: 24px;
    }
    border-left: none;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 16px 32px;
    > div {
      font-size: 24px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 18px 36px;
    > div {
      font-size: 28px;
    }
  }
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #888;
  margin-top: -1px;
`;
const Label = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 17px;
  font-weight: bold;
  border-right: 1px solid #888;
  width: 20%;
  background-color: rgba(235, 114, 82, 0.3);
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    padding: 3px 6px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 14px;
    padding: 5px 10px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 25%;
    font-size: 15px;
    padding: 8px 16px;
  }
`;
const ContentBox = styled.div`
  display: flex;
  font-size: 15px;
  padding: 15px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 100%;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
    padding: 10px 8px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
    padding: 6px 15px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 14px;
    padding: 12px 22px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  cursor: pointer;
  margin-top: 60px;
  background-color: rgb(235, 114, 82);
  border: none;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  > div {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 80px;
    height: 28px;
    > div {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100px;
    height: 32px;
    > div {
      font-size: 14px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      font-size: 15px;
    }
  }
`;

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
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: ${(props) => (props.domainType === 2 ? '90%' : '90%')};
    height: 30px;
    font-size: 12px;
    // margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: ${(props) => (props.domainType === 2 ? '220px' : '250px')};
    height: 34px;
    margin-left: ${(props) => (props.ml === 2 ? '10px' : '0px')};
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: ${(props) => (props.domainType === 2 ? '220px' : '300px')};
    height: 36px;
    margin-left: ${(props) => (props.ml === 2 ? '15px' : '0px')};
  }
  @media (min-width: 1300px) {
    width: ${(props) => (props.domainType === 2 ? '220px' : '440px')};
    height: 40px;
    margin-left: ${(props) => (props.ml === 2 ? '15px' : '0px')};
  }
`;
