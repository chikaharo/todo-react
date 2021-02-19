import * as ExtraPropTypes from 'extra-prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import Base from './Base';
import Border from './Border';
import Center from './Center';
import Container from './Container';
import Hand from './Hand';
import Notches from './Notches';
import useTime from './useTime';

export interface IHandColors {
  second?: string;
  minute?: string;
  hour?: string;
}
interface IAnalogueClockProps {
  size: number;
  showNumbers: boolean;
  borderWidth: number;
  baseColor: string;
  notchColor: string;
  borderColor: string;
  centerColor: string;
  handColors: IHandColors;
  numbersColor: string;
  timeZone: string;
}

const AnalogueClock: React.FC<IAnalogueClockProps> = ({
  size,
  showNumbers,
  borderWidth,
  baseColor,
  notchColor,
  borderColor,
  centerColor,
  handColors,
  numbersColor,
  timeZone
}): JSX.Element => {
  const time = useTime(timeZone);
  return (
    <Container size={size}>
      <Border borderColor={borderColor} borderWidth={borderWidth}>
        <Base baseColor={baseColor}>
          <Center centerColor={centerColor} />
          <Notches
            notchColor={notchColor}
            size={size}
            borderSize={borderWidth}
            showNumbers={showNumbers}
            numbersColor={numbersColor}
          />
          <Hand type="second" {...time} handColors={handColors} />
          <Hand type="minute" {...time} handColors={handColors} />
          <Hand type="hour" {...time} handColors={handColors} />
        </Base>
      </Border>
    </Container>
  );
};

AnalogueClock.propTypes = {
  baseColor: ExtraPropTypes.color.isRequired,
  borderColor: ExtraPropTypes.color.isRequired,
  borderWidth: PropTypes.number.isRequired,
  centerColor: ExtraPropTypes.color.isRequired,
  handColors: PropTypes.shape({
    hour: ExtraPropTypes.color.isRequired,
    minute: ExtraPropTypes.color.isRequired,
    second: ExtraPropTypes.color.isRequired,
  }).isRequired,
  notchColor: ExtraPropTypes.color.isRequired,
  numbersColor: ExtraPropTypes.color.isRequired,
  showNumbers: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
};

AnalogueClock.defaultProps = {
  baseColor: '#ffffff',
  borderColor: '#000000',
  borderWidth: 5,
  centerColor: '#000000',
  handColors: {
    hour: '#000000',
    minute: '#000000',
    second: '#000000',
  },
  notchColor: '#000000',
  numbersColor: '#000000',
  showNumbers: true,
  size: 300,
};

export default AnalogueClock;
