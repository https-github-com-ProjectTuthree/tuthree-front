import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import InnerContainer from '../../../components/InnerContainer';
import OuterContainer from '../../../components/OuterContainer';

// import banner1 from '../../static/images/Home/banner10.png';
import banner1 from '../../../static/images/Home/banner1.jpg';
// import banner2 from '../../static/images/Home/banner2.jpg';
import banner2 from '../../../static/images/Home/banner20.png';
import banner3 from '../../../static/images/Home/banner3.png';
import banner4 from '../../../static/images/Home/banner4.png';

class Banner extends Component {
  render() {
    // const banner1 = '../../static/images/Home/banner1.jpg';

    const data = [
      {
        color: '#2C315E',
        image: banner1,
        text: {
          title: '[ 수업 매칭 서비스 ]',
          content: '서로 원하는 과외선생님 혹은 학생을 찾아보세요.',
        },
      },
      {
        color: '#2C5E40',
        image: banner2,
        text: {
          title: '[ 수업 관리 서비스 ]',
          content:
            '과외 계획 및 진행사항을 작성하여 일정을 효율적으로 관리하세요.',
        },
      },
      {
        color: '#5E472C',
        image: banner3,
        text: {
          title: '[ 비대면 원격 강의 서비스 ]',
          content:
            '대면으로 만나기 어려울 경우 화상 미팅 서비스를 통해 멀리서도 과외를 진행하세요.',
        },
      },
      {
        color: '#4E2C5E',
        image: banner4,
        text: {
          title: '[ 채점 서비스 ]',
          content: '채점 서비스를 통하여 간편하게 문제 채점을 진행하세요.',
        },
      },
    ];
    const settings = {
      dots: true, // 슬라이드 밑에 점 보이게
      infinite: true, // 무한으로 반복
      speed: 500,
      // autoplay: true,
      autoplaySpeed: 4000, // 넘어가는 속도
      slidesToShow: 1, // 4장씩 보이게
      slidesToScroll: 1, // 1장씩 뒤로 넘어가게
      centerMode: true,
      centerPadding: '5px', // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
      arrows: false,
    };
    // const slide = () => {
    //   data.map((d) => {
    //     return (
    //       <Item>
    //         <div>{d.text.title}</div>
    //         <Img src={d.image} />
    //       </Item>
    //     );
    //   });
    // };

    return (
      <Container>
        <SliderContainer {...settings}>
          {data.map((d) => {
            return (
              <Item color={d.color}>
                <OuterContainer>
                  <InnerContainer>
                    <div>
                      <span>{d.text.title}</span>
                      <span>{d.text.content}</span>
                    </div>
                  </InnerContainer>
                </OuterContainer>
                {/* <div>{d.text.content}</div> */}
                {/* <Img src={d.image} /> */}
              </Item>
            );
          })}
        </SliderContainer>
      </Container>
    );
  }
}

export default Banner;

const Container = styled.div`
  // width: 100%;
  // height: 500px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SliderContainer = styled(Slider)`
  // height: 500px;
  // width: 100%;
  > div:nth-of-type(1) {
    // border: 3px solid red;
    width: 100%;
    height: 400px;
    // position: relative;
    // background-image: url(https://pbs.twimg.com/profile_banners/1285511592/1470391779/1500x500);
    > div {
      position: absolute;
      // bottom: 10px;
      // right: 50px;
      // font-size: 50px;
      //   border: 6px solid blue;
      // height: 500px;
      //   background: url(https://pbs.twimg.com/profile_banners/1285511592/1470391779/1500x500);
      // background: url('../../static/images/Home/banner1.jpg');
      //   background-repeat: no-repeat;
      //   background-position: center center;
      //   background-size: 40px;
      //   background-attachment: fixed;
      // float: right;
    }
  }
  // background-color: #342342;
  .slick-dots {
    // border: 3px solid orange;
    bottom: 10px;
    // left: 10px;
  }
`;

const Item = styled.div`
  // width: 100%;
  // border: 6px solid green;
  height: 400px;
  position: relative;
  background-color: ${(props) => (props.color ? props.color : '#000000')};
  > div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 100px;
    left: 0;
    // transform: translate(-50%, -50%);
    // border: 3px solid red;
    color: #fff;

    span:nth-of-type(1) {
      display: block;
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 30px;
      font-family: RobotoBlack;
    }
    span:nth-of-type(2) {
      font-size: 24px;
      font-family: RobotoLight;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      span:nth-of-type(1) {
        font-size: 28px;
      }
      span:nth-of-type(2) {
        font-size: 18px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      span:nth-of-type(1) {
        font-size: 36px;
      }
      span:nth-of-type(2) {
        font-size: 20px;
      }
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      span:nth-of-type(1) {
        font-size: 40px;
      }
      span:nth-of-type(2) {
        font-size: 22px;
      }
    }
  }
`;
