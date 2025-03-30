import { SelectExperiment } from '@/components/SelectExperiment';
import { useWindowRectActions } from '@/store/windowRect';
import { Experiment } from '@/components/Experiment';
import { invoke } from '@tauri-apps/api/core';
import { TWindowRect } from '@/types/rect';
import { useEffect } from 'react';

function App() {
  const { setWindowRect } = useWindowRectActions();

  useEffect(() => {
    const getWindowRect = async () => {
      const rect = await invoke<TWindowRect>('get_window_rect');
      setWindowRect(rect);
    };

    getWindowRect();
  }, []);

  return (
    <main className="container">
      <SelectExperiment />
      <Experiment />
    </main>
  );
}

export default App;
