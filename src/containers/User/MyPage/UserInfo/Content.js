import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import SelectComponent from '../../../../components/Select';
import ToggleButton from '../../../../components/ToggleButton';
import { toJS } from 'mobx';

const mobileCustomStyles = {
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#000',
      fontSize: 12,
      //   fontWeight: 'normal',
    };
  },
  dropdownIndicator: () => ({
    backgroundColor: '#fff',
    color: '#000',
    width: 16,
    height: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#999999',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 12,
    fontSize: 12,
  }),
  control: () => ({
    fontSize: 12,
    lineHeight: 1.2,
    border: '1px solid #c7c7c7',
    display: 'flex',
    height: '100%',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;

    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

const customStyles = {
  dropdownIndicator: () => ({
    backgroundColor: '#fff',
    color: '#000',
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#999999',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 14,
    fontSize: 14,
    cursor: 'pointer',
  }),
  control: () => ({
    fontSize: 14,
    lineHeight: 1.2,
    border: '1px solid #c7c7c7',
    display: 'flex',
    height: '100%',
    cursor: 'pointer',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};
const birthAry = [];

@inject('MyPage', 'Common')
@observer
class Content extends Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }
  handleChangeFile = (e) => {
    const { MyPage } = this.props;
    // let reader = new FileReader();

    let ImgNotAvailable = ['bmp', 'jpeg', 'gif', 'png', 'jpg'];
    const extension = e.currentTarget.files[0].name.split('.');
    console.log(extension);

    if (ImgNotAvailable.includes(extension[extension.length - 1])) {
      MyPage.profileImgAry = e.currentTarget.files[0];
      MyPage.profileImgUrl = URL.createObjectURL(e.currentTarget.files[0]);
      MyPage.userInfoAry.post = '';
    } else {
      alert('(bmp, jpeg, gif, png, jpg) 이미지를 업로드 해주세요.');
    }

    // console.info(toJS(MyPage.profileImgUrl));
    console.info(toJS(MyPage.profileImgAry));
  };

  componentDidMount = async () => {
    const { MyPage } = this.props;
    console.info('didmount');
    await MyPage.getUserInfo();
    for (let i = 2021; i > 1900; i--) {
      birthAry.push({ label: i, value: i });
    }
    // let blob = new Blob([MyPage.userInfoAry.post], {
    //   type: 'application/octet-stream',
    // });
    // let file = new File([blob], '프로필 사진');

    // console.info(blob);
    // MyPage.profileImgAry = file;
    // MyPage.profileImgUrl = URL.createObjectURL(file);
    MyPage.emailInfo = MyPage.userInfoAry.email;
    MyPage.phoneInfo = MyPage.userInfoAry.tel;
    MyPage.birthInfo = MyPage.userInfoAry.birth;
    MyPage.notificationState =
      MyPage.userInfoAry.notification === 'OPEN' ? true : false;
  };

  render() {
    const { MyPage, Common } = this.props;
    // console.info(MyPage.emailInfo);
    return (
      <Container>
        <Header>
          <div>회원정보 조회/수정</div>
        </Header>
        <Main>
          <Item>
            <Label>프로필 사진</Label>
            <ContentBox
              onClick={() => {
                console.log(this.file);
                this.file.current.click();
              }}
              style={{ cursor: 'pointer', width: 'auto' }}
            >
              {console.info('================')}
              {console.info(toJS(MyPage.userInfoAry))}
              {console.info(MyPage.userInfoAry.post)}
              {console.info(MyPage.profileImgUrl)}
              <ImgBox>
                {MyPage.userInfoAry.post ? (
                  <img
                    src={`data:image/png;base64,${MyPage.userInfoAry.post}`}
                  />
                ) : (
                  MyPage.profileImgUrl && <img src={MyPage.profileImgUrl} />
                )}
              </ImgBox>
              <Description>
                <div>프로필 사진 선택하기 </div>

                <input
                  type="file"
                  name="imgFile"
                  id="imgFile"
                  ref={this.file}
                  value=""
                  onChange={this.handleChangeFile}
                />
              </Description>
            </ContentBox>
          </Item>

          <Item>
            <Label>이름</Label>
            <ContentBox>
              {MyPage.userInfoAry && MyPage.userInfoAry.name}
            </ContentBox>
          </Item>

          <Item>
            <Label>이메일</Label>
            <ContentBox>
              {/* {MyPage.userInfoAry && MyPage.userInfoAry.email} */}
              <Input
                bd={true}
                value={MyPage.emailInfo}
                height={40}
                onChange={(e) => MyPage.onChangeHandler(e, 'email_info')}
              />
            </ContentBox>
          </Item>

          <Item>
            <Label>휴대폰 번호</Label>
            <ContentBox>
              {/* {MyPage.userInfoAry && MyPage.userInfoAry.tel} */}
              <Input
                bd={true}
                value={MyPage.phoneInfo}
                height={40}
                onChange={(e) => MyPage.onChangeHandler(e, 'phone_info')}
              />
            </ContentBox>
          </Item>

          <Item>
            <Label>성별</Label>
            <ContentBox>
              {MyPage.userInfoAry && MyPage.userInfoAry.sex === 'MALE'
                ? '남성'
                : '여성'}
            </ContentBox>
          </Item>

          <Item>
            <Label>출생년도</Label>
            <ContentBox>
              {/* {MyPage.userInfoAry && MyPage.userInfoAry.birth}년생 */}
              <Select
                //  id={this.props.id}
                //  className={this.props.className}
                styles={
                  Common.width > 767.98 ? customStyles : mobileCustomStyles
                }
                value={{
                  label: MyPage.birthInfo ? MyPage.birthInfo : '년도',
                  value: MyPage.birthInfo && MyPage.birthInfo,
                }}
                onChange={(e) => MyPage.onChangeHandler(e, 'birth_info')}
                getOptionLabel={(option) => option.value}
                options={birthAry}
                //  isSearchable={false}
                placeholder="선택하세요."
                domainType={1}
              />
            </ContentBox>
          </Item>

          {/* <Item>
            <Label>알림 설정</Label>
            <ContentBox>
              <ToggleButton type="notification" />
            </ContentBox>
          </Item> */}
        </Main>
        <ButtonBox>
          <Button onClick={() => MyPage.putUserInfo()}>
            <div>수정</div>
          </Button>
        </ButtonBox>
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
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #888;
  margin-top: -1px;
`;
const Label = styled.div`
  padding: 20px 40px;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: bold;
  border-right: 1px solid #888;
  width: 20%;
  background-color: rgba(235, 114, 82, 0.3);
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    padding: 3px 6px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
    padding: 6px 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 25%;
    font-size: 18px;
    padding: 12px 24px;
  }
`;
const ContentBox = styled.div`
  font-size: 16px;
  padding: 15px 25px;
  box-sizing: border-box;
  width: 70%;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 11px;
    padding: 10px 8px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 13px;
    padding: 6px 15px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 15px;
    padding: 12px 22px;
  }
`;
const ImgBox = styled.div`
  width: 180px;
  height: 180px;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  > img {
    width: 80%;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100px;
    height: 100px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 140px;
    height: 140px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 160px;
    height: 160px;
  }
`;

const Description = styled.div`
  font-size: 14px;
  color: #eb7252;
  text-decoration: underline;
  text-align: center;
  > input {
    display: none;
  }
  > div {
    cursor: pointer;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  cursor: pointer;
  margin-top: 60px;
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

const Input = styled.input`
  border: ${(props) => (props.bd ? '1px solid #c7c7c7' : 'none')};
  // padding-bottom: 18px;
  outline: none;
  font-size: 15px;
  //   width: 100%;
  width: 100%;
  box-sizing: border-box;
  display: ${(props) => (props.domainType === 1 ? 'none' : 'block')};
  padding: 0 10px;
  height: ${(props) => (props.height ? props.height : '')}px;

  ::placeholder {
    font-size: 12px;
    text-align: left;
  }
  :focus {
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    height: ${(props) => (props.height ? props.height : '24')}px;
    width: ${(props) => (props.width ? props.width - 30 : '100')}px;
    padding: 0 8px;
    margin-left: ${(props) => (props.ml ? props.ml : '0')}px;
    margin-right: ${(props) => (props.mr ? props.mr : '0')}px;
    ::placeholder {
      font-size: 10px;
      text-align: left;
    }
  }
`;

const Select = styled(SelectComponent)`
  width: ${(props) => (props.width ? props.width : '170')}px;
  height: 30px;
  margin-left: ${(props) => (props.ml ? props.ml : '0')}px;
  margin-right: ${(props) => (props.mr ? props.mr : '0')}px;
  display: ${(props) => (props.domainType === 1 ? 'block' : 'none')};

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: ${(props) => (props.width ? props.width : '170')}px;
    height: 30px;
    margin-left: 0px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
`;
