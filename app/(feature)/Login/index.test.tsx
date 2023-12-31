import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { default as Login } from './page';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

jest.mock('../../hooks/useSignIn', () => {
  const originalModule = jest.requireActual('../../hooks/useSignIn');

  return {
    useSignIn: jest.fn(() => {
      return {
        ...originalModule,
        signIn: jest.fn().mockResolvedValueOnce({
          data: null,
          error: null,
        }),
      };
    }),
  };
});

describe('Login', () => {
  test('Loginのコンポーネントが有効な状態でレンダーされる', () => {
    render(<Login />);
    const emailInputComponent = screen.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = screen.getByLabelText('パスワード');
    const loginButtonComponent = screen.getByRole('button');

    const loginComponents = [
      {
        type: 'text',
        component: emailInputComponent,
      },
      {
        type: 'password',
        component: passwordInputComponent,
      },
      {
        type: 'submit',
        component: loginButtonComponent,
      },
    ];
    loginComponents.forEach((item) => {
      expect(item.component).toHaveAttribute('type', item.type);
      expect(item.component).toBeEnabled();
    });
  });
  test('emailとpasswordが入力できる', async () => {
    render(<Login />);
    const emailInputComponent = screen.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = screen.getByLabelText('パスワード');

    const email = 'email@test.com';
    const password = 'password';
    const user = userEvent.setup();

    user.type(emailInputComponent, email);
    await waitFor(() => expect((emailInputComponent as HTMLTextAreaElement).value).toBe(email));

    user.type(passwordInputComponent, password);
    await waitFor(() =>
      expect((passwordInputComponent as HTMLTextAreaElement).value).toBe(password),
    );
  });
  test('emailとpasswordが入力し、SubmitするとSubmitボタンがdisabledになる', async () => {
    render(<Login />);
    mockRouter.replace('/from');

    const emailInputComponent = screen.getByRole('textbox', {
      name: 'メールアドレス',
    });
    const passwordInputComponent = screen.getByLabelText('パスワード');
    const loginButtonComponent = screen.getByRole('button');

    expect(loginButtonComponent).toBeEnabled();

    const email = 'email@test.com';
    const password = 'password';
    const user = userEvent.setup();

    user.type(emailInputComponent, email);
    await waitFor(() => expect((emailInputComponent as HTMLTextAreaElement).value).toBe(email));

    user.type(passwordInputComponent, password);
    await waitFor(() =>
      expect((passwordInputComponent as HTMLTextAreaElement).value).toBe(password),
    );

    user.click(loginButtonComponent);
    await waitFor(() => {
      expect(loginButtonComponent).toBeDisabled();
    });
  });
});
