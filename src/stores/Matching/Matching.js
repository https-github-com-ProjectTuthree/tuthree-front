import { observable, action, makeObservable, toJS, decorate } from 'mobx';
import * as MatchingAPI from '../../axios/Matching/Matching';
import Auth from '../Account/Auth';
import Tutee from './Tutee';
import Tutor from './Tutor';

class Matching {
  // constructor() {
  //   makeObservable(this);
  // }
  @observable bookmarkAry = [];
  @observable bookmarkId = '';
  @observable isCheckBookmark = false;

  @action setBookmark = async (type) => {
    console.info(Auth.loggedUserId);
    // console.info(Tutee.tut)
    const req = {
      params: {
        // from: 'lZmooJ8Ydd',
        from: Auth.loggedUserId,
        // to: 'test112',
        to:
          type === 'tutor'
            ? Tutor.tutorDetailAry.userId
            : Tutee.tuteeDetailAry.userId,
      },
      //   headers: {
      //     Authorization: this.Authorization,
      //   },
    };
    console.info(req.params);
    await MatchingAPI.setBookmark(req)
      .then(async (res) => {
        console.info(res);
        await this.getBookmark();
        await this.checkBookmark(type);
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };

  @action getBookmark = async () => {
    this.bookmarkAry = [];
    console.info(Auth.loggedUserId);
    const req = {
      // params: {
      //   // userId: 'lZmooJ8Ydd',
      //   userId: Auth.loggedUserId,
      // },
      headers: {
        Authorization: Auth.token,
      },
    };
    await MatchingAPI.getBookmark(req)
      .then(async (res) => {
        console.info(res);
        await this.bookmarkAry.push(res.data.data);
        //  this.bookmarkAry = await res.data.data;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
    console.info(toJS(this.bookmarkAry));
  };

  @action checkBookmark = (type) => {
    // console.info(Tutor.tutorDetailAry.userId);
    let userId = '';
    if (type === 'tutor') {
      userId = Tutor.tutorDetailAry.userId;
    } else {
      userId = Tutee.tuteeDetailAry.userId;
    }
    this.bookmarkAry &&
      this.bookmarkAry[0] &&
      this.bookmarkAry[0].map((item, idx) => {
        console.info(toJS(item));
        console.info(toJS(item.object.id));
        console.info(userId);
        // console.info(item.indexOf('test112'));
        // if (item.user2 === 'test112') {
        if (item.object.userId === userId) {
          console.info('true');
          this.bookmarkId = item.bookmarkId;
          this.isCheckBookmark = true;
          return true;
        }
      });
    console.info(this.isCheckBookmark);
  };

  @action delBookmark = (id) => {
    console.info(id);
    const req = {
      id: id,

      //   headers: {
      //     Authorization: this.Authorization,
      //   },
    };
    MatchingAPI.delBookmark(req)
      .then((res) => {
        console.info(res);
        this.bookmarkId = '';
        this.isCheckBookmark = false;
      })
      .catch((e) => {
        console.info(e);
        console.info(e.response);
      });
  };
}

export default new Matching();
