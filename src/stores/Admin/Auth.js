import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import * as AccountAPI from '../../axios/Account/Account';

class Auth {
  // constructor() {
  //   makeObservable(this);
  // }
  @observable adminId = '';
  @observable adminPassword = '';
  @observable token = '';
  @observable loggedAdminId = '';
  @observable loggedAdminType = '';
  @observable loggedAdminName = '';

  @action onUserHandler = (e, type) => {
    switch (type) {
      case 'id':
        // console.info(e.target.value);
        this.adminId = e.target.value;
        break;
      case 'password':
        // console.info(e.target.value);
        this.adminPassword = e.target.value;
        break;
      default:
        break;
    }
  };

  @action adminLogin = async () => {
    const req = {
      data: {
        id: this.adminId,
        pwd: this.adminPassword,
      },
    };
    await AccountAPI.adminLogin(req)
      .then(async (res) => {
        console.info(res);
        if (res.data.success) {
          alert('관리자로 로그인에 성공하였습니다');
          this.token = res.headers.authorization;
          this.loggedAdminId = await res.data.data.id;
          this.loggedAdminType = await res.data.data.grade;
          this.loggedAdminName = await res.data.data.name;

          localStorage.setItem('adminToken', res.headers.authorization);
          localStorage.setItem('adminId', res.data.data.id);
          localStorage.setItem('adminType', res.data.data.grade);
          localStorage.setItem('adminName', res.data.data.name);
          window.location.href = '/admin/main';

          console.info(this.token);
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.message);
      });
  };

  @action adminLogout = () => {
    const req = {
      headers: {
        Authorization: localStorage.getItem('adminToken'),
      },
    };
    AccountAPI.adminLogout(req)
      .then((res) => {
        console.info(res);
        if (res.data.success) {
          alert('로그아웃 되었습니다');

          this.token = '';
          this.loggedAdminId = '';
          this.loggedAdminType = '';
          this.loggedAdminName = '';

          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminId');
          localStorage.removeItem('adminType');
          localStorage.removeItem('adminName');
          window.location.href = '/admin';
        }
      })
      .catch((e) => {
        console.info(e);
        console.info(e.message);
      });
  };
}

export default new Auth();
