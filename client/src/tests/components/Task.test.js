import React from 'react';
import Task from '../../components/Task';
import { render, fireEvent } from '@testing-library/react';

describe('<Task />', () => {
  const renderTask = overrideProps => {
    const defaultProps = {
      description: '',
      createdAt: '',
      finishedAt: '',
      startedAt: '',
      onDelete: jest.fn(),
      onEdit: jest.fn(),
      user: {
        name: 'Eduardo Moreira',
      },
    };
    const { container, getByText, getByTestId } = render(<Task {...defaultProps} {...overrideProps} />);

    return { container, getByText, getByTestId };
  };

  it('renders the component', () => {
    const { container } = renderTask();

    expect(container).toBeVisible();
  });

  it('calls onEdit', () => {
    const onEdit = jest.fn();
    const { getByTestId } = renderTask({ onEdit });

    fireEvent.click(getByTestId('edit-task'));

    expect(onEdit).toHaveBeenCalled();
  });

  it('calls onDelete', () => {
    const onDelete = jest.fn();
    const { getByTestId } = renderTask({ onDelete });

    fireEvent.click(getByTestId('delete-task'));

    expect(onDelete).toHaveBeenCalled();
  });
});
