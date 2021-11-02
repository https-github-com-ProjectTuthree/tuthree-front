import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { inject, observer } from 'mobx-react';
import TextareaContainer from '../../../../../components/TextareaContainer';
import TimePicker from '../../../../../components/TimePicker2';
import { toJS } from 'mobx';

@inject('Common', 'MyClass')
@observer
class QuestionResult extends Component {
  componentDidMount = () => {
    const { Common, MyClass } = this.props;
    console.info('didmount');
    console.info(toJS(MyClass.currentMarkingResultAry));
  };
  render() {
    const { open, close, header, children, width, Common, MyClass } =
      this.props;
    console.info(MyClass.reportWritingState);
    return (
      <ModalBox
        modal={open ? 'openModal modal' : 'modal'}
        style={{ display: open ? 'block' : 'none' }}
      >
        {open ? (
          <>
            <button
              className="close"
              onClick={(e) => {
                console.info('close');
                e.stopPropagation();
                MyClass.resultModalActive = false;
              }}
            >
              {' '}
              &times;{' '}
            </button>
            <Container>
              <Header>채점 결과</Header>
              <Main>
                {MyClass.currentMarkingResultAry &&
                  MyClass.currentMarkingResultAry.map((item, idx) => {
                    return (
                      <Item>
                        <Label>
                          <div>{item.question}번</div>
                          <Marking active={item.score === 'RIGHT'}>
                            <div></div>
                            <div></div>
                          </Marking>
                        </Label>
                        <Content>
                          <TuteeAnswer>{item.studentAnswer}</TuteeAnswer>
                          <OriginAnswer active={item.score === 'RIGHT'}>
                            {item.teacherAnswer}
                          </OriginAnswer>
                          {/* <div>
                            {item.score} / {item.studentAnswer} /{' '}
                            {item.teacherAnswer}
                          </div> */}

                          {/* <TextArea
                      mih={80}
                      mxh={81}
                      // bd={true}
                      idx={idx}
                      type="setAnswer"
                      value={item.ans}
                      placeholder="답 입력"
                    /> */}
                        </Content>
                      </Item>
                    );
                  })}
              </Main>
            </Container>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default QuestionResult;

const ModalBox = styled.div`
  // display: none;
  //   position: fixed;
  //top: 40%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  z-index: 101;
  background-color: white;
  //   height: 635px;
  //   height: 800px;
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

    > button {
      // font-size: 14px;
      margin: 5px 5px 0 0;
    }
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
  //   height: 90%;
  //   height: 500px;
  min-height: 300px;

  margin: 0 auto;
  border-radius: 0.3rem;
  //background-color: blanchedalmond;
  //border: 1px solid blue;
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 100%;
    width: 90%;
    height: 40%;
  }
`;
const Line = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: 120px;
  width: 100px;
  border: 1px solid #000;
  margin-left: -1px;
  margin-top: -1px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 70px;
    height: 100px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 90px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 95px;
  }
`;
const Label = styled.div`
  font-size: 18px;
  font-weight: bold;
  background-color: rgba(235, 114, 82, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #707070;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 15px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 17px;
  }
`;
const Content = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : '')};
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 14px;
  margin-left: 5px;
  word-break: break-word;
  font-weight: 400;
  padding-top: 10px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 11px;
    margin-left: 5px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
    margin-left: 5px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 13px;
    margin-left: 5px;
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
  font-size: 28px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    position: relative;
    padding: 8px;
    font-weight: 700;
    font-size: 19px;
    margin-top: 30px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 22px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 25px;
  }
`;
const Main = styled.div`
  background-color: white;
  // font-color: white;
  text-align: center;
  display: flex;
  margin-top: 20px;

  // flex-direction: column;
  //   border: 2px solid red;

  // ont-size: 20px;
  //   font-weight: 600;
  flex-wrap: wrap;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    font-size: 16px;
    font-weight: 600;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  margin: 5px 0;
`;

const Marking = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: ${(props) => (props.active ? '3px solid red' : 'none')};

  // width: 2px;
  // height: 2px;

  > div {
    display: ${(props) => (props.active ? 'none' : 'block')};
    position: absolute;
    height: 2px;
    width: 32px;
    background-color: red;
    top: 50%;
  }
  > div:nth-of-type(1) {
    transform: rotate(45deg);
  }
  > div:nth-of-type(2) {
    transform: rotate(-45deg);
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 22px;
    height: 22px;
    > div {
      width: 22px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 28px;
    height: 28px;
    > div {
      width: 28px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 30px;
    height: 30px;
    > div {
      width: 30px;
    }
  }
`;

const TuteeAnswer = styled.div`
  width: 100%;
  font-size: 16px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 14px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 15px;
  }
`;
const OriginAnswer = styled.div`
  width: 100%;
  font-size: 16px;
  color: red;
  display: ${(props) => (props.active ? 'none' : 'block')};

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 14px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 15px;
  }
`;
