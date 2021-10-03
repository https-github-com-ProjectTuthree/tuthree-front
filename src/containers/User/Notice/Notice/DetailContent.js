import React, { Component } from 'react';
import styled from 'styled-components';
import SelectComponent from '../../../../components/Select';
import { inject, observer } from 'mobx-react';
import Community from '../../../../stores/Community/Community';
import Common from '../../../../stores/Common/Common';
import TextAreaContainer from '../../../../components/TextareaContainer';

@inject('Community', 'Common')
@observer
class DetailContent extends Component {
  componentWillUnmount = () => {
    Community.noticeDetailList = [];
    Community.state = 1;
  };
  render() {
    return (
      <Container>
        <Item>
          <Section by={true}>
            <SubSection width={30}>
              <Content width={30}>
                {Community.noticeDetailList &&
                  Community.noticeDetailList[0] &&
                  Community.noticeDetailList[0].type &&
                  Community.noticeDetailList[0].type.korType}
              </Content>
            </SubSection>

            <SubSection width={100} bl={true}>
              <Content title={true}>
                {Community.noticeDetailList &&
                  Community.noticeDetailList[0] &&
                  Community.noticeDetailList[0].title}
              </Content>
            </SubSection>

            <SubSection width={40} bl={true}>
              <Content width={40} right={true}>
                {Community.noticeDetailList &&
                  Community.noticeDetailList[0] &&
                  Community.noticeDetailList[0].writeAt}
              </Content>
            </SubSection>
          </Section>
          <Section mb={true}>
            <Content height={500}>
              {Community.noticeDetailList &&
                Community.noticeDetailList[0] &&
                Community.noticeDetailList[0].content}
            </Content>
          </Section>
        </Item>
        <ButtonBox>
          <Button
            color="#fff"
            bcolor="rgb(235, 114, 82)"
            onClick={() => (Community.state = 1)}
          >
            <div>목록</div>
          </Button>
        </ButtonBox>
      </Container>
    );
  }
}

export default DetailContent;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
`;

const Item = styled.div`
  width: 100%;
  height: 80%;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
`;

const Section = styled.div`
  display: flex;

  //   border: 1px solid #707070;
  //   border-bottom: ${(props) => (props.mb ? '1px solid #707070' : 'none')};
  border-top: ${(props) => (props.by ? '1px solid #707070' : 'none')};
  border-bottom: ${(props) => (props.by ? '1px solid #707070' : 'none')};
  box-sizing: border-box;

  width: 100%;
  justify-content: space-between;
`;

const SubSection = styled.div`
  width: ${(props) => (props.width ? props.width : '100')}%;
  //   border: 2px solid black;
  display: flex;
  //   border-left: ${(props) => (props.bl ? '1px solid #707070' : '')};
`;

const Name = styled.div`
  background-color: #cccccc;
  width: 100px;
  border-right: 1px solid #707070;
  box-sizing: border-box;
  flex-grow: 3;
  display: felx;
  justify-content: center;
  align-items: center;
  min-width: 100px;

  > div {
    font-size: 24px;
  }
`;

const Content = styled.div`
  flex-grow: 8;
  padding: 5px 20px;
  box-sizing: border-box;
  min-height: ${(props) => (props.height ? props.height : '70')}px;
  display: flex;
  align-items: center;
  width: ${(props) => (props.width ? props.width : '100')}%;
  font-size: ${(props) => (props.title ? '30' : '15')}px;
  justify-content: ${(props) => (props.right ? 'flex-end' : '')};
`;
const ButtonBox = styled.div`
  margin-top: 20px;
  align-self: flex-end;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  color: ${(props) => (props.color ? props.color : '')};
  background-color: ${(props) => (props.bcolor ? props.bcolor : '')};
  border: ${(props) => (props.border ? props.border : 'none')};
  margin: 0 10px;
  margin-bottom: 200px;
  border-radius: 3px;
  cursor: pointer;
  > div {
    font-size: 18px;
  }
`;