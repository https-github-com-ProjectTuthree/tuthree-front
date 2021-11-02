import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import Auth from './Account/Auth';
import Tutee from './Matching/Tutee';
import Common from './Common/Common';
import * as MatchingAPI from '../axios/Matching/Test2Matching';
import * as ClassAPI from '../axios/Managing/TestClass';
import * as ChattingAPI from '../axios/Chatting/Test2';

class Chatting {
  // constructor() {
  //   makeObservable(this);
  // }
  @observable domainType = 1;

  @observable writingState = 1; // 1. 글 작성, 2 : 글 수정
  @observable enrollmentState = 1; // 1. 기본 상태, 2. 이미 매칭되어 못하는 상태
  @observable selectedUpperSubject = '';
  @observable selectedLowerSubject = '';
  @observable selectedSubject = []; // 과목

  @observable startTimeValue = '';
  @observable startTimeAry = [];
  @observable endTimeValue = '';
  @observable endTimeAry = [];
  @observable selectedWeekTime = [];
  @observable weekendLabel = '';
  @observable weekendValue = '';
  @observable weekendValueAry = [];

  @observable weekendAry = [
    {
      label: '월요일',
      value: 'mon',
    },
    {
      label: '화요일',
      value: 'tue',
    },
    {
      label: '수요일',
      value: 'wed',
    },
    {
      label: '목요일',
      value: 'thu',
    },
    {
      label: '금요일',
      value: 'fri',
    },
    {
      label: '토요일',
      value: 'sat',
    },
    {
      label: '일요일',
      value: 'sun',
    },
  ];

  @observable budgetTypeAry = [
    {
      label: '시급',
      value: '시급',
    },
    {
      label: '일급',
      value: '일급',
    },
    {
      label: '주급',
      value: '주급',
    },
    {
      label: '월급',
      value: '월급',
    },
  ];

  @observable cost = '';
  @observable budget = 0; // 예산
  @observable budgetType = ''; // 예산 유형(시급, 일금, 주급, 월급)

  @observable detailContent = '';

  @observable teacherId = '';
  @observable studentId = '';
  @observable otherName = '';

  @observable infoAry = [];

  @observable chatUserAry = [];
  @observable chatAry = [];
  @observable roomId = '';
  @observable chatMsg = '';

  @action resetTutoringInfo = () => {
    this.detailContent = '';
    this.budget = 0; // 예산
    this.budgetType = ''; // 예산 유형(시급, 일금, 주급, 월급)
    this.selectedUpperSubject = '';
    this.selectedLowerSubject = '';
    this.selectedSubject = []; // 과목

    this.startTimeValue = '';
    this.startTimeAry = [];
    this.endTimeValue = '';
    this.endTimeAry = [];
    this.selectedWeekTime = [];
    this.weekendLabel = '';
    this.weekendValue = '';
    this.weekendValueAry = [];
  };

  @action setUpperSubject = (e) => {
    console.info(e[0]);
    this.selectedUpperSubject = e.label;
    // this.midCategorySet = e.detail;
    console.info(toJS(e[0]));
    console.info(toJS(this.selectedUpperSubject));
    this.selectedLowerSubject = e.value[0].label;
  };

  @action setLowerSubject = (e) => {
    this.selectedLowerSubject = e.label;
    // this.midCategorySet = e.detail;
    console.info(toJS(e));
    console.info(toJS(this.selectedUpperSubject));
    // this.selectedLowerLocation = e.value[0].label;
  };
  @action handleChange = (e, type) => {
    switch (type) {
      case 'upperSubject':
        this.SubjectIndex = e.id;
        this.setUpperSubject(e);
        this.lowerSubjectAry = [];

        e.value.map((item, idx) => {
          console.info(item);
          this.lowerSubjectAry.push(item);
        });

        break;
      case 'lowerSubject':
        this.setLowerSubject(e);
        this.selectedSubject.push(
          `<${this.selectedUpperSubject}> ${this.selectedLowerSubject}`
        );
        console.info(e.label);

        break;
      case 'budgetType':
        this.budgetType = e.value;
        break;
      case 'weekend':
        this.weekendLabel = e.label;
        this.weekendValue = e.value;
        break;
      case 'budget':
        this.budget = e.value;
        break;
      default:
        break;
    }
  };
  @action setTutoringInfo = async (teacherId = '', studentId = '') => {
    // let weekendObj = {};
    let timeObj = {};

    let weekTimeObj = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };
    const schedule = {};
    let timeAry = [];
    console.info(Auth.token);
    console.info(Auth.loggedUserId);
    console.info(this.detailContent);
    console.info(this.weekendValue);
    // console.info(toJS(Tutee.tuteeDetailAry));
    console.info(this.studentId);
    console.info(toJS(this.startTimeAry));
    console.info(toJS(this.endTimeAry));
    console.info(toJS(this.startTimeAry));
    console.info(toJS(this.endTimeAry));
    console.info(localStorage.getItem('otherPersonId'));
    // await Promise.all(

    this.selectedWeekTime.map((item, idx) => {
      console.info('=====================================================');
      // console.info(item);
      // console.info(this.startTimeValue);
      // console.info(this.endTimeValue);
      // console.info(this.weekendValue);
      timeObj = {};
      console.info(toJS(this.startTimeAry[idx]));
      console.info(toJS(this.endTimeAry[idx]));
      // timeObj[this.weekendValue] = thi.startTimeValue;
      timeObj['start'] = this.startTimeAry[idx];
      timeObj['end'] = this.endTimeAry[idx];
      // timeAry.push(timeObj);
      console.info(toJS(timeAry));

      // weekendObj[this.weekendValueAry[idx]] = timeObj;
      // console.info(timeObj);
      weekTimeObj[this.weekendValueAry[idx]].push(timeObj);
      console.info(toJS(weekTimeObj));
    });
    // );

    console.info(timeObj);
    // console.info(weekendObj);
    // console.info(JSON.stringify(weekendObj));
    console.info(toJS(weekTimeObj));

    console.info(toJS(this.selectedSubject));
    // schedule["se"]
    // this.selectedSubject.map((item, idx) => {

    // })

    const req = {
      data: {
        // schedule: {
        //   tue: {
        //     start: '20:00',
        //     end: '24:00',
        //   },
        //   mon: {
        //     start: '17:00',
        //     end: '20:00',
        //   },
        // },
        // schedule: JSON.stringify(weekendObj),
        // schedule: weekendObj,
        schedule: weekTimeObj,

        // subject: ['math', 'kor', 'eng'],
        subject: this.selectedSubject,

        // subject: {
        //   id: 'tuthree10',
        //   pwd: 'tuthree10',
        // },
        // subject: 'math',
        // day: this.weekendValue,
        // day: 'mon',
        // cost: '월급 200000',
        cost: this.budgetType + ' ' + this.budget,
        // detail: 'sdfsdfsdf',
        detail: this.detailContent,
      },
      headers: {
        Authorization: Auth.token,
      },
      params: {
        teacherId: Auth.loggedUserId,
        // studentId: 'hYji0pYOZc',
        studentId: localStorage.getItem('otherPersonId'),
      },
    };
    console.info(req.data);
    console.info(toJS(req.data));
    MatchingAPI.setTutoringInfo(req)
      .then(async (res) => {
        console.info(res);
        if (res.data.success) {
          await this.checkInfoWriting();
          alert(
            '과외 등록이 완료되었습니다. 학생이 최종 수락하기까지 기다려주세요.'
          );

          Common.modalActive = false;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        alert('과외 등록을 실패하였습니다. 다시 시도해주세요.');
      });
  };

  @action putTutoringInfo = async (teacherId = '', studentId = '') => {
    let timeObj = {};
    let weekTimeObj = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    };

    let timeAry = [];
    console.info(toJS(this.selectedWeekTime));
    console.info(toJS(this.selectedSubject));
    console.info(Auth.token);
    console.info(Auth.loggedUserId);
    console.info(this.detailContent);
    console.info(this.weekendValue);
    console.info(toJS(this.weekendValueAry));
    // console.info(toJS(Tutee.tuteeDetailAry));
    console.info(this.studentId);
    console.info(toJS(this.startTimeAry));
    console.info(toJS(this.endTimeAry));
    console.info(localStorage.getItem('otherPersonId'));
    // await Promise.all(

    this.selectedWeekTime.map((item, idx) => {
      console.info('=====================================================');
      timeObj = {};
      console.info(toJS(this.startTimeAry[idx]));
      console.info(toJS(this.endTimeAry[idx]));
      // timeObj[this.weekendValue] = thi.startTimeValue;
      timeObj['start'] = this.startTimeAry[idx];
      timeObj['end'] = this.endTimeAry[idx];
      // timeAry.push(timeObj);
      console.info(toJS(timeAry));

      // weekendObj[this.weekendValueAry[idx]] = timeObj;
      // console.info(timeObj);
      weekTimeObj[this.weekendValueAry[idx]].push(timeObj);
      console.info(toJS(weekTimeObj));
    });
    // );

    console.info(timeObj);
    // console.info(weekendObj);
    // console.info(JSON.stringify(weekendObj));
    console.info(toJS(weekTimeObj));

    console.info(toJS(this.selectedSubject));
    // schedule["se"]
    // this.selectedSubject.map((item, idx) => {

    // })

    const req = {
      data: {
        // schedule: {
        //   tue: {
        //     start: '20:00',
        //     end: '24:00',
        //   },
        //   mon: {
        //     start: '17:00',
        //     end: '20:00',
        //   },
        // },
        // schedule: JSON.stringify(weekendObj),
        // schedule: weekendObj,
        schedule: weekTimeObj,

        // subject: ['math', 'kor', 'eng'],
        subject: this.selectedSubject,

        // subject: {
        //   id: 'tuthree10',
        //   pwd: 'tuthree10',
        // },
        // subject: 'math',
        // day: this.weekendValue,
        // day: 'mon',
        // cost: '월급 200000',
        cost: this.budgetType + ' ' + this.budget,
        // detail: 'sdfsdfsdf',
        detail: this.detailContent,
      },
      headers: {
        Authorization: Auth.token,
      },
      params: {
        teacherId: Auth.loggedUserId,
        // studentId: 'hYji0pYOZc',
        studentId: localStorage.getItem('otherPersonId'),
      },
    };
    console.info(req.data);
    console.info(toJS(req.data));
    MatchingAPI.putTutoringInfo(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          alert(
            '과외 정보 수정이 완료되었습니다. 학생이 최종 수락하기까지 기다려주세요.'
          );

          Common.modalActive = false;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        alert('과외 정보를 수정하는데 실패하였습니다. 다시 시도해주세요.');
      });
  };

  @action getTutoringInfo = async () => {
    this.resetTutoringInfo();
    console.info(Auth.token);
    console.info(localStorage.getItem('otherPersonId'));
    console.info(Auth.loggedUserId);
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      params: {
        // teacherId: 'test111',
        teacherId:
          Auth.loggedUserType === 'teacher'
            ? Auth.loggedUserId
            : localStorage.getItem('otherPersonId'),
        studentId:
          Auth.loggedUserType === 'student'
            ? Auth.loggedUserId
            : localStorage.getItem('otherPersonId'),
        // studentId: 'lZmooJ8Ydd',
      },
    };
    await MatchingAPI.getTutoringInfo(req)
      .then(async (res) => {
        console.info(res);
        Common.modalActive = true;
        Common.modalState = 2;
        let weekend = '';
        let startTime = '';
        let endTime = '';
        this.cost = res.data.data.cost;
        console.info(toJS(this.cost));
        console.info(this.cost.length);
        this.budgetType = this.cost.slice(0, 2);
        this.budget = this.cost.slice(3, this.cost.length);
        console.info(toJS(this.budgetType));
        console.info(toJS(this.budget));
        this.detailContent = res.data.data.detail;
        this.infoAry = await res.data.data.info.schedule;

        console.info(toJS(this.infoAry));
        console.info(toJS(Object.keys(this.infoAry).length));
        // for(let i=0; i<)
        for await (const [key, value] of Object.entries(this.infoAry)) {
          console.info(`${key}: ${value}`);
          console.info(key);
          console.info(toJS(value));
          console.info(toJS(value.length));
          // if (value.length) {
          //   this.weekendValueAry.push(key);
          // }
          if (value.length !== 0) {
            switch (key) {
              case 'mon':
                weekend = '월요일';
                break;
              case 'tue':
                weekend = '화요일';
                break;
              case 'wed':
                weekend = '수요일';
                break;
              case 'thu':
                weekend = '목요일';
                break;
              case 'fri':
                weekend = '금요일';
                break;
              case 'sat':
                weekend = '토요일';
                break;
              case 'sun':
                weekend = '일요일';
                break;
              default:
                break;
            }

            await value.map(async (item, idx) => {
              console.info(toJS(item));
              console.info(toJS(item.start));
              console.info(weekend);
              this.weekendValueAry.push(key);
              console.info(weekend);
              await this.startTimeAry.push(item.start);
              await this.endTimeAry.push(item.end);

              await this.selectedWeekTime.push(
                `${weekend} ${item.start} ~ ${item.end}`
              );
              console.info(weekend);
              console.info(toJS(this.selectedWeekTime));
            });

            for (const [subKey, subValue] of Object.entries(value)) {
              console.info(`${subKey}: ${subValue}`);
              console.info(subKey.value);
              if (subKey === 'start') {
                startTime = subValue;
              }
              if (subKey === 'end') {
                endTime = subValue;
              }
            }
          }
          // await this.selectedWeekTime.push(
          //   `${weekend} ${startTime} ~ ${endTime}`
          // );
        }
        // this.selectedWeekTime.push(res.data.data.infpo)
        this.selectedSubject = await res.data.data.info.subject;
        // Common.modalActive = false;
        console.info(this.cost);
        console.info(this.detailContent);
        console.info(toJS(this.selectedWeekTime));
        console.info(toJS(this.selectedSubject));
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        alert('과외 정보를 가져올 수 없습니다.');
      });
  };
  @action matchTutoring = async () => {
    // console.info(Auth.loggedUserType);
    console.info(Auth.loggedUserId);
    console.info(localStorage.getItem('otherPersonId'));
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      params: {
        // teacherId: 'test111',
        teacherId: localStorage.getItem('otherPersonId'),
        studentId: Auth.loggedUserId,
        grade: 'student',
        // studentId: 'lZmooJ8Ydd',
      },
    };
    await MatchingAPI.matchTutoring(req)
      .then(async (res) => {
        console.info(res);
        await alert(res.data.message);
        Common.modalActive = false;
        Common.modalState = 1;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action checkInfoWriting = async () => {
    this.writingState = 1;
    console.info(Auth.loggedUserId);
    console.info(localStorage.getItem('otherPersonId'));
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      params: {
        // teacherId: 'test111',
        teacherId: Auth.loggedUserId,
        studentId: localStorage.getItem('otherPersonId'),
        grade: 'teacher',
        // studentId: 'lZmooJ8Ydd',
      },
    };
    await MatchingAPI.matchTutoring(req)
      .then((res) => {
        console.info(res);
        console.info(res.data);
        console.info(res.data.message);
        if (res.data.message === '수업이 성사되지 않았습니다.') {
          console.info('수정O');
          this.writingState = 2;
        } else {
          console.info('수정X');
          this.writingState = 1;
        }
        // await alert(res.data.data.message);
        // Common.modalActive = false;
        // Common.modalState = 1;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action getClass = async () => {
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      params: {
        id: Auth.loggedUserId,
        status: 'OPEN',
      },
    };
    ClassAPI.getClass(req)
      .then((res) => {
        console.info(res);
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action getDetailClass = async () => {
    console.info(Auth.loggedUserId);
    console.info(Auth.loggedUserType);
    console.info(localStorage.getItem('otherPersonId'));

    const req = {
      headers: {
        Authorization: Auth.token,
      },
      params: {
        studentId:
          Auth.loggedUserType === 'student'
            ? Auth.loggedUserId
            : localStorage.getItem('otherPersonId'),
        teacherId:
          Auth.loggedUserType === 'teacher'
            ? Auth.loggedUserId
            : localStorage.getItem('otherPersonId'),
        // teacherId: 'test111',
      },
    };
    console.info(req.params);
    ClassAPI.getDetailClass(req)
      .then((res) => {
        console.info(res);
        console.info(res.data.statusCode);
        if (res.data.statusCode === 403) {
          console.info('y');
          this.enrollmentState = 1;
        } else {
          console.info('n');
          this.enrollmentState = 2;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action createChatRoom = async () => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(Auth.loggedUserId);
    console.info(Auth.loggedUserName);

    const req = {
      headers: {
        Authorization: Auth.token,
      },
      data: {
        senderId: Auth.loggedUserId,
        senderName: Auth.loggedUserName,
        receiverId:
          Auth.loggedUserType === 'teacher' ? this.studentId : this.teacherId,
      },
    };
    ChattingAPI.createChatRoom(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          window.location.href = '/chatting';
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    // window.location.href = '/chatting';
  };

  @action getChatUserList = async () => {
    console.info(this.studentId);
    console.info(this.teacherId);
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      // params: {
      //   id: Auth.loggedUserId,
      // },
    };
    await ChattingAPI.getChatUserList(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          this.chatUserAry = await res.data.data;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.chatUserAry));
  };

  @action getChatList = async (id) => {
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      id: id,
    };
    await ChattingAPI.getChatList(req)
      .then(async (res) => {
        console.info(res);
        this.chatAry = await res.data.data.chatList;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.chatAry));
  };

  @action sendMessage = async (id) => {
    console.info(Auth.loggedUserName);
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(Auth.token);
    console.info(this.chatMsg);
    const req = {
      headers: {
        Authorization: Auth.token,
        // 'Access-Control-Allow-Credentials': 'false',
      },
      data: {
        room: {
          id: this.roomId,
        },
        // userId:
        //   Auth.loggedUserType === 'teacher' ? this.studentId : this.teacherId,
        userId: Auth.loggedUserId,
        name: Auth.loggedUserName,
        content: this.chatMsg,
      },
    };
    await ChattingAPI.sendMessage(req)
      .then(async (res) => {
        console.info(res);
        await this.getChatList(this.roomId);
        // this.getChatUserList(this.roomId);
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action sendFcm = async () => {
    console.info(Auth.token);
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      data: {
        id: Auth.loggedUserId,
        token: Auth.notificationToken,
      },
    };
    await ChattingAPI.sendFcm(req)
      .then(async (res) => {
        console.info(res);
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };
}

export default new Chatting();
