import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer, Provider } from 'mobx-react';
import viewImg from '../../../../static/images/Common/visibility.png';
import starImg from '../../../../static/images/Common/star.png';
import communicationImg from '../../../../static/images/Common/communication.png';
import maleImg from '../../../../static/images/Common/male.png';
import femaleImg from '../../../../static/images/Common/female.png';
import Modal from '../../../../components/Modal';
import Common from '../../../../stores/Common/Common';
import bookMarkWhiteImg from '../../../../static/images/Common/bookmarkWhite.png';
import bookMarkDarkImg from '../../../../static/images/Common/bookmarkDark.png';

@inject('Auth', 'Common', 'Tutee', 'Matching', 'Chatting')
@observer
class SubContent extends Component {
  openModal = () => {
    Common.modalActive = false;
  };
  closeModal = () => {
    Common.modalActive = true;
  };

  componentDidMount = async () => {
    const { Matching } = this.props;
    await Matching.getBookmark();
    await Matching.checkBookmark('tutee');
  };
  componentWillUnmount = () => {
    const { Matching } = this.props;
    Matching.bookmarkAry = [];
    Matching.isCheckBookmark = false;
  };

  render() {
    const { Tutee, Matching, Chatting, Auth } = this.props;
    return (
      <>
        <Container width={Common.width}>
          <Header>
            <Number>
              {/* <View>
                <img src={viewImg} />
                <div>74</div>
              </View> */}
              {/* <Rating>
                <img src={starImg} />
                <div>{Tutee.tuteeDetailAry.star}</div>
              </Rating> */}
            </Number>
            <Registration type={Tutee.tuteeDetailAry.registration !== 'CLOSE'}>
              {Tutee.tuteeDetailAry.registration === 'CLOSE'
                ? '모집마감'
                : '모집중'}
            </Registration>
          </Header>
          <Main>
            <SubMain>
              <Label type="name">{Tutee.tuteeDetailAry.name}</Label>
              {Tutee.tuteeDetailAry.sex === 'MALE' ? (
                <img src={maleImg} />
              ) : (
                <img src={femaleImg} />
              )}
            </SubMain>

            <SubMain>
              <Label>학력</Label>
              <Content>
                {Tutee.tuteeDetailAry.school} {Tutee.tuteeDetailAry.major}
              </Content>
            </SubMain>

            <SubMain>
              <Label>과목</Label>
              <Content>
                {Tutee.tuteeDetailAry.subject &&
                  Tutee.tuteeDetailAry.subject.map((item, idx) => {
                    return (
                      <MultipleBox type="subject">
                        <div>{item}</div>
                      </MultipleBox>
                    );
                  })}
              </Content>
            </SubMain>

            <SubMain>
              <Label>지역</Label>
              <Content>
                {Tutee.tuteeDetailAry.region &&
                  Tutee.tuteeDetailAry.region.map((item, idx) => {
                    return (
                      <MultipleBox type="region">
                        <div>{item}</div>
                      </MultipleBox>
                    );
                  })}
              </Content>
            </SubMain>

            <SubMain>
              <Label>비용</Label>
              <Content>{Tutee.tuteeDetailAry.cost}</Content>
            </SubMain>
          </Main>
          {Auth.loggedUserType === 'teacher' && (
            <ButtonBox>
              {console.info(Matching.isCheckBookmark)}
              <Button
                // bg="#888"
                bd="1px solid #707070"
                check={Matching.isCheckBookmark}
                onClick={async () => {
                  console.info('click');
                  // Common.modalActive = true;
                  // window.location.href = '/chatting';
                  console.info(Matching.bookmarkId);
                  console.info(Matching.isCheckBookmark);
                  if (Matching.isCheckBookmark) {
                    await Matching.checkBookmark('tutee');
                    console.info(Matching.bookmarkId);
                    Matching.delBookmark(Matching.bookmarkId);
                  } else {
                    Matching.setBookmark('tutee');
                  }
                }}
              >
                {Matching.isCheckBookmark ? (
                  <img src={bookMarkDarkImg} />
                ) : (
                  <img src={bookMarkWhiteImg} />
                )}

                <div>북마크</div>
              </Button>
              <Button
                bg="rgba(235, 114, 82, 0.7)"
                onClick={() => {
                  console.info('click');
                  // Common.modalActive = true;
                  // window.location.href = '/chatting';
                  Chatting.createChatRoom();
                }}
                color="#000"
              >
                <img src={communicationImg} />
                <div>1:1 문의</div>
              </Button>
            </ButtonBox>
          )}
        </Container>
        {/* {Common.modalActive === true && (
          <Modal
            // width={width}
            open={this.openModal}
            close={this.closeModal}
          />
        )} */}
        <Modal />
      </>
    );
  }
}

export default SubContent;

const Container = styled.div`
  // margin-right: 20px;
  width: 340px;
  //   width: 25%;
  display: flex;
  flex-direction: column;
  border: 2px solid #000;
  border-radius: 10px;
  //   height: 420px;
  height: fit-content;
  //   height: 100%;
  padding: 14px 15px;
  box-sizing: border-box;
  position: sticky;
  //   position: static;
  //   position: fixed;
  top: 3%;
  right: 0;
  //   right: 10%;
  //   left: 85%;

  //   transform: translateX(-50%);

  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 10px 8px;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const Number = styled.div`
  display: flex;
`;
const View = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  > img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;
const Rating = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
`;
const Registration = styled.div`
  //   width: 60px;
  //   height: 20px;
  border-radius: 18px;
  background-color: ${(props) =>
    props.type ? 'rgba(0, 85, 225, 0.6)' : 'rgba(255, 0, 0, 0.6)'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  box-sizing: border-box;
  font-size: 11px;
  // font-weight: bold;
  color: ${(props) => (props.type ? 'black' : 'white')};
  > div {
    // color: ${(props) => (props.type ? 'black' : 'white')};
  }
`;
const Main = styled.div``;
const SubMain = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  > img {
    width: 20px;
    height: 20px;
  }
`;
const Label = styled.div`
  font-size: ${(props) => (props.type === 'name' ? '32' : '20')}px;
  font-weight: bold;
  margin-right: 20px;
  min-width: 50px;

  @media (min-width: 768px) and (max-width: 991.98px) {
    min-width: 36px;
    font-size: ${(props) => (props.type === 'name' ? '24' : '16')}px;
    margin-right: 15px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: ${(props) => (props.type === 'name' ? '28' : '18')}px;
    margin-right: 18px;
    min-width: 36px;
  }
`;
const Content = styled.div`
  font-size: 16px;
  word-break: break-all;

  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 13px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 15px;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const Button = styled.button`
  cursor: pointer;
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid #707070;
  border: ${(props) => (props.bd ? (props.check ? 'none' : props.bd) : 'none')};
  border-radius: 24px;
  position: relative;
  background-color: ${(props) =>
    props.bg ? props.bg : props.check ? '#78a87e' : '#fff'};
  margin-bottom: 10px;
  > img {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
  }
  > div {
    font-size: 16px;
    font-weight: bold;
    color: ${(props) =>
      props.color ? props.color : props.check ? '#fff' : '#000'};
  }
`;

const MultipleBox = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) =>
    props.type === 'region' ? '#a596c4' : '#7eb1a8'};
  border-radius: 30px;
  padding: 3px 10px;
  box-sizing: border-box;
  margin-right: 5px;
  margin-bottom: 5px;

  > div {
    font-size: 12px;
    margin-right: 5px;
    color: #000;
  }
`;
