import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from '../../../components/Filter';
import Card from '../../../components/Card';
import { inject, observer, Provider } from 'mobx-react';
import Pagination from '../../../components/Pagination';
import { toJS } from 'mobx';
import downArrowImg from '../../../static/images/Common/down-arrow.png';
// import { history } from 'react-router-dom';

@inject('Tutee')
@observer
class Content extends Component {
  state = {
    is_open: false,
    locationKeys: [],
  };

  componentDidMount = () => {
    const { Tutee } = this.props;
    console.info('a');
    console.info(this.props.history);
    Tutee.getTuteeList(Tutee.tuteeCurrentPage);
  };

  render() {
    const { Tutee } = this.props;

    return (
      <Container>
        <Name>학생 찾기</Name>
        <Filter type="tutee" />
        <MainBox>
          <Header>
            <Count>
              <span>{Tutee.tuteeTotalCount}명</span>의 학생이 있습니다.
            </Count>
            <SortingBox>
              <SortLabel
                active={this.state.is_open}
                onClick={() => {
                  this.setState({ is_open: !this.state.is_open });
                }}
              >
                <span>{Tutee.sortAry[Tutee.sortIdx].label}</span>
                <img src={downArrowImg} />
              </SortLabel>

              <DropDownBox active={this.state.is_open}>
                {this.state.is_open &&
                  Tutee.sortAry &&
                  Tutee.sortAry.map((item, idx) => {
                    return (
                      <DropDownItem
                        onClick={() => {
                          console.info(idx);
                          Tutee.sortIdx = idx;
                          this.setState({ is_open: false });
                          Tutee.getTuteeList();
                        }}
                        active={idx === Tutee.sortAry.length - 1}
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
                    await Tutee.pushToDetail(item, idx);
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

            {Tutee.tuteeList &&
              Tutee.tuteeList.map((item, idx) => {
                return (
                  <div
                    onClick={async () => {
                      console.info('dsfdfd');
                      await Tutee.getTuteeDetailList(item, idx);
                    }}
                  >
                    <Card
                      type="tutee"
                      name={item.name}
                      gender={item.sex}
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
          type="Tutee"
          currentSet={Tutee.tuteeCurrentSet}
          currentPage={Tutee.tuteeCurrentPage}
          totalPage={Tutee.tuteeTotalPage}
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

  // &:after {
  //   height: 0;
  //   width: 50%;
  //   // -, 48, 21
  //   content: '';
  // }

  // @media (min-width: 0px) and (max-width: 767.98px) {
  //   justify-content: center;
  // }

  // @media (min-width: 1300px) {
  //   &:after {
  //     height: 0;
  //     width: 50%;
  //     // -, 48, 21
  //     content: '';
  //   }
  // }
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
