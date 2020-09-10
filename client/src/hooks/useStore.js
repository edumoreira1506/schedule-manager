import { useContext } from 'react';
import { UserContext } from '../containers/User';

const useStore = (selector) => {
  const [state, setState] = useContext(UserContext);
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

export default useStore;
