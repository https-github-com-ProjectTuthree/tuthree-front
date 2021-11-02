import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { inject, observer } from 'mobx-react';
import addImg from '../../../../../static/images/Common/add.png';
import deleteImg from '../../../../../static/images/Common/delete.png';
import modifyImg from '../../../../../static/images/Common/modify.png';
import saveImg from '../../../../../static/images/Common/save.png';
import { toJS } from 'mobx';

@inject('Common', 'MyClass')
@observer
class Schedule extends Component {
  render() {
    const { MyClass } = this.props;
    console.info(toJS(MyClass.scheduleDetailAry));
    return (
      <Container>
        <SearchBox>
          <Input
            value={MyClass.scheduleValue}
            placeholder="일정을 입력하세요."
            onChange={(e) => MyClass.onChangeHandler(e, 'schedule')}
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => (e.target.placeholder = '일정을 입력하세요.')}
            pd={true}
          />
          <Search
            //   onClick={() => {
            //     console.info('dsfdsf');
            //     AdminCommunity.communityErrorMessage = '';
            //     if (AdminCommunity.communitySearchValue === '') {
            //       AdminCommunity.communitySearchFinalValue = '';
            //       AdminCommunity.getCommunityList(1);
            //     } else {
            //       AdminCommunity.searchCommunity(1);
            //     }
            //   }}
            onClick={() => {
              MyClass.setSchedule();
            }}
          >
            <img src={addImg} />
          </Search>
        </SearchBox>
        <ScheduleArea>
          {MyClass.scheduleDetailAry &&
            MyClass.scheduleDetailAry.map((item, idx) => {
              return (
                <ScheduleItem>
                  {!item.modify ? (
                    <ScheduleName>
                      <div>{item.schedule}</div>
                    </ScheduleName>
                  ) : (
                    <ScheduleName>
                      <Input
                        autoFocus
                        pd={false}
                        value={MyClass.scheduleValue}
                        onChange={(e) =>
                          MyClass.onChangeHandler(e, 'modify_schedule')
                        }
                        height={20}
                        // onFocus={(e) => (e.target.placeholder = '')}
                        onBlur={() => {
                          console.info('blur');
                        }}
                      />
                    </ScheduleName>
                  )}

                  {!item.modify ? (
                    <img
                      src={modifyImg}
                      onClick={() => {
                        console.info(item);
                        item.modify = !item.modify;
                        MyClass.scheduleValue = item.schedule;
                        this.setState({ g: 3 });
                        console.info(toJS(MyClass.scheduleDetailAry));
                      }}
                    />
                  ) : (
                    <img
                      src={saveImg}
                      onClick={() => {
                        item.modify = !item.modify;
                        // MyClass.scheduleValue = item.schedule;
                        console.info(item.id);
                        console.info(toJS(MyClass.scheduleDetailAry));
                        MyClass.putSchedule(item.id);
                      }}
                    />
                  )}

                  <img
                    src={deleteImg}
                    onClick={() => {
                      MyClass.delSchedule(item.id);
                    }}
                  />
                </ScheduleItem>
              );
            })}
        </ScheduleArea>
      </Container>
    );
  }
}

Schedule.propTypes = {};

export default Schedule;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchBox = styled.div`
  width: 50%;
  height: 40px;
  border: 2px solid #707070;
  border-radius: 21px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 20px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 90%;
    height: 30px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 60%;
    height: 35px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 55%;
  }
`;

const Search = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  //   border: 2px solid blue;
  //   background-color: #eb7252;
  //   border-radius: 0 21px 21px 0;
  box-sizing: border-box;
  > img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    > img {
      width: 16px;
      height: 16px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > img {
      width: 20px;
      height: 20px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
`;

const ScheduleArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #707070;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 8px 5px;
  box-sizing: border-box;
  width: 100%;
  > div {
    font-size: 15px;
    font-weight: 500;
    width: 90%;
  }

  > img {
    width: 18px;
    height: 18px;
    margin: 0 3px;
    // transition: 1s;
    cursor: pointer;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      font-size: 11px;
    }
    > img {
      width: 14px;
      height: 14px;
      min-width: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      font-size: 13px;
    }
    > img {
      width: 16px;
      height: 16px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      font-size: 14px;
    }
  }
`;

const ScheduleName = styled.div`
  display: flex;
`;

const Input = styled.input`
  border: none;
  //   border: 1px solid #c7c7c7;
  // padding-bottom: 18px;
  outline: none;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
  display: ${(props) => (props.domainType === 1 ? 'none' : 'block')};
  padding: ${(props) => (props.pd ? '0 10px' : '')};

  ::placeholder {
    font-size: 12px;
    text-align: left;
  }
  :focus {
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    height: ${(props) => (props.height ? props.height : '20')}px;
    width: ${(props) => (props.width ? props.width : '100%')};
    padding: 0 8px;
    margin-left: ${(props) => (props.ml ? props.ml : '0')}px;
    margin-right: ${(props) => (props.mr ? props.mr : '0')}px;
    ::placeholder {
      font-size: 10px;
      text-align: left;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '20')}px;
    margin-left: ${(props) => (props.ml ? props.ml : '0')}px;
    margin-right: ${(props) => (props.mr ? props.mr : '0')}px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '20')}px;
    margin-left: ${(props) => (props.ml ? props.ml : '0')}px;
    margin-right: ${(props) => (props.mr ? props.mr : '0')}px;
  }
  @media (min-width: 1300px) {
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '20')}px;
    margin-left: ${(props) => (props.ml ? props.ml : '0')}px;
    margin-right: ${(props) => (props.mr ? props.mr : '0')}px;
  }
`;
