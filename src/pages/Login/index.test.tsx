import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import AppLike from '@/../__tests__/AppLike';
import Login from '.';

describe('Login', () => {
  const mockLogin = jest.fn();
  const setup = () =>
    render(
      <AppLike
        auth={{
          login: mockLogin,
          logout: jest.fn(),
          user: {},
        }}
      >
        <Login />
      </AppLike>,
    );

  it('logs in successfully', async () => {
    setup();
    expect(screen.getByText('Dealer Account Login')).toBeInTheDocument();
    const emailLabel = screen.getByLabelText('Email');
    fireEvent.change(emailLabel, {
      target: {
        value: 'sonu',
      },
    });
    fireEvent.blur(emailLabel);

    // varify that email error shows up for wrong email
    await waitFor(() =>
      expect(screen.getByText('Please enter valid email address.')).toBeInTheDocument(),
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: {
        value: 'sonu@vizingo.com',
      },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: {
        value: '123456',
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'sonu@vizingo.com',
        password: '123456',
      }),
    );
  });
});
