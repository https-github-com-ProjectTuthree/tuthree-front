import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer, Provider } from 'mobx-react';
import Tutor from '../../../../stores/Matching/Tutor';
import emptyStarImg from '../../../../static/images/Common/emptyStar.png';
import starImg from '../../../../static/images/Common/star.png';
import viewImg from '../../../../static/images/Common/visibility.png';
import communicationImg from '../../../../static/images/Common/communication.png';
import maleImg from '../../../../static/images/Common/male.png';
import femaleImg from '../../../../static/images/Common/female.png';
import defaultImg from '../../../../static/images/Common/defaultUser.png';
import bookMarkWhiteImg from '../../../../static/images/Common/bookmarkWhite.png';
import bookMarkDarkImg from '../../../../static/images/Common/bookmarkDark.png';

const reviewData = [
  {
    id: 1,
    name: '김철수',
    writingDt: '2021-09-01',
    rating: '4.2',
    content:
      'dsfsdkfsdjfklsdfdfdsfdsfsdfdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsssdfsdfkljsdfjkldsfdfsdsldkjfsdlfjkdlsfdskjfkldsjfkldsjfkljdsfsdkfjsdlkfjsdkfjsdkljfklsd',
  },
  {
    id: 2,
    name: '김철수',
    writingDt: '2021-09-01',
    rating: '4.2',
    content:
      'dsfsdkfsdjfklsdfsldkjfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdlfjkdlsfdskjfkldsjfkldsjfkljdsfsdkfjsdlkfjsdkfjsdkljfklsd',
  },
  {
    id: 3,
    name: '김철수',
    writingDt: '2021-09-01',
    rating: '4.2',
    content:
      'ddsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfsdsfsdkfsdjfklsdfdfdsfdsfsdfssfsdkfsdjfklsdfsldkjfsdlfjkdlsfdskjfkldsjfkldsjfkljdsfsdkfjsdlkfjsdkfjsdkljfklsd',
  },
];

@inject('Tutor', 'Matching', 'Chatting', 'Auth')
@observer
class MobileContent extends Component {
  state = {
    reviewTotalCount: 5,
  };
  componentDidMount = async () => {
    const { Matching } = this.props;
    await Matching.getBookmark();
    await Matching.checkBookmark('tutor');
  };
  componentWillUnmount = () => {
    const { Matching } = this.props;
    Matching.bookmarkAry = [];
    Matching.isCheckBookmark = false;
    Tutor.tutorReviewAry = [];
    Tutor.tutorReviewCount = 0;
  };
  render() {
    const { Matching, Chatting, Auth } = this.props;
    return (
      <Container>
        <Number>
          {Auth.loggedUserType !== 'teacher' && (
            <div>
              <Button
                // bg="#888"
                width={70}
                bd="1px solid #707070"
                check={Matching.isCheckBookmark}
                onClick={async () => {
                  console.info('click');
                  // Common.modalActive = true;
                  // window.location.href = '/chatting';
                  console.info(Matching.bookmarkId);

                  if (Matching.isCheckBookmark) {
                    await Matching.checkBookmark('tutor');
                    Matching.delBookmark(Matching.bookmarkId);
                  } else {
                    Matching.setBookmark('tutor');
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
            </div>
          )}
          <div>
            <View>
              <img src={viewImg} />
              <div>74</div>
            </View>
            <TotalRating>
              <img src={starImg} />
              <div>{Tutor.tutorDetailAry.star}</div>
            </TotalRating>
            <Registration type={Tutor.tutorDetailAry.registration !== 'CLOSE'}>
              {Tutor.tutorDetailAry.registration === 'CLOSE'
                ? '모집마감'
                : '모집중'}
            </Registration>
          </div>
        </Number>
        <MainContent>
          <Header>
            <ImgBox width={130} height={130} mb={40}>
              <div>
                {/* <div>Img</div> */}
                {Tutor.tutorDetailAry.post ? (
                  <img
                    src={`data:image/png;base64,${Tutor.tutorDetailAry.post}`}
                  />
                ) : (
                  <img src={defaultImg} />
                )}
              </div>
            </ImgBox>
            <ItemBox>
              <Name mb={16}>
                <Label type="name" mr={15}>
                  {Tutor.tutorDetailAry.name}
                </Label>
                {Tutor.tutorDetailAry.sex === 'MALE' ? (
                  <img src={maleImg} />
                ) : (
                  <img src={femaleImg} />
                )}
              </Name>
              <Name>
                <Label>학력</Label>
                <Content>{Tutor.tutorDetailAry.school}</Content>
              </Name>

              <Name>
                <Label>비용</Label>
                <Content>{Tutor.tutorDetailAry.cost}</Content>
              </Name>
            </ItemBox>
          </Header>

          <Section>
            <Label>과목</Label>
            <Content>
              {Tutor.tutorDetailAry.subject &&
                Tutor.tutorDetailAry.subject.map((item, idx) => {
                  return (
                    <MultipleBox type="subject">
                      <div>{item}</div>
                    </MultipleBox>
                  );
                })}
            </Content>
          </Section>

          <Section>
            <Label>지역</Label>
            <Content>
              {Tutor.tutorDetailAry.region &&
                Tutor.tutorDetailAry.region.map((item, idx) => {
                  return (
                    <MultipleBox type="region">
                      <div>{item}</div>
                    </MultipleBox>
                  );
                })}
            </Content>
          </Section>

          <Section>
            <Label mb={10}>소개</Label>
            <Content bd={true} pd={true}>
              {Tutor.tutorDetailAry.detail}
            </Content>
          </Section>
          {Auth.loggedUserType !== 'teacher' && (
            <ButtonBox>
              <Button
                bg="rgba(235, 114, 82, 0.7)"
                color="#000"
                onClick={() => {
                  console.info('click');
                  // Common.modalActive = true;
                  // window.location.href = '/chatting';
                  Chatting.createChatRoom();
                }}
              >
                <img src={communicationImg} />
                <div>1:1 문의</div>
              </Button>
            </ButtonBox>
          )}
          <ReviewContainer>
            <Label>리뷰</Label>
            <ReviewHeader>
              <SubHeader mb={8}>
                <Count>
                  <span>{Tutor.tutorReviewCount}개</span>의 리뷰가 있습니다
                </Count>
                {Tutor.tutorReviewCount !== 0 && (
                  <SortingBox>
                    <span>최신순</span>
                    <span>높은평점순</span>
                    <span>낮은평점순</span>
                  </SortingBox>
                )}
              </SubHeader>
              {Tutor.tutorReviewCount !== 0 && (
                <SubHeader>
                  <Rating>
                    {[...Array(this.state.reviewTotalCount)].map(
                      (item, idx) => {
                        return (
                          <>
                            {idx + 1 <=
                            Math.trunc(Tutor.tutorDetailAry.star) ? (
                              <img src={starImg} />
                            ) : (
                              <img src={emptyStarImg} />
                            )}
                          </>
                        );
                      }
                    )}

                    {/* <img src={starImg} />
                    <img src={starImg} />
                    <img src={starImg} /> */}

                    <div>{Tutor.tutorDetailAry.star} | 5.0</div>
                  </Rating>
                </SubHeader>
              )}
            </ReviewHeader>
            <ReviewMainBox>
              {/* {reviewData &&
                reviewData.map((item, idx) => {
                  return (
                    <Item>
                      <SubItem>
                        <ImgBox
                          width={96}
                          height={96}
                          style={{ justifyContent: 'flex-start' }}
                        >
                          <div>
                            
                            <img src={defaultImg} />
                          </div>
                        </ImgBox>
                        <ReviewLabel>
                          <ReviewSubLabel>
                            <ReviewName>{item.name}</ReviewName>
                            <ReviewWritingDt>{item.writingDt}</ReviewWritingDt>
                          </ReviewSubLabel>
                          <ReviewSubLabel>
                            <ReviewRating>
                              <img src={starImg} />
                              <img src={starImg} />
                              <img src={starImg} />
                              <img src={starImg} />
                              <img src={emptyStarImg} />
                              <div>{item.rating}</div>
                            </ReviewRating>
                          </ReviewSubLabel>
                        </ReviewLabel>
                      </SubItem>
                      <SubItem>
                        <ReviewContent>
                          <div>{item.content}</div>
                        </ReviewContent>
                      </SubItem>
                    </Item>
                  );
                })} */}

              {Tutor.tutorReviewAry &&
                Tutor.tutorReviewAry.map((item, idx) => {
                  return (
                    <Item>
                      {console.info(item.userId.length)}
                      {console.info(typeof item.userId)}
                      {console.info(
                        item.userId.substr(0, 2) +
                          '*'.repeat(item.userId.length - 3)
                      )}
                      <SubItem>
                        <ImgBox
                          width={112}
                          height={112}
                          style={{ justifyContent: 'flex-start' }}
                        >
                          <div>
                            <img src={defaultImg} />
                          </div>
                        </ImgBox>
                        <ReviewLabel>
                          <ReviewSubLabel>
                            <ReviewName>
                              {item.userId.substr(0, 2) +
                                '*'.repeat(item.userId.length - 2)}
                            </ReviewName>
                            <ReviewWritingDt>{item.writeAt}</ReviewWritingDt>
                          </ReviewSubLabel>
                          <ReviewSubLabel>
                            <ReviewRating>
                              {[...Array(this.state.reviewTotalCount)].map(
                                (subItem, id) => {
                                  return (
                                    <>
                                      {id + 1 <= item.star ? (
                                        <img src={starImg} />
                                      ) : (
                                        <img src={emptyStarImg} />
                                      )}
                                    </>
                                  );
                                }
                              )}
                              <div>{item.star}</div>
                            </ReviewRating>
                          </ReviewSubLabel>
                        </ReviewLabel>
                      </SubItem>
                      <SubItem>
                        <ReviewContent>
                          <div>{item.content}</div>
                        </ReviewContent>
                      </SubItem>
                    </Item>
                  );
                })}
            </ReviewMainBox>
          </ReviewContainer>
        </MainContent>
      </Container>
    );
  }
}

export default MobileContent;

const Container = styled.div`
  // margin-right: 20px;
  width: 95%;
  display: flex;
  flex-direction: column;
  border: 2px solid #000;
  border-radius: 10px;
  //   height: 1200px;
  padding: 15px 10px;
  box-sizing: border-box;
`;
const MainContent = styled.div``;
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => (props.mb ? props.mb : '0')}px;
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
      width: ${(props) => (props.width ? props.width : '128')}px;
      height: ${(props) => (props.height ? props.height : '128')}px;
    }
  }
  @media (min-width: 0px) and (max-width: 392px) {
    > div {
      width: 100%;
      > img {
        width: ${(props) => (props.width ? props.width - 20 : '92')}px;
        height: ${(props) => (props.height ? props.height - 20 : '92')}px;
      }
    }
  }
`;
const Section = styled.div`
  margin-bottom: 50px;
`;
// const Name = styled.div`
//   font-weight: bold;
//   font-size: 32px;
//   margin-bottom: 20px;
// `;
const Content = styled.div`
  width: 100%;
  border: ${(props) => (props.bd ? '1px solid #707070' : 'none')};
  word-break: break-all;
  padding: ${(props) => (props.pd ? '12px 12px' : '12px 0')};
  box-sizing: border-box;
  font-size: 12px;
`;
const ReviewContainer = styled.div``;
const ReviewHeader = styled.div`
  margin-bottom: 25px;
  //   padding-bottom: 15px;
  //   border-bottom: 1px solid #707070;
`;
const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => (props.mb ? props.mb : '0')}px;
`;
const Count = styled.div`
  font-size: 12px;
  > span {
    font-weight: bold;
  }
`;
const SortingBox = styled.div`
  > span {
    border-right: 1px solid #888;
    padding 0 5px;
    box-sizing: border-box;
    font-size: 10px;
  }
`;
const Rating = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-left: 13px;
    font-size: 14px;
  }
  img {
    margin: 0 1px;
    width: 14px;
    height: 14px;
  }
`;
const ReviewMainBox = styled.div``;
const Item = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 20px 0;
  box-sizing: border-box;
`;
const SubItem = styled.div`
  display: flex;
`;
const ReviewLabel = styled.div`
  margin-left: 20px;
`;
const ReviewSubLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;
const ReviewName = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-right: 15px;
`;
const ReviewWritingDt = styled.div`
  font-size: 11px;
  color: rgba(0, 0, 0, 0.5);
`;
const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-left: 13px;
    font-size: 12px;
  }
  img {
    margin: 0 1px;
    width: 16px;
    height: 16px;
  }
`;
const ReviewContent = styled.div`
  width: 100%;
  margin-top: 25px;
  border: 1px solid #707070;
  > div {
    font-size: 11px;
    word-break: break-all;
    padding: 10px 15px;
    box-sizing: border-box;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ItemBox = styled.div`
  width: 100%;
  margin-left: 15px;
  align-self: flex-start;
`;
const Name = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.mb ? props.mb : '0')}px;
  > img {
    width: 16px;
    height: 16px;
  }
`;
const Number = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
  }
  > div:nth-of-type(2) {
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`;
const View = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  > img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
`;
const TotalRating = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
`;
const Registration = styled.div`
  width: 75px;
  height: 20px;
  // width: 80%;
  border-radius: 18px;
  background-color: ${(props) =>
    props.type ? 'rgba(0, 85, 225, 0.6)' : 'rgba(255, 0, 0, 0.6)'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  box-sizing: border-box;
  font-size: 10px;
  font-weight: bold;
  margin-left: 15px;

  color: ${(props) => (props.type ? 'black' : 'white')};
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
  font-weight: bold;
  margin-right: 20px;
  min-width: 40px;
  font-size: ${(props) => (props.type === 'name' ? '20' : '14')}px;
  margin-right: ${(props) => (props.mr ? props.mr : '5')}px;
  margin-bottom: ${(props) => (props.mb ? props.mb : '0')}px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;
const Button = styled.button`
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : '80')}%;
  min-width: 90px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid #707070;
  border: ${(props) => (props.bd ? (props.check ? 'none' : props.bd) : 'none')};
  border-radius: 24px;
  position: relative;
  background-color: ${(props) =>
    props.bg ? props.bg : props.check ? '#78a87e' : '#fff'};
  > img {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    
    width: 14px;
    height: 14px;
  }
  }
  > div {
    // color: #fff;
    font-size: 13px;
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
    font-size: 11px;
    margin-right: 5px;
    color: #000;
  }
`;
