import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

// import TextAreaContainer from '../components/TextareaContainer';

@inject('Common', 'MyClass')
@observer
class Enrollment extends Component {
  componentDidMount = () => {
    const { MyClass } = this.props;
    console.info(MyClass.teacherId);
  };

  render() {
    const { open, MyClass } = this.props;

    return (
      <ModalBox
        modal={open ? 'openModal modal' : 'modal'}
        style={{ display: open ? 'block' : 'none' }}
      >
        {open ? (
          <>
            <button
              className="close"
              onClick={(e) => {
                console.info('close');
                e.stopPropagation();
                MyClass.enrollmentModalActive = false;
              }}
            >
              {' '}
              &times;{' '}
            </button>
            <Container>
              <Header>
                추가하고자 하는 자녀의 아이디와 이름을 입력하세요.
              </Header>
              <Main>
                {/* <Section>
                  <Label>평점</Label>
                  <Content>
                    {MyClass.starAry &&
                      MyClass.starAry.map((item, idx) => {
                        return (
                          <StarImg starActive={item.checked}>
                            <img
                              src={fullStarImg}
                              onClick={() => this.starRatingHandler(idx + 1)}
                            />
                          </StarImg>
                        );
                      })}
                  </Content>
                </Section>
                <Section>
                  
                  <Label />
                  <Description>
                    {MyClass.starAry &&
                      MyClass.starAry[MyClass.ratingPoint - 1].content2}
                  </Description>
                  
                </Section>
                <Section>
                  <Label>리뷰내용</Label>
                  <Content width="100%">
                    {' '}
                    <TextArea
                      mih={150}
                      bd={true}
                      type="reviewWriting"
                      placeholder="리뷰 내용을 자유롭게 작성해주세요."
                    />
                  </Content>
                    </Section> */}
                <Input
                  mb={20}
                  bd={true}
                  width="80%"
                  placeholder="아이디를 입력하세요."
                  onChange={(e) =>
                    MyClass.onChangeHandler(e, 'enrollment_child_id')
                  }
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) =>
                    (e.target.placeholder = '아이디를 입력하세요.')
                  }
                />{' '}
                <Input
                  bd={true}
                  width="80%"
                  placeholder="이름을 입력하세요."
                  onChange={(e) =>
                    MyClass.onChangeHandler(e, 'enrollment_child_name')
                  }
                  onFocus={(e) => (e.target.placeholder = '')}
                  onBlur={(e) => (e.target.placeholder = '이름을 입력하세요.')}
                />{' '}
              </Main>
              <ButtonBox>
                <Button
                  color="#000"
                  bcolor="#aaa"
                  onClick={() => (MyClass.enrollmentModalActive = false)}
                >
                  <div>취소하기</div>
                </Button>
                <Button
                  color="#fff"
                  bcolor="rgb(235, 114, 82)"
                  onClick={() => {
                    MyClass.enrollmentChild();
                  }}
                >
                  <div>추가하기</div>
                </Button>
              </ButtonBox>
            </Container>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default Enrollment;

const ModalBox = styled.div`
  // display: none;
  //   position: fixed;
  // height: 30%;
  //top: 40%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  z-index: 101;
  background-color: white;
  //   height: 635px;
  //   height: 800px;
  padding-bottom: 30px;
  box-sizing: border-box;
  width: 80%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  //   max-height: 75vh;
  //   top: 0;
  //   overflow-y: scroll !important;
  //   overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  > button {
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 21px;
    font-weight: 700;
    //margin-left: 10px;
    margin: 10px 10px 0 0;
    float: right;
    color: #000000;
    border-radius: 50%;
    background-color: #f1f1f1;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 95%;
    // position: fixed;
    // z-index: 101;
    // height: 150px;
    // width: 90%;

    > button {
      // font-size: 14px;
      margin: 5px 5px 0 0;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const Container = styled.div`
  max-width: 900px;
  width: 90%;
  //   height: 90%;
  //   height: 500px;
  min-height: 400px;

  margin: 0 auto;
  border-radius: 0.3rem;
  //background-color: blanchedalmond;
  //border: 1px solid blue;
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 100%;
    width: 90%;
    height: 40%;
  }
`;

const Header = styled.div`
  position: relative;
  padding: 16px;
  //padding-top: 0;
  //background-color: #f1f1f1;
  font-weight: 700;
  // margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid #333;
  font-size: 24px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    position: relative;
    padding: 8px;
    font-size: 22px;
    margin-top: 30px;
    font-size: 15px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 18px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 20px;
  }
`;
const Main = styled.div`
  background-color: white;
  font-color: white;

  display: flex;

  flex-direction: column;

  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
  margin-top: 10px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    font-size: 16px;
    font-weight: 600;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  margin: 5px 0;
`;

const Label = styled.div`
  width: 20%;
  font-size: 18px;
  font-weight: bold;
  min-width: 100px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
    min-width: 70px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 15%;
    font-size: 16px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 15%;
    font-size: 17px;
  }
`;

const ButtonBox = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  //   width: 180px;
  height: 50px;
  color: ${(props) => (props.color ? props.color : '')};
  background-color: ${(props) => (props.bcolor ? props.bcolor : '')};
  border: ${(props) => (props.border ? props.border : 'none')};
  margin: 0 50px;
  //   margin-bottom: 200px;
  border-radius: 3px;
  cursor: pointer;
  width: 70%;
  > div {
    font-size: 18px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    min-width: 70px;
    height: 32px;
    margin: 0 30px;
    > div {
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    // width: 180px;
    height: 36px;
    > div {
      font-size: 16px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: 180px;
    height: 40px;
    > div {
      font-size: 17px;
    }
  }
`;

const Input = styled.input`
  //   border: none;
  border: 1px solid #c7c7c7;
  // padding-bottom: 18px;
  outline: none;
  font-size: 15px;
  width: ${(props) => (props.width ? props.width : '100%')};
  box-sizing: border-box;
  display: ${(props) => (props.domainType === 1 ? 'none' : 'block')};
  padding: 0 10px;
  margin-bottom: ${(props) => (props.mb ? props.mb : '0')}px;

  ::placeholder {
    font-size: 12px;
    text-align: left;
  }
  :focus {
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    // width: ${(props) => (props.domainType === 2 ? '85px' : '200px')};
    height: 32px;
    font-size: 12px;
    // margin-bottom: 10px;
    padding: 0 8px;
    ::placeholder {
      font-size: 10px;
      text-align: left;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    // width: ${(props) => (props.domainType === 2 ? '150px' : '250px')};
    height: 35px;
    margin-left: ${(props) => (props.ml === 2 ? '10px' : '0px')};
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: ${(props) => (props.domainType === 2 ? '160px' : '300px')};
    height: 38px;
    margin-left: ${(props) => (props.ml === 2 ? '15px' : '0px')};
  }
  @media (min-width: 1300px) {
    // width: ${(props) => (props.domainType === 2 ? '160px' : '440px')};
    height: 40px;
    margin-left: ${(props) => (props.ml === 2 ? '15px' : '0px')};
  }
`;
