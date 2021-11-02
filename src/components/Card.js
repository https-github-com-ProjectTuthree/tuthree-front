import React, { Component } from 'react';
import styled from 'styled-components';
import starImg from '../static/images/Common/star.png';
import maleImg from '../static/images/Common/male.png';
import femaleImg from '../static/images/Common/female.png';
import defaultImg from '../static/images/Common/defaultUser.png';

class Card extends Component {
  componentDidMount = () => {
    console.info('ssd');
  };
  render() {
    const {
      type,
      name,
      rating,
      gender,
      school,
      subject,
      location,
      budget,
      registration,
      post,
    } = this.props;
    // console.info(toJS(subject));
    // console.info(post);

    return (
      <Container>
        <Img post={post}>
          {post ? (
            <img src={`data:image/png;base64,${post}`} />
          ) : (
            <img src={defaultImg} />
          )}

          {/* <div>Img</div> */}
        </Img>
        <Content>
          <Box>
            {' '}
            <Label ml={5} fw="bold">
              {name}
              {gender === 'MALE' ? (
                <img src={maleImg} />
              ) : (
                <img src={femaleImg} />
              )}
            </Label>
            {type === 'tutor' && (
              <Label mr={5}>
                <img src={starImg} />
                {rating}
              </Label>
            )}
          </Box>
          {type === 'tutor' && <Label>{school}</Label>}
          <Label value="multiple">
            {subject &&
              subject.map((item, idx) => {
                return (
                  idx < 2 && (
                    <MutlipleBox type="subject">
                      <div>{item}</div>
                    </MutlipleBox>
                  )
                );
              })}
            {subject && subject.length > 2 && (
              <Skip type="subject">
                <div>
                  <div>+{subject.length - 2}</div>
                </div>
              </Skip>
            )}
          </Label>

          <Label value="multiple">
            {location &&
              location.map((item, idx) => {
                return (
                  <>
                    {idx < 2 && (
                      <MutlipleBox type="region">
                        <div>{item}</div>
                      </MutlipleBox>
                    )}
                    {location.length > 2 && idx === location.length - 1 && (
                      <Skip type="location">
                        <div>
                          <div>+{idx - 1}</div>
                        </div>
                      </Skip>
                    )}
                  </>
                );
              })}
            {/* {location && location.length > 2 && (
              <Skip type="location">
                <div>
                  <div>+{location.length - 2}</div>
                </div>
              </Skip>
            )} */}
          </Label>

          <Box>
            {' '}
            <Label>{budget}</Label>
            <Label>
              <Recruitment type={registration === 'OPEN'}>
                {registration === 'OPEN' ? (
                  <div>모집중</div>
                ) : (
                  <div>모집마감</div>
                )}
              </Recruitment>
            </Label>
          </Box>
        </Content>
      </Container>
    );
  }
}

export default Card;

const Container = styled.div`
  cursor: pointer;
  width: 250px;
  height: auto;
  // min-height: 350px;
  height: 500px;
  border: 2px solid #707070;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  box-shadow: 0 6px 15px 1px rgba(0, 0, 0, 0.5);
  // margin-right: 45px;
  margin-left: 22px;
  margin-right: 22px;
  // margin-right: 10%;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 0 15px 20px 15px;
    // width: 225px;
  }
`;
const Img = styled.div`
  width: 100%;
  height: 150px;
  // background-color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #707070;
  overflow: hidden;
  > div {
    font-size: 20px;
    font-weight: bold;
  }
  > img {
    width: ${(props) => (props.post ? '100%' : '')};
  }
`;
const Content = styled.div`
  padding: 15px 15px 0 15px;
  box-sizing: border-box;
  height: 350px;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Label = styled.div`
  position: relative;
  margin-bottom: 15px;
  font-weight: ${(props) => (props.fw ? props.fw : 'normal')};
  > img {
    margin-right: ${(props) => (props.mr ? props.mr : '5')}px;
    margin-left: ${(props) => (props.ml ? props.ml : '5')}px;
  }
`;

const Recruitment = styled.div`
  // width: 60px;
  // height: 20px;
  border-radius: 18px;
  background-color: ${(props) =>
    props.type ? 'rgba(0, 85, 225, 0.6)' : 'rgba(255, 0, 0, 0.6)'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 15px;
  box-sizing: border-box;
  > div {
    color: ${(props) => (props.type ? 'black' : 'white')};
    font-size: 12px;
  }
`;

const MutlipleBox = styled.div`
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

const Skip = styled.div`
  // position: absolute;
  margin: 3px 0;
  width: 100%;
  > div {
    width: 24px;
    height: 24px;
    // background-color: rgba(235, 114, 82, 0.7);
    border: ${(props) =>
      props.type === 'subject' ? '2px groove #7eb1a8' : '2px groove #a596c4'};
    background-color: ${(props) =>
      props.type === 'subject'
        ? 'rgba(126, 177, 168, 0.4)'
        : 'rgba(165, 150, 196, 0.4)'};
    // background-color: #ccc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: #fff;
    > div {
      font-size: 12px;
      font-weight: 600;
    }
  }
`;
