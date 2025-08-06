/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useVibeStore } from '../../stores/vibeStore';
import styled from '@emotion/styled';
import { soundManager } from '../../utils/soundManager';
import { css } from '@emotion/react';

type SoundKey = 'rain' | 'cafe' | 'waves';

const soundPresets: Record<SoundKey, { icon: string; label: string }> = {
  rain: {
    icon: '🌧️',
    label: 'Rain'
  },
  cafe: {
    icon: '☕',
    label: 'Cafe'
  },
  waves: {
    icon: '🌊',
    label: 'Waves'
  }
};

const SoundButton = styled.button<{ isActive: boolean }>`
  background: ${props => props.isActive ? 'var(--accent)' : 'transparent'};
  border: 1px solid var(--accent);
  border-radius: 8px;
  padding: 8px 12px;
  margin: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const VolumeControl = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="range"] {
    width: 100%;
    accent-color: var(--accent);
  }
`;

const soundControlsContainer = css`
  padding: 16px 0;
`;

const soundButtonsContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const headingStyle = css`
  margin-bottom: 12px;
`;

export function SoundControls() {
  const { sound, setSound, volume } = useVibeStore();

  // Initialize volume on mount
  useEffect(() => {
    soundManager.setVolume(volume);
  }, []);

  // Update volume when it changes
  useEffect(() => {
    soundManager.setVolume(volume);
  }, [volume]);

  const toggleSound = (soundKey: SoundKey) => {
    if (sound === soundKey) {
      soundManager.stop(soundKey);
      setSound(null);
    } else {
      soundManager.stop(); // Stop all sounds first
      soundManager.play(soundKey);
      setSound(soundKey);
    }
  };

  return (
    <div css={soundControlsContainer}>
      <h3 css={headingStyle}>Ambient Sounds</h3>
      <div css={soundButtonsContainer}>
        {(Object.keys(soundPresets) as SoundKey[]).map((key) => (
          <SoundButton
            key={key}
            onClick={() => toggleSound(key)}
            isActive={sound === key}
            aria-label={soundPresets[key].label}
          >
            {soundPresets[key].icon} {soundPresets[key].label}
          </SoundButton>
        ))}
      </div>
      <VolumeControl>
        <label htmlFor="volume">Volume:</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => useVibeStore.getState().setVolume(parseFloat(e.target.value))}
        />
      </VolumeControl>
    </div>
  );
}