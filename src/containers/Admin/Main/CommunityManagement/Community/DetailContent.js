import React, { Component } from 'react';
import styled from 'styled-components';
import SelectComponent from '../../../../../components/Select';
import { inject, observer } from 'mobx-react';
import AdminCommunity from '../../../../../stores/Admin/Community';
import Common from '../../../../../stores/Common/Common';
import TextAreaContainer from '../../../../../components/TextareaContainer';
import { toJS } from 'mobx';
import { ROOT_URL } from '../../../../../axios/index';
import fileImg from '../../../../../static/images/Common/files.png';

@inject('AdminCommunity', 'Common', 'Community')
@observer
class DetailContent extends Component {
  componentWillUnmount = () => {
    AdminCommunity.communityDetailList = [];
    AdminCommunity.state = 1;
  };
  render() {
    console.info(toJS(AdminCommunity.communityDetailList));
    return (
      <>
        {Common.width > 1299.98 ? (
          <Container>
            <Item>
              <Section>
                <SubSection width={100}>
                  <Name>
                    <div>제목</div>
                  </Name>
                  <Content>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.title}
                  </Content>
                </SubSection>
                <SubSection width={30} bl={true}>
                  <Name>
                    <div>작성자</div>
                  </Name>
                  <Content width={30}>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.userId}
                  </Content>
                </SubSection>

                <SubSection width={40} bl={true}>
                  <Name>
                    <div>날짜</div>
                  </Name>
                  <Content width={40}>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.writeAt}
                  </Content>
                </SubSection>
              </Section>

              <Section bl={true}>
                <Name>
                  <div>파일</div>
                </Name>
                <Content height={50} file={true}>
                  {AdminCommunity.communityDetailFileAry &&
                    AdminCommunity.communityDetailFileAry.map((item, idx) => {
                      return (
                        <FileContent>
                          <img src={fileImg} />
                          <a href={`${ROOT_URL}/community/download/${item.id}`}>
                            {item.name}
                          </a>
                        </FileContent>
                      );
                    })}
                </Content>
              </Section>

              <Section mb={true}>
                <Name>
                  <div>내용</div>
                </Name>
                <Content height={500}>
                  {AdminCommunity.communityDetailList &&
                    AdminCommunity.communityDetailList.content}
                </Content>
              </Section>
              <ButtonBox>
                <Button
                  color="#fff"
                  bcolor="rgb(235, 114, 82)"
                  onClick={() => (AdminCommunity.state = 1)}
                >
                  <div>목록</div>
                </Button>

                <Button
                  color="#fff"
                  bcolor="#ff0000"
                  onClick={() => {
                    AdminCommunity.delAdmin(
                      AdminCommunity.communityDetailList.id
                    );
                  }}
                >
                  <div>삭제</div>
                </Button>

                {/* <Button
        color="#fff"
        bcolor="rgb(235, 114, 82)"              
      >
        <div>등록</div>
      </Button> */}
              </ButtonBox>
            </Item>
          </Container>
        ) : Common.width > 767.98 ? (
          <Container>
            <Item>
              <Section>
                <SubSection width={100} type="title">
                  <Name>
                    <div>제목</div>
                  </Name>
                  <Content>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.title}
                  </Content>
                </SubSection>
              </Section>

              <Section>
                <SubSection width={60}>
                  <Name>
                    <div>작성자</div>
                  </Name>
                  <Content width={60}>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.userId}
                  </Content>
                </SubSection>

                <SubSection width={40} bl={true}>
                  <Name>
                    <div>날짜</div>
                  </Name>
                  <Content width={40}>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.writeAt}
                  </Content>
                </SubSection>
              </Section>

              <Section bl={true}>
                <Name>
                  <div>파일</div>
                </Name>
                <Content height={50} file={true}>
                  {AdminCommunity.communityDetailFileAry &&
                    AdminCommunity.communityDetailFileAry.map((item, idx) => {
                      return (
                        <FileContent>
                          <img src={fileImg} />
                          <a href={`${ROOT_URL}/community/download/${item.id}`}>
                            {item.name}
                          </a>
                        </FileContent>
                      );
                    })}
                </Content>
              </Section>

              <Section mb={true}>
                <Name>
                  <div>내용</div>
                </Name>
                <Content height={500}>
                  {AdminCommunity.communityDetailList &&
                    AdminCommunity.communityDetailList.content}
                </Content>
              </Section>
              <ButtonBox>
                <Button
                  color="#fff"
                  bcolor="rgb(235, 114, 82)"
                  onClick={() => (AdminCommunity.state = 1)}
                >
                  <div>목록</div>
                </Button>

                <Button
                  color="#fff"
                  bcolor="#ff0000"
                  onClick={() => {
                    AdminCommunity.delAdmin(
                      AdminCommunity.communityDetailList.id
                    );
                  }}
                >
                  <div>삭제</div>
                </Button>

                {/* <Button
              color="#fff"
              bcolor="rgb(235, 114, 82)"              
            >
              <div>등록</div>
            </Button> */}
              </ButtonBox>
            </Item>
          </Container>
        ) : (
          <Container>
            <Item>
              <Section>
                <SubSection width={100}>
                  <Name>
                    <div>제목</div>
                  </Name>
                  <Content>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.title}
                  </Content>
                </SubSection>
              </Section>

              <Section>
                <SubSection width={100}>
                  <Name>
                    <div>작성자</div>
                  </Name>
                  <Content width={100}>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.userId}
                  </Content>
                </SubSection>
              </Section>

              <Section>
                <SubSection width={100}>
                  <Name>
                    <div>날짜</div>
                  </Name>
                  <Content width={100}>
                    {AdminCommunity.communityDetailList &&
                      AdminCommunity.communityDetailList.writeAt}
                  </Content>
                </SubSection>
              </Section>

              <Section bl={true}>
                <Name>
                  <div>파일</div>
                </Name>
                <Content height={50} file={true}>
                  {AdminCommunity.communityDetailFileAry &&
                    AdminCommunity.communityDetailFileAry.map((item, idx) => {
                      return (
                        <FileContent>
                          <img src={fileImg} />
                          <a href={`${ROOT_URL}/community/download/${item.id}`}>
                            {item.name}
                          </a>
                        </FileContent>
                      );
                    })}
                </Content>
              </Section>

              <Section mb={true}>
                <Name>
                  <div>내용</div>
                </Name>
                <Content height={500}>
                  {AdminCommunity.communityDetailList &&
                    AdminCommunity.communityDetailList.content}
                </Content>
              </Section>
              <ButtonBox>
                <Button
                  color="#fff"
                  bcolor="rgb(235, 114, 82)"
                  onClick={() => (AdminCommunity.state = 1)}
                >
                  <div>목록</div>
                </Button>

                <Button
                  color="#fff"
                  bcolor="#ff0000"
                  onClick={() => {
                    AdminCommunity.delAdmin(
                      AdminCommunity.communityDetailList.id
                    );
                  }}
                >
                  <div>삭제</div>
                </Button>

                {/* <Button
              color="#fff"
              bcolor="rgb(235, 114, 82)"              
            >
              <div>등록</div>
            </Button> */}
              </ButtonBox>
            </Item>
          </Container>
        )}
      </>
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
`;

const Item = styled.div`
  width: 80%;
  height: 100%;
  //   border: 2px solid black;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 92%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 88%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 85%;
  }
`;

const Section = styled.div`
  display: flex;

  border: 1px solid #707070;
  border-bottom: ${(props) => (props.mb ? '1px solid #707070' : 'none')};
  box-sizing: border-box;

  width: 100%;
`;

const SubSection = styled.div`
  width: ${(props) => (props.width ? props.width : '')}%;
  //   border: 2px solid black;
  display: flex;
  border-left: ${(props) => (props.bl ? '1px solid #707070' : '')};

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: ${(props) => (props.type === 'title' ? '70' : '40')}%;
  }
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

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 80px;
    min-width: 80px;
    flex-grow: 0;
    > div {
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 90px;
    min-width: 90px;
    flex-grow: 0;
    > div {
      font-size: 17px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    flex-grow: 0;
    > div {
      font-size: 20px;
    }
  }
`;

const Content = styled.div`
  flex-grow: 8;
  padding: 5px 10px;
  box-sizing: border-box;
  min-height: ${(props) => (props.height ? props.height : '70')}px;
  display: flex;
  align-items: center;
  width: ${(props) => (props.width ? props.width : '100')}%;

  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-grow: 4;
    min-height: ${(props) => (props.height ? props.height : '50')}px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    flex-grow: 5;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    fle
    
`;

const Select = styled(SelectComponent)`
  width: 170px;
  height: 60px;
  margin-left: ${(props) => (props.ml ? props.ml : '0')}px;
  display: ${(props) => (props.domainType === 1 ? 'block' : 'none')};

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 140px;
    height: 40px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
`;

const TextArea = styled(TextAreaContainer)`
  //   width: 100%;
  //   border: 3px solid red;
  //   height: 300px;
`;

const ButtonBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
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

const FileContent = styled.div`
  display: flex;
  margin-right: 10px;
  > img {
    width: 24px;
  }
  > a {
    text-decoration: none;
    color: black;
  }
`;
