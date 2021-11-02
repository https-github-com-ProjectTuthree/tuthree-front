import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Completion from './Completion';

@inject('MyPage', 'Common', 'Auth')
@observer
class Content extends Component {
  openModal = () => {
    const { Common } = this.props;
    Common.modalActive = false;
  };
  closeModal = () => {
    const { Common } = this.props;
    Common.modalActive = true;
  };
  render() {
    const { MyPage, Auth, Common } = this.props;
    return (
      <Container>
        {Common.modalActive && (
          <Layer>
            <div>
              <Completion
                // width={width}
                open={this.openModal}
                close={this.closeModal}
              />
            </div>
          </Layer>
        )}
        <Header>
          <div>회원 탈퇴</div>
          {/* <Description>
            고객님의 소중한 개인정보보호를 위해서 본인확인을 진행합니다.
          </Description>
          <Main></Main> */}
        </Header>

        {/* <Main>
          <Item>
            <Label>비밀번호</Label>
            <ContentBox>
              <Input
                placeholder="비밀번호를 입력하세요."
                onChange={(e) => this.inputHandler(e.target, 'password')}
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) =>
                  (e.target.placeholder = '비밀번호를 입력하세요.')
                }
              />
            </ContentBox>
          </Item>

          <Item>
            <Label>비밀번호 확인</Label>
            <ContentBox>
              <Input
                placeholder="비밀번호를 한 번 더 입력하세요."
                onChange={(e) =>
                  this.inputHandler(e.target, 'password_confirm')
                }
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) =>
                  (e.target.placeholder = '비밀번호를 한 번 더 입력하세요.')
                }
              />
            </ContentBox>
          </Item>
        </Main> */}
        <ButtonBox>
          <Button
            onClick={async () => {
              await MyPage.withDrawal();
              Common.modalActive = true;
            }}
          >
            <div>회원탈퇴</div>
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
  > div:nth-of-type(1) {
    font-size: 32px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 12px 24px;
    > div:nth-of-type(1) {
      font-size: 24px;
    }
    border-left: none;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 16px 32px;
    > div:nth-of-type(1) {
      font-size: 24px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 18px 36px;
    > div:nth-of-type(1) {
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

const Description = styled.div`
  font-size: 13px;
  color: #999;
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);
  // overflow-y: scroll !important;
  // height: auto;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100vh;
    height: 100%;
    overflow-y: scroll !important;
  }
`;
