import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input, Props } from '.';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  test('inputがレンダーされる', () => {
    const mockValues: Props = {
      id: 'input',
      label: 'Input Label',
      type: 'text',
      onClick: () => void 0,
    };
    render(<Input {...mockValues} />);
    const inputComponent = screen.getByRole('textbox', {
      name: mockValues.label,
    });
    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeEnabled();
  });
  test('inputに「ほげほげ」と入力ができる', async () => {
    const mockValues: Props = {
      id: 'input',
      label: 'Input Label',
      type: 'text',
      onClick: () => {},
    };
    render(<Input {...mockValues} />);
    const inputComponent = screen.getByRole('textbox', {
      name: mockValues.label,
    });
    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeEnabled();

    const typeText = 'ほげほげ';
    const user = userEvent.setup();

    user.type(inputComponent, typeText);
    await waitFor(() =>
      expect((inputComponent as HTMLTextAreaElement).value).toBe(typeText),
    );
  });
  test('inputがdisabledで表示', async () => {
    const mockValues: Props = {
      id: 'input',
      label: 'Input Label',
      type: 'text',
      onClick: () => void 0,
      disabled: true,
    };
    render(<Input {...mockValues} />);
    const inputComponent = screen.getByRole('textbox', {
      name: mockValues.label,
    });
    expect(inputComponent).toHaveAttribute('type', mockValues.type);
    expect(inputComponent).toBeDisabled();

    const typeText = 'ほげほげ';
    const user = userEvent.setup();
    user.type(inputComponent, typeText);
    await waitFor(() =>
      expect((inputComponent as HTMLTextAreaElement).value).toBe(''),
    );
  });
});
