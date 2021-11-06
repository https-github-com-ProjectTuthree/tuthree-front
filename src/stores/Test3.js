import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import * as AccountAPI from '../axios/Account/Test3';

class Test3 {
  @observable loginId = '';
  @observable loginPasswrd = '';

  @action login = async () => {
    // const history = useHistory();

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
        // this.loggedUserId = '';
        // this.loggedUserType = '';
        localStorage.removeItem('token');
        window.location.href = '/test3';
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };
}

export default new Test3();
