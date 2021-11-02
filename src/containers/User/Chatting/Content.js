import React, { Component, useRef } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import defaultImg from '../../../static/images/Common/defaultUser.png';
import Textarea from '../../../components/TextareaContainer';
import InfoWriting from './InfoWriting';
import Info from './Info';
import { toJS } from 'mobx';
import { config } from '../../../firebase-config';

// import * as Stomp from '@stomp/stompjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

let messageBox = null;
const today = new Date();
let date = null;
let year = null;
let month = null;
let day = null;
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// firebase.initializeApp(config);
// const messaging = getMessaging(firebase.initializeApp(config));

let stompClient = null;

// messaging
//   .requestPermission()
//   .then(function () {
//     return messaging.getToken();
//   })
//   .then(function (token) {
//     console.log(token);
//   })
//   .catch(function (err) {
//     console.log('fcm error : ', err);
//   });

// messaging.onMessage(function (payload) {
//   console.log(payload.notification.title);
//   console.log(payload.notification.body);
// });

const userList = [
  {
    id: 1,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },

  {
    id: 1,
    name: 'user1',
    content: 'sd',
    writeDt: '2021-09-29',
  },

  {
    id: 1,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },

  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },

  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
  },
];

const chatList = [
  {
    id: 4,
    name: 'user1',
    content: 'sdddddddddddddddddddddddddddddddddddddddddd',
    writeDt: '2021-09-29',
    type: 'me',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
    type: 'you',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
    type: 'me',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
    type: 'you',
  },
  {
    id: 4,
    name: 'user1',
    content:
      'sdfsdfdsfdsfsdsdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdsssssssssssssssssssssssssssdfsdfdsfdsfsdfdssssssssssssssssssssssssssf',
    writeDt: '2021-09-29',
    type: 'you',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
    type: 'me',
  },
  {
    id: 4,
    name: 'user1',
    content:
      'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    writeDt: '2021-09-29',
    type: 'me',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
    type: 'me',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
    type: 'me',
  },
  {
    id: 4,
    name: 'user1',
    content: 'sdfsdfdsfdsfsdf',
    writeDt: '2021-09-29',
    type: 'you',
  },
];

@inject('Auth', 'Common', 'Chatting')
@observer
class Content extends Component {
  constructor(props) {
    super(props);
    messageBox = React.createRef();
  }

  state = { today: new Date() };

  openModal = () => {
    const { Common } = this.props;
    Common.modalActive = false;
  };
  closeModal = () => {
    const { Common } = this.props;
    Common.modalActive = true;
  };
  componentDidMount = async () => {
    const { Auth, Chatting } = this.props;
    console.info(Chatting.studentId);
    console.info(localStorage.getItem('otherPersonId'));
    await Chatting.getDetailClass();
    await Chatting.getChatUserList();
    if (Auth.loggedUserType === 'teacher') {
      await Chatting.checkInfoWriting();
    }

    this.connect();

    // const script = document.createElement('script');

    // script.src =
    //   'https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.2.0/stomp.min.js';
    // script.async = true;

    // document.head.appendChild(script);

    // <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.2.0/stomp.min.js"></script>
  };

  componentWillUnmount = () => {
    const { Auth, Chatting } = this.props;
    Chatting.otherName = '';
    Chatting.chatAry = [];
    Chatting.enrollmentState = 1;
  };
  connect = async () => {
    const { Chatting, Auth } = this.props;

    console.info('connect 중 ...');
    var socket = new SockJS('http://3.34.125.3:8088/tuthree-websocket');
    stompClient = Stomp.over(socket);
    // stompClient = socket;
    // stompClient = new Stomp.Client

    await stompClient.connect({}, async (frame) => {
      console.log('Connected: ' + frame);
      // stompClient.subscribe('/topic/messages', function (message) {
      await stompClient.subscribe(
        `/topic/messages.${Chatting.roomId}`,
        async (message) => {
          // showMessage(decodeURI(JSON.parse(message.body).content));
          console.info(decodeURI(JSON.parse(message.body).content));
          await Chatting.getChatUserList();
          await Chatting.getChatList(Chatting.roomId);
          console.info(this.scrollToBottom);
          this.scrollToBottom();
        }
      );
      // stompClient.subscribe('/user/topic/private-messages', function (message) {
      //     showMessage(JSON.parse(message.body).content);
      // });
    });
  };

  sendMessage() {
    const { Chatting, Auth } = this.props;
    console.log('sending message');
    Chatting.sendFcm();
    // stompClient.send("/ws/message", {}, JSON.stringify({'content': $("#message").val()}));
    // stompClient.send("/ws/message", {}, JSON.stringify({'content': encodeURI($("#message").val())}));
    stompClient.send(
      '/ws/message',
      {},
      JSON.stringify({
        room: { id: Chatting.roomId },
        name: encodeURI(Auth.loggedUserName),
        userId: Auth.loggedUserId,
        content: Chatting.chatMsg,
      })
    );
  }
  scrollToBottom = () => {
    // this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    if (messageBox.current) {
      console.info(messageBox.current.scrollTop);
      messageBox.current.scrollTop = messageBox.current.scrollHeight;
      console.info(messageBox.current.scrollTop);
    }
  };

  render() {
    const { Common, Auth, Chatting } = this.props;
    console.info(config);
    console.info(Common.modalActive);
    console.info(Chatting.enrollmentState);
    console.info(Chatting.writingState);
    console.info(Chatting.enrollmentState);
    year = today.getFullYear();
    month = ('0' + (today.getMonth() + 1)).slice(-2);
    day = ('0' + today.getDate()).slice(-2);
    date = year + '-' + month + '-' + day;
    console.info(date);
    return (
      <Container state={Common.modalActive}>
        {Common.modalActive === true && Common.modalState === 1 && (
          <Layer>
            <div>
              <InfoWriting
                // width={width}
                open={this.openModal}
                close={this.closeModal}
              />
            </div>
          </Layer>
        )}

        {Common.modalActive === true && Common.modalState === 2 && (
          <Layer>
            <div>
              <Info
                // width={width}
                open={this.openModal}
                close={this.closeModal}
              />
            </div>
          </Layer>
        )}

        <ChatList>
          <Label>
            <div>Chatting</div>
          </Label>
          <UserList>
            {Chatting.chatUserAry &&
              Chatting.chatUserAry.map((item, idx) => {
                // console.info(toJS(item));
                return (
                  <UserListItem
                    onClick={async () => {
                      console.info(toJS(item));
                      Chatting.registrationState = '';
                      localStorage.removeItem('otherPersonId');
                      Chatting.enrollmentState = 1;
                      if (Auth.loggedUserType === 'teacher') {
                        Chatting.studentId = item.chatList.senderId;
                        localStorage.setItem(
                          'otherPersonId',
                          item.chatList.senderId
                        );
                      } else {
                        Chatting.teacherId = item.chatList.senderId;
                        localStorage.setItem(
                          'otherPersonId',
                          item.chatList.senderId
                        );
                      }
                      Chatting.otherName = item.chatList.name;
                      Chatting.roomId = item.roomId;
                      Chatting.registrationState = item.chatList.registration;

                      await Chatting.getDetailClass();
                      if (Auth.loggedUserType === 'teacher') {
                        await Chatting.checkInfoWriting();
                      }
                      await Chatting.getChatList(item.roomId);
                      this.connect();
                    }}
                  >
                    <ImgBox width={55} height={55} mr={10}>
                      <div>
                        {/* <div>IMG</div> */}
                        <img src={defaultImg} />
                      </div>
                    </ImgBox>
                    <UserItem>
                      <UserLabel>
                        <UserName>{item.chatList.name}</UserName>
                        <UserWriteDt>
                          {date ===
                          item.chatList.date.substring(
                            0,
                            item.chatList.date.indexOf(' ')
                          )
                            ? item.chatList.date.substring(
                                item.chatList.date.indexOf(' '),
                                item.chatList.date.lastIndexOf(':')
                              )
                            : item.chatList.date.substring(
                                0,
                                item.chatList.date.lastIndexOf(':')
                              )}
                          {/* {item.chatList.date.substring(
                            0,
                            item.chatList.date.lastIndexOf(':')
                          )} */}
                          {/* {item.chatList.date.substring(
                            0,
                            item.chatList.date.indexOf(' ')
                          )} */}
                          {date ===
                            item.chatList.date.substring(
                              0,
                              item.chatList.date.indexOf(' ')
                            )}
                        </UserWriteDt>
                      </UserLabel>
                      <UserContent>{item.chatList.chat}</UserContent>
                    </UserItem>
                  </UserListItem>
                );
              })}
          </UserList>
          {localStorage.getItem('otherPersonId') &&
            localStorage.getItem('otherPersonId') !== 'tuthree10' && (
              <ButtonBox>
                {Chatting.registrationState === 'CLOSE' && (
                  <CtlBtn
                    style={{
                      backgroundColor: 'rgba(255, 0, 0, 0.7)',
                      opacity: '0.7',
                      // color: '#fff',
                    }}
                  >
                    <div>모집마감</div>
                  </CtlBtn>
                )}
                {Auth.loggedUserType === 'teacher' &&
                  Chatting.writingState === 1 &&
                  Chatting.registrationState === 'OPEN' && (
                    <CtlBtn
                      state={Chatting.enrollmentState === 1}
                      onClick={() => {
                        if (Chatting.enrollmentState === 1) {
                          window.scrollTo(0, 0);
                          Common.modalActive = true;
                          Common.modalState = 1;
                        }
                      }}
                    >
                      <div>과외 등록하기</div>
                    </CtlBtn>
                  )}
                {Auth.loggedUserType === 'teacher' &&
                  Chatting.writingState === 2 &&
                  Chatting.registrationState === 'OPEN' && (
                    <CtlBtn
                      state={Chatting.enrollmentState === 1}
                      onClick={async () => {
                        if (Chatting.enrollmentState === 1) {
                          await Chatting.getTutoringInfo();
                          window.scrollTo(0, 0);
                          Common.modalActive = true;
                          Common.modalState = 1;
                        }
                      }}
                    >
                      {Chatting.enrollmentState === 2 ? (
                        <div>과외 등록하기</div>
                      ) : (
                        <div>과외 정보 수정하기</div>
                      )}
                    </CtlBtn>
                  )}

                {Auth.loggedUserType === 'student' &&
                  Chatting.registrationState === 'OPEN' && (
                    <CtlBtn
                      state={Chatting.enrollmentState === 1}
                      onClick={async () => {
                        if (Chatting.enrollmentState === 1) {
                          await Chatting.getTutoringInfo();
                          window.scrollTo(0, 0);
                          // Common.modalActive = true;
                          // Common.modalState = 2;
                        }
                      }}
                    >
                      <div>과외 정보 조회하기</div>
                    </CtlBtn>
                  )}
              </ButtonBox>
            )}
        </ChatList>
        <ChatContainer>
          <ChatHeader>{Chatting.otherName}</ChatHeader>
          <ChatMain id="main" ref={messageBox}>
            {Chatting.chatAry &&
              Chatting.chatAry.map((item, idx) => {
                return (
                  <ChatListItem type={item.senderId === Auth.loggedUserId}>
                    <ImgBox
                      width={55}
                      height={55}
                      mr={10}
                      type={item.senderId === Auth.loggedUserId}
                    >
                      <div>
                        {/* <div>IMG</div> */}
                        <img src={defaultImg} />
                      </div>
                    </ImgBox>
                    <ChatItem type={item.senderId === Auth.loggedUserId}>
                      <ChatLabel type={item.senderId === Auth.loggedUserId}>
                        <ChatName type={item.senderId === Auth.loggedUserId}>
                          {item.senderName}
                        </ChatName>
                        <ChatContent type={item.senderId === Auth.loggedUserId}>
                          <div></div>
                          {item.chat}
                        </ChatContent>
                      </ChatLabel>
                      <ChatWriteDt type={item.senderId === Auth.loggedUserId}>
                        {date === item.date.substring(0, item.date.indexOf(' '))
                          ? item.date.substring(
                              item.date.indexOf(' '),
                              item.date.lastIndexOf(':')
                            )
                          : item.date.substring(0, item.date.lastIndexOf(':'))}
                      </ChatWriteDt>
                    </ChatItem>
                  </ChatListItem>
                );
              })}
          </ChatMain>
          <ChatWritingBox>
            {console.info(Chatting.chatMsg)}
            <Textarea
              value={Chatting.chatMsg}
              mxh={40}
              mih={40}
              placeholder={`메시지를 입력하세요`}
              type="chat_msg"
            />
            <Button
              onClick={async () => {
                await this.sendMessage();
                await Chatting.sendMessage();
                // let objDiv = document.getElementById('main');

                // objDiv.scrollTop = objDiv.scrollHeight;
                this.scrollToBottom();
                // this.setState({ g: 3 });
              }}
            >
              <div>전송</div>
            </Button>
          </ChatWritingBox>
        </ChatContainer>
      </Container>
    );
  }
}

export default Content;

const Container = styled.div`
  margin: 100px 0;
  width: 100%;
  // height: 800px;
  height: ${(props) => (props.state ? '59vh' : '100vh')};
  border: 2px solid #000;
  border-radius: 5px;
  display: flex;
  overflow: hidden;
  // position: fixed;
`;
const ChatList = styled.div`
  // border: 2px solid red;
  border-right: 1px solid #000;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 32%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 30%;
  }
`;

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    font-size: 22px;
    font-weight: bold;
  }
  padding: 10px 12px;
  box-sizing: border-box;
  border-bottom: 2px solid #707070;
`;
const UserList = styled.div`
  // height: auto;
  overflow: auto;
  // height: 80%;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const UserListItem = styled.div`
  padding: 10px 12px;
  box-sizing: border-box;
  border-bottom: 2px solid #707070;
  display: flex;
  align-items: center;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 3px 5px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 6px 8px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 8px 10px;
  }
`;
const ImgBox = styled.div`
  display: ${(props) => (props.type ? 'none' : 'flex')};
  justify-content: center;
  align-self: flex-start;
  margin-bottom: ${(props) => (props.mb ? props.mb : '0')}px;
  margin-right: ${(props) => (props.mr ? props.mr : '0')}px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => (props.width ? props.width : '0')}px;
    height: ${(props) => (props.height ? props.height : '0')}px;

    // background-color: #ccc;
    // border: 1px solid #707070;
    > div {
      font-size: 20px;
      font-weight: bold;
    }
    > img {
      width: 56px;
      height: 56px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      > img {
        width: ${(props) => (props.width ? props.width - 20 : '0')}px;
        height: ${(props) => (props.height ? props.height - 20 : '0')}px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      > img {
        width: ${(props) => (props.width ? props.width - 12 : '0')}px;
        height: ${(props) => (props.height ? props.height - 12 : '0')}px;
      }
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      > img {
        width: ${(props) => (props.width ? props.width - 6 : '0')}px;
        height: ${(props) => (props.height ? props.height - 6 : '0')}px;
      }
    }
  }
`;
const UserItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const UserLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserName = styled.div`
  font-size: 18px;
  font-weight: 500;
  min-width: 100px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    min-width: 60px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
    min-width: 80px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 17px;
    min-width: 90px;
  }
`;
const UserWriteDt = styled.div`
  font-size: 13px;
  color: #999999;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 9px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 11px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 12px;
  }
`;
const UserContent = styled.div`
  font-size: 14px;
  // width:50%;
  // word-break: break-all;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 13px;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 83%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 85%;
  }
`;

const ChatHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding: 5px 7px;
  box-sizing: border-box;
`;
const ChatMain = styled.div`
  border-bottom: 1px solid #000;
  overflow: auto;
  height: 88%;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ChatListItem = styled.div`
  padding: 10px 12px;
  box-sizing: border-box;
  // border-bottom: 2px solid #707070;
  display: flex;
  align-items: center;
  // width: ${(props) => (props.type ? '97%' : '50%')};
  justify-content: ${(props) => (props.type ? 'flex-end' : 'flex-start')};
  word-break: break-all;
  margin: 15px 0;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 6px 8px;
    margin: 8px 0;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 8px 10px;
    margin: 11px 0;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 9px 11px;
    margin: 13px 0;
  }
`;
const ChatItem = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.type ? 'row-reverse' : '')};
`;
const ChatLabel = styled.div`
  margin-right: ${(props) => (props.type ? '0' : '15px')};
  margin-left: ${(props) => (props.type ? '15px' : '0')};
  // width: 70%;
`;
const ChatName = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: ${(props) => (props.type ? 'none' : '')};
  text-align: ${(props) => (props.type ? 'right' : 'left')};

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 17px;
  }
`;
const ChatWriteDt = styled.div`
  align-self: flex-end;
  font-size: 13px;
  color: #999999;
  text-align: ${(props) => (props.type ? 'right' : 'left')}
  min-width: 70px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 9px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 11px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 12px;
  }
`;
const ChatContent = styled.div`
  font-size: 14px;
  // width: 50%;
  flex-direction: ${(props) => (props.type ? 'row-reverse' : '')};
  background-color: #ccc;
  border-radius: 3px;
  padding: 5px 8px;
  position: relative;
  > div:nth-of-type(1) {
    width: 15px;
    height: 12px;
    position: absolute;
    // border: 2px solid red;
    background-color: #ccc;
    left: ${(props) => (props.type ? '' : '-8px')};
    right: ${(props) => (props.type ? '-8px' : '')};
    border-radius: ${(props) => (props.type ? '0 0 100% 0' : '0 0 0 100%')};
    // clip: rect(0, 8px, 4px, 9px);
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 13px;
  }
`;

const ChatWritingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 4px 10px;
  box-sizing: border-box;
`;
const Button = styled.button`
  cursor: pointer;
  background-color: rgba(235, 114, 82, 0.7);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 70px;
  height: 40px;
`;

const ButtonBox = styled.div`
  padding: 15px 8px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  // height: 100%;
  border-top: 1px solid #000;
`;
const CtlBtn = styled.button`
  cursor: ${(props) => (props.state ? 'pointer' : 'initial')};
  background-color: ${(props) =>
    props.state ? 'rgba(235, 114, 82, 0.7)' : '#777'};
  // border: 1px solid #707070;
  border: none;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 80%;
  height: 40px;
  opacity: ${(props) => (props.state ? '1' : '0.5')};
  > div {
    font-size: 16px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 28px;
    > div {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 32px;
    > div {
      font-size: 14px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 36px;
    > div {
      font-size: 15px;
    }
  }
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);
  // overflow-y: scroll !important;
  // height: auto;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100vh;
    height: 100%;
    overflow-y: scroll !important;
  }
`;
