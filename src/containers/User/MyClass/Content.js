import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import ClassCard from '../../../components/ClassCard';
import ReviewContainer from '../../../components/Review';
import MySchedule from './MySchedule';
import Enrollment from './Enrollment';
import { toJS } from 'mobx';

const dummyData = [
  {
    id: 143,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 27234,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 3234,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 427,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 527,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 276,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 72534,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 8234,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 8234,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 8234,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
  {
    id: 8234,
    name: '김길동',
    subject: ['영어', '수학'],
    start_Dt: '2021-09-22',
    active: false,
  },
];

@inject('MyClass', 'Auth')
@observer
class Content extends Component {
  componentDidMount = async () => {
    const { MyClass, Auth } = this.props;
    if (Auth.loggedUserType === 'parent') {
      await MyClass.getChildClassList();
    } else {
      await MyClass.getClass(Auth.loggedUserId);
    }
  };
  reviewOpenModal = () => {
    const { MyClass } = this.props;
    MyClass.reviewModalActive = false;
  };
  reviewCloseModal = () => {
    const { MyClass } = this.props;
    MyClass.reviewModalActive = true;
  };

  myScheduleOpenModal = () => {
    const { MyClass } = this.props;
    MyClass.myScheduleModalActive = false;
  };
  myScheduleCloseModal = () => {
    const { MyClass } = this.props;
    MyClass.myScheduleModalActive = true;
  };

  enrollmentOpenModal = () => {
    const { MyClass } = this.props;
    MyClass.enrollmentModalActive = false;
  };
  enrollmentCloseModal = () => {
    const { MyClass } = this.props;
    MyClass.enrollmentModalActive = true;
  };

  render() {
    const { MyClass, Auth } = this.props;
    console.info(MyClass.reviewModalActive);
    return (
      <Container>
        <Header>
          <Section>
            <Label>MyClass</Label>
            {/* {Auth.loggedUserType !== 'parent' && ( */}
            <ButtonBox>
              <Button
                color="#fff"
                bcolor="rgb(235, 114, 82)"
                onClick={async () => {
                  await MyClass.getTimeTable();
                  MyClass.myScheduleModalActive = true;
                }}
              >
                <div>시간표</div>
              </Button>
            </ButtonBox>
            {/* )} */}
          </Section>
          {Auth.loggedUserType !== 'parent' ? (
            <SortingBox active={MyClass.status}>
              <span
                onClick={async () => {
                  MyClass.status = 'OPEN';
                  await MyClass.getClass(Auth.loggedUserId);
                }}
              >
                {Auth.loggedUserType === 'teacher'
                  ? '현재 수강 학생'
                  : '현재 수강 선생님'}
              </span>
              <span
                onClick={async () => {
                  MyClass.status = 'CLOSE';
                  await MyClass.getClass(Auth.loggedUserId);
                }}
              >
                {Auth.loggedUserType === 'teacher'
                  ? '과거 수강 학생'
                  : '과거 수강 선생님'}
              </span>
            </SortingBox>
          ) : (
            <ButtonBox>
              <Button
                color="#fff"
                bcolor="rgb(235, 114, 82)"
                onClick={async () => {
                  // await MyClass.getTimeTable();
                  MyClass.enrollmentModalActive = true;
                }}
              >
                <div>자녀 추가</div>
              </Button>
            </ButtonBox>
          )}
        </Header>
        <Main>
          {/* {dummyData.map((item, idx) => {
            return (
              <div onClick={() => (MyClass.state = 2)}>
                <ClassCard
                  number={item.id}
                  id={idx}
                  type="teacher"
                  name={item.name}
                  date={item.start_Dt}
                  subject={item.subject}
                  active={item.acitve}
                />
              </div>
            );
          })} */}
          {console.info(Auth.loggedUserType)}
          {Auth.loggedUserType === 'parent'
            ? MyClass.childClassAry &&
              MyClass.childClassAry.map((item, idx) => {
                {
                  console.info(toJS(item));
                }
                return (
                  <div
                    onClick={async () => {
                      MyClass.state = 2;
                      // await MyClass.getClass(item.studentId);
                      MyClass.teacherName = item.teacherName;
                      MyClass.studentName = item.studentName;
                      MyClass.teacherId = item.teacherId;
                      MyClass.studentId = item.studentId;
                      await MyClass.getCalendar();
                      // MyClass.parentState = 2;
                    }}
                  >
                    <ClassCard
                      number={item.id}
                      id={idx}
                      type="parent"
                      studentName={item.studentName}
                      teacherName={item.teacherName}
                      teacherId={item.teacherId}
                      date={item.date}
                      subject={item.subject}
                      active={item.acitve}
                    />
                  </div>
                );
              })
            : MyClass.classAry &&
              MyClass.classAry.map((item, idx) => {
                return (
                  <div
                    onClick={async (e) => {
                      // e.stopPropagation();
                      console.info('card');
                      MyClass.state = 2;
                      MyClass.teacherName = item.teacherName;
                      MyClass.studentName = item.studentName;
                      MyClass.teacherId = item.teacherId;
                      MyClass.studentId = item.studentId;
                      await MyClass.getCalendar();
                    }}
                  >
                    <ClassCard
                      number={item.id}
                      id={idx}
                      type="teacher"
                      studentName={item.studentName}
                      teacherName={item.teacherName}
                      teacherId={item.teacherId}
                      studentId={item.studentId}
                      date={item.date}
                      subject={item.subject}
                      active={item.acitve}
                    />
                  </div>
                );
              })}
        </Main>
        {MyClass.reviewModalActive === true && (
          <Layer>
            <div>
              <ReviewContainer
                // width={width}
                open={this.reviewOpenModal}
                close={this.reviewCloseModal}
              />
            </div>
          </Layer>
        )}

        {MyClass.myScheduleModalActive === true && (
          <Layer>
            <div>
              <MySchedule
                // width={width}
                open={this.myScheduleOpenModal}
                close={this.myScheduleCloseModal}
              />
            </div>
          </Layer>
        )}

        {MyClass.enrollmentModalActive === true && (
          <Layer alignItems={true}>
            <div>
              <Enrollment
                // width={width}
                open={this.enrollmentOpenModal}
                close={this.enrollmentCloseModal}
              />
            </div>
          </Layer>
        )}
      </Container>
    );
  }
}

export default Content;

const Container = styled.div`
  margin: 100px 0;
  width: 100%;
  //   height: 1000px;
  display: flex;
  flex-direction: column;
  min-height: 800px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #000;
  padding-bottom: 10px;
  box-sizing: border-box;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-bottom: 5px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
`;
const Label = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
const Main = styled.div`
  display: inline-flex;
  //   flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 24px;
  flex-flow: row wrap;
  //   &:after {
  //     content: '';
  //     flex: auto;
  //   }
  flex-flow: row wrap;
  padding: 0 15px; /* NEW */

  //   @media (min-width: 0px) and (max-width: 591.98px) {
  //     justify-content: center;
  //     > div {
  //       width: 100%;
  //     }
  //     // &:after {
  //     //   height: 0;
  //     //   width: 30%;
  //     //   content: '';
  //     // }
  //   }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      //   width: 80%;
      width: 100%;
    }
    // &:after {
    //   height: 0;
    //   width: 100%;
    //   content: '';
    // }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
    &:after {
      height: 0;
      width: 30%;
      content: '';
    }
  }
`;

const SortingBox = styled.div`
  > span:not(:last-child) {
    border-right: 1px solid #888;
  }
  >span:nth-of-type(1){
    color: ${(props) => (props.active === 'OPEN' ? 'blue' : 'black')}; 
  }

  >span:nth-of-type(2){
    color: ${(props) => (props.active === 'CLOSE' ? 'blue' : 'black')}; 
  }
  > span {
    // color: ${(props) => (props.active ? 'blue' : 'black')}; 
    padding 0 5px;
    box-sizing: border-box;
    font-size: 15px;
    cursor: pointer;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > span {
      font-size: 11px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > span {
      font-size: 13px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > span {
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
    align-items: ${(props) => props.alignItems && 'center'};
  }
`;

const ButtonBox = styled.div`
  // margin-top: 60px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  //   width: 180px;
  height: 40px;
  color: ${(props) => (props.color ? props.color : '')};
  background-color: ${(props) => (props.bcolor ? props.bcolor : '')};
  border: ${(props) => (props.border ? props.border : 'none')};
  margin: 0 10px;
  //   margin-bottom: 200px;
  border-radius: 3px;
  cursor: pointer;
  width: 100%;
  > div {
    font-size: 18px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    min-width: 50px;
    height: 32px;
    margin: 0 10px;
    > div {
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    // width: 180px;
    height: 36px;
    > div {
      font-size: 16px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: 180px;
    height: 40px;
    > div {
      font-size: 17px;
    }
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const ChildEnrollment = styled.div``;
