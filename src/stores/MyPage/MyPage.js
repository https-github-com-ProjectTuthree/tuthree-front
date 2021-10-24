import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import * as MyPageAPI from '../../axios/MyPage/MyPage';
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

      default:
        break;
    }
  };

  @action getUserInfo = async () => {
    console.info(Auth.Authorization);
    const req = {
      headers: {
        Authorization: Auth.token,
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
    const req = {
      headers: {
        Authorization: Auth.token,
      },
      data: {
        email: this.emailInfo,
        tel: this.phoneInfo,
        birth: this.birthInfo,
        notification: this.notificationState ? 'OPEN' : 'CLOSE',
      },
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
          // alert('회원정보 수정이 완료되었습니다');
          // this.getUserInfo();
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.userInfoAry));
  };
}
export default new MyPage();
