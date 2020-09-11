import React from 'react';
import Button from '../../components/Button';
import { render, fireEvent } from '@testing-library/react';

describe('<Button />', () => {
  const renderButton = overrideProps => {
    const { container, getByText } = render(<Button {...overrideProps} />);

    return { container, getByText };
  };

  it('renders the component', () => {
    const { container } = renderButton();

    expect(container).toBeVisible();
  });

  it('calls onClick', () => {
    const onClick = jest.fn();
    const buttonContent = 'Click me!';
    const { getByText } = renderButton({ onClick, children: buttonContent });

    fireEvent.click(getByText(buttonContent));

    expect(onClick).toHaveBeenCalled();
  });
});
