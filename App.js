import 'react-native-gesture-handler';
import app from './firebase'
import { useState } from 'react';
import AuthNavigation from './AuthNavigation';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { FontAwesome, AntDesign, Entypo, Feather, MaterialIcons, Ionicons  } from '@expo/vector-icons';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default function App() {
  const [ready, setReady] = useState(false);

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/splash.png'),
      require('./assets/logo.jpg'),
      require('./assets/favicon.png')
    ]);

    const fontAssets = cacheFonts([FontAwesome.font, AntDesign.font, Entypo.font, Feather.font, MaterialIcons.font, Ionicons.font] );

    await Promise.all([...imageAssets, ...fontAssets]);
  }



  if (ready) {
    return (
      <StateProvider initialState={initialState} reducer={reducer}>
        <AuthNavigation style={{backgroundColor: '#000'}} />
      </StateProvider>
    )
  }
  else {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    )
  }
}
