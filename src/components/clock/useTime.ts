import React, { useState } from 'react';

// interface useTimeProps {
//   timeZone: string
// }

interface IState {
  seconds: number;
  minutes: number;
  hours: number;
}

const useTime = (timeZone: string) => {
  const [state, setState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    let date = timeZone ? new Date(new Date().toLocaleString("en-US", {timeZone: timeZone})) : new Date();
    setState({
      hours: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    });

    const tick = setInterval(() => {
      date = timeZone ? new Date(new Date().toLocaleString("en-US", {timeZone: timeZone})) : new Date();
      setState({
        hours: date.getHours() > 12 ? date.getHours() - 12 : date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return function cleanup() {
      clearInterval(tick);
    };
  }, [setState]);

  return state as IState;
};

export default useTime;
