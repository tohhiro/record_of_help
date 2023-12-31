import React from 'react';
import { Radio, Props } from '.';

export default {
  title: 'app/components/Radio',
  component: Radio,
};

export const Default: React.FC = (): JSX.Element => {
  const mockData: Props = {
    id: 'radio',
    label: 'radioラベル',
    value: 'radio',
  };

  return <Radio {...mockData} />;
};
