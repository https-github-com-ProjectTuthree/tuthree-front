import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Card from '../../../../components/Card';
import { Link as Connection } from 'react-router-dom';

@inject('MyPage', 'Common', 'Auth', 'Matching', 'Tutee', 'Tutor')
@observer
class Content extends Component {
  componentDidMount = async () => {
    const { MyPage, Auth, Common, Matching } = this.props;
    Matching.bookmarkAry = [];
    await Matching.getBookmark();
    this.setState({ g: 3 });
  };
  inputHandler = (e, type) => {
    console.info(e.value);
  };
  render() {
    const { MyPage, Auth, Common, Matching, Tutee, Tutor } = this.props;
    return (
      <Container>
        <Header>
          <div>북마크 리스트</div>
        </Header>
        <Main>
          {Auth.loggedUserType === 'teacher'
            ? Matching.bookmarkAry &&
              Matching.bookmarkAry[0] &&
              Matching.bookmarkAry[0].map((item, idx) => {
                console.info(toJS(item));
                return (
                  <Link
                    to="/tutee"
                    onClick={async () =>
                      await Tutee.getTuteeDetailList(item.object, idx)
                    }
                  >
                    <Card
                      type="tutee"
                      name={item.object.name}
                      gender={item.object.sex}
                      rating={item.object.star}
                      school={`${item.object.school} ${item.object.major}`}
                      subject={item.object.subject}
                      location={item.object.region}
                      budget={item.object.cost}
                      registration={item.object.registration}
                      post={item.object.file}
                    />
                  </Link>
                );
              })
            : Matching.bookmarkAry &&
              Matching.bookmarkAry[0] &&
              Matching.bookmarkAry[0].map((item, idx) => {
                console.info(toJS(item));
                return (
                  <Link
                    to="/tutor"
                    onClick={async () =>
                      await Tutor.getTutorDetailList(item.object, idx)
                    }
                  >
                    <Card
                      type="tutor"
                      name={item.object.name}
                      gender={item.object.sex}
                      rating={item.object.star}
                      school={`${item.object.school} ${item.object.major}`}
                      subject={item.object.subject}
                      location={item.object.region}
                      budget={item.object.cost}
                      registration={item.object.registration}
                      post={item.object.file}
                    />
                  </Link>
                );
              })}
        </Main>
        {/* <ButtonBox>
          <Button>
            <div>변경</div>
          </Button>
        </ButtonBox> */}
      </Container>
    );
  }
}

export default Content;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #888;
  height: 100%;
  min-height: 1000px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    border-top: none;
  }
`;
const Header = styled.div`
  padding: 20px 40px;
  box-sizing: border-box;
  border-left: 1px solid #888;
  //   border-right: 1px solid #888;
  border-bottom: 2px solid #333;
  > div {
    font-size: 32px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 12px 24px;
    > div {
      font-size: 24px;
    }
    border-left: none;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 16px 32px;
    > div {
      font-size: 24px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 18px 36px;
    > div {
      font-size: 28px;
    }
  }
`;
const Main = styled.div`
  padding: 20px 0px;

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

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  cursor: pointer;
  margin-top: 20px;
  background-color: rgb(235, 114, 82);
  border: none;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  > div {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 80px;
    height: 28px;
    > div {
      font-size: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100px;
    height: 32px;
    > div {
      font-size: 14px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      font-size: 15px;
    }
  }
`;

// const Card = styled.div`
//   // border: 1px solid #000;
//   border-radius: 5px;
//   box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.5);
//   padding: 5px;
//   box-sizing: border-box;
//   width: 300px;

//   @media (min-width: 0px) and (max-width: 767.98px) {
//     width: 80%;
//   }
//   @media (min-width: 768px) and (max-width: 991.98px) {
//     width: 250px;
//   }

//   @media (min-width: 992px) and (max-width: 1299.98px) {
//     width: 280px;
//   }
// `;
const Name = styled.div`
  text-align: center;
  font-size: 18px;

  > span {
    font-size: 22px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
    > span {
      font-size: 17px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
    > span {
      font-size: 20px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 17px;
    > span {
      font-size: 21px;
    }
  }
`;

const Link = styled(Connection)`
  text-decoration: none;
  color: black;
  font-family: RobotoBlack;

  box-sizing: border-box;
  //   display: block;
  //   text-align: center;
  //   color: #fff;
  //   // width: ${(props) => (props.menu ? '70%' : '1%')};
  //   margin: ${(props) => (props.menu ? '0 30px' : '0 0')};

  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 14px;
    > span {
      font-size: 22px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 16px;
    > span {
      font-size: 26px;
    }
  }
`;
