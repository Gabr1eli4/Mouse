import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { TWindowRect } from '@/types/rect';
import { getRandom } from './utils';

import './App.css';

const PADDING: number = 10;

function App() {
  const [rect, setRect] = useState<TWindowRect>();

  const setCursorPosition = async () => {
    if (!rect) return;
    const x = getRandom(rect.left + PADDING, rect.right - PADDING);
    const y = getRandom(rect.top + PADDING, rect.bottom - PADDING);

    await invoke<boolean>('set_cursor_pos', { x, y });
  };

  useEffect(() => {
    const getWindowRect = async () => {
      const rect = await invoke<TWindowRect>('get_window_rect');
      setRect(rect);
    };

    getWindowRect();
  }, []);

  return (
    <main className="container">
      <p>Left {rect?.left}</p>
      <p>Top {rect?.top}</p>
      <p>Right {rect?.right}</p>
      <p>Bottom {rect?.bottom}</p>
      <button onClick={setCursorPosition}>Изменить позицию курсора</button>
    </main>
  );
}

export default App;
