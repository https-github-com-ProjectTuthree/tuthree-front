import TimeField from 'react-simple-timefield';
import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

@inject('Common', 'Chatting', 'MyClass')
@observer
class TimePicer extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      time: '--:--',
    };

    this.onTimeChange = this.onTimeChange.bind(this);
  }

  onTimeChange(time) {
    const { type, Chatting, MyClass, state } = this.props;
    this.setState({ time });
    // Common.time = time;
    // console.info(this.state.time);
    console.info(time);
    if (state === 'report') {
      switch (type) {
        case 'start':
          console.info(`start_time : ${time}`);
          MyClass.reportStartTime = time;
          break;
        case 'end':
          console.info(`end_time : ${time}`);
          MyClass.reportEndTime = time;
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case 'start':
          console.info(`start_time : ${time}`);
          Chatting.startTimeValue = time;
          break;
        case 'end':
          console.info(`end_time : ${time}`);
          Chatting.endTimeValue = time;
          break;
        default:
          break;
      }
    }
  }
  componentDidMount = () => {
    console.info('adasdas');
  };

  componentDidUpdate(prevProps, prevState) {
    console.info('componentDidUpdate');
    console.info(prevProps);
    console.info(prevState);
  }

  render() {
    const { time } = this.state;
    const { MyClass, active } = this.props;
    console.info(MyClass.reportWritingState);
    console.info(active);
    return (
      <TimeContainer
        value={time}
        onChange={this.onTimeChange}
        style={{
          width: 52,
          height: 32,
          border: '1px solid #ccc',
          padding: '5px 8px',
          boxSizing: 'border-box',
          color: '#333',
          //   borderRadius: 3,
        }}
      />
    );
  }
}
export default TimePicer;

const TimeContainer = styled(TimeField)`
  margin: 0 10px;
  input {
    width: 100px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 0;
  }
`;
