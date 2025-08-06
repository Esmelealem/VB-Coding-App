/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';

export function SettingsPage() {
  // State for theme selection
  const [theme, setTheme] = useState<'light' | 'dark' | 'terminal'>('light');
  // State for ambient sounds
  const [sound, setSound] = useState<'rain' | 'cafe' | 'waves' | null>('cafe');
  const [volume, setVolume] = useState(50);
  
  // State for work timer
  const [workTime, setWorkTime] = useState(25);

  return (
    <div css={settingsContainer}>
      <section css={sectionStyle}>
        <h2 css={headingStyle}>Theme</h2>
        <div css={optionsContainer}>
          {['light', 'dark', 'terminal'].map((option) => (
            <label key={option} css={optionStyle}>
              <input
                type="radio"
                name="theme"
                checked={theme === option}
                onChange={() => setTheme(option as any)}
                css={radioInputStyle}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={headingStyle}>Ambient Sounds</h2>
        <div css={optionsContainer}>
          {['rain', 'cafe', 'waves'].map((soundOption) => (
            <label key={soundOption} css={optionStyle}>
              <input
                type="radio"
                name="sound"
                checked={sound === soundOption}
                onChange={() => setSound(soundOption as any)}
                css={radioInputStyle}
              />
              {soundOption.charAt(0).toUpperCase() + soundOption.slice(1)}
            </label>
          ))}
          <div css={volumeControlStyle}>
            <span>Volume:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              css={rangeInputStyle}
            />
            <span>{volume}%</span>
          </div>
        </div>
      </section>

      <section css={sectionStyle}>
        <h2 css={headingStyle}>Work Time</h2>
        <div css={timeInputContainer}>
          <input
            type="number"
            min="1"
            max="60"
            value={workTime}
            onChange={(e) => setWorkTime(parseInt(e.target.value) || 25)}
            css={timeInputStyle}
          />
          <span>minutes</span>
        </div>
      </section>
    </div>
  );
}

// Styles
const settingsContainer = css`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const sectionStyle = css`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;
`;

const headingStyle = css`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const optionsContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const optionStyle = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const radioInputStyle = css`
  margin: 0;
`;

const volumeControlStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const rangeInputStyle = css`
  flex-grow: 1;
`;

const timeInputContainer = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const timeInputStyle = css`
  width: 60px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
`;