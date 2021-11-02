import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { inject, observer } from 'mobx-react';
import TextareaContainer from '../../../../../components/TextareaContainer';
import TimePicker from '../../../../../components/TimePicker2';
import { toJS } from 'mobx';

@inject('Common', 'MyClass')
@observer
class ClassReport extends Component {
  componentDidMount = () => {
    const { Common, MyClass } = this.props;
    console.info('didmount');
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
                MyClass.selectModalActive = false;
              }}
            >
              {' '}
              &times;{' '}
            </button>
            <Container>
              <Header>
                {`${
                  MyClass.reportDetailAry
                    ? MyClass.reportDetailAry[0]
                      ? MyClass.reportDetailAry[0].date
                      : ''
                    : ''
                } `}{' '}
                수업보고서
              </Header>
              <Main>
                <Section>
                  <Label>강의회차</Label>
                  <Content>
                    {`${
                      MyClass.reportDetailAry
                        ? MyClass.reportDetailAry[0]
                          ? MyClass.reportDetailAry[0].number
                          : ''
                        : ''
                    } `}{' '}
                  </Content>
                </Section>

                <Section>
                  <Label>수업시간</Label>
                  <Content>
                    {`${
                      MyClass.reportDetailAry
                        ? MyClass.reportDetailAry[0]
                          ? MyClass.reportDetailAry[0].start
                          : ''
                        : ''
                    } ~ `}{' '}
                    {`${
                      MyClass.reportDetailAry
                        ? MyClass.reportDetailAry[0]
                          ? MyClass.reportDetailAry[0].end
                          : ''
                        : ''
                    } `}{' '}
                  </Content>
                </Section>

                <Section>
                  <Label>진행사항</Label>
                  <Content>
                    {`${
                      MyClass.reportDetailAry
                        ? MyClass.reportDetailAry[0]
                          ? MyClass.reportDetailAry[0].detail
                          : ''
                        : ''
                    } `}{' '}
                  </Content>
                </Section>
              </Main>
              {/* <Line>
          <Label>강의회차</Label>
          <Content width="80%">
            <Input
              value={MyClass.reportRound}
              ml={15}
              mr={15}
              bd={true}
              width="120px"
              placeholder="ex) 1"
              onChange={(e) => MyClass.onChangeHandler(e, 'set_report')}
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = 'ex) 1')}
            />{' '}
            <span>회차</span>
          </Content>
        </Line>

        <Line>
          <Label>수업시간</Label>
          <Content>
            <TimeLabel type="start">시작시간</TimeLabel>
            <TimePickerContainer
              type="start"
              state="report"
              active={MyClass.reportWritingState === 2}
            />{' '}
            <span> ~ </span>
            <TimePickerContainer
              type="end"
              state="report"
              active={MyClass.reportWritingState === 2}
            />
            <TimeLabel type="end">종료시간</TimeLabel>
          </Content>
        </Line>
        <Line>
          <Label>진행사항</Label>
          <Content width="80%">
            <TextArea
              mih={150}
              bd={true}
              type="classReport"
              value={MyClass.reportContent}
              placeholder="오늘은 (...) 부분에 대해서 진행하였습니다."
            />
          </Content>
        </Line>
        <ButtonBox>
          {MyClass.reportWritingState === 1 ? (
            <Button
              color="#fff"
              bcolor="rgb(235, 114, 82)"
              onClick={() => MyClass.setReport()}
            >
              <div>저장</div>
            </Button>
          ) : (
            <>
              <Button
                color="#fff"
                bcolor="rgb(235, 114, 82)"
                onClick={() => {
                  MyClass.putReport(MyClass.reportDetailAry[0].id);
                  // console.info(toJS(MyClass.reportDetailAry[0]));
                }}
              >
                <div>수정</div>
              </Button>

              <Button
                color="#fff"
                bcolor="rgba(255, 0, 0, 0.7)"
                onClick={() => {
                  MyClass.delReport(MyClass.reportDetailAry[0].id);
                  // console.info(toJS(MyClass.reportDetailAry[0]));
                }}
              >
                <div>삭제</div>
              </Button>
            </>
          )}
        </ButtonBox> */}
            </Container>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default ClassReport;

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
const Label = styled.div`
  width: 20%;
  font-size: 18px;
  min-width: 100px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
    min-width: 70px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 15%;
    font-size: 16px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 15%;
    font-size: 17px;
  }
`;
const Content = styled.div`
  position: relative;
  width: ${(props) => (props.width ? props.width : '')};
  display: flex;
  align-items: center;

  font-size: 14px;
  margin-left: 5px;
  word-break: break-word;
  font-weight: 400;
  white-space: pre-wrap;
  text-align: left;

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
  font-color: white;
  text-align: center;
  display: flex;
  margin-top: 20px;

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

const Section = styled.div`
  width: 100%;
  display: flex;
  margin: 5px 0;
`;
