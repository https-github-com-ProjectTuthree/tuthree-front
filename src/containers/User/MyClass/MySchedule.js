import React, { Component } from 'react';
// import { render } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { inject, observer } from 'mobx-react';
// the imports
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';
// const localizer = momentLocalizer(moment);

// // import 'react-big-calendar/lib/css/react-big-calendar.css';

// moment.locale('en-GB');
// // Calendar.momentLocalizer(moment);

import Timetable from 'react-timetable-events';
import moment from 'moment';
import style from './styles';
import { toJS } from 'mobx';
import MyClass from '../../../stores/MyClass/MyClass';

@inject('Common', 'MyClass', 'Auth')
@observer
class MySchedule extends Component {
  state = {
    schedule: { 월: [], 화: [], 수: [], 목: [], 금: [], 토: [], 일: [] },
  };
  componentDidMount = async () => {
    const { MyClass, Auth } = this.props;
    console.info(style);
    console.info(this.props.Common);

    // let temp = {
    //   월: [
    //     {
    //       // id: 1 - 1,
    //       name: 'Custom Event 1',
    //       // type: 'custom',
    //       //   startTime: new Date('2021-10-23T11:30:00'),
    //       startTime: new Date('2021-10-24T09:00'),
    //       endTime: new Date('2021-10-24T13:30:00'),
    //     },

    //     {
    //       // id: 1 - 2,
    //       name: 'Custom Event 1',
    //       // type: 'custom',
    //       startTime: new Date('2021-10-23T14:30:00'),
    //       endTime: new Date('2021-10-23T17:30:00'),
    //     },
    //   ],
    //   화: [
    //     {
    //       // id: 1 - 2,
    //       name: 'Custom Event 1',
    //       // type: 'custom',
    //       startTime: new Date('2021-10-23T14:30:00'),
    //       endTime: new Date('2021-10-23T17:30:00'),
    //     },
    //   ],
    //   수: [
    //     {
    //       // id: 1 - 2,
    //       name: 'Custom Event 1',
    //       // type: 'custom',
    //       startTime: new Date('2021-10-23T14:30:00'),
    //       endTime: new Date('2021-10-23T17:30:00'),
    //     },
    //   ],
    //   목: [
    //     {
    //       // id: 1 - 2,
    //       name: 'Custom Event 1',
    //       // type: 'custom',
    //       startTime: new Date('2021-10-23T14:30:00'),
    //       endTime: new Date('2021-10-23T17:30:00'),
    //     },
    //     {
    //       // id: 1 - 2,
    //       name: 'Custom Event 1',
    //       // type: 'custom',
    //       startTime: new Date('2021-10-23T18:30:00'),
    //       endTime: new Date('2021-10-23T20:30:00'),
    //     },
    //   ],
    //   금: [],
    //   토: [],
    //   일: [],
    // };
    var currentDay = new Date();
    var theYear = currentDay.getFullYear();
    var theMonth = currentDay.getMonth();
    var theDate = currentDay.getDate();
    var theDayOfWeek = currentDay.getDay();

    var thisWeek = [];

    for (var i = 0; i < 7; i++) {
      var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
      var yyyy = resultDay.getFullYear();
      var mm = Number(resultDay.getMonth()) + 1;
      var dd = resultDay.getDate();

      mm = String(mm).length === 1 ? '0' + mm : mm;
      dd = String(dd).length === 1 ? '0' + dd : dd;

      thisWeek[i] = yyyy + '-' + mm + '-' + dd;
    }

    console.log(thisWeek);

    MyClass.myScheduleEvent = {
      월: [],
      화: [],
      수: [],
      목: [],
      금: [],
      토: [],
      일: [],
    };

    if (Auth.loggedUserType !== 'parent') {
      MyClass.myScheduleAry &&
        MyClass.myScheduleAry.map(async (item, idx) => {
          console.info(toJS(item));
          // item.schedule.mon &&
          //   item.schedule.mon.map(async (subItem, id) => {
          //     // console.info(`${idx}-월-${id}`);
          //     console.info(`${item.studentName} : 월`);
          //     await MyClass.myScheduleEvent.월.push({
          //       id: `${idx}-월-${id}`,
          //       //   name: `${item.studentName} - ${idx}`,
          //       name: `${item.studentName}`,
          //       type: 'custom',
          //       startTime: new Date(thisWeek[0] + 'T' + subItem.start),
          //       endTime: new Date(thisWeek[0] + 'T' + subItem.end),
          //     });
          //   });

          if (
            item.schedule.mon !== undefined &&
            item.schedule.mon.length !== 0
          ) {
            await item.schedule.mon.map(async (subItem, id) => {
              // console.info('tuetuetuetuetue');
              console.info(`${item.studentName} : 월`);
              await MyClass.myScheduleEvent.월.push({
                id: `${idx}-월-${id}`,
                //   name: `${item.studentName} - ${idx}`,
                name:
                  Auth.loggedUserType === 'parent'
                    ? `${item.studentName}`
                    : `${item.name}`,
                type: 'custom',
                startTime: new Date(thisWeek[0] + 'T' + subItem.start),
                endTime: new Date(thisWeek[0] + 'T' + subItem.end),
              });
            });
          }

          if (
            item.schedule.tue !== undefined &&
            item.schedule.tue.length !== 0
          ) {
            await item.schedule.tue.map(async (subItem, id) => {
              // console.info('tuetuetuetuetue');
              console.info(`${item.studentName} : 화`);
              await MyClass.myScheduleEvent.화.push({
                id: `${idx}-화-${id}`,
                //   name: `${item.studentName} - ${idx}`,
                name:
                  Auth.loggedUserType === 'parent'
                    ? `${item.studentName}`
                    : `${item.name}`,
                type: 'custom',
                startTime: new Date(thisWeek[1] + 'T' + subItem.start),
                endTime: new Date(thisWeek[1] + 'T' + subItem.end),
              });
            });
          }
          console.info(item.schedule.wed);
          console.info(item.schedule.wed !== undefined);
          // console.info('===========================================');
          if (
            item.schedule.wed !== undefined &&
            item.schedule.wed.length !== 0
          ) {
            await item.schedule.wed.map(async (subItem, id) => {
              console.info(`${item.studentName} : 수`);
              await MyClass.myScheduleEvent.수.push({
                id: `${idx}-수-${id}`,
                //   name: `${item.studentName} - ${idx}`,
                name:
                  Auth.loggedUserType === 'parent'
                    ? `${item.studentName}`
                    : `${item.name}`,
                type: 'custom',
                startTime: new Date(thisWeek[2] + 'T' + subItem.start),
                endTime: new Date(thisWeek[2] + 'T' + subItem.end),
              });
            });
          }

          if (
            item.schedule.thu !== undefined &&
            item.schedule.thu.length !== 0
          ) {
            await item.schedule.thu.map(async (subItem, id) => {
              // console.info('thuthuthuthuthu');
              console.info(`${item.studentName} : 목`);
              console.info(`${idx}-목-${id}`);
              await MyClass.myScheduleEvent.목.push({
                id: `${idx}-목-${id}`,
                //   name: `${item.studentName} - ${idx}`,
                name:
                  Auth.loggedUserType === 'parent'
                    ? `${item.studentName}`
                    : `${item.name}`,
                type: 'custom',
                startTime: new Date(thisWeek[3] + 'T' + subItem.start),
                endTime: new Date(thisWeek[3] + 'T' + subItem.end),
              });
            });
          }

          if (
            item.schedule.fri !== undefined &&
            item.schedule.fri.length !== 0
          ) {
            await item.schedule.fri.map(async (subItem, id) => {
              console.info(`${item.studentName} : 금`);
              await MyClass.myScheduleEvent.금.push({
                id: `${idx}-금-${id}`,
                //   name: `${item.studentName} - ${idx}`,
                name:
                  Auth.loggedUserType === 'parent'
                    ? `${item.studentName}`
                    : `${item.name}`,
                type: 'custom',
                startTime: new Date(thisWeek[4] + 'T' + subItem.start),
                endTime: new Date(thisWeek[4] + 'T' + subItem.end),
              });
            });
          }

          if (
            item.schedule.sat !== undefined &&
            item.schedule.sat.length !== 0
          ) {
            await item.schedule.sat.map(async (subItem, id) => {
              console.info(`${item.studentName} : 토`);
              await MyClass.myScheduleEvent.토.push({
                id: `${idx}-토-${id}`,
                //   name: `${item.studentName} - ${idx}`,
                name:
                  Auth.loggedUserType === 'parent'
                    ? `${item.studentName}`
                    : `${item.name}`,
                type: 'custom',
                startTime: new Date(thisWeek[5] + 'T' + subItem.start),
                endTime: new Date(thisWeek[5] + 'T' + subItem.end),
              });
            });
          }

          if (
            item.schedule.sun !== undefined &&
            item.schedule.sun.length !== 0
          ) {
            await item.schedule.sun.map(async (subItem, id) => {
              console.info(`${item.studentName} : 일`);
              await MyClass.myScheduleEvent.일.push({
                id: `${idx}-일-${id}`,
                //   name: `${item.studentName} - ${idx}`,
                name:
                  Auth.loggedUserType === 'parent'
                    ? `${item.studentName}`
                    : `${item.name}`,
                type: 'custom',
                startTime: new Date(thisWeek[6] + 'T' + subItem.start),
                endTime: new Date(thisWeek[6] + 'T' + subItem.end),
              });
            });
          }
          console.info('=======================');
          if (MyClass.myScheduleAry.length === idx + 1) {
            this.setState({ g: 3 });
          }
        });
      console.info(toJS(MyClass.myScheduleEvent));
      // console.info(temp);
    } else {
      (await MyClass.myScheduleAry) &&
        MyClass.myScheduleAry.map(async (item, idx) => {
          console.info(toJS(item));

          await item.list.map(async (childItem, subIdx) => {
            console.info(toJS(childItem));

            if (
              childItem.schedule.mon !== undefined &&
              childItem.schedule.mon.length !== 0
            ) {
              await childItem.schedule.mon.map(async (subItem, id) => {
                // console.info('tuetuetuetuetue');
                // console.info(`${childItem.studentName} : 월`);
                await MyClass.myScheduleEvent.월.push({
                  id: `${idx}-${subIdx}-월-${id}`,
                  //   name: `${item.studentName} - ${idx}`,
                  name:
                    Auth.loggedUserType === 'parent'
                      ? `${item.childName}(${childItem.name}T)`
                      : `${item.name}`,
                  teacherName: childItem.name,
                  type: 'custom',
                  startTime: new Date(thisWeek[0] + 'T' + subItem.start),
                  endTime: new Date(thisWeek[0] + 'T' + subItem.end),
                });
              });
            }

            if (
              childItem.schedule.tue !== undefined &&
              childItem.schedule.tue.length !== 0
            ) {
              await childItem.schedule.tue.map(async (subItem, id) => {
                // console.info('tuetuetuetuetue');
                // console.info(`${item.studentName} : 화`);
                await MyClass.myScheduleEvent.화.push({
                  id: `${idx}-${subIdx}-화-${id}`,
                  //   name: `${item.studentName} - ${idx}`,
                  name:
                    Auth.loggedUserType === 'parent'
                      ? `${item.childName}(${childItem.name}T)`
                      : `${item.name}`,
                  teacherName: childItem.name,
                  type: 'custom',
                  startTime: new Date(thisWeek[1] + 'T' + subItem.start),
                  endTime: new Date(thisWeek[1] + 'T' + subItem.end),
                });
              });
            }
            // console.info(item.schedule.wed);
            // console.info(item.schedule.wed !== undefined);
            // console.info('===========================================');
            if (
              childItem.schedule.wed !== undefined &&
              childItem.schedule.wed.length !== 0
            ) {
              await childItem.schedule.wed.map(async (subItem, id) => {
                console.info(`${item.childName} : 수`);
                await MyClass.myScheduleEvent.수.push({
                  id: `${idx}-${subIdx}-수-${id}`,
                  //   name: `${item.childName} - ${idx}`,
                  name:
                    Auth.loggedUserType === 'parent'
                      ? `${item.childName}(${childItem.name}T)`
                      : `${item.name}`,
                  teacherName: childItem.name,
                  type: 'custom',
                  startTime: new Date(thisWeek[2] + 'T' + subItem.start),
                  endTime: new Date(thisWeek[2] + 'T' + subItem.end),
                });
              });
            }

            if (
              childItem.schedule.thu !== undefined &&
              childItem.schedule.thu.length !== 0
            ) {
              await childItem.schedule.thu.map(async (subItem, id) => {
                // console.info('thuthuthuthuthu');
                // console.info(`${item.childName} : 목`);
                // console.info(`${idx}-목-${id}`);
                await MyClass.myScheduleEvent.목.push({
                  id: `${idx}-${subIdx}-목-${id}`,
                  //   name: `${item.childName} - ${idx}`,
                  name:
                    Auth.loggedUserType === 'parent'
                      ? `${item.childName}(${childItem.name}T)`
                      : `${item.name}`,
                  teacherName: childItem.name,
                  type: 'custom',
                  startTime: new Date(thisWeek[3] + 'T' + subItem.start),
                  endTime: new Date(thisWeek[3] + 'T' + subItem.end),
                });
              });
            }

            if (
              childItem.schedule.fri !== undefined &&
              childItem.schedule.fri.length !== 0
            ) {
              await childItem.schedule.fri.map(async (subItem, id) => {
                // console.info(`${item.childName} : 금`);
                await MyClass.myScheduleEvent.금.push({
                  id: `${idx}-${subIdx}-금-${id}`,
                  //   name: `${item.childName} - ${idx}`,
                  name:
                    Auth.loggedUserType === 'parent'
                      ? `${item.childName}(${childItem.name}T)`
                      : `${item.name}`,
                  teacherName: childItem.name,
                  type: 'custom',
                  startTime: new Date(thisWeek[4] + 'T' + subItem.start),
                  endTime: new Date(thisWeek[4] + 'T' + subItem.end),
                });
              });
            }

            if (
              childItem.schedule.sat !== undefined &&
              childItem.schedule.sat.length !== 0
            ) {
              await childItem.schedule.sat.map(async (subItem, id) => {
                // console.info(`${item.childName} : 토`);
                await MyClass.myScheduleEvent.토.push({
                  id: `${idx}-${subIdx}-토-${id}`,
                  //   name: `${item.childName} - ${idx}`,
                  name:
                    Auth.loggedUserType === 'parent'
                      ? `${item.childName}(${childItem.name}T)`
                      : `${item.name}`,
                  teacherName: childItem.name,
                  type: 'custom',
                  startTime: new Date(thisWeek[5] + 'T' + subItem.start),
                  endTime: new Date(thisWeek[5] + 'T' + subItem.end),
                });
              });
            }

            if (
              childItem.schedule.sun !== undefined &&
              childItem.schedule.sun.length !== 0
            ) {
              await childItem.schedule.sun.map(async (subItem, id) => {
                // console.info(`${item.childName} : 일`);
                await MyClass.myScheduleEvent.일.push({
                  id: `${idx}-${subIdx}-일-${id}`,
                  //   name: `${item.childName} - ${idx}`,
                  name:
                    Auth.loggedUserType === 'parent'
                      ? `${item.childName}(${childItem.name}T)`
                      : `${item.name}`,
                  teacherName: childItem.name,
                  type: 'custom',
                  startTime: new Date(thisWeek[6] + 'T' + subItem.start),
                  endTime: new Date(thisWeek[6] + 'T' + subItem.end),
                });
              });
            }
            console.info('=======================');
            if (MyClass.myScheduleAry.length === idx + 1) {
              this.setState({ g: 3 });
            }
          });
          // item.schedule.mon &&
          //   item.schedule.mon.map(async (subItem, id) => {
          //     // console.info(`${idx}-월-${id}`);
          //     console.info(`${item.studentName} : 월`);
          //     await MyClass.myScheduleEvent.월.push({
          //       id: `${idx}-월-${id}`,
          //       //   name: `${item.studentName} - ${idx}`,
          //       name: `${item.studentName}`,
          //       type: 'custom',
          //       startTime: new Date(thisWeek[0] + 'T' + subItem.start),
          //       endTime: new Date(thisWeek[0] + 'T' + subItem.end),
          //     });
          //   });
        });
      console.info(toJS(MyClass.myScheduleEvent));
      // console.info(temp);
    }

    console.info(toJS(MyClass.myScheduleAry));
  };

  renderHour = (hour, defaultAttributes, styles) => {
    // console.info(hour);
    const { Common } = this.props;
    // console.info(this.props.Common);
    console.info(Common.width);
    return (
      <div
        {...hour.defaultAttributes}
        key={hour.hour}
        style={{
          height: hour.defaultAttributes.style.height,
          //   width: Common.width > 767.98 ? '60px' : '40px',
          width: '80px',
          //   width: '40px',
          //   textAlign: 'center',
          //   textDecoration: 'underline',
        }}
      >
        {hour.hour}
      </div>
    );
  };

  renderEvent(event, defaultAttributes, styles) {
    // console.info(event);
    console.info(event.event);
    console.info(event.event.id[0]);
    // console.info(event.event.name);
    // console.info(defaultAttributes);
    // console.info(styles);
    // console.info(style);
    // // console.info(this.styles);
    // console.info(moment(event.event.startTime).format('HH:mm'));
    // console.info(event.defaultAttributes.style);
    return (
      <TimeContainer
        // {...event.defaultAttributes.style}
        {...style}
        title={event.event.name}
        key={event.event.id}
        style={{
          height: event.defaultAttributes.style.height,
          marginTop: event.defaultAttributes.style.marginTop,
          backgroundColor:
            MyClass.myScheduleColor[
              ((event.event.id[0] + 1) % MyClass.myScheduleColor.length) - 1
            ],
        }}
      >
        <Name className={event.classNames.event_info}>{event.event.name}</Name>
        <Time className={event.classNames.event_info}>
          {moment(event.event.startTime).format('HH:mm')} -{' '}
          {moment(event.event.endTime).format('HH:mm')}
        </Time>
      </TimeContainer>
    );
  }

  render() {
    const { MyClass, open, Common } = this.props;
    console.info(toJS(MyClass.myScheduleEvent));
    console.info(Common.width);
    return (
      <ModalBox
        modal={open ? 'openModal modal' : 'modal'}
        style={{ display: open ? 'block' : 'none' }}
      >
        {open ? (
          <Container>
            {MyClass.myScheduleEvent && (
              <div style={{ display: 'none' }}>d</div>
            )}
            <button
              className="close"
              onClick={(e) => {
                console.info('close');
                e.stopPropagation();
                MyClass.myScheduleModalActive = false;
              }}
            >
              {' '}
              &times;{' '}
            </button>
            {/* <Calendar
              localizer={localizer}
              events={[
                {
                  title: 'My event',
                  allDay: false,
                  start: new Date(2021, 10, 9, 10, 0), // 10.00 AM
                  end: new Date(2021, 10, 9, 14, 0), // 2.00 PM
                },
              ]}
              step={60}
              view="week"
              views={['week']}
              min={new Date(2021, 2, 10, 8, 0)} // 8.00 AM
              max={new Date(2021, 2, 10, 23, 0)} // Max will be 6.00 PM!
              date={new Date(2021, 0, 1)}
            /> */}
            <TimetableContainer
              //   style={{ background: '#000', borderRadius: '50px' }}
              //   active={MyClass.myScheduleEvent}
              renderHour={this.renderHour}
              renderEvent={this.renderEvent}
              //   getDayLabel={}
              events={MyClass.myScheduleEvent && MyClass.myScheduleEvent}
              //   events={{
              //     월: [
              //       {
              //         // id: 1 - 1,
              //         name: 'Custom Event 1',
              //         // type: 'custom',
              //         //   startTime: new Date('2021-10-23T11:30:00'),
              //         startTime: new Date('2021-10-24T09:00'),
              //         endTime: new Date('2021-10-24T13:30:00'),
              //       },

              //       {
              //         // id: 1 - 2,
              //         name: 'Custom Event 1',
              //         // type: 'custom',
              //         startTime: new Date('2021-10-23T14:30:00'),
              //         endTime: new Date('2021-10-23T17:30:00'),
              //       },
              //     ],
              //     화: [
              //       {
              //         // id: 1 - 2,
              //         name: 'Custom Event 1',
              //         // type: 'custom',
              //         startTime: new Date('2021-10-23T14:30:00'),
              //         endTime: new Date('2021-10-23T17:30:00'),
              //       },
              //     ],
              //     수: [
              //       {
              //         // id: 1 - 2,
              //         name: 'Custom Event 1',
              //         // type: 'custom',
              //         startTime: new Date('2021-10-23T14:30:00'),
              //         endTime: new Date('2021-10-23T17:30:00'),
              //       },
              //     ],
              //     목: [
              //       {
              //         // id: 1 - 2,
              //         name: 'Custom Event 1',
              //         // type: 'custom',
              //         startTime: new Date('2021-10-23T14:30:00'),
              //         endTime: new Date('2021-10-23T17:30:00'),
              //       },
              //       {
              //         // id: 1 - 2,
              //         name: 'Custom Event 1',
              //         // type: 'custom',
              //         startTime: new Date('2021-10-23T18:30:00'),
              //         endTime: new Date('2021-10-23T20:30:00'),
              //       },
              //     ],
              //     금: [],
              //     토: [],
              //     일: [],
              //   }}
            />
            {/* <Timetable
              events={this.state.events}
              renderHour={this.renderHour}
              renderEvent={this.renderEvent}
              hoursInterval={[7, 24]}
              timeLabel="Time :)"
            /> */}
            {/* <Timetable {...this.state.timetableProps} />; */}
          </Container>
        ) : null}
      </ModalBox>
    );
  }
}
// const MySchedule = () => (
//   <div style={{ height: 700 }}>
//     <BigCalendar
//       events={[
//         {
//           'title': 'My event',
//           'allDay': false,
//           'start': new Date(2018, 0, 1, 10, 0), // 10.00 AM
//           'end': new Date(2018, 0, 1, 14, 0), // 2.00 PM
//         }
//       ]}
//       step={60}
//       view='week'
//       views={['week']}
//       min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
//       max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
//       date={new Date(2018, 0, 1)}
//     />
//   </div>
// );

// render(<MySchedule />, document.getElementById('root'));
export default MySchedule;

const ModalBox = styled.div`
  z-index: 101;
  background-color: white;

  padding-bottom: 30px;
  box-sizing: border-box;
  width: 80%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  overflow-y: scroll !important;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
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
  display: flex;
  flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   width: 100%;
  > button {
    align-self: flex-end;
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 21px;
    font-weight: 700;
    //margin-left: 10px;
    margin: 5px 5px 5px 0;
    float: right;
    color: #000000;
    border-radius: 50%;
    background-color: #f1f1f1;
  }
`;
const TimetableContainer = styled(Timetable)`
  .styles-module_event__1VBTJ {
    background-color: rgba(235, 114, 82, 1);
  }
`;

// const time_table_wrapper = styled.div`
// height: 100%,
// margin: 0,
// // fontFamily: 'Open Sans", sans-serif',
// color: #efefef,
// overflow: hidden,
// `;

// const day = styled.div`
// position: relative,
// height: 100vh,
// float: left,
// `;

// const day_title = styled.div`
// background-color: #34495e,
// font-size: 0.7rem,
// // fontWeight: '600',
// // textTransform: 'uppercase',
// display: flex,
// justify-content: center,
// flex-direction: column,
// text-align: center,
// z-index: 2,
// `;

// const hour = styled.div`
// background-color: rgba(52, 73, 94, 0.9),
// font-size: 12px,

// text-align: center,
// width: 5rem;
// `;

// const Event = styled.div`
// position: absolute,
// width: 100%,
// height: 15vh,
// // lineHeight: '15vh',
// background-color: #000,
// font-size: 0.7em,
// // fontWeight: '300',
// justify-content: center,
// display: flex,
// flex-direction: column,
// overflow: hidden,
// `;

// const EventInfo = styled.div`
//   // lineHeight: 'initial',
//   text-align: center;
// `;

const TimeContainer = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //   font-size: 14px;
  position: absolute;
  margin-left: 5px;
  margin-right: 5px;
  width: 90%;
  box-sizing: border-box;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 85%;
  }
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 15px;
  }
`;
const Time = styled.div`
  font-size: 14px;
  color: #fff;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 8px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 10px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 13px;
  }
`;
