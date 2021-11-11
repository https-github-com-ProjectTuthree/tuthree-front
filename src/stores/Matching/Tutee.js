import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import * as TuteeAPI from '../../axios/Matching/Tutee';
import Chatting from '../Chatting';

class Tutee {
  // constructor() {
  //   makeObservable(this);
  // }
  @observable state = 0;
  @observable domainType = 1;

  @observable locationIndex = 0;
  @observable selectedUpperLocation = '';
  @observable selectedLowerLocation = '';
  @observable lowerLocationAry = [];
  @observable selectedLocation = []; // 지역

  @observable subjectIndex = 0;
  @observable selectedUpperSubject = '';
  @observable selectedLowerSubject = '';
  @observable lowerSubjectAry = [];
  @observable selectedSubject = []; // 과목

  @observable tuteeState = 1; // 1 : 조회, 2 : 작성, 3 : 세부 조회
  @observable tuteeTotalCount = 0;
  @observable tuteeList = []; // tutee 페이지 당 목록 데이터
  @observable tuteeListTotalCount = 0; // tutee 전체 개수
  @observable tuteeTotalPage = 0; // tutee 전체 페이지 수
  @observable tuteeCurrentPage = 1; // tutee 현재 페이지
  @observable tuteeCurrentSet = parseInt((this.tuteeCurrentPage - 1) / 5) + 1; // tutee 현재 화면에 보일 페이지들 (ex: 1 2 3 4 5 / 6 7 8 9 10 ...)

  @observable tuteeDetailAry = [];

  @observable sortIdx = 0;
  @observable sortAry = [
    {
      label: '최신순',
      value: 'latest',
    },
    {
      label: '오래된순',
      value: 'old',
    },
    {
      label: '급여 높은 순',
      value: 'hprice',
    },
    {
      label: '급여 낮은 순',
      value: 'lprice',
    },
  ];

  @observable budgetType = '';
  @observable lowerBudget = '';
  @observable upperBudget = '';
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
  @observable budgetMark = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 10,
      label: '10만원',
    },
    {
      value: 20,
      label: '20만원',
    },
    {
      value: 30,
      label: '30만원',
    },
    {
      value: 40,
      label: '40만원',
    },
    {
      value: 50,
      label: '50만원',
    },
    {
      value: 60,
      label: '60만원',
    },
    {
      value: 70,
      label: '70만원',
    },
    {
      value: 80,
      label: '80만원',
    },
    {
      value: 90,
      label: '90만원',
    },
    {
      value: 100,
      label: '100만원',
    },
  ];
  @observable budgetValue = [0, 100];

  @action setUpperLocation = (e) => {
    console.info(e);
    // console.info(e[0]);
    // this.selectedUpperLocation = e.label;
    this.selectedUpperLocation = e.name;

    // console.info(toJS(e[0]));
    // console.info(toJS(this.selectedUpperLocation));
    this.selectedLowerLocation = e.gugun[0].name;
  };

  @action setLowerLocation = (e) => {
    this.selectedLowerLocation = e.name;
    // this.midCategorySet = e.detail;
    console.info(toJS(e));
    console.info(toJS(this.selectedUpperLocation));
    // this.selectedLowerLocation = e.value[0].label;
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
      case 'upperLocation':
        console.info(e);
        console.info('upperLocation');

        this.locationIndex = e.id;
        this.setUpperLocation(e);
        this.lowerLocationAry = [];

        e.gugun.map((item, idx) => {
          console.info(item);
          this.lowerLocationAry.push(item);
        });
        break;

      case 'lowerLocation':
        console.info('lowerLocation');
        this.setLowerLocation(e);

        console.info(
          `${this.selectedUpperLocation} ${this.selectedLowerLocation}`
        );

        if (
          this.selectedLocation.includes(
            `${this.selectedUpperLocation} ${this.selectedLowerLocation}`
          )
        ) {
          alert('지역이 중복되었습니다. 다시 선택해주세요.');
          return;
        }

        this.selectedLocation.push(
          `${this.selectedUpperLocation} ${this.selectedLowerLocation}`
        );
        console.info(toJS(this.selectedLocation));
        break;

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

        if (
          this.selectedSubject.includes(
            `<${this.selectedUpperSubject}> ${this.selectedLowerSubject}`
          )
        ) {
          alert('과목이 중복되었습니다. 다시 선택해주세요.');
          return;
        }

        this.selectedSubject.push(
          `<${this.selectedUpperSubject}> ${this.selectedLowerSubject}`
        );
        console.info(e.label);

        break;
      case 'lowerBudget':
        this.lowerBudget = e.value;
        break;

      case 'upperBudget':
        this.upperBudget = e.value;
        break;

      case 'budgetType':
        this.budgetType = e.value;
        break;
      case 'schoolState':
        this.schoolState = e.value;
        break;
      case 'grade':
        this.grade = e.value;
        break;
      default:
        break;
    }
  };
  @action pushToDetail = (item, idx) => {
    this.tuteeDetailAry.push(item);
    this.state = 1;
    console.info(toJS(this.tuteeDetailAry));
  };

  @action getTuteeList = async (id) => {
    console.info('init');
    const req = {
      id: id ? id : 1,
      params: {
        start: this.budgetType + ' ' + this.lowerBudget,
        end: this.budgetType + ' ' + this.upperBudget,
        region: this.selectedLocation.join(', '),
        subject: this.selectedSubject.join(', '),
        sort: this.sortAry[this.sortIdx].value,
      },
      headers: {
        Authorization: this.Authorization,
      },
    };

    if (this.selectedSubject.length === 0) {
      delete req.params.subject;
    }

    if (this.selectedLocation.length === 0) {
      delete req.params.region;
    }

    if (!this.lowerBudget) {
      delete req.params.start;
    }

    if (!this.upperBudget) {
      delete req.params.end;
    }

    console.info(req);

    TuteeAPI.getTuteeList(req)
      .then(async (res) => {
        console.info(res);
        this.tuteeTotalCount = await res.data.list;
        this.tuteeList = await res.data.data;
        this.tuteeListTotalCount = await res.data.list;
        this.tuteeTotalPage = await Math.ceil(this.tuteeListTotalCount / 12);

        this.tuteeCurrentSet = parseInt((this.tuteeCurrentPage - 1) / 5) + 1; // tutee 현재 화면에 보일 페이지들 (ex: 1 2 3 4 5 / 6 7 8 9 10 ...)

        await this.tuteeList.map(async (item, idx) => {
          item.checked = false;
        });
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  /* commuinity 상세 페이지로 이동하는 함수 */
  @action getTuteeDetailList = async (item, idx = 0, type = '') => {
    // this.tuteeDetailAry.push(item);
    // Chatting.studentId = '';
    console.info(toJS(item));
    console.info(item.postId);

    console.info(this.communityState);
    const req = {
      id: item.postId,
      // headers: {
      //   Authorization: this.Authorization,
      // },
    };

    await TuteeAPI.getDetailTuteeList(req)
      .then(async (res) => {
        console.info(res);
        this.tuteeDetailAry = await res.data.data;
        Chatting.studentId = res.data.data.userId;
        console.info(Chatting.studentId);
        localStorage.setItem('otherPersonId', res.data.data.userId);
        this.state = 1;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });

    // await this.communityDetailList.push(item);
    console.info(toJS(this.tuteeDetailAry));
  };

  /* 선생님 클릭한 페이지로 이동하는 함수 */
  @action movePage = async (e) => {
    const newPage = e.target.innerText * 1;
    this.tuteeCurrentPage = newPage;
    await this.getTuteeList(this.tuteeCurrentPage);
  };

  /* 선생님 다음 페이지로 이동하는 함수 */
  @action pageNext = async () => {
    if (this.tuteeCurrentPage < this.tuteeTotalPage) {
      const nextPage = this.tuteeCurrentPage + 1;
      this.tuteeCurrentPage = nextPage;
      await this.getTuteeList(this.tuteeCurrentPage);
    }
  };

  /* 선생님 이전 페이지로 이동하는 함수 */
  @action pagePrev = async () => {
    if (this.tuteeCurrentPage > 1) {
      const newPage = this.tuteeCurrentPage - 1;
      this.tuteeCurrentPage = newPage;
      await this.getTuteeList(this.tuteeCurrentPage);
    }
  };
}

export default new Tutee();
