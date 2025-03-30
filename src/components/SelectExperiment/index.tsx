import type { TExperimentOption } from '@/types/experiment';

import { useExperiment, useExperimentActions } from '@/store/experiment';
import Select, { Options } from 'react-select';

const options: Options<TExperimentOption> = [
  { value: '1', label: 'Первый тест' },
  { value: '2', label: 'Второй тест' },
  { value: '3', label: 'Третий тест' },
];

export function SelectExperiment() {
  const experimentId = useExperiment();
  const { setExperimentId } = useExperimentActions();

  const handleChange = (selectedOption: TExperimentOption | null) => {
    if (selectedOption) setExperimentId(selectedOption.value);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      defaultValue={options.find((option) => option.value === experimentId)}
    />
  );
}
