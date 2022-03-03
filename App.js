import 'react-native-gesture-handler';
import app from './firebase'
import AuthNavigation from './AuthNavigation';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AuthNavigation />
    </StateProvider>
      
  );
}
