import { useState, useEffect } from 'react';
import { useVibeStore } from '../../stores/vibeStore';
import styled from '@emotion/styled';
import { Howl } from 'howler';

const TimerContainer = styled.div`
  margin-top: 20px;
`;

const TimeDisplay = styled.div`
  font-size: 2.5rem;
  font-family: monospace;
  margin: 10px 0;
`;

const TimerButton = styled.button`
  background: var(--accent);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const { sound } = useVibeStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            playAlarm();
            if (mode === 'work') {
              // Switch to break
              setMinutes(5);
              setMode('break');
            } else {
              // Switch to work
              setMinutes(25);
              setMode('work');
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const playAlarm = () => {
    const alarm = new Howl({
      src: ['/sounds/alarm.mp3'],
      volume: 0.5
    });
    alarm.play();
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'work' ? 25 : 5);
    setSeconds(0);
  };

  return (
    <TimerContainer>
      <h3>{mode === 'work' ? 'Work Time' : 'Break Time'}</h3>
      <TimeDisplay>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </TimeDisplay>
      <div>
        <TimerButton onClick={toggleTimer}>
          {isActive ? '⏸ Pause' : '▶ Start'}
        </TimerButton>
        <TimerButton onClick={resetTimer}>🔄 Reset</TimerButton>
      </div>
    </TimerContainer>
  );
}