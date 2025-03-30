import { useWindowRect } from '@/store/windowRect';
import { useExperiment } from '@/store/experiment';
import { getRandomWithExclusion } from '@/utils';
import { invoke } from '@tauri-apps/api/core';
import { useRef, useState } from 'react';

const PADDING: number = 10;

export function Experiment() {
  const windowRect = useWindowRect();
  const experimentId = useExperiment();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isStartButtonDisbled, setIsStartButtonDisabled] = useState<boolean>(false);

  const setCursorPosition = async () => {
    let x: number, y: number;
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    if (!buttonRect || !windowRect) return;

    switch (experimentId) {
      case '1':
        x = 200;
        y = Math.floor((windowRect.top + windowRect.bottom + PADDING) / 2);
        await invoke<boolean>('set_cursor_pos', { x, y });
        break;

      case '2':
        if (!windowRect) return;
        // x должен быть случайным и не попадать в область кнопки
        // y должен быть равен центру окна

        x = getRandomWithExclusion(
          windowRect.left + PADDING,
          windowRect.right - PADDING,
          buttonRect.left,
          buttonRect.right,
        );
        y = Math.floor((windowRect.top + windowRect.bottom + PADDING) / 2);

        await invoke<boolean>('set_cursor_pos', { x, y });
        break;

      case '3':
        if (!windowRect) return;
        x = getRandomWithExclusion(
          windowRect.left + PADDING,
          windowRect.right - PADDING,
          buttonRect.left + PADDING,
          buttonRect.right + PADDING,
        );
        y = getRandomWithExclusion(
          windowRect.top + PADDING,
          windowRect.bottom - PADDING,
          buttonRect.top + PADDING,
          buttonRect.bottom + PADDING,
        );

        await invoke<boolean>('set_cursor_pos', { x, y });
        break;

      default:
        break;
    }
  };

  const runAttempt = async () => {
    await setCursorPosition();

    return new Promise((resolve) => {
      const handleClick = () => {
        buttonRef.current?.removeEventListener('click', handleClick);
        resolve(true);
      };

      buttonRef.current?.addEventListener('click', handleClick);
      0;
    });
  };

  const handleTestStart = async () => {
    try {
      setIsStartButtonDisabled(true);
      for (let i = 0; i < 10; i++) {
        await runAttempt();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsStartButtonDisabled(false);
    }
  };

  return (
    <div>
      <button onClick={handleTestStart} disabled={isStartButtonDisbled}>
        Начать тестирование
      </button>
      <button className="test_button" ref={buttonRef}>
        Нажми на меня
      </button>
    </div>
  );
}
