import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import InnerContainer from '../../../components/InnerContainer';
import OuterContainer from '../../../components/OuterContainer';

import plannerImg from '../../../static/images/Home/planner.png';
import reportImg from '../../../static/images/Home/report.png';
import videoConferenceImg from '../../../static/images/Home/video-conference.png';
import gradingImg from '../../../static/images/Home/grading.png';
import searchInfo from '../../../static/images/Home/SearchInfo.png';
import chattingInfo from '../../../static/images/Home/chattingInfo.png';
import matchingInfo from '../../../static/images/Home/matchingInfo.png';

import Common from '../../../stores/Common/Common';

@inject('Common')
@observer
class ContentContainer extends Component {
  render() {
    {
      console.info(Common.width);
    }
    const chapter_one = [
      {
        img: `${searchInfo}`,
        step: 'step1',
        title: '선생님/학생 조회',
        description:
          '지역, 과목, 급여 등의 정보를 설정하여 자유롭게 원하는 대상을 탐색하세요.',
      },
      {
        img: `${chattingInfo}`,
        step: 'step2',
        title: '1:1 채팅 문의',
        description: '1:1 채팅 문의를 통해 자유롭게 질문을 하세요.',
      },

      {
        img: `${matchingInfo}`,
        step: 'step3',
        title: '과외 매칭',
        description:
          '선생님은 상호합의된 최종 과외계약서를 작성하여 원하는 학생에게 등록 신청을 하고 학생은 수락을 눌러 과외를 하기 위한 준비를 끝내세요.',
      },
    ];

    const chapter_two = [
      {
        // step: 'step1',
        image: plannerImg,
        title: '일정 관리',
        description: '앞으로 진행될 사항에 대하여 간단하게 계획을 작성',
      },
      {
        // step: 'step2',
        image: reportImg,
        title: '수업 보고서 작성',
        description:
          '오늘 하루 수업을 진행하면서 진행된 사항과 애로사항을 작성',
      },

      {
        // step: 'step3',
        image: videoConferenceImg,
        title: '비대면 원격 강의 서비스',
        description: '비대면 원격 강의 서비스를 통해 멀리서도 과외 수업 진행',
      },

      {
        // step: 'step3',
        image: gradingImg,
        title: '채점 서비스',
        description:
          '선생은 문제와 답지를 등록하고 학생은 답안지를 제출하여 빠르게 채점 가능',
      },
    ];

    return (
      <OuterContainer>
        <InnerContainer>
          <Container>
            <SubContainer>
              <span>수업 매칭 과정은 어떻게 진행하나요?</span>
              <Item>
                {chapter_one.map((item) => {
                  return (
                    <Card service="one">
                      <Img
                        service="one"
                        background="#bbbbbb"
                        src={item.img}
                        style={{ backgroundImage: `${searchInfo}` }}
                      />
                      <Content service="one">
                        <Title>
                          <span>[{item.step}]</span> {item.title}
                        </Title>
                        <Description>{item.description}</Description>
                      </Content>
                    </Card>
                  );
                })}
              </Item>
            </SubContainer>
            <SubContainer>
              <span>수업 관리에는 뭐가 있을까요?</span>

              <Item>
                {chapter_two.map((item) => {
                  return (
                    <Card service="two" theight={300} mheight={300}>
                      <Wrapper>
                        <Img service="two" src={item.image}></Img>
                      </Wrapper>
                      <Content service="two">
                        <Title>{item.title}</Title>
                        <Description>{item.description}</Description>
                      </Content>
                    </Card>
                  );
                })}
              </Item>
            </SubContainer>
          </Container>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default ContentContainer;

const Container = styled.div`
  width: 100%;
  // height: 100px;
  height: 100%;
  // border: 3px solid red;
  margin-top: 180px;
`;

const SubContainer = styled.div`
  margin-bottom: 180px;
  > span {
    font-size: 32px;
    font-weight: bold;
    display: inline-block;
    border-bottom: 5px solid #eb7252;
    margin-bottom: 30px;
    padding-bottom: 15px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > span {
      font-size: 20px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > span {
      font-size: 22px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > span {
      font-size: 24px;
    }
  }
  @media (min-width: 1300px) {
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    flex-direction: column;
    // align-items: center;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;
const Img = styled.img`
  width: 100%;
  height: ${(props) => (props.service === 'one' ? '65%' : '100%')};
  // object-fit: cover;
  background-color: ${(props) => (props.background ? props.background : '')};
  // filter: ${(props) => (props.service === 'one' ? 'blur(3px)' : 'none')};

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 50%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 60%;
  }
`;

const Card = styled.div`
  width: 350px;
  height: 500px;
  // border: 3px solid green;
  box-shadow: ${(props) =>
    props.service === 'one' ? '0 2px 5px rgba(0, 0, 0, 0.8)' : ''};
  margin: 5px;
  // display: flex;
  // position: relative;
  display: ${(props) => (props.service === 'one' ? 'block' : 'flex')};
  flex-direction: column;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    margin-bottom: 50px;
    height: ${(props) => (props.mheight ? props.mheight : '400')}px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
    margin-bottom: 20px;
    height: ${(props) => (props.theight ? props.theight : '500')}px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 300px;
    height: 400px;
  }
`;
const Content = styled.div`
  padding: 10px;
  box-sizing: border-box;
  text-align: ${(props) => (props.service === 'one' ? 'left' : 'center')};
`;
const Title = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
  > span {
    font-size: 14px;
    color: #eb7252;
  }
`;
const Description = styled.div``;

const Wrapper = styled.div`
  width: 128px;
  height: 128px;
  // border: 3px solid red;
  border-radius: 50%;
  position: relative;
  align-self: center;
  background-color: #eb7252;
  opacity: 0.7;

  > img {
    width: 70%;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
