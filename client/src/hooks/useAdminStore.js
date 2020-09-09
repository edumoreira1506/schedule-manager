import { useContext } from 'react';
import { AdminContext } from '../containers/Admin';

const useAdminStore = (selector) => {
  const [state, setState] = useContext(AdminContext);
  const selectedState = state[selector];
  const onChangePropsFromSelectedState = (newProps) => {
    setState((prevState) => ({
      ...prevState,
      [selector]: Array.isArray(selectedState) ? (newProps) : {
        ...selectedState,
        ...newProps,
      },
    }));
  };

  return [selectedState, onChangePropsFromSelectedState];
};

export default useAdminStore;
