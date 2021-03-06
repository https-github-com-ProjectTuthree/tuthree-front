import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as Connection,
} from 'react-router-dom';

import choiceImg from '../../../static/images/Signup/choice.png';
import writingImg from '../../../static/images/Signup/writing.png';
import detailWritingImg from '../../../static/images/Signup/detailwriting.png';
import completionImg from '../../../static/images/Signup/completion.png';

class ProgressContainer extends Component {
  render() {
    const { step } = this.props;
    console.log(step);
    return (
      <>
        <Container>
          <ProgressItem choice={step === '1'}>
            <img src={choiceImg} />
            <span>회원가입 선택</span>
          </ProgressItem>
          <ProgressItem choice={step === '2'}>
            <img src={writingImg} />
            <span>기본정보 입력</span>
          </ProgressItem>
          <ProgressItem choice={step === '3'}>
            <img src={detailWritingImg} />
            <span>추가정보 입력</span>
          </ProgressItem>
          <ProgressItem choice={step === '4'}>
            <img src={completionImg} />
            <span>회원가입 완료</span>
          </ProgressItem>
        </Container>
      </>
    );
  }
}

export default ProgressContainer;

const Container = styled.div`
  width: 100%;
  //   height: 100%;
  display: flex;
  //   flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-wrap: wrap;
  }
`;

const ProgressItem = styled.div`
  width: 250px;
  height: 100px;
  margin: 0 20px;
  border-radius: 0 100px 100px 0;
  background-color: ${(props) => (props.choice ? 'rgb(235, 114, 82)' : '')};
  border: ${(props) => (props.choice ? 'none' : '1px solid black')};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  > span {
    font-size: 24px;
    font-weight: bold;
    color: ${(props) => (props.choice ? '#ffffff' : '#000000')};
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 0 10px;
    margin-bottom: 10px;
    padding: 0 8px;
    height: 50px;
    width: 180px;
    > span {
      font-size: 14px;
    }
    > img {
      width: 24px;
      height: 24px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin: 0 10px;
    padding: 0 10px;
    height: 60px;
    width: 200px;
    > span {
      font-size: 16px;
    }
    > img {
      width: 28px;
      height: 28px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin: 0 10px;
    padding: 0 10px;
    height: 80px;
    width: 225px;
    > span {
      font-size: 20px;
    }
    > img {
      width: 32px;
      height: 32px;
    }
  }
  @media (min-width: 1300px) {
  }
`;
