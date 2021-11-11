import {
  observable,
  action,
  makeObservable,
  toJS,
  decorate,
  autorun,
  reaction,
  computed,
} from 'mobx';
import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';

import Common from '../Common/Common';
import * as AccountAPI from '../../axios/Account/Account';

class Auth {
  // constructor() {
  //   makeObservable(this);
  // }

  @observable notificationToken = '';

  @observable Authorization =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmcmVzaF90b2tlbiIsImlhdCI6MTYzMzEwNTYxOCwiZXhwIjoxNjMzMTA5MjE4LCJ1c2VySWQiOiJhZG1pbjEiLCJHcmFkZSI6ImFkbWluIn0.KuHs-qPG3gL0jdJzozeAWtf1q3I-w_96YconIIwNE7s';

  @observable token = '';
  @observable step = 1;
  @observable userType = 0;
  @observable domainType = 1;

  @observable temp = '';

  @observable signupId = ''; // 아이디
  @observable checkSignupId = false;
  @observable idErrorMessage = '';
  @observable signupPassword = ''; // 비밀번호
  @observable checkSignupPassword = false;
  @observable signupPasswordConfirm = ''; // 비밀번호 확인
  @observable signupName = ''; // 이름
  @observable emailValid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  @observable signupEmail = ''; // 이메일
  @observable signupEmailDomain = ''; // 이메일 도메인
  @observable signupPhone = ''; // 휴대전화
  @observable signupCertification = '';
  @observable signupGender = 0; // 성별
  @observable signupBirth = ''; // 출생년도
  @observable signupType = 0; // 학생 / 학부모
  @observable signupAuthOne = false;
  @observable signupAuthTwo = false;
  @observable signupComplete = false;
  @observable registrationState = true;

  @observable locationIndex = 0;
  @observable selectedUpperLocation = '';
  @observable selectedLowerLocation = '';
  @observable lowerLocationAry = [];
  @observable selectedLocation = []; // 지역

  @observable budgetAry = [
    {
      label: '10만원',
      value: 100000,
    },
    {
      label: '20만원',
      value: 200000,
    },
    {
      label: '30만원',
      value: 300000,
    },
    {
      label: '40만원',
      value: 400000,
    },
    {
      label: '50만원',
      value: 500000,
    },
    {
      label: '60만원',
      value: 600000,
    },
    {
      label: '70만원',
      value: 700000,
    },
    {
      label: '80만원',
      value: 800000,
    },
    {
      label: '90만원',
      value: 900000,
    },
    {
      label: '100만원 이상',
      value: 1000000,
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
  @observable stateSchoolAry = [
    {
      label: '재학상태',
      value: 'IN_SCHOOL',
    },
    {
      label: '졸업상태',
      value: 'GRADUATE',
    },
    {
      label: '휴학상태',
      value: 'ABSENCE_OF_SCHOOL',
    },
  ];

  @observable gradeAry = [
    {
      label: '유아/초등학생',
      value: 'UNDER_MIDDLE',
    },
    {
      label: '중1',
      value: 'M1',
    },
    {
      label: '중2',
      value: 'M2',
    },
    {
      label: '중3',
      value: 'M3',
    },
    {
      label: '고1',
      value: 'H1',
    },
    {
      label: '고2',
      value: 'H2',
    },
    {
      label: '고3',
      value: 'H3',
    },
    {
      label: '성인',
      value: 'OVER_HIGH',
    },
    {
      label: '중학교 검정고시 준비',
      value: 'EXAM_M',
    },

    {
      label: '고등학교 검정고시 준비',
      value: 'EXAM_H',
    },
  ];

  @observable subjectAry = [
    {
      id: 0,
      label: '국어',
      value: [
        {
          label: '중등 국어',
          value: 1,
        },
        {
          label: '고등 국어',
          value: 2,
        },
        {
          label: '고등 국어(문학)',
          value: 3,
        },
        {
          label: '고등 국어(문법)',
          value: 4,
        },
        {
          label: '고등 국어(화작문)',
          value: 5,
        },
        {
          label: '고등 국어(비문학)',
          value: 6,
        },
      ],
    },
    {
      id: 1,
      label: '수학',
      value: [
        {
          label: '중등 수학',
          value: 1,
        },
        {
          label: '고등 수학(공통)',
          value: 2,
        },
        {
          label: '고등 수학(문과)',
          value: 3,
        },
        {
          label: '고등 수학(이과)',
          value: 4,
        },
        {
          label: '편입 수학',
          value: 5,
        },
      ],
    },
    {
      id: 2,
      label: '사회',
      value: [
        {
          label: '중등사회',
          value: 1,
        },
        {
          label: '고등사회',
          value: 2,
        },
        {
          label: '세계사',
          value: 3,
        },
        {
          label: '한국사',
          value: 4,
        },

        {
          label: '동아시아사',
          value: 5,
        },
        {
          label: '세계지리',
          value: 6,
        },
        {
          label: '한국지리',
          value: 7,
        },
        {
          label: '윤리와사상',
          value: 8,
        },
        {
          label: '생활과윤리',
          value: 9,
        },

        {
          label: '사회문화',
          value: 10,
        },

        {
          label: '경제',
          value: 11,
        },
        {
          label: '법과정치',
          value: 12,
        },
      ],
    },

    {
      id: 3,
      label: '과학',
      value: [
        {
          label: '중등과학',
          value: 1,
        },
        {
          label: '고등과학',
          value: 2,
        },
        {
          label: '물리I',
          value: 3,
        },
        {
          label: '물리II',
          value: 4,
        },

        {
          label: '화학I',
          value: 5,
        },
        {
          label: '화학II',
          value: 6,
        },
        {
          label: '생명과학I',
          value: 7,
        },
        {
          label: '생명과학II',
          value: 8,
        },
        {
          label: '지구과학I',
          value: 9,
        },

        {
          label: '지구과학II',
          value: 10,
        },
      ],
    },
  ];

  @observable subjectIndex = 0;
  @observable selectedUpperSubject = '';
  @observable selectedLowerSubject = '';
  @observable lowerSubjectAry = [];
  @observable selectedSubject = []; // 과목

  @observable budget = 0; // 예산
  @observable budgetType = ''; // 예산 유형(시급, 일금, 주급, 월급)
  @observable school = ''; // 학교
  @observable major = ''; // 학교
  @observable schoolState = 0; // 재학상태
  @observable grade = ''; // 학년

  @observable fileAry = []; // 재학증명서
  @observable fileName = '';

  @observable introductionValue = '';

  /* 아이디/비밀번호 찾기 관련 변수 */
  @observable forgottenType = 1;
  @observable certificationType = 1;
  @observable idStep = 1;
  @observable passwordStep = 1;

  /* login 관련 변수 */
  @observable loginId = '';
  @observable loginPassowrd = '';
  @observable loginAuth = false;

  /* login한 유저의 아이디와 타입 */
  @observable loggedUserId = '';
  @observable loggedUserName = '';
  @observable loggedUserType = '';

  @observable findEmail = '';
  @observable findEmailName = '';
  @observable findTel = '';
  @observable findTelName = '';
  @observable findEmailMsg = '';

  @observable findPwdEmail = '';
  @observable findPwdEmailName = '';
  @observable findPwdEmailId = '';
  @observable findPwdTel = '';
  @observable findPwdTelName = '';
  @observable findPwdTelId = '';
  @observable findPwdMsg = '';
  @observable newPwd = '';
  @observable newPwdConfirm = '';
  @observable resId = '';
  @observable resGrade = '';

  getStep = () => {
    console.log(this.step);
  };

  @action resetSignupData = () => {
    this.signupId = ''; // 아이디
    this.checkSignupId = false;
    this.idErrorMessage = '';
    this.signupPassword = ''; // 비밀번호
    this.checkSignupPassword = false;
    this.signupPasswordConfirm = ''; // 비밀번호 확인
    this.signupName = ''; // 이름

    this.signupEmail = ''; // 이메일
    this.signupEmailDomain = ''; // 이메일 도메인
    this.signupPhone = ''; // 휴대전화
    this.signupCertification = '';
    this.signupGender = 0; // 성별
    this.signupBirth = ''; // 출생년도
    this.signupType = 0; // 학생 / 학부모
    this.signupAuthOne = false;
    this.signupAuthTwo = false;

    this.locationIndex = 0;
    this.selectedUpperLocation = '';
    this.selectedLowerLocation = '';
    this.lowerLocationAry = [];
    this.selectedLocation = []; // 지역

    this.subjectIndex = 0;
    this.selectedUpperSubject = '';
    this.selectedLowerSubject = '';
    this.lowerSubjectAry = [];
    this.selectedSubject = []; // 과목

    this.budget = 0; // 예산
    this.budgetType = '';
    this.school = ''; // 학교
    this.major = ''; // 학교
    this.schoolState = 0; // 재학상태
    this.grade = ''; // 학년

    this.fileAry = []; // 재학증명서
    this.fileName = '';

    this.introductionValue = '';

    this.signupComplete = false;
  };
  @action showData = () => {
    console.info(this.signupId);
    console.info(this.signupPassword);
    console.info(this.signupPasswordConfirm);
    console.info(this.signupName);
    console.info(this.signupEmail);
    console.info(this.signupPhone);
    console.info(this.signupGender);
    console.info(this.signupBirth);
    // console.info(this.signupType)

    console.info(toJS(this.selectedLocation));
    console.info(toJS(this.selectedSubject));
    console.info(this.budget);
    console.info(this.school);
    console.info(this.major);
    console.info(this.schoolState);
    // console.info(this.grade);
    console.info(toJS(this.fileAry));
    console.info(this.introductionValue);
  };

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
          // console.info(item);
          this.lowerLocationAry.push(item);
        });
        break;

      case 'lowerLocation':
        console.info('lowerLocation');
        this.setLowerLocation(e);

        console.info(
          this.selectedLocation.includes(
            `${this.selectedUpperLocation} ${this.selectedLowerLocation}`
          )
        );
        if (
          this.selectedLocation.includes(
            `${this.selectedUpperLocation} ${this.selectedLowerLocation}`
          )
        ) {
          alert('지역이 중복되었습니다. 다시 선택해주세요.');
          return;
        }

        console.info(
          `${this.selectedUpperLocation} ${this.selectedLowerLocation}`
        );
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
      case 'budget':
        this.budget = e.value;
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

      case 'findIdEmailName':
        this.findEmailName = e.value;

        break;

      case 'findIdEmail':
        this.findEmail = e.value;
        break;

      case 'findIdTelName':
        this.findTelName = e.value;

        break;

      case 'findIdTel':
        this.findTel = e.value;
        break;

      case 'findPwdEmailName':
        this.findPwdEmailName = e.value;

        break;

      case 'findPwdEmail':
        this.findPwdEmail = e.value;
        break;

      case 'findPwdEmailId':
        this.findPwdEmailId = e.value;
        break;

      case 'findPwdTelName':
        this.findPwdTelName = e.value;

        break;

      case 'findPwdTel':
        this.findPwdTel = e.value;
        break;

      case 'findPwdTelId':
        this.findPwdTelId = e.value;
        break;

      case 'new_password':
        this.newPwd = e.value;
        break;

      case 'new_password_confirm':
        this.newPwdConfirm = e.value;
        break;

      default:
        break;
    }
  };
  @action checkTutorData = async (type) => {
    switch (type) {
      case 'step1':
        if (!this.signupId) {
          await alert('아이디를 입력해주세요.');
          console.info('아이디');
          return;
        }

        if (this.checkSignupId) {
          await alert('아이디 중복확인을 진행해주세요.');

          return;
        }

        if (!this.signupPassword) {
          await alert('비밀번호를 입력해주세요.');
          return;
        }

        if (!this.signupPasswordConfirm) {
          await alert('비밀번호 확인을 입력해주세요.');
          return;
        }

        if (!this.checkSignupPassword) {
          await alert('비밀번호가 일치하지 않습니다.');
          return;
        }

        if (!this.signupName) {
          await alert('이름을 입력해주세요.');
          return;
        }

        if (!this.signupEmail) {
          await alert('이메일을 입력해주세요.');
          return;
        }
        const email = this.signupEmail + '@' + this.signupEmailDomain;
        if (!this.emailValid.test(email)) {
          await alert('이메일 형식을 확인해주세요.');
          return;
        }

        if (!this.signupPhone) {
          await alert('휴대폰 번호를 입력해주세요.');
          return;
        }

        if (!this.signupBirth) {
          await alert('출생년도를 선택해주세요.');
          return;
        }

        break;
      default:
        break;
    }
    console.info('sdfsdf');
    this.signupAuthOne = true;
    // return true;
  };

  @action checkTutorDataTwo = async (type) => {
    switch (type) {
      case 'step1':
        if (!this.selectedLocation.length) {
          await alert('지역을 선택해주세요.');
          return;
        }

        if (!this.selectedSubject.length) {
          await alert('과목을 선택해주세요.');
          return;
        }

        if (!this.school) {
          await alert('학교를 입력해주세요.');
          return;
        }

        if (!this.schoolState) {
          await alert('학교 재적 상태를 선택해주세요.');
          return;
        }

        if (!this.major) {
          await alert('학과를 입력해주세요.');
          return;
        }

        if (!this.fileAry.length) {
          await alert('재학증명서를 업로드해주세요.');
          return;
        }

        if (!this.budget) {
          await alert('급여를 선택해주세요.');
          return;
        }

        if (!this.introductionValue) {
          await alert('소개를 입력해주세요.');
          return;
        }

        break;
      default:
        break;
    }
    console.info('sdfsdf');
    this.signupAuthTwo = true;
    // return true;
  };

  @action checkTuteeData = async (type) => {
    switch (type) {
      case 'step1':
        if (!this.selectedLocation.length) {
          await alert('지역을 선택해주세요.');
          return;
        }

        if (!this.selectedSubject.length) {
          await alert('과목을 선택해주세요.');
          return;
        }

        if (!this.grade) {
          await alert('학년을 선택해주세요.');
          return;
        }

        if (!this.budget) {
          await alert('급여를 선택해주세요.');
          return;
        }

        if (!this.introductionValue) {
          await alert('소개를 입력해주세요.');
          return;
        }

        break;
      default:
        break;
    }
    console.info('sdfsdf');
    this.signupAuthTwo = true;
    // return true;
  };

  @action tutorSignup = async () => {
    console.info(`id : ${this.signupId}`);
    console.info(`password : ${this.signupPassword}`);
    console.info(`passwrod_confirm : ${this.signupPasswordConfirm}`);
    console.info(`name : ${this.signupName}`);
    console.info(`email : ${this.signupEmail}`);
    console.info(`email_Domain : ${this.signupEmailDomain}`);
    console.info(`tel : ${this.signupPhone}`);
    console.info(`sex : ${this.signupGender}`);
    console.info(`birth : ${this.signupBirth}`);
    console.info(`region : ${this.selectedLocation[0]}`);
    console.info(`subject : ${this.selectedSubject[0]}`);
    console.info(`cost : ${this.budget}`);
    console.info(`school : ${this.school}`);
    console.info(`status : ${this.schoolState}`);
    console.info(`major : ${this.major}`);
    console.info(`detail : ${this.introductionValue}`);
    console.info(this.signupEmail + '@' + this.signupEmailDomain);

    // const file = new File();

    const blob = new Blob();
    let formData = new FormData();
    formData.append('id', this.signupId);
    // formData.append('id', 'test149');
    formData.append('pwd', this.signupPassword);
    // formData.append('pwd', 'test149');
    formData.append('name', this.signupName);
    // formData.append('name', 'lsw');
    // formData.append('email', 'sdfsdf@naver.com');
    formData.append('email', this.signupEmail + '@' + this.signupEmailDomain);

    formData.append('tel', this.signupPhone);
    // formData.append('tel', '01011111111');
    formData.append('sex', this.signupGender === 0 ? 'MALE' : 'FEMALE');
    // formData.append('sex', 'MALE');
    formData.append('birth', this.signupBirth);
    // formData.append('birth', '2000');
    formData.append('grade', 'TEACHER');
    // formData.append('region', this.selectedLocation[0]);
    // formData.append('region', '수원시');

    for (let i = 0; i < this.selectedLocation.length; i++) {
      console.info(this.selectedLocation[i]);
      formData.append(`regionL`, this.selectedLocation[i]);
    }

    // formData.append(`region`, this.selectedLocation[0]);
    // formData.append(`region`, this.selectedLocation[1]);

    formData.append('registration', 'OPEN');
    // formData.append('subject', this.selectedSubject[0]);
    // formData.append('subject', '수학');

    for (let i = 0; i < this.selectedSubject.length; i++) {
      formData.append(`subjectL`, this.selectedSubject[i]);
    }

    formData.append('cost', this.budgetType + ' ' + this.budget);
    // formData.append('cost', 200000);
    formData.append('school', this.school);
    // formData.append('school', '가천대');
    // formData.append('status', 'IN_SCHOOL');
    formData.append('status', this.schoolState);
    formData.append('major', this.major);
    // formData.append('major', '컴퓨터공학과');
    formData.append('detail', this.introductionValue);
    // formData.append('detail', 'dsfsdfd');
    formData.append('file', blob);
    formData.append('authFile', this.fileAry[0]);
    const req = {
      data: formData,
    };

    await AccountAPI.tutorSignup(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          this.signupComplete = true;
        } else {
          this.signupComplete = false;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        console.info(e.response.data);
        if (e.response.data.status === 400) {
          this.signupComplete = false;
        }
      });
  };

  @action tuteeSignup = async () => {
    console.info(`id : ${this.signupId}`);
    console.info(`password : ${this.signupPassword}`);
    console.info(`passwrod_confirm : ${this.signupPasswordConfirm}`);
    console.info(`name : ${this.signupName}`);
    console.info(`email : ${this.signupEmail}`);
    console.info(`email_Domain : ${this.signupEmailDomain}`);
    console.info(`tel : ${this.signupPhone}`);
    console.info(`sex : ${this.signupGender}`);
    console.info(`birth : ${this.signupBirth}`);
    console.info(`region : ${this.selectedLocation[0]}`);
    console.info(`subject : ${this.selectedSubject[0]}`);
    console.info(`cost : ${this.budget}`);
    console.info(`grade : ${this.grade}`);

    console.info(`detail : ${this.introductionValue}`);
    console.info(this.signupEmail + '@' + this.signupEmailDomain);

    // const file = new File();

    const blob = new Blob();
    let formData = new FormData();
    formData.append('id', this.signupId);
    // formData.append('id', 'test149');
    formData.append('pwd', this.signupPassword);
    // formData.append('pwd', 'test149');
    formData.append('name', this.signupName);
    // formData.append('name', 'lsw');
    // formData.append('email', 'sdfsdf@naver.com');
    formData.append('email', this.signupEmail + '@' + this.signupEmailDomain);

    formData.append('tel', this.signupPhone);
    // formData.append('tel', '01011111111');
    formData.append('sex', this.signupGender === 0 ? 'MALE' : 'FEMALE');
    // formData.append('sex', 'MALE');
    formData.append('birth', this.signupBirth);
    // formData.append('birth', '2000');
    formData.append('grade', 'STUDENT');
    // formData.append('region', this.selectedLocation[0]);
    // formData.append('region', '수원시');

    for (let i = 0; i < this.selectedLocation.length; i++) {
      formData.append(`regionL`, this.selectedLocation[i]);
    }

    // formData.append(`region`, this.selectedLocation[0]);
    // formData.append(`region`, this.selectedLocation[1]);

    formData.append('registration', 'OPEN');
    // formData.append('subject', this.selectedSubject[0]);
    // formData.append('subject', '수학');

    for (let i = 0; i < this.selectedSubject.length; i++) {
      formData.append(`subjectL`, this.selectedSubject[i]);
    }

    formData.append('cost', this.budgetType + ' ' + this.budget);

    // formData.append('cost', 200000);
    formData.append('school', this.grade);
    // formData.append('school', '가천대');
    // formData.append('status', 'IN_SCHOOL');
    // formData.append('status', this.schoolState);
    // formData.append('major', this.major);
    // formData.append('major', '컴퓨터공학과');
    formData.append('detail', this.introductionValue);
    // formData.append('detail', 'dsfsdfd');
    formData.append('file', blob);
    // formData.append('authFile', this.fileAry[0]);
    const req = {
      data: formData,
    };

    await AccountAPI.tuteeSignup(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          this.signupComplete = true;
        } else {
          this.signupComplete = false;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        console.info(e.response.data);
        if (e.response.data.status === 400) {
          this.signupComplete = false;
        }
      });
  };

  @action parentSignup = async () => {
    console.info(`id : ${this.signupId}`);
    console.info(`password : ${this.signupPassword}`);
    console.info(`passwrod_confirm : ${this.signupPasswordConfirm}`);
    console.info(`name : ${this.signupName}`);
    console.info(`email : ${this.signupEmail}`);
    console.info(`email_Domain : ${this.signupEmailDomain}`);
    console.info(`tel : ${this.signupPhone}`);
    console.info(`sex : ${this.signupGender}`);
    console.info(`birth : ${this.signupBirth}`);
    console.info(`region : ${this.selectedLocation[0]}`);
    console.info(`subject : ${this.selectedSubject[0]}`);
    console.info(`cost : ${this.budget}`);
    console.info(`grade : ${this.grade}`);

    console.info(`detail : ${this.introductionValue}`);
    console.info(this.signupEmail + '@' + this.signupEmailDomain);

    // const file = new File();

    const blob = new Blob();
    let formData = new FormData();
    formData.append('id', this.signupId);
    // formData.append('id', 'test149');
    formData.append('pwd', this.signupPassword);
    // formData.append('pwd', 'test149');
    formData.append('name', this.signupName);
    // formData.append('name', 'lsw');
    // formData.append('email', 'sdfsdf@naver.com');
    formData.append('email', this.signupEmail + '@' + this.signupEmailDomain);

    formData.append('tel', this.signupPhone);
    // formData.append('tel', '01011111111');
    formData.append('sex', this.signupGender === 0 ? 'MALE' : 'FEMALE');
    // formData.append('sex', 'MALE');
    formData.append('birth', this.signupBirth);
    // formData.append('birth', '2000');
    formData.append('grade', 'PARENT');

    formData.append('file', blob);
    // formData.append('authFile', this.fileAry[0]);
    const req = {
      data: formData,
    };

    await AccountAPI.parentSignup(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          this.signupComplete = true;
        } else {
          this.signupComplete = false;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        console.info(e.response.data);
        if (e.response.data.status === 400) {
          this.signupComplete = false;
        }
      });
  };

  @action checkId = async (id) => {
    console.info(typeof id);
    console.info(id.length);
    console.info(typeof id.length);

    if (id.length < 6 || id.length > 12) {
      console.info('a');
      alert('아이디를 6-12자 이내로 작성해주세요.');
      this.idErrorMessage = '* 아이디를 6-12자 이내로 작성해주세요.';
      this.checkSignupId = true;
      return;
    }

    console.info(id);
    const req = {
      id: id,
    };

    AccountAPI.checkId(req)
      .then((res) => {
        console.info(res);
        this.checkSignupId = res.data;
        if (res.data) {
          this.idErrorMessage =
            '* 중복되는 아이디가 있습니다. 다시 입력해주세요';
        } else {
          this.idErrorMessage = '* 사용가능한 아이디입니다.';
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };
  const;

  @action checkLoginData = async () => {
    if (!this.loginId) {
      await alert('아이디를 입력해주세요.');
      return;
    }
    if (!this.loginPassowrd) {
      await alert('비밀번호를 입력해주세요.');
      return;
    }
    this.loginAuth = true;
  };

  @action login = async () => {
    // const history = useHistory();
    this.temp = 'sfdfsdf';
    Common.temp = 'sdfsdfsdf';
    const req = {
      data: {
        id: this.loginId,
        pwd: this.loginPassowrd,
      },
      // headers: {
      //   Authorization: this.Authorization,
      // },
    };

    await AccountAPI.login(req)
      .then(async (res) => {
        console.info(res);
        console.info(res.headers);
        console.info(res.data.data.id);
        console.info(res.data.data.grade);
        console.info(Object.keys(res.headers));

        // window.location.href = '/';
        if (res.data.success) {
          alert('로그인에 성공하셨습니다.');
          this.token = await res.headers.authorization;
          console.info(this.token);
          this.loggedUserId = await res.data.data.id;
          this.loggedUserType = await res.data.data.grade;
          this.loggedUserName = await res.data.data.name;
          localStorage.setItem('token', this.token);
          localStorage.setItem('userId', res.data.data.id);
          localStorage.setItem('userType', res.data.data.grade);
          localStorage.setItem('userName', res.data.data.name);
          // setTimeout(() => {
          //   // window.location.href = '/';
          //   // window.location.replace('/');
          //   // Route.push('/');
          //   window.location.pathname = '/';
          // }, 5000);
          // window.history.forward('/');
          // if (this.loggedUserId) {
          window.location.href = '/';
          // window.history.pushState(null, null, '/');
          // window.location.reload();
          // history.push({
          //   pathname: '/',
          // });
          // }
          console.info(this.loggedUserId);
          console.info(this.loggedUserType);
          console.info(localStorage.getItem('userType'));
        } else {
          await alert(res.data.message);
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        alert('로그인에 실패하였습니다. 입력한 정보가 맞는지 확인하세요.');
      });
  };

  @action logout = async () => {
    await AccountAPI.logout()
      .then((res) => {
        console.info(res);
        alert('로그아웃 되었습니다.');
        this.loggedUserId = '';
        this.loggedUserType = '';
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        window.location.href = '/';
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action findId = async () => {
    console.info('findId');
    console.info(this.certificationType === 1 ? 'email' : 'tel');
    console.info(this.findEmailName);
    console.info(this.findEmail);
    const req = {
      type: this.certificationType === 1 ? 'email' : 'tel',
      data: {
        name:
          this.certificationType === 1 ? this.findEmailName : this.findTelName,
        email: this.findEmail,
        tel: this.findTel,
      },
    };
    if (this.certificationType === 1) {
      delete req.data.tel;
    } else {
      delete req.data.email;
    }
    AccountAPI.findId(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          this.findEmailMsg = res.data.message;
          this.idStep = 2;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        alert('아이디 찾기에 실패하였습니다. 다시 시도해주세요.');
      });
  };

  @action findPwd = async () => {
    console.info('findId');
    console.info(this.certificationType === 1 ? 'email' : 'tel');

    const req = {
      type: this.certificationType === 1 ? 'email' : 'tel',
      data: {
        id:
          this.certificationType === 1
            ? this.findPwdEmailId
            : this.findPwdTelId,
        name:
          this.certificationType === 1
            ? this.findPwdEmailName
            : this.findPwdTelName,
        email: this.findPwdEmail,
        tel: this.findPwdTel,
      },
    };
    if (this.certificationType === 1) {
      delete req.data.tel;
    } else {
      delete req.data.email;
    }
    AccountAPI.findPwd(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          this.findPwdMsg = res.data.message;

          this.resId = res.headers.id;
          this.resGrade = res.headers.grade;
          this.passwordStep = 2;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        alert('일치하는 데이터가 없습니다. 다시 시도해주세요.');
      });
  };

  @action changePwd = async () => {
    console.info('findId');
    console.info(this.certificationType === 1 ? 'email' : 'tel');
    console.info(this.findEmailName);
    console.info(this.findEmail);
    const req = {
      data: {
        pwd: this.newPwd,
      },
      headers: {
        Id: this.resId,
        Grade: this.resGrade,
      },
    };

    AccountAPI.changePwd(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          // alert('')
          // this.findPwdMsg = res.data.message;
          this.passwordStep = 3;
          // Auth.passwordStep = 3;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        // alert('일치하는 데이터가 없습니다. 다시 시도해주세요.');
      });
  };

  @action emailAuth = async () => {
    if (!this.signupEmail || !this.signupEmailDomain) {
      alert('이메일을 입력해주세요.');
      return;
    }
    console.info(this.signupEmail + '@' + this.signupEmailDomain);
    const req = {
      params: {
        mail: this.signupEmail + '@' + this.signupEmailDomain,
      },
    };

    AccountAPI.emailAuth(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
        // alert('일치하는 데이터가 없습니다. 다시 시도해주세요.');
      });
  };
}

// autorun(() => {
//   console.info('autorun');
//   console.info(Auth.loggedUserId);
//   console.info(Auth);
// });

// reaction(
//   () => Auth.loggedUserId,
//   (loggedUserId) => {
//     console.info(`${loggedUserId}`);
//   }
// );

export default new Auth();
