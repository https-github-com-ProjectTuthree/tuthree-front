import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import AnswerWriting from './Writing/AnswerWriting';
import TuteeAnswerWriting from './Writing/TuteeAnswerWriting';
import QuestionResult from './Select/QuestionResult';
import deleteImg from '../../../../static/images/Signup/delete.png';
import { ROOT_URL } from '../../../../axios/index';
import { toJS } from 'mobx';

const today = new Date();
let date = null;
let year = null;
let month = null;
let day = null;

const dummyData = [
  { id: 1, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
  { id: 2, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
  { id: 3, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
  { id: 4, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
  {
    id: 5,
    title: '2021-2학기 모의고사 문제지dsfsdfdfd',
    file: 'werrfewfefewf',
  },
  { id: 6, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
  { id: 7, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
  { id: 8, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
  { id: 9, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
  //   { id: 10, title: '2021-2학기 모의고사 문제지', file: 'werrfewfefewf' },
];

@inject('MyClass', 'Common', 'Auth')
@observer
class Content extends Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }
  componentDidMount = async () => {
    const { MyClass } = this.props;
    await MyClass.getQuestionList();
    console.info('sdfsdfsdf');
    this.setState({ g: 3 });
  };
  componentWillUnmount = () => {
    const { MyClass } = this.props;
    console.info('un2');
    // MyClass.state = 1;
  };
  openModal = () => {
    const { Common } = this.props;
    Common.modalActive = false;
  };
  closeModal = () => {
    const { Common } = this.props;
    Common.modalActive = true;
  };

  openResultModal = () => {
    const { MyClass } = this.props;
    MyClass.resultModalActive = false;
  };
  closeResultModal = () => {
    const { MyClass } = this.props;
    MyClass.resultModalActive = true;
  };

  openTuteeAnswerModal = () => {
    const { MyClass } = this.props;
    MyClass.tuteeAnswerModalActive = false;
  };
  closeTuteeAnswerModal = () => {
    const { MyClass } = this.props;
    MyClass.tuteeAnswerModalActive = false;
  };

  handleFileChange = (event) => {
    console.info(event.target.files[0]);
  };

  render() {
    const { MyClass, Common, Auth } = this.props;

    year = today.getFullYear();
    month = ('0' + (today.getMonth() + 1)).slice(-2);
    day = ('0' + today.getDate()).slice(-2);
    date = year + '-' + month + '-' + day;
    return (
      <Container>
        {Common.modalActive === true && Common.modalState === 1 && (
          <Layer>
            <div>
              <AnswerWriting
                // width={width}
                open={this.openModal}
                close={this.closeModal}
              />
            </div>
          </Layer>
        )}

        {MyClass.tuteeAnswerModalActive === true && (
          <Layer>
            <div>
              <TuteeAnswerWriting
                // width={width}
                open={this.openTuteeAnswerModal}
                close={this.closeTuteeAnswerModal}
              />
            </div>
          </Layer>
        )}

        {MyClass.resultModalActive === true && (
          <Layer>
            <div>
              <QuestionResult
                // width={width}
                open={this.openTuteeAnswerModal}
                close={this.closeTuteeAnswerModal}
              />
            </div>
          </Layer>
        )}

        {Auth.loggedUserType === 'teacher' && (
          <ButtonBox>
            <input
              type="file"
              // multiple={'multiple'}
              fileName={'fileName[]'}
              style={{ display: 'none' }}
              onChange={(e) => MyClass.onChangeHandler(e, 'set_question')}
              id="inputFile"
              ref={this.file}
              value=""
              // placeholder={'파일을 선택해 주세요.'}
            />

            <Button
              width={160}
              onClick={() => {
                // console.info('click');
                // this.handleFileUpload();
                this.file.current.click();
              }}
            >
              <div>문제지 업로드</div>
            </Button>
          </ButtonBox>
        )}

        <Table>
          <Header>
            <Section>
              <Question type="header">
                <div>문제지</div>
              </Question>
              {Auth.loggedUserType === 'teacher' ? (
                <Answer type="header">
                  <div>답안지</div>
                </Answer>
              ) : (
                <Answer type="header">
                  <div>답안 작성</div>
                </Answer>
              )}

              <DueDate type="header">
                <div>기간</div>
              </DueDate>

              <TuteeAnswer>
                <div>채점 결과</div>
              </TuteeAnswer>
            </Section>

            {/* <Section>
                  <Question type="header">
                    <div>문제지</div>
                  </Question>
                  <Answer type="header">
                    <div>답안지</div>
                  </Answer>
                  <TuteeAnswer>
                    <div>학생 답안</div>
                  </TuteeAnswer>
                </Section> */}
          </Header>
          <Main>
            {/* {dummyData &&
              dummyData.map((item, idx) => {
                console.info(dummyData.length);
                console.info(idx);
                if ((dummyData.length + 1) % 2 === 1) {
                  console.info(dummyData.length >= idx + 2);
                } else {
                  console.info(dummyData.length === idx + 1);
                }

                return (
                  // <SubMain>

                  <Section type="main">
                    <Question
                      type="header"
                      active={
                        (dummyData.length + 1) % 2 === 1
                          ? dummyData.length >= idx + 2
                          : dummyData.length === idx + 1
                      }
                    >
                      <div>{item.title}</div>
                    </Question>
                    <Answer
                      type="main"
                      active={
                        (dummyData.length + 1) % 2 === 1
                          ? dummyData.length >= idx + 2
                          : dummyData.length === idx + 1
                      }
                    >
                      <div
                        onClick={() => {
                          Common.modalActive = true;
                        }}
                      >
                        <div>제출</div>
                      </div>
                    </Answer>
                    {(idx + 1) % 2 === 1 ? (
                      <TuteeAnswer
                        type="headerBold"
                        active={
                          (dummyData.length + 1) % 2 === 1
                            ? dummyData.length >= idx + 2
                            : dummyData.length === idx + 1
                        }
                      >
                        <div>b</div>
                      </TuteeAnswer>
                    ) : (
                      <TuteeAnswer
                        type="main"
                        active={
                          (dummyData.length + 1) % 2 === 1
                            ? dummyData.length >= idx + 2
                            : dummyData.length === idx + 1
                        }
                      >
                        <div>b</div>
                      </TuteeAnswer>
                    )}
                  </Section>
                );
              })} */}

            {MyClass.markingStateObj &&
              MyClass.getTuteeAnswerState &&
              MyClass.questionTotalList &&
              MyClass.questionTotalList.map((item, idx) => {
                // console.info(MyClass.questionTotalList.length);
                console.info(idx);
                console.info(toJS(item));
                console.info(toJS(MyClass.markingStateObj));
                console.info(toJS(MyClass.answerDueDateObj));
                console.info(toJS(MyClass.answerDueDateObj[item.id]));
                // if ((MyClass.questionTotalList.length + 1) % 2 === 1) {
                //   console.info(MyClass.questionTotalList.length >= idx + 2);
                // } else {
                //   console.info(MyClass.questionTotalList.length === idx + 1);
                // }

                // console.info(toJS(MyClass.markingStateAry));
                // console.info(`${item.checked} + ${idx}`);

                return (
                  <Section type="main">
                    <Question
                      type="header"
                      active={
                        (MyClass.questionTotalList.length + 1) % 2 === 1
                          ? MyClass.questionTotalList.length >= idx + 2
                          : MyClass.questionTotalList.length === idx + 1
                      }
                    >
                      <a href={`${ROOT_URL}/community/download/${item.id}`}>
                        {item.title}
                      </a>
                      {Auth.loggedUserType === 'teacher' && (
                        <img
                          src={deleteImg}
                          onClick={() => {
                            console.info(item.id);
                            MyClass.delQuestion(item.id);
                          }}
                        />
                      )}
                    </Question>
                    {/* {console.info(date < MyClass.answerDueDateObj.)} */}
                    {Auth.loggedUserType === 'teacher' ? (
                      <Answer
                        type="main"
                        state={item.checked}
                        user={Auth.loggedUserType}
                        active={
                          (MyClass.questionTotalList.length + 1) % 2 === 1
                            ? MyClass.questionTotalList.length >= idx + 2
                            : MyClass.questionTotalList.length === idx + 1
                        }
                      >
                        {item.checked ? (
                          <div>
                            <div>입력완료</div>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              Common.modalActive = true;
                              MyClass.questionPostId = item.id;
                            }}
                          >
                            <div>답지입력</div>
                          </div>
                        )}
                      </Answer>
                    ) : Auth.loggedUserType === 'parent' ? (
                      date < MyClass.answerDueDateObj[item.id] ? (
                        <Answer
                          type="main"
                          state={item.checked}
                          user={Auth.loggedUserType}
                          active={
                            (MyClass.questionTotalList.length + 1) % 2 === 1
                              ? MyClass.questionTotalList.length >= idx + 2
                              : MyClass.questionTotalList.length === idx + 1
                          }
                        >
                          {console.info(
                            '=========================================='
                          )}
                          {console.info(toJS(MyClass.markingStateAry[idx]))}
                          {MyClass.markingStateObj[idx] ? (
                            <div
                              style={{
                                backgroundColor: 'rgba(255,0,0,0.6)',
                                color: '#fff',
                              }}
                            >
                              {' '}
                              <div>제출완료</div>
                            </div>
                          ) : item.checked ? (
                            <div
                              onClick={async () => {
                                // MyClass.questionPostId = item.id;
                                // console.info(toJS(item));
                                // await MyClass.getAnswer(item.id);
                                // MyClass.tuteeAnswerModalActive = true;
                              }}
                              style={{
                                backgroundColor: 'rgba(0,85,255,0.6)',
                                color: '#000',
                                cursor: 'initial',
                              }}
                            >
                              <div>답안제출</div>
                            </div>
                          ) : (
                            <div>
                              <div>미입력</div>
                            </div>
                          )}
                        </Answer>
                      ) : (
                        <Answer type="main" state={true}>
                          <div
                            style={{
                              display: 'block',
                              backgroundColor: 'rgba(255,0,0,1)',
                            }}
                          >
                            <div>제출만료</div>
                          </div>
                        </Answer>
                      )
                    ) : date < MyClass.answerDueDateObj[item.id] ? (
                      <Answer
                        type="main"
                        state={item.checked}
                        user={Auth.loggedUserType}
                        active={
                          (MyClass.questionTotalList.length + 1) % 2 === 1
                            ? MyClass.questionTotalList.length >= idx + 2
                            : MyClass.questionTotalList.length === idx + 1
                        }
                      >
                        {console.info(
                          '=========================================='
                        )}
                        {console.info(toJS(MyClass.markingStateAry[idx]))}
                        {MyClass.markingStateObj[idx] ? (
                          <div
                            style={{
                              backgroundColor: 'rgba(255,0,0,0.6)',
                              color: '#fff',
                            }}
                          >
                            {' '}
                            <div>제출완료</div>
                          </div>
                        ) : item.checked ? (
                          <div
                            onClick={async () => {
                              // Common.modalActive = true;
                              MyClass.questionPostId = item.id;
                              console.info(toJS(item));
                              await MyClass.getAnswer(item.id);
                              MyClass.tuteeAnswerModalActive = true;
                            }}
                            style={{
                              backgroundColor: 'rgba(0,85,255,0.6)',
                              color: '#000',
                            }}
                          >
                            <div>답안제출</div>
                          </div>
                        ) : (
                          <div>
                            <div>미입력</div>
                          </div>
                        )}
                      </Answer>
                    ) : (
                      <Answer type="main" state={true}>
                        <div
                          style={{
                            display: 'block',
                            backgroundColor: 'rgba(255,0,0,1)',
                          }}
                        >
                          <div>제출만료</div>
                        </div>
                      </Answer>
                    )}
                    {/* {console.info(item.checked)} */}
                    {/* {console.info(
                      toJS(
                        MyClass.answerDueDateObj &&
                          MyClass.answerDueDateObj[idx]
                      )
                    )} */}
                    <DueDate type="main">
                      {item.checked ? (
                        <div>{MyClass.answerDueDateObj[item.id]}</div>
                      ) : (
                        <div>없음</div>
                      )}
                    </DueDate>
                    <TuteeAnswer
                      active={
                        (MyClass.questionTotalList.length + 1) % 2 === 1
                          ? MyClass.questionTotalList.length >= idx + 2
                          : MyClass.questionTotalList.length === idx + 1
                      }
                    >
                      {MyClass.markingStateObj[idx] ? (
                        <ResultBox>
                          <ResultScore>
                            {MyClass.markingTotalScoreObj[idx]} /{' '}
                            {MyClass.markingResultTotalObj[idx] &&
                              MyClass.markingResultTotalObj[idx].length}
                          </ResultScore>
                          <ResultBtn
                            onClick={() => {
                              MyClass.resultModalActive = true;
                            }}
                          >
                            <div>결과보기</div>
                          </ResultBtn>
                        </ResultBox>
                      ) : (
                        <div></div>
                      )}
                    </TuteeAnswer>
                  </Section>
                );
              })}
          </Main>
        </Table>
      </Container>
    );
  }
}

export default Content;

const Container = styled.div`
  // height: 100%;
  display: flex;
  flex-direction: column;
  //   margin: 100px 0;
  width: 100%;
  height: 1000px;
  //   border: 2px solid black;
  //   border-bottom:  1px solid black;
`;
const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  // div {
  //   font-size: 16px;
  // }

  // @media (min-width: 0px) and (max-width: 767.98px) {
  //   div {
  //     font-size: 12px;
  //   }
  // }
  // @media (min-width: 768px) and (max-width: 991.98px) {
  //   div {
  //     font-size: 14px;
  //   }
  // }

  // @media (min-width: 992px) and (max-width: 1299.98px) {
  //   div {
  //     font-size: 15px;
  //   }
  // }
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  //   border: 2px solid blue;
  background-color: rgba(103, 46, 30, 0.85);
  border-bottom: 1px solid #000;
  div {
    color: #fff;
    font-size: 16px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    div {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    div {
      font-size: 14px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    div {
      font-size: 15px;
    }
  }
`;
const Section = styled.div`
  display: flex;
  width: ${(props) => (props.type === 'header' ? '100%' : '100%')};
  //   border: 2px solid black;
  border-bottom: ${(props) =>
    props.type === 'main' ? '1px solid #707070' : 'none'};
  box-sizing: border-box;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
  }
`;
const Question = styled.div`
  padding: 3px 8px;
  //   width: ${(props) => (props.type === 'header' ? '60%' : '55%')};
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   border: 2px solid green;
  border-right: ${(props) =>
    props.type === 'header' ? '1px solid #000' : 'none'};
  border-bottom: ${(props) => (props.active ? 'none' : '1px solid #707070')};

  > img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  > div {
    font-size: 16px;
  }

  > a {
    text-decoration: none;
    font-size: 16px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 50%;
    > img {
      width: 15px;
      height: 15px;
    }
    > div {
      font-size: 12px;
    }
    > a {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 54%;
    > img {
      width: 17px;
      height: 17px;
    }
    > div {
      font-size: 14px;
    }
    > a {
      font-size: 14px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > img {
      width: 18px;
      height: 18px;
    }
    > div {
      font-size: 15px;
    }
    > a {
      font-size: 15px;
    }
  }
`;
const Answer = styled.div`
  padding: 3px 8px;
  //   width: ${(props) => (props.type === 'header' ? '20%' : '18%')};
  width: 20%;
  display: flex;
  align-items: center;
  // justify-content: ${(props) =>
    props.type === 'main' ? 'center' : 'flex-start'};
  // height: 40px;
  border-right: 1px solid #000;
  border-bottom: ${(props) => (props.active ? 'none' : '1px solid #707070')};

  > div {
    // border: 1px solid #707070;
    // height: 100%;
    width: ${(props) => (props.type === 'main' ? '80px' : '')};
    height: ${(props) => (props.type === 'main' ? '30px' : '')};
    border-radius: ${(props) => (props.type === 'main' ? '15px' : '')};
    background-color: ${(props) =>
      props.type === 'main'
        ? props.user === 'teacher'
          ? props.state
            ? 'rgba(255,0,0,0.6)'
            : 'rgba(0, 85, 255, 0.6)'
          : props.user === 'student'
          ? props.state
            ? 'rgba(255,0,0,0.6)'
            : '#ccc'
          : ''
        : ''};
    color: ${(props) =>
      props.type === 'main' ? (props.state ? '#fff' : '#000') : '#fff'};
    display: ${(props) => (props.type === 'main' ? 'flex' : 'block')};
    justify-content: center;
    align-items: center;
    padding: ${(props) => (props.type === 'main' ? '3px 8px' : '')};
    box-sizing: border-box;
    font-size: ${(props) => (props.type === 'main' ? '14px' : '16px')};
    cursor: ${(props) => (props.type === 'main' ? 'pointer' : 'initial')};
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 25%;

    > div {
      width: ${(props) => (props.type === 'main' ? '60px' : '')};
      height: ${(props) => (props.type === 'main' ? '26px' : '')};
      font-size: ${(props) => (props.type === 'main' ? '10px' : '12px')};
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 23%;
    > div {
      width: ${(props) => (props.type === 'main' ? '65px' : '')};
      height: ${(props) => (props.type === 'main' ? '28px' : '')};
      font-size: ${(props) => (props.type === 'main' ? '12px' : '14px')};
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      width: ${(props) => (props.type === 'main' ? '78px' : '')};
      height: ${(props) => (props.type === 'main' ? '30px' : '')};
      font-size: ${(props) => (props.type === 'main' ? '13px' : '15px')};
    }
  }
`;
const TuteeAnswer = styled.div`
  padding: 3px 8px;
  //   width: ${(props) => (props.type === 'header' ? '20%' : '19%')};
  width: 20%;
  border-right: ${(props) =>
    props.type === 'header'
      ? '1px solid #000'
      : props.type === 'headerBold'
      ? '2px solid #000'
      : 'none'};
  border-bottom: ${(props) => (props.active ? 'none' : '1px solid #707070')};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 25%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 23%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
`;
const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  // height: 50px;
`;

const SubMain = styled.div`
  display: flex;
  border: 2px solid red;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : '120')}px;
  height: 36px;
  background-color: rgba(235, 114, 82, 1);
  color: #fff;
  border: none;
  margin: 0 5px;
  margin-right: ${(props) => (props.last ? '5px' : '')};
  border-radius: 5px;
  margin-bottom: 10px;
  > div {
    font-size: 15px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: ${(props) => (props.width ? props.width - 40 : '120')}px;
    > div {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: ${(props) => (props.width ? props.width - 30 : '120')}px;
    > div {
      font-size: 13px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: ${(props) => (props.width ? props.width - 20 : '120')}px;
    > div {
      font-size: 14px;
    }
  }
`;

const Layer = styled.div`
  // position: absolute;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 399;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);
  // overflow-y: scroll !important;
  // height: auto;
  > div {
    display: flex;
    justify-content: center;
    // align-items: center;
    // height: 100vh;
    height: 90%;
    overflow-y: scroll !important;
    margin-top: 30px;
  }
`;
const ResultBox = styled.div`
  display: flex;
`;
const ResultScore = styled.div`
  margin-right: 5px;
`;
const ResultBtn = styled.div`
  background-color: rgba(235, 114, 82, 0.7);
  border-radius: 5px;
  padding: 3px 5px;
  box-sizing: border-box;
  cursor: pointer;

  > div {
    // color: #fff;
    font-size: 14px;
  }
`;

const DueDate = styled.div`
  padding: 3px 8px;
  //   width: ${(props) => (props.type === 'header' ? '20%' : '18%')};
  width: 20%;
  display: flex;
  align-items: center;
  // justify-content: ${(props) =>
    props.type === 'main' ? 'center' : 'flex-start'};
  // height: 40px;
  border-right: 1px solid #000;
  border-bottom: ${(props) => (props.active ? 'none' : '1px solid #707070')};

  > div {
    // border: 1px solid #707070;
    // height: 100%;
    // width: ${(props) => (props.type === 'main' ? '80px' : '')};
    height: ${(props) => (props.type === 'main' ? '30px' : '')};
    border-radius: ${(props) => (props.type === 'main' ? '15px' : '')};
    background-color: ${(props) =>
      props.type === 'main'
        ? props.user === 'teacher'
          ? props.state
            ? 'rgba(255,0,0,0.6)'
            : 'rgba(0, 85, 255, 0.6)'
          : props.user === 'student'
          ? props.state
            ? 'rgba(255,0,0,0.6)'
            : '#ccc'
          : ''
        : ''};
    color: ${(props) =>
      props.type === 'main' ? (props.state ? '#fff' : '#000') : '#fff'};
    display: ${(props) => (props.type === 'main' ? 'flex' : 'block')};
    justify-content: center;
    align-items: center;
    padding: ${(props) => (props.type === 'main' ? '3px 8px' : '')};
    box-sizing: border-box;
    font-size: ${(props) => (props.type === 'main' ? '14px' : '16px')};
    cursor: ${(props) => (props.type === 'main' ? 'pointer' : 'initial')};
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 25%;

    > div {
      // width: ${(props) => (props.type === 'main' ? '60px' : '')};
      height: ${(props) => (props.type === 'main' ? '26px' : '')};
      font-size: ${(props) => (props.type === 'main' ? '10px' : '12px')};
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 23%;
    > div {
      // width: ${(props) => (props.type === 'main' ? '65px' : '')};
      height: ${(props) => (props.type === 'main' ? '28px' : '')};
      font-size: ${(props) => (props.type === 'main' ? '12px' : '14px')};
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      // width: ${(props) => (props.type === 'main' ? '78px' : '')};
      height: ${(props) => (props.type === 'main' ? '30px' : '')};
      font-size: ${(props) => (props.type === 'main' ? '13px' : '15px')};
    }
  }
`;
