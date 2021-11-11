import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import * as MyPageAPI from '../../axios/MyPage/MyPage';
import * as ClassAPI from '../../axios/Managing/Class';

import Auth from '../Account/Auth';

class MyPage {
  // constructor() {
  //   makeObservable(this);
  // }

  @observable state = 1;
  @observable profileImgAry = [];
  @observable profileImgUrl = '';
  @observable profileImgName = '';

  @observable userInfoAry = [];
  @observable notificationState = false;
  @observable emailInfo = '';
  @observable phoneInfo = '';
  @observable birthInfo = '';

  @observable tutoringInfoAry = [];
  @observable certificationFileAry = [];
  @observable certificationName = '';
  @observable registrationState = false;
  @observable cost = '';
  @observable costState = '';
  @observable grade = '';
  @observable school = '';
  @observable schoolState = '';
  @observable major = '';
  @observable detailContent = '';

  @observable enrollmentList = [];

  @observable newPwd = '';
  @observable newPwdConfirm = '';

  @action onChangeHandler = (e, type = '', idx = '') => {
    switch (type) {
      case 'email_info':
        this.emailInfo = e.target.value;
        console.info(this.emailInfo);
        break;

      case 'phone_info':
        this.phoneInfo = e.target.value;
        console.info(this.phoneInfo);
        break;

      case 'birth_info':
        this.birthInfo = e.value;
        console.info(this.birthInfo);
        break;

      case 'school_info':
        this.school = e.value;
        console.info(this.school);
        break;

      case 'school_state_info':
        this.schoolState = e.value;
        console.info(this.schoolState);
        break;

      case 'major':
        this.major = e.value;
        console.info(this.major);
        break;

      case 'grade':
        this.grade = e.value;
        console.info(this.grade);
        break;
      case 'cost_state':
        this.costState = e.value;
        console.info(this.major);
        break;

      case 'cost':
        this.cost = e.value;
        console.info(this.cost);
        break;

      case 'new_password':
        this.newPwd = e.value;
        console.info(this.newPwd);
        break;

      case 'new_password_confirm':
        this.newPwdConfirm = e.value;
        console.info(this.newPwdConfirm);
        break;

      default:
        break;
    }
  };

  @action getUserInfo = async () => {
    console.info(Auth.token);
    console.info(localStorage.getItem('token'));
    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    await MyPageAPI.getUserInfo(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          this.userInfoAry = await res.data.data;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.userInfoAry));
  };

  @action putUserInfo = async () => {
    console.info(Auth.token);

    const formData = new FormData();

    formData.append('email', this.emailInfo);
    formData.append('tel', this.phoneInfo);
    formData.append('birth', this.birthInfo);
    formData.append('notification', this.notificationState ? 'OPEN' : 'CLOSE');
    formData.append('file', this.profileImgAry);

    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      data: formData,
    };

    console.info(req.data);
    await MyPageAPI.putUserInfo(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          // this.userInfoAry = await res.data.data;
          alert('회원정보 수정이 완료되었습니다');
          this.getUserInfo();
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.userInfoAry));
  };

  @action getTutorInfo = async () => {
    console.info(Auth.token);
    this.tutoringInfoAry = [];
    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    await MyPageAPI.getTutorInfo(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          this.tutoringInfoAry = await res.data.data;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.tutoringInfoAry));
  };

  @action putTutorInfo = async () => {
    console.info(Auth.token);
    // const regionList = [];
    // Auth.selected

    console.info(toJS(Auth.selectedLocation));
    console.info(toJS(Auth.selectedSubject));
    console.info(this.registrationState);
    console.info(this.costState);
    console.info(this.cost);
    console.info(this.school);
    console.info(this.schoolState);
    console.info(this.major);
    console.info(this.detailContent);
    console.info(this.certificationFileAry[0]);
    const formData = new FormData();

    for (let i = 0; i < Auth.selectedLocation.length; i++) {
      // console.info(this.selectedLocation[i]);
      formData.append(`regionL`, Auth.selectedLocation[i]);
    }

    for (let i = 0; i < Auth.selectedSubject.length; i++) {
      formData.append(`subjectL`, Auth.selectedSubject[i]);
    }

    formData.append('registration', this.registrationState ? 'OPEN' : 'CLOSE');

    formData.append('cost', this.costState + ' ' + this.cost);
    // formData.append('cost', 200000);
    formData.append('school', this.school);
    // formData.append('school', '가천대');
    // formData.append('status', 'IN_SCHOOL');
    formData.append('status', this.schoolState);
    formData.append('major', this.major);
    // formData.append('major', '컴퓨터공학과');
    formData.append('detail', this.detailContent);
    // formData.append('detail', 'dsfsdfd');

    formData.append('authFile', this.certificationFileAry[0]);

    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      data: formData,
    };

    console.info(req.data);
    await MyPageAPI.putTutorInfo(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          // this.userInfoAry = await res.data.data;
          alert('회원정보 수정이 완료되었습니다');
          this.getTutorInfo();
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.userInfoAry));
  };

  @action getTuteeInfo = async () => {
    console.info(Auth.token);
    this.tutoringInfoAry = [];
    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    await MyPageAPI.getTuteeInfo(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          this.tutoringInfoAry = await res.data.data;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.tutoringInfoAry));
  };

  @action putTuteeInfo = async () => {
    console.info(Auth.token);
    // const regionList = [];
    // Auth.selected

    console.info(toJS(Auth.selectedLocation));
    console.info(toJS(Auth.selectedSubject));
    console.info(this.registrationState);
    console.info(this.costState);
    console.info(this.cost);
    console.info(this.grade);

    console.info(this.detailContent);
    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      data: {
        regionL: Auth.selectedLocation,
        subjectL: Auth.selectedSubject,
        registration: this.registrationState ? 'OPEN' : 'CLOSE',
        cost: this.costState + ' ' + this.cost,

        school: this.grade,

        detail: this.detailContent,
      },
    };

    console.info(req.data);
    await MyPageAPI.putTuteeInfo(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          // this.userInfoAry = await res.data.data;
          alert('회원정보 수정이 완료되었습니다');
          this.getTuteeInfo();
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.userInfoAry));
  };

  @action getEnrollmentList = async () => {
    console.info(Auth.token);

    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    await ClassAPI.getEnrollmentList(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          this.enrollmentList = await res.data.data;
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.enrollmentList));
  };

  @action acceptEnrollment = async (parentName, parentId) => {
    console.info(Auth.token);

    // console.info(this.enrollmentList.parentId);
    console.info(Auth.loggedUserId);

    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      params: {
        parentId: parentId,
        studentId: Auth.loggedUserId,
      },
    };

    await ClassAPI.acceptEnrollment(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          // this.enrollmentList = await res.data.data;
          alert(`${parentName} 님을 부모님으로 등록하였습니다.`);
          this.getEnrollmentList();
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    // console.info(toJS(this.enrollmentList));
  };

  @action alterPassword = async () => {
    if (!this.newPwd) {
      alert('새 비밀번호를 입력해주세요.');
      return;
    }
    if (this.newPwd !== this.newPwdConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요');
      return;
    }
    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },

      data: {
        pwd: this.newPwd,
      },
    };

    await MyPageAPI.alterPassword(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          alert('비밀번호 변경에 성공하였습니다.');
          this.newPwd = '';
          this.newPwdConfirm = '';
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    // console.info(toJS(this.enrollmentList));
  };

  @action withDrawal = async () => {
    const req = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    await MyPageAPI.withDrawal(req)
      .then(async (res) => {
        console.info(res);

        if (res.data.statusCode === 401) {
          alert('로그인이 만료되었습니다');
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          // alert('회원탈퇴를 완료했습니다.');

          localStorage.removeItem('token');
          // window.location.href = '/';
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    // console.info(toJS(this.enrollmentList));
  };
}
export default new MyPage();
