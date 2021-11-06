import React, { Component } from 'react';
import styled from 'styled-components';
import Filter from '../../../components/Filter';
import Card from '../../../components/Card';
import { inject, observer, Provider } from 'mobx-react';
import Test from '../../../stores/Matching/Test';
import Pagination from '../../../components/Pagination';
import { toJS } from 'mobx';
import downArrowImg from '../../../static/images/Common/down-arrow.png';

const dummyData = [
  {
    id: 1,
    name: '김길동',
    school: '가천대학교 컴퓨터공학과',
    gender: 'MALE',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 3,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    school: '가천대학교 컴퓨터공학과',
    gender: 'MALE',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.1,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    school: '가천대학교 컴퓨터공학과',
    gender: 'MALE',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    school: '가천대학교 컴퓨터공학과',
    gender: 'FEMALE',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    gender: 'MALE',
    school: '가천대학교 컴퓨터공학과',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    gender: 'FEMALE',
    school: '가천대학교 컴퓨터공학과',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    gender: 'MALE',
    school: '가천대학교 컴퓨터공학과',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    gender: 'FEMALE',
    school: '가천대학교 컴퓨터공학과',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    gender: 'MALE',
    school: '가천대학교 컴퓨터공학과',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'OPEN',
  },
  {
    id: 1,
    name: '김길동',
    gender: 'MALE',
    school: '가천대학교 컴퓨터공학과',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'OPEN',
  },
  {
    id: 1,
    name: '김길동',
    gender: 'MALE',
    school: '가천대학교 컴퓨터공학과',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'CLOSE',
  },
  {
    id: 1,
    name: '김길동',
    gender: 'FEMALE',
    school: '가천대학교 컴퓨터공학과',
    subject: '영어, 수학',
    location: '서울시 강남구',
    budget: '30만원',
    rating: 4.7,
    registration: 'CLOSE',
  },
];

@inject('Test', 'Test3')
@observer
class Content extends Component {
  state = {
    is_open: false,
  };
  componentDidMount = () => {
    Test.getTutorList(Test.tutorCurrentPage);
    console.info(toJS(Test.sortAry[Test.sortIdx]));
  };
  render() {
    const { Test3 } = this.props;
    console.info('tutorlendering');
    return (
      <Container>
        <Name>과외 선생님 찾기</Name>
        <Filter type="tutor" />
        <MainBox>
          <Header>
            <Count>
              <span>{Test.tutorTotalCount}명</span>의 선생님이 있습니다.
            </Count>
            <SortingBox>
              <SortLabel
                active={this.state.is_open}
                onClick={() => {
                  this.setState({ is_open: !this.state.is_open });
                }}
              >
                <span>{Test.sortAry[Test.sortIdx].label}</span>
                <img src={downArrowImg} />
              </SortLabel>

              <div
                onClick={() => {
                  Test3.logout();
                }}
              >
                로그아웃
              </div>
              {/* <img src={downArrowImg} style={{ transform: 'rotate(180deg)' }} /> */}
              {/* <img src={upArrowImg} /> */}

              {/* <span>최신순</span>
              <span>오래된순</span>
              <span>급여높은순</span>
              <span>급여낮은순</span>
              <span>별점높은순</span>
              <span>별점낮은순</span> */}

              <DropDownBox active={this.state.is_open}>
                {this.state.is_open &&
                  Test.sortAry &&
                  Test.sortAry.map((item, idx) => {
                    return (
                      <DropDownItem
                        onClick={() => {
                          console.info(idx);
                          Test.sortIdx = idx;
                          this.setState({ is_open: false });
                          Test.getTutorList();
                        }}
                        active={idx === Test.sortAry.length - 1}
                      >
                        {item.label}
                      </DropDownItem>
                    );
                  })}
              </DropDownBox>
            </SortingBox>
          </Header>

          <CardContainer>
            {/* {dummyData.map((item, idx) => {
              return (
                <div
                  onClick={async () => {
                    console.info('dsfdfd');
                    await Tutor.pushToDetail(item, idx);
                  }}
                >
                  <Card
                    type="teacher"
                    name={item.name}
                    gender={item.gender}
                    rating={item.rating}
                    school={item.school}
                    subject={item.subject}
                    location={item.location}
                    budget={item.budget}
                    registration={item.registration}
                  />
                </div>
              );
            })} */}

            {Test.tutorList &&
              Test.tutorList.map((item, idx) => {
                return (
                  <div
                    onClick={async () => {
                      console.info('dsfdfd');
                      console.info(toJS(item));
                      // await Test.getTutorDetailList(item, idx);
                    }}
                  >
                    <Card
                      type="tutor"
                      name={item.name}
                      gender={item.gender}
                      rating={item.star}
                      school={`${item.school} ${item.major}`}
                      subject={item.subject}
                      location={item.region}
                      budget={item.cost}
                      registration={item.registration}
                      post={item.post}
                    />
                  </div>
                );
              })}
          </CardContainer>
        </MainBox>
        <Pagination
          type="Tutor"
          currentSet={Test.tutorCurrentSet}
          currentPage={Test.tutorCurrentPage}
          totalPage={Test.tutorTotalPage}
        />
      </Container>
    );
  }
}

export default Content;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px 0;
`;
const Name = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 50px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 22px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 24px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 26px;
  }
`;
const MainBox = styled.div`
  margin-top: 50px;
  width: 100%;
`;
const Header = styled.div`
  border-bottom: 1px solid #707070;
  padding-bottom: 10px;
  margin-bottom: 27px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 18px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 19px;
  }
`;

const CardContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  width: 100%;

  @media (min-width: 0px) and (max-width: 767.98px) {
    justify-content: center;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    justify-content: space-between;
  }
`;

const SortingBox = styled.div`
  position: relative;

  // > span:not(:last-child) {
  //     border-right: 1px solid #888;
  // }
`;

const Count = styled.div`
  > span {
    font-weight: bold;
  }
`;

const DropDownBox = styled.div`
  z-index: 2;
  position: absolute;
  // top: 0;
  display: flex;
  flex-direction: column;
  width: 130px;
  // width: 100%;
  // height: 100%;
  // border: ${(props) => (props.active ? '1px solid #707070' : 'none')};
  border-radius: 5px;
  // padding: 3px 5px;
  box-shadow: ${(props) =>
    props.active ? '0 1px 11px 1px rgba(0, 0, 0, 0.3)' : ''};
  // right: -60%;
  top: 35px;
  background-color: ${(props) => (props.active ? '#fff' : 'transparent')};

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100px;
    right: 3%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 112px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 120px;
  }
`;

const DropDownItem = styled.div`
  cursor: pointer;
  // border: 1px solid #000;
  font-size: 16px;
  // height: 15px;
  padding: 10px 15px;
  box-sizing: border-box;
  border-bottom: ${(props) => (props.active ? 'none' : '1px solid #707070')};
  &:hover {
    background-color: rgba(235, 114, 82, 0.7);
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    padding: 5px 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 14px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 15px;
  }
`;

const SortLabel = styled.div`
  display: flex;
  align-items: center;
  // position: relative;
  cursor: pointer;
  > img {
    width: 24px;
    transition: 0.3s;
    transform: ${(props) =>
      props.active ? 'rotate(180deg)' : 'rotate(360deg)'};
      
  }

  > span {    
    padding 0 5px;
    box-sizing: border-box;
    font-size: 16px;
    color: blue;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    >img{
      width: 18px;
    }
    > span {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    >img{
      width: 22px;
    }
    > span {
      font-size: 14px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    >img{
      width: 23px;
    }
    > span {
      font-size: 15px;
    }
  }

`;
