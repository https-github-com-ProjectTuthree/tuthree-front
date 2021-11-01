import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { inject, observer } from 'mobx-react';
import Modal from '../../../../components/Modal';
import previousImg from '../../../../static/images/Common/previous2.png';
import nextImg from '../../../../static/images/Common/next2.png';
import ScheduleWriting from './Writing/ScheduleWriting';
import SelectReport from './Select/ClassReport';
import { toJS } from 'mobx';
import { VIDEO_URL } from '../../../../axios';
import moment from 'moment';

// const scheduleStyle = {
//   // height: '20%',
//   // height: '30px',
// };

// console.log("리덕스에서 가져온 스케쥴",schedules)
//   const schedules = useSelector((state) => state.calendar.schedules);
const schedules = [
  {
    date: '2021-10-20T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-20T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-20T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-20T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-20T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-20T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },

  {
    date: '2021-10-25T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-25T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-25T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-25T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
  {
    date: '2021-10-25T22:05',
    desc: '기출문제 1p ~ 21p 풀기ㅇㄴ라ㅣㅓㄴㅇ리ㅏ넝러ㅏ이나린어ㅏㅣㅇㄴ라',
    completed: false,
  },
  {
    date: '2021-10-25T22:05',
    desc: '기출문제 1p ~ 21p 풀기',
    completed: false,
  },
];

const monList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let calendarDays = [];
let new_month = [];

@inject('MyClass', 'Common', 'Auth')
@observer
class Calendar extends React.Component {
  makeCalendar = (year, month) => {
    const { MyClass } = this.props;
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let endDateOfMonth = new Date(year, month + 1, 0).getDate();
    calendarDays = [];
    new_month = [];
    // console.info(calendarDays);
    let cnt = 1;
    for (let i = 0; i < 6; i++) {
      var _days = [];
      for (let j = 0; j < 7; j++) {
        if (cnt > endDateOfMonth) {
          _days.push('');
        } else if (firstDayOfMonth > j && i === 0) {
          _days.push('');
        } else {
          _days.push(cnt);
          cnt++;
        }
      }
      calendarDays.push(_days);
    }
    // console.info(calendarDays);
    // console.info(calendarDays[4][0]);
    // console.info(calendarDays[5][0]);
    if (!calendarDays[5][0]) {
      // console.info('DDFSDF');
      calendarDays.splice(5, 1);
    }
    // console.info(calendarDays);
    //   console.info(week);
    new_month = calendarDays.map((week, pid) => {
      // console.info(pid);
      return (
        <Row key={week}>
          {week.map((day, idx) => {
            // console.info(`${pid} : ${idx}`);
            // console.info(week);
            // console.info(day);
            // console.info('=============================');
            let dateKey =
              year +
              '-' +
              (month < 9 ? '0' + (month + 1) : month + 1) +
              '-' +
              (day < 10 ? '0' + day : day);
            // console.log(thisyear+"-"+(thismonth<9? "0"+(thismonth+1):(thismonth+1))+"-"+day);
            // console.info(dateKey);
            // console.info(idx == 0);
            return (
              <Item
                // key={dateKey}
                active={MyClass.chosenDay === day}
                key={`${pid}${idx}`}
                // style={{ border: '1px+ solid #aaa', boxSizing: 'border-box' }}

                onClick={() => {
                  if (MyClass.chosenDay === day) {
                    MyClass.chosenDay = -1;
                    MyClass.selectedDate = '';
                    MyClass.selectedDateMoment = '';
                  } else {
                    if (day) {
                      MyClass.chosenDay = day;
                      MyClass.selectedDate = dateKey;

                      MyClass.selectedDateMoment = new Date(
                        Date.UTC(
                          year,
                          month < 9 ? '0' + month : month,
                          day < 10 ? '0' + day : day
                        )
                      );
                    } else {
                      MyClass.chosenDay = -1;
                      MyClass.selectedDate = '';
                      MyClass.selectedDateMoment = '';
                    }
                  }
                  // console.info(MyClass.chosenDay);
                  // console.info(day);
                  // console.info(month);
                  // console.info(week);
                  // console.info(year);
                  // console.info(dateKey);
                  // console.info(new moment(`dateKey`).toUTC);
                  // console.info(
                  //   new Date(
                  //     Date.UTC(
                  //       year,
                  //       month < 9 ? '0' + month : month,
                  //       day < 10 ? '0' + day : day
                  //     )
                  //   )
                  // );

                  // console.info(new moment(`dateKey`).utc().format());
                  // console.info(`${pid} : ${idx}`);

                  // Tue Sep 28 2021 00:00:00 GMT+0900 (한국 표준시)
                }}
              >
                <span
                  style={{
                    color:
                      idx == 0 ? '#CE879F' : idx == 6 ? '#CE879F' : '#444078',
                  }}
                >
                  {day}
                </span>

                {/* {MyClass.scheduleAry.filter((schedule) => schedule)} */}
                {/* {console.info(
                  MyClass.seceduleAry.filter((schedule) => schedule.date.substr(0, 10) === dateKey)
                )} */}
                {/* {console.info(toJS(MyClass.scheduleAry))}
                {console.info(schedules)}

                {console.info(typeof MyClass.scheduleAry)}
                {console.info(typeof schedules)} */}
                {MyClass.scheduleAry &&
                  MyClass.scheduleAry
                    .filter(
                      (schedule) => schedule.date.substr(0, 10) === dateKey
                    )
                    .sort()
                    .map((schedule) => {
                      return (
                        <>
                          {
                            // console.info('1')
                            // console.info(schedule)
                          }

                          <SubItem
                            // style={scheduleStyle}
                            choose={MyClass.chosenDay === day}
                            active={schedule.type === '일정'}
                            className={schedule.type}
                            key={schedule.schedule}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (schedule.type === '보고서') {
                                MyClass.selectModalActive = true;
                                MyClass.getDetailReport(schedule.date);
                              }
                              console.info(toJS(schedule));
                            }}
                          >
                            {schedule.type === '보고서'
                              ? '수업보고서'
                              : schedule.schedule}
                            <Modal
                              isOpen={MyClass.isModalOpen}
                              close={MyClass.closeModal}
                            />
                          </SubItem>
                        </>
                      );
                    })}
              </Item>
            );
          })}
        </Row>
      );
    });
    console.info(new_month);
    return new_month;
  };

  componentDidMount = () => {
    const { MyClass, today } = this.props;
    var thisyear = today.getFullYear();
    var thismonth = today.getMonth();
    console.info(thisyear);
    console.info(thismonth);
    if (calendarDays.length === 0) {
      this.makeCalendar(thisyear, thismonth);
    }
    console.log('첫 로딩 시 현재 월 출력', thisyear, thismonth);

    MyClass.month = thismonth;
    MyClass.year = thisyear;
  };
  //   window.addEventListener(
  //     'DOMContentLoaded',
  //     () => {
  //       if (calendarDays.length === 0) {
  //         makeCalendar(thisyear, thismonth);
  //       }
  //       console.log('첫 로딩 시 현재 월 출력', thisyear, thismonth);
  //     },
  //     { once: true }
  //   );

  //   MyClass.month = thismonth;
  //   MyClass.year = thisyear;

  // const [month, changeMonth] = useState(thismonth);
  // const [year, changeYear] = useState(thisyear);
  // const [isModalOpen, setModalState] = useState(false);

  nextMonth = () => {
    const { MyClass } = this.props;
    console.info(MyClass.month);
    console.info(MyClass.year);
    if (MyClass.month != 11) {
      // changeMonth((month) => month + 1);
      MyClass.month += 1;
    } else {
      // changeMonth((month) => month - 11);
      MyClass.month -= 11;
      // changeYear((year) => year + 1);
      MyClass.year += 1;
    }
    console.info(MyClass.month);
    console.info(MyClass.year);
    this.makeCalendar(MyClass.year, MyClass.month);
    console.log('next!', MyClass.year, MyClass.month, new_month);
  };
  prevMonth = () => {
    const { MyClass } = this.props;
    console.info(MyClass.month);
    console.info(MyClass.year);
    if (MyClass.month != 0) {
      // changeMonth((month) => month - 1);
      MyClass.month -= 1;
    } else {
      // changeMonth((month) => month + 11);
      MyClass.month += 11;
      // changeYear((year) => year - 1);
      MyClass.year -= 1;
    }
    console.info(MyClass.month);
    console.info(MyClass.year);
    this.makeCalendar(MyClass.year, MyClass.month);
  };

  // openModal = () => {
  //   //   setModalState({ isModalOpen: true });
  //   const { MyClass } = this.props;
  //   MyClass.isModalOpen = true;
  // };

  // closeModal = () => {
  //   const { MyClass } = this.props;
  //   //   setModalState({ isModalOpen: false });
  //   MyClass.isModalOpen = false;
  // };

  openSelectModal = () => {
    const { MyClass } = this.props;
    MyClass.selectModalActive = false;
  };
  closeSelectModal = () => {
    const { MyClass } = this.props;
    MyClass.selectModalActive = true;
  };

  openModal = () => {
    const { Common } = this.props;
    Common.modalActive = false;
  };
  closeModal = () => {
    const { Common } = this.props;
    Common.modalActive = true;
  };

  render() {
    const { today, history, MyClass, Common, Auth } = this.props;

    return (
      <Container>
        <Header>
          <DateItem>
            <img onClick={this.prevMonth} src={previousImg} />
            <div>
              {monList[MyClass.month]} {MyClass.year}
            </div>
            <img onClick={this.nextMonth} src={nextImg} />
          </DateItem>
          <ButtonBox>
            {Auth.loggedUserType !== 'parent' && (
              <Button
                width={100}
                onClick={() => {
                  window.open(VIDEO_URL);
                }}
              >
                <div>화상강의</div>
              </Button>
            )}

            {Auth.loggedUserType !== 'parent' && (
              <Button
                width={100}
                last={true}
                onClick={() => (Common.modalActive = true)}
              >
                <div>일정생성</div>
              </Button>
            )}

            {MyClass.selectModalActive === true && (
              <Layer>
                <div>
                  <SelectReport
                    // width={width}
                    open={this.openSelectModal}
                    close={this.closeSelectModal}
                  />
                </div>
              </Layer>
            )}

            {Common.modalActive === true && Common.modalState === 1 && (
              <Layer>
                <div>
                  <ScheduleWriting
                    // width={width}
                    open={this.openModal}
                    close={this.closeModal}
                  />
                </div>
              </Layer>
            )}

            {/* <Button>
              <div>문제지/답지 등록</div>
            </Button> */}
          </ButtonBox>
        </Header>
        <Days>
          <Day>
            <div>일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div>토</div>
          </Day>

          {this.makeCalendar(MyClass.year, MyClass.month)}
        </Days>

        {/* <FloatBtn1>Finished</FloatBtn1>
      <FloatBtn2
        onClick={() => {
          props.history.push('/add');
        }}
      >
        Add
      </FloatBtn2> */}
      </Container>
    );
  }
}

const Container = styled.div`
  //   width: 100vw;
  width: 100%;
  margin: 10px 0;
  //   height: 100vh;
  //   height: 100%;
  align-items: center;
  /* justify-content:center; */
  flex-direction: column;
  display: flex;
  font-size: 20px;
  //   border: 2px solid blue;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 5px 0px;
  box-sizing: border-box;
  font-weight: 600;
  width: 100%;
  height: 14%;

  //   border: 2px solid #000;

  //   & button {
  //     margin: 0 25px;
  //     cursor: pointer;
  //     outline: none;
  //     display: inline-flex;
  //     background: transparent;
  //     border: none;
  //     color: #444078;
  //     font-size: 1.2em;
  //     padding: 4px;
  //     &:hover {
  //       //   color: #fff;
  //     }
  //     &:active {
  //     }
  //   }
`;
const Days = styled.div`
  background-color: #fff;
  width: 99%;
  //   width: 100%;
  //   height: 81%;
  //   padding: 8px 10px;
  box-sizing: border-box;
  //   color: #787c9c;
  color: #000;
  margin: 0;
  border-radius: 5px;
  font-size: 0.8em;
  //   border: 2px solid red;
`;
const Day = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  height: 40px;
  justify-content: space-around;
  align-items: center;
  border: 2px solid #000;
  background-color: rgba(103,46,30,0.85);
  color: #fff;
  //   border: 2px solid green;
//   & div {
//     min-width: 13%;
//     max-height: 5%;
//     text-align: center;
//     font-weight: 600;
//     box-sizing: border-box;
  }
`;

const Row = styled.div`
  width: 100%;
  //   height: 16%;
  //   min-height: 16%;
  display: flex;
  justify-content: space-between;
  //   border: 2px solid green;
  border-left: 0.5px solid #707070;
  border-right: 0.5px solid #707070;
  border-bottom: 2px solid #707070;
  box-sizing: border-box;
  > div {
    width: 13%;
    // height: 100%;
    font-weight: 600;
    box-sizing: border-box;
    // display: flex;
    // flex-direction: column;
    // border: 2px solid green;
    flex-grow: 1;
    border: 0.5px solid #707070;
    border-bottom: none;
    border-top: none;

    // margin-top: -1px;
    // margin-left: -0.5px;
    // margin-right: -0.5px;
    // border: 2px solid orange;
    min-height: 85px;
    clear: both;
    l &:hover {
      background-color: rgba(235, 114, 82, 0.7);
      background-color: #ccc;
    }
  }
  & span {
    margin: 3px 0 0 3px;
    font-size: 0.8em;
    // border: 2px solid blue;
  }
`;

const FloatBtn1 = styled.button`
  box-shadow: 0 1px 2px 0 #777;
  position: fixed;
  z-index: 999;
  right: 6%;
  bottom: 18%;
  width: 18%;
  min-width: 80px;
  max-width: 130px;
  height: 30px;
  margin: auto 0px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.7em;
  color: #4d4887;
  cursor: pointer;
  outline: none;
`;
const FloatBtn2 = styled.button`
  box-shadow: 0 1px 2px 0 #777;
  position: fixed;
  z-index: 999;
  right: 6%;
  bottom: 10%;
  width: 18%;
  min-width: 80px;
  max-width: 130px;
  height: 30px;
  margin: auto 0px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  color: #4d4887;
  font-size: 0.7em;
  cursor: pointer;
  outline: none;
  & img {
    margin-top: 2px;
    max-height: 70%;
    width: auto;
    color: #bebddb;
  }
`;
const SubItem = styled.div`
  //   border: 2px solid red;

  width: 60%;
  min-height: 30px;

  background-color: ${(props) =>
    props.active
      ? props.choose
        ? 'rgba(11, 125, 239, 0.8)'
        : 'rgba(11, 125, 239, 0.3)'
      : props.choose
      ? 'rgba(255, 0, 0, 0.6)'
      : 'rgba(255, 0, 0, 0.3)'};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: break-spaces;
  color: ${(props) => (props.choose ? '#fff' : '#000')};
  padding: 1px;
  margin: 5px 0 5px 5px;
  font-size: 0.5em;
  cursor: pointer;
  flex-grow: initial;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  font-weight: 500;
`;

const Item = styled.div`
  background-color: ${(props) =>
    props.active ? 'rgba(235,114,82, 0.3)' : '#fff'};
`;
const DateItem = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 32px;
    margin: 0 5px;
    // margin-top: 5px;
    cursor: pointer;
  }
  > div {
    margin: 0 15px;
    margin-bottom: 5px;
    font-size: 24px;
    // font-size: 1em;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      font-size: 15px;
      margin: 0 7px;
      margin-bottom: 3px;
    }
    > img {
      width: 18px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      font-size: 18px;
      margin: 0 10px;
      margin-bottom: 3px;
    }
    > img {
      width: 22px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      font-size: 21px;
    }
    > img {
      width: 28px;
    }
  }
`;
const ButtonBox = styled.div`
  display: flex;
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
  > div {
    font-size: 15px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: ${(props) => (props.width ? props.width - 40 : '120')}px;
    height: 24px;
    > div {
      font-size: 11px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: ${(props) => (props.width ? props.width - 28 : '120')}px;
    height: 28px;
    > div {
      font-size: 13px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: ${(props) => (props.width ? props.width - 15 : '120')}px;
    height: 32px;
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
    align-items: center;
    // height: 100vh;
    height: 100%;
    overflow-y: scroll !important;
  }
`;
export default Calendar;
