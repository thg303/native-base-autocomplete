const NativeBaseMock = {
  Text: require('react-native-mock').Text,
  Input: require('react-native-mock').TextInput,
  View: require('react-native-mock').View,
  Item: require('react-native-mock').View,
  ListItem: require('react-native-mock').View,
  FlatList: require('react-native-mock').ListView
}

// the cache key that real react native would get
const key = require.resolve('native-base');

// make sure the cache is filled with our lib
require.cache[key] = {
  id: key,
  filename: key,
  loaded: true,
  exports: NativeBaseMock,
};

