import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import Auth from '../Account/Auth';
import Common from '../Common/Common';
import * as ClassAPI from '../../axios/Managing/Class';
import * as GradingAPI from '../../axios/Managing/Grading';
import * as ReviewAPI from '../../axios/Matching/Review';

class MyClass {
  // constructor() {
  //   makeObservable(this);
  // }
  @observable moreState = 1;
  @observable state = 1;
  @observable detailState = 1;

  @observable status = 'OPEN'; // OPEN : 현재 수강, CLOSE : 과거 수강
  @observable reviewModalActive = false; // 리뷰 작성 모달

  @observable currentDay = 0;
  @observable month = 0;
  @observable year = 0;
  @observable isModalOpen = false;
  @observable chosenDay = 0;
  @observable writingTabState = 1;

  @observable classAry = [];
  @observable teacherName = '';
  @observable studentName = '';
  @observable teacherId = '';
  @observable studentId = '';
  @observable parentState = 1;

  @observable scheduleValue = '';
  @observable scheduleAry = [];
  @observable scheduleDetailAry = [];
  @observable selectedDate = '';
  @observable selectedDateMoment = '';

  @observable reportRound = '';
  @observable reportStartTime = '--:--';
  @observable reportEndTime = '--:--';
  @observable reportContent = '';
  @observable reportAry = [];
  @observable reportDetailAry = [];
  @observable reportWritingState = 1; // 1 : 작성, 2 : 수정
  @observable selectedReportDate = '';
  @observable selectModalActive = false;

  @observable today = '';
  @observable totalQuestion = 0;
  @observable questionTotalList = [];
  @observable questionAry = [];
  @observable questionPostId = '';
  @observable choiceState = false;
  @observable isExistAnswer = false;
  @observable tuteeTotalQuestion = 0;
  @observable answerAry = [];
  @observable answerDueDateObj = {};
  @observable answerDueDate = '';
  @observable answerDueDateMoment = '';
  @observable tuteeAnswerModalActive = false;
  @observable markingTotalQuestion = 0;
  @observable markingResultTotalObj = {};
  @observable markingResultAry = [];
  @observable currentMarkingResultAry = []; // 결과 보기 클릭했을 때 markingResultTotalObj 로부터 저장
  @observable markingStateAry = [];
  @observable markingStateObj = {};
  @observable markingTotalScoreObj = {};
  @observable markingCorrect = 0;
  @observable getTuteeAnswerState = false; // 학생 사용자가 답을 잘 가져왔는지...
  @observable resultModalActive = false;

  @observable enrollmentModalActive = false;
  @observable enrollmentChildName = '';
  @observable enrollmentChildId = '';
  @observable childClassAry = [];

  @observable ratingPoint = 5; // 평점
  @observable reviewContent = ''; // 리뷰 내용
  @observable reviewTutorId = ''; // 작성할 선생님 리뷰 아이디
  @observable starAry = [
    {
      id: 1,
      checked: true,
      content: '매우 나빠요',
      content2: '만족도 1점을 주셨네요, 어떤점이 안 좋았나요?',
    },
    {
      id: 2,
      checked: true,
      content: '나빠요',
      content2: '만족도 2점을 주셨네요, 어떤점이 안 좋았나요?',
    },
    {
      id: 3,
      checked: true,
      content: '보통이에요',
      content2: '만족도 3점을 주셨네요, 어떤점이 좋았나요?',
    },
    {
      id: 4,
      checked: true,
      content: '좋아요',
      content2: '만족도 4점을 주셨네요, 어떤점이 좋았나요?',
    },
    {
      id: 5,
      checked: true,
      content: '매우 좋아요',
      content2: '만족도 5점을 주셨네요, 어떤점이 좋았나요?',
    },
  ];

  @observable myScheduleColor = [
    '#608880',
    '#866088',
    '#7e8860',
    '#d45050',
    '#f08080',
    '#1b5608',
  ];
  @observable myScheduleModalActive = false;
  @observable myScheduleAry = [];
  @observable myScheduleEvent = {
    월: [],
    화: [],
    수: [],
    목: [],
    금: [],
    토: [],
    일: [],
  };

  @action onClickNavHandler = (type) => {
    console.info(type);
    switch (type) {
      case 'calendar':
        this.detailState = 1;
        this.state = 2;

        break;
      case 'qa':
        this.detailState = 2;
        this.state = 2;

        break;
      default:
        break;
    }
  };

  @action onChangeHandler = (e, type = '', idx = '') => {
    switch (type) {
      case 'schedule':
        // console.info(e.target.value);
        this.scheduleValue = e.target.value;
        console.info(this.scheduleValue);
        break;
      case 'make_question':
        // console.info(e.target.value);
        this.totalQuestion = e.target.value;
        this.questionAry = [];
        for (let i = 0; i < this.totalQuestion; i++) {
          this.questionAry.push({
            question: i + 1,
            type: 'num',
            auto: true,
            ans: '',
          });
          //   questionAry[i].question = i + 1;
          //   questionAry[i].type = 'num';
          //   questionAry[i].auto = true;
          //   questionAry[i].answer = '';
          //   questionAry[i] = i + 1;
        }
        console.info(this.totalQuestion);
        break;
      case 'make_question_answer':
        // console.info(e.target.value);
        console.info(idx);
        this.questionAry[idx].ans = e.target.value;
        // this.scheduleValue = e.target.value;
        console.info(toJS(this.questionAry));
        break;

      case 'modify_schedule':
        // console.info(e.target.value);
        this.scheduleValue = e.target.value;
        console.info(this.scheduleValue);
        break;
      case 'set_report':
        // console.info(e.target.value);
        this.reportRound = e.target.value;
        console.info(this.reportRound);
        break;
      case 'set_question':
        // console.info(e.target.value);
        // this.reportRound = e.target.value;
        // console.info(this.reportRound);
        console.info(e.currentTarget.files[0]);
        this.setQuestion(e.currentTarget.files[0]);
        break;

      // case 'set_answer':
      //   // console.info(e.target.value);
      //   // this.reportRound = e.target.value;
      //   // console.info(this.reportRound);
      //   // this.questionconsole.info(e.currentTarget.files[0]);
      //   this.answerAry[idx].ans = e.target.value;
      //   // this.setQuestion(e.currentTarget.files[0]);
      //   break;

      case 'enrollment_child_name':
        this.enrollmentChildName = e.target.value;
        console.info(this.enrollmentChildName);
        break;

      case 'enrollment_child_id':
        this.enrollmentChildId = e.target.value;
        console.info(this.enrollmentChildId);
        break;

      default:
        break;
    }
  };

  @action getClass = async (id) => {
    console.info(id);
    this.classAry = [];
    if (!id) {
      window.location.href = '/';
    }
    console.info(Auth.token);
    const req = {
      params: {
        status: this.status,
        id: id ? id : 1,
      },
      headers: {
        Authorization: Auth.Authorization,
      },
    };
    await ClassAPI.getClass(req)
      .then(async (res) => {
        console.info(res);
        this.classAry = await res.data.data;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.classAry));
  };

  @action setSchedule = async () => {
    console.info(this.studentId);
    console.info(this.teacherId);
    const req = {
      params: {
        studentId: this.studentId,
        teacherId: this.teacherId,
      },
      headers: {
        Authorization: Auth.Authorization,
      },
      data: {
        dateAt: this.selectedDate,
        schedule: this.scheduleValue,
      },
    };
    await ClassAPI.setSchedule(req)
      .then(async (res) => {
        console.info(res);
        this.getDetailSchedule();
        this.getCalendar();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action putSchedule = async (id) => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(id);
    const req = {
      // params: {
      //   studentId: this.studentId,
      //   teacherId: this.teacherId,
      // },
      headers: {
        Authorization: Auth.Authorization,
      },
      id: id,
      data: {
        dateAt: this.selectedDate,
        schedule: this.scheduleValue,
      },
    };
    await ClassAPI.putSchedule(req)
      .then(async (res) => {
        console.info(res);
        this.getDetailSchedule();
        this.getCalendar();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action delSchedule = async (id) => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(id);
    const req = {
      // params: {
      //   studentId: this.studentId,
      //   teacherId: this.teacherId,
      // },
      headers: {
        Authorization: Auth.Authorization,
      },
      id: id,
    };
    await ClassAPI.delSchedule(req)
      .then(async (res) => {
        console.info(res);
        this.getDetailSchedule();
        this.getCalendar();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action getCalendar = async () => {
    console.info(this.studentId);
    console.info(this.teacherId);
    const req = {
      params: {
        studentId: this.studentId,
        teacherId: this.teacherId,
      },
      headers: {
        Authorization: Auth.Authorization,
      },
    };
    ClassAPI.getSchedule(req)
      .then((res) => {
        console.info(res);
        this.scheduleAry = res.data.data;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.scheduleAry));
  };

  @action getDetailSchedule = async () => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(this.selectedDate);
    this.scheduleDetailAry = [];

    const req = {
      params: {
        studentId: this.studentId,
        teacherId: this.teacherId,
        date: this.selectedDate,
      },
      headers: {
        Authorization: Auth.Authorization,
      },
    };
    await ClassAPI.getDetailSchedule(req)
      .then((res) => {
        console.info(res);
        this.scheduleDetailAry = res.data.data;
        this.scheduleDetailAry.map((item, idx) => {
          item.modify = false;
        });
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.scheduleDetailAry));
  };

  @action setReport = async () => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(this.selectedDate);
    console.info(this.reportRound);
    console.info(this.reportStartTime);
    console.info(this.reportEndTime);
    console.info(this.reportContent);
    const req = {
      params: {
        studentId: this.studentId,
        teacherId: this.teacherId,
      },
      headers: {
        Authorization: Auth.Authorization,
      },
      data: {
        date: this.selectedDate,
        number: this.reportRound,
        start: this.reportStartTime,
        end: this.reportEndTime,
        detail: this.reportContent,
      },
    };
    await ClassAPI.setReport(req)
      .then(async (res) => {
        console.info(res);
        alert('수업보고서 작성이 완료되었습니다!');
        this.writingTabState = 1;
        Common.modalActive = false;
        this.getDetailReport();
        this.getCalendar();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action putReport = async (id) => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(id);
    const req = {
      // params: {
      //   studentId: this.studentId,
      //   teacherId: this.teacherId,
      // },
      headers: {
        Authorization: Auth.Authorization,
      },
      id: id,
      data: {
        date: this.selectedDate,
        number: this.reportRound,
        start: this.reportStartTime,
        end: this.reportEndTime,
        detail: this.reportContent,
      },
    };
    await ClassAPI.putReport(req)
      .then(async (res) => {
        console.info(res);
        this.reportWritingState = 1;
        this.reportDetailAry = [];
        // this.getDetailReport();
        alert('수업보고서 수정이 완료되었습니다!');
        this.writingTabState = 1;
        Common.modalActive = false;
        this.getCalendar();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action delReport = async (id) => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(id);
    const req = {
      // params: {
      //   studentId: this.studentId,
      //   teacherId: this.teacherId,
      // },
      headers: {
        Authorization: Auth.Authorization,
      },
      id: id,
    };
    await ClassAPI.delReport(req)
      .then(async (res) => {
        console.info(res);
        this.reportWritingState = 1;
        this.reportDetailAry = [];
        // this.getDetailReport();
        alert('수업보고서 삭제가 완료되었습니다!');
        this.writingTabState = 1;
        Common.modalActive = false;
        this.getCalendar();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action getDetailReport = async (date = '') => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(this.selectedDate);
    this.reportDetailAry = [];

    const req = {
      params: {
        studentId: this.studentId,
        teacherId: this.teacherId,
        date: date ? date : this.selectedDate,
      },
      headers: {
        Authorization: Auth.Authorization,
      },
    };
    await ClassAPI.getDetailReport(req)
      .then((res) => {
        console.info(res);
        this.reportDetailAry = res.data.data;
        // this.reportDetailAry.map((item, idx) => {
        //   item.modify = false;
        // });
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.reportDetailAry));
    if (this.reportDetailAry.length !== 0) {
      // if (this.reportDetailAry.length !== 0) {
      console.info('aaaaaaaaaaaaaaaaaaaa');
      this.reportWritingState = 2;
      console.info(this.reportDetailAry[0].number);
      console.info(this.reportDetailAry[0].number.substring(0, 1));
      this.selectedReportDate = this.reportDetailAry[0].dateAt;
      this.reportRound = this.reportDetailAry[0].number.substring(0, 1);
      this.reportStartTime = this.reportDetailAry[0].start;
      this.reportEndTime = this.reportDetailAry[0].end;
      this.reportContent = this.reportDetailAry[0].detail;
    } else {
      console.info('bbbbbbbbbbbbbbbbbb');
      this.selectedReportDate = '';
      this.reportWritingState = 1;
      this.reportRound = '';
      this.reportStartTime = '';
      this.reportEndTime = '';
      this.reportContent = '';
    }
    console.info(this.reportWritingState);
  };

  @action getQuestionList = async () => {
    console.info(this.studentId);
    console.info(this.teacherId);
    this.markingStateAry = [];
    this.markingStateObj = {};
    this.answerDueDateObj = {};
    this.getTuteeAnswerState = false;
    const req = {
      params: {
        studentId: this.studentId,
        teacherId: this.teacherId,
      },
      headers: {
        Authorization: Auth.Authorization,
      },
    };
    await GradingAPI.getQuestionList(req)
      .then(async (res) => {
        console.info(res);
        this.questionTotalList = res.data.data;
        await Promise.all(
          this.questionTotalList.map(async (item, idx) => {
            // item.checked = await this.getAnswer(item.id);
            await this.getAnswer(item.id);
            console.info(this.isExistAnswer);
            item.checked = this.isExistAnswer;

            console.info(item.checked);
            await this.markingAnswer(item.id, idx);
          })
        );
        console.info(toJS(this.questionTotalList));
        // this.scheduleAry = res.data.data;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.questionTotalList));
  };
  @action setQuestion = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const req = {
      params: {
        studentId: this.studentId,
        teacherId: this.teacherId,
      },
      headers: {
        Authorization: Auth.Authorization,
      },
      data: formData,
    };
    await GradingAPI.setQuestion(req)
      .then(async (res) => {
        console.info(res);
        alert('문제지를 업로드하였습니다!');
        // this.writingTabState = 1;
        // Common.modalActive = false;
        // this.getDetailReport();
        // this.getCalendar();
        this.getQuestionList();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action delQuestion = async (id) => {
    console.info(this.studentId);
    console.info(this.teacherId);
    console.info(id);
    const req = {
      // params: {
      //   studentId: this.studentId,
      //   teacherId: this.teacherId,
      // },
      headers: {
        Authorization: Auth.Authorization,
      },
      id: id,
    };
    await GradingAPI.delQuestion(req)
      .then(async (res) => {
        console.info(res);

        alert('문제지 삭제가 완료되었습니다!');

        this.getQuestionList();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action setTutorAnswer = async () => {
    console.info(this.totalQuestion);
    console.info(toJS(this.questionAry));
    console.info(this.questionPostId);
    console.info(this.answerDueDate);

    if (!this.answerDueDate) {
      alert('마감일을 선택해주세요.');
      return;
    }
    if (!this.totalQuestion) {
      alert('총 문제수를 입력해주세요.');
      return;
    }

    let answerAry = [];
    this.questionAry &&
      this.questionAry.map((item, idx) => {
        answerAry.push(item);
        console.info(toJS(item));
      });

    console.info(toJS(this.questionAry));
    console.info(this.questionAry.values);

    const req = {
      id: this.questionPostId,
      params: {
        grade: 'teacher',
      },
      headers: {
        Authorization: Auth.Authorization,
      },
      data: {
        prob: parseInt(this.totalQuestion),
        dueDate: this.answerDueDate,
        problem: this.questionAry,
      },
    };
    console.info(toJS(req.data));
    console.info(toJS(req.data.problem));
    await GradingAPI.setAnswer(req)
      .then(async (res) => {
        console.info(res);
        alert('답안지 작성이 완료되었습니다!');
        // this.writingTabState = 1;
        Common.modalActive = false;
        this.getQuestionList();
        // this.getDetailReport();
        // this.getCalendar();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action getAnswer = async (id) => {
    console.info(id);
    this.tuteeTotalQuestion = 0;
    this.answerAry = [];
    let isExist = false;

    const req = {
      id: id,
      headers: {
        Authorization: Auth.token,
      },
    };
    console.info(req);
    await GradingAPI.getAnswer(req)
      .then(async (res) => {
        console.info(res);
        isExist = true;
        if (res.data.success) {
          this.tuteeTotalQuestion = res.data.data.prob;
          // this.answerDueDateObj.push({ [id]: res.data.data.dueDate });
          this.answerDueDateObj[id] = res.data.data.dueDate;
          // this.markingTotalScoreObj[idx] = this.markingCorrect;
          this.answerAry = await res.data.data.problem;
          this.answerAry.map((item, idx) => {
            item.ans = '';
          });
          this.isExistAnswer = true;
        } else {
          this.isExistAnswer = false;
        }

        console.info(this.isExistAnswer);
        // return 1;
        // this.questionTotalList = res.data.data;
        // this.scheduleAry = res.data.data;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        isExist = false;
        this.isExistAnswer = false;
        // return 0;
      });
    console.info(toJS(this.answerAry));
  };

  @action setTuteeAnswer = async () => {
    const req = {
      id: this.questionPostId,
      params: {
        grade: 'student',
      },
      headers: {
        Authorization: Auth.token,
      },
      data: {
        prob: parseInt(this.tuteeTotalQuestion),
        problem: this.answerAry,
      },
    };

    console.info(toJS(req.data));
    console.info(toJS(req.data.problem));
    await GradingAPI.setAnswer(req)
      .then(async (res) => {
        console.info(res);
        alert('답안 작성이 완료되었습니다!');
        await this.getQuestionList();
        this.tuteeAnswerModalActive = false;

        // alert('수업보고서 작성이 완료되었습니다!');
        // this.writingTabState = 1;
        // Common.modalActive = false;
        // this.getDetailReport();
        // this.getCalendar();
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };
  @action gradingAnswer = async (idx = '') => {
    console.info('gradingAnswer');
    this.markingCorrect = 0;
    this.markingResultAry &&
      (await this.markingResultAry.map(async (item, idx) => {
        if (item.score === 'RIGHT') {
          this.markingCorrect += 1;
        }
      }));
    // this.markingResultAry.grade = this.markingCorrect;
    if (idx !== '') {
      this.markingTotalScoreObj[idx] = this.markingCorrect;
    }
  };
  @action markingAnswer = async (id, idx = '') => {
    console.info(id);

    const req = {
      id: id,
      headers: {
        Authorization: Auth.token,
      },
    };
    console.info(req);
    await GradingAPI.markingAnswer(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.success) {
          // this.markingTotalQuestion = res.data.data.prob;
          this.markingResultAry = await res.data.data.answer;

          // console.info(this.markingCorrect);
          if (idx !== '') {
            // await this.markingStateAry.push({ [idx]: true });
            await this.gradingAnswer(idx);
            await this.markingStateAry.push(true);
            this.markingStateObj[idx] = true;
            this.markingResultTotalObj[idx] = this.markingResultAry;
            console.info(toJS(this.markingStateAry));
          }

          // this.isExistAnswer = true;
        } else {
          // this.isExistAnswer = false;
          if (idx !== '') {
            // await this.markingStateAry.push({ [idx]: false });
            await this.markingStateAry.push(false);
            this.markingStateObj[idx] = false;
            this.markingResultTotalObj[idx] = null;
            console.info(toJS(this.markingStateAry));
          }
        }

        // return 1;
        // this.questionTotalList = res.data.data;
        // this.scheduleAry = res.data.data;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);

        // this.isExistAnswer = false;
        // return 0;
      });
    this.getTuteeAnswerState = true;
    console.info(toJS(this.markingTotalScoreObj));
    console.info(toJS(this.markingResultTotalObj));
    console.info(toJS(this.markingResultAry));
    console.info(toJS(this.answerAry));
    console.info(idx);
    console.info(toJS(this.markingStateAry));
    console.info(toJS(this.markingStateObj));
  };

  @action getTimeTable = async () => {
    console.info(Auth.loggedUserId);
    this.myScheduleAry = [];
    const req = {
      params: {
        id: Auth.loggedUserId,
        grade: Auth.loggedUserType,
      },

      headers: {
        Authorization: Auth.token,
      },
    };
    await ClassAPI.getTimeTable(req)
      .then(async (res) => {
        console.info(res);
        if (Auth.loggedUserType !== 'parent') {
          this.myScheduleAry = await res.data.data;
        } else {
          res.data.data &&
            res.data.data.map(async (item, idx) => {
              console.info(item);
              if (item.list.length !== 0) {
                await this.myScheduleAry.push(item);
              }
            });
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.myScheduleAry));
  };

  @action setTutorReview = async () => {
    console.info(Auth.loggedUserId);
    console.info(this.reviewTutorId);
    console.info(this.reviewContent);
    const req = {
      params: {
        studentId: Auth.loggedUserId,
        teacherId: this.reviewTutorId,
      },
      data: {
        star: this.ratingPoint,
        content: this.reviewContent,
      },
      headers: {
        Authorization: Auth.token,
      },
    };
    console.info(req.data);
    await ReviewAPI.setTutorReview(req)
      .then(async (res) => {
        console.info(res);
        // this.myScheduleAry = await res.data.data;
        alert('리뷰 작성이 완료되었습니다');
        this.reviewModalActive = false;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.myScheduleAry));
  };

  @action enrollmentChild = async () => {
    console.info(this.enrollmentChildId);
    console.info(this.enrollmentChildName);
    console.info(Auth.token);
    const req = {
      data: {
        studentId: this.enrollmentChildId,
        studentName: this.enrollmentChildName,
      },
      headers: {
        Authorization: Auth.token,
      },
    };
    console.info(req.data);
    await ClassAPI.enrollmentChild(req)
      .then(async (res) => {
        console.info(res);
        if (res.data.success) {
          alert(
            '자녀 등록 신청이 완료되었습니다. 자녀가 수락할 때까지 기다려주세요.'
          );
          this.enrollmentModalActive = false;
        } else {
          alert(
            '자녀 등록 신청을 실패하였습니다. 입력한 정보가 맞는지 다시 확인해주세요'
          );
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action getChildClassList = async () => {
    console.info(this.enrollmentChildId);
    console.info(this.enrollmentChildName);
    console.info(Auth.token);
    const req = {
      params: {
        id: Auth.loggedUserId,
        status: 'OPEN',
      },
      headers: {
        Authorization: Auth.token,
      },
    };
    console.info(req.data);
    await ClassAPI.getChildClassList(req)
      .then(async (res) => {
        console.info(res);
        if (res.data.success) {
          this.childClassAry = await res.data.data;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action endClass = async (teacherId, studentId) => {
    console.info(teacherId);
    console.info(studentId);
    console.info(Auth.token);
    const req = {
      params: {
        teacherId: teacherId,
        studentId: studentId,
      },
      headers: {
        Authorization: Auth.token,
      },
    };

    await ClassAPI.endClass(req)
      .then(async (res) => {
        console.info(res);
        alert('수업이 종료되었습니다');
        await this.getClass(Auth.loggedUserId);
        this.moreState = -1;
        // if (res.data.success) {

        // }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };
}
export default new MyClass();
