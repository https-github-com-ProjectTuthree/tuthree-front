import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import Auth from './Auth';
import * as AccountAPI from '../../axios/Account/Account';
import * as ChattingAPI from '../../axios/Chatting/Chatting';
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

  @action createChatRoom = async (id) => {
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      data: {
        senderId: Auth.loggedAdminId,
        senderName: Auth.loggedAdminName,
        receiverId: id,
      },
    };
    ChattingAPI.createChatRoom(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          //   window.location.href = '/admin/chatting';
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
          localStorage.removeItem('adminToken');
          window.location.href = '/admin';
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
        userId: Auth.loggedAdminId,
        name: Auth.loggedAdminName,
        content: this.chatMsg,
      },
    };
    await ChattingAPI.sendMessage(req)
      .then(async (res) => {
        console.info(res);
        await this.getChatList(this.roomId);
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
