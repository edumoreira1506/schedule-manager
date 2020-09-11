import React from 'react';
import Input from '../../components/Input';
import { render } from '@testing-library/react';

describe('<Input />', () => {
  const renderInput = overrideProps => {
    const defaultProps = {
      onChange: jest.fn(),
    };
    const { container, getByText } = render(<Input {...defaultProps} {...overrideProps} />);

    return { container, getByText };
  };

  it('renders the component', () => {
    const { container } = renderInput();

    expect(container).toBeVisible();
  });
});
