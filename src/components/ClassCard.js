import React, { Component } from 'react';
import styled from 'styled-components';
import moreImg from '../static/images/Common/list.png';
import defaultImg from '../static/images/Common/defaultUser.png';
import { inject, observer } from 'mobx-react';

@inject('MyClass', 'Auth')
@observer
class ClassCard extends Component {
  state = {
    moreState: -1,
  };

  render() {
    const {
      date,
      subject,
      id,
      teacherId,
      studentId,
      MyClass,
      type,
      Auth,
      studentName,
      teacherName,
    } = this.props;

    return (
      <>
        {type !== 'parent' ? (
          <Container>
            <img
              src={moreImg}
              onClick={(e) => {
                e.stopPropagation();
                if (MyClass.moreState === -1) {
                  //   this.setState({ moreState: id });
                  MyClass.moreState = id;
                } else {
                  if (MyClass.moreState === id) {
                    // this.setState({ moreState: -1 });
                    MyClass.moreState = -1;
                  } else {
                    // this.setState({ moreState: id });
                    MyClass.moreState = id;
                  }
                }
              }}
            />

            {MyClass.moreState === id && (
              <Menu>
                <div>
                  <div>
                    <Button>
                      <div>채팅하기</div>
                    </Button>
                  </div>
                  {Auth.loggedUserType === 'student' && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        MyClass.reviewTutorId = '';
                        MyClass.reviewTutorId = teacherId;
                        MyClass.reviewModalActive = true;
                      }}
                    >
                      <Button>
                        <div>리뷰작성</div>
                      </Button>
                    </div>
                  )}

                  <div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        console.info('end');
                        MyClass.endClass(teacherId, studentId);
                      }}
                    >
                      <div>수업종료</div>
                    </Button>
                  </div>
                </div>
              </Menu>
            )}
            <Img>
              <img src={defaultImg} />
              {/* <div>Img</div> */}
            </Img>
            <Content>
              <Box>
                {' '}
                {Auth.loggedUserType === 'teacher' ? (
                  <Label ml={5} fw="bold" fs={18}>
                    {studentName}
                  </Label>
                ) : (
                  <Label ml={5} fw="bold" fs={18}>
                    {teacherName}
                  </Label>
                )}
              </Box>

              <Box>
                {' '}
                <Label ml={5} fs={14} color="#888" mb={30}>
                  {date}~
                </Label>
              </Box>

              <Label value="multiple">
                {subject &&
                  subject.map((item, idx) => {
                    return (
                      <MutlipleBox type="subject">
                        <div>{item}</div>
                      </MutlipleBox>
                    );
                  })}
              </Label>
            </Content>
          </Container>
        ) : (
          <Container>
            <img
              src={moreImg}
              onClick={(e) => {
                e.stopPropagation();
                if (MyClass.moreState === -1) {
                  //   this.setState({ moreState: id });
                  MyClass.moreState = id;
                } else {
                  if (MyClass.moreState === id) {
                    // this.setState({ moreState: -1 });
                    MyClass.moreState = -1;
                  } else {
                    // this.setState({ moreState: id });
                    MyClass.moreState = id;
                  }
                }
              }}
            />

            {MyClass.moreState === id && (
              <Menu>
                <div>
                  <div>
                    <Button>
                      <div>채팅하기</div>
                    </Button>
                  </div>
                  {Auth.loggedUserType === 'student' && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        MyClass.reviewTutorId = '';
                        MyClass.reviewTutorId = teacherId;
                        MyClass.reviewModalActive = true;
                      }}
                    >
                      <Button>
                        <div>리뷰작성</div>
                      </Button>
                    </div>
                  )}
                  {Auth.loggedUserType !== 'parent' && (
                    <div>
                      <Button>
                        <div>수업종료</div>
                      </Button>
                    </div>
                  )}
                </div>
              </Menu>
            )}
            <Img>
              <img src={defaultImg} />
              {/* <div>Img</div> */}
            </Img>
            <Content>
              <Box>
                {' '}
                <Label ml={5} fw="bold" fs={18}>
                  {studentName}
                  <br />
                  <span>({teacherName}선생님)</span>
                </Label>
              </Box>

              <Box>
                {' '}
                <Label ml={5} fs={14} color="#888" mb={30}>
                  {date}~
                </Label>
              </Box>

              <Label value="multiple">
                {subject &&
                  subject.map((item, idx) => {
                    return (
                      <MutlipleBox type="subject">
                        <div>{item}</div>
                      </MutlipleBox>
                    );
                  })}
              </Label>
            </Content>
          </Container>
        )}
      </>
    );
  }
}

export default ClassCard;

const Container = styled.div`
  cursor: pointer;
  width: 350px;
  min-height: 200px;
  //   height: auto;
  //   min-height: 350px;
  border: 2px solid #707070;
  border-radius: 3px;
  display: flex;
  //   flex-direction: column;
  margin-bottom: 50px;
  box-shadow: 0 6px 15px 1px rgba(0, 0, 0, 0.5);
  //   margin: 10px auto;
  position: relative;
  > img {
    // cursor: pointer;
    // width: 32px;
    position: absolute;
    top: 5%;
    right: 3%;
  }

  //   @media (min-width: 0px) and (max-width: 591.98px) {
  //     margin-bottom: 20px;
  //     width: 95%;
  //   }

  @media (min-width: 0px) and (max-width: 767.98px) {
    // margin: 0 15px 20px 15px;
    margin-bottom: 20px;

    // width: 275px;
    width: 95%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 300px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 325px;
  }
`;
const Img = styled.div`
  width: 50%;
  // height: 150px;
  // background-color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  //   border-bottom: 1px solid #707070;
  overflow: hidden;
  > div {
    font-size: 20px;
    font-weight: bold;
  }
  > img {
    width: 100px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > img {
      //   width: 100px;
      max-width: 120px;
      width: 80%;
      //   height: 80%;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: 100%;
  }
`;
const Content = styled.div`
  padding: 15px 15px 0 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 75%;

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.div`
  margin-bottom: ${(props) => (props.mb ? props.mb : '15')}px;
  margin-top: ${(props) => (props.mt ? props.mt : '0')}px;
  font-size: ${(props) => (props.fs ? props.fs : '16')}px;
  font-weight: ${(props) => (props.fw ? props.fw : 'normal')};
  color: ${(props) => (props.color ? props.color : '#000')};
  width: 100%;
  > img {
    margin-right: ${(props) => (props.mr ? props.mr : '5')}px;
    margin-left: ${(props) => (props.ml ? props.ml : '5')}px;
  }
  > span {
    font-size: 14px;
    color: blue;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    // margin-bottom: 5px;
    font-size: ${(props) => (props.fs ? props.fs - 3 : '13')}px;
    > span {
      font-size: 11px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: ${(props) => (props.fs ? props.fs - 2 : '14')}px;
    > span {
      font-size: 12px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: ${(props) => (props.fs ? props.fs - 1 : '15')}px;
    > span {
      font-size: 13px;
    }
  }
`;

const MutlipleBox = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) =>
    props.type === 'region' ? '#a596c4' : '#7eb1a8'};
  border-radius: 30px;
  padding: 3px 10px;
  box-sizing: border-box;
  margin-right: 5px;
  margin-bottom: 5px;

  > div {
    font-size: 12px;
    // margin-right: 5px;
    color: #000;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 2px 6px;
    margin-right: 3px;
    margin-bottom: 3px;
    > div {
      font-size: 10px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 3px 8px;
    margin-right: 4px;
    margin-bottom: 4px;
    > div {
      font-size: 11px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
`;

const Menu = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  //   margin-top: 40px;
  top: 40px;
  right: 25px;
  // width: 14em;
  // width: 7em;
  transform: translateX(40px);
  // border: 2px solid #000;
  box-shadow: 0 3px 10px 2px rgba(0, 0, 0, 0.45);
  z-index: 2;
  > div {
    > div {
      width: 100px;
      cursor: pointer;
      height: 50px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #707070;
    }
    > div:last-child {
      border: none;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    // width: 4.5em;
    right: 30px;
    > div {
      > div {
        height: 30px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    // width: 5em;
    right: 23px;
    > div {
      > div {
        height: 32px;
      }
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: 6em;
    right: 25px;
    > div {
      > div {
        height: 36px;
      }
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  // border-bottom: 2px solid red;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 50px;
  //   width: 100px;
  border: ${(props) => (props.bd ? '1px solid #aaa' : 'none')};
  border-radius: ${(props) => (props.bd ? '50' : '0')}px;
  height: ${(props) => (props.height ? props.height : '0')}px;
  box-sizing: border-box;
  // padding: ${(props) => (props.pd ? '5' : '0')}px;
  > div {
    font-size: 16px;
    font-weight: 500;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
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

const Layer = styled.div`
  // position: absolute;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 399;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.1);
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
