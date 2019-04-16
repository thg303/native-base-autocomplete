# native-base-autocomplete
[![npm version](https://badge.fury.io/js/native-base-autocomplete.svg)](https://badge.fury.io/js/native-base-autocomplete)
[![Build Status](https://travis-ci.org/thg303/native-base-autocomplete.svg)](https://travis-ci.org/thg303/native-base-autocomplete)

A pure JS autocomplete component for React Native. Use this component in your own projects or use it as inspiration to build your own autocomplete.

![Autocomplete Example](https://raw.githubusercontent.com/thg303/native-base-autocomplete/master/example.gif)

## How to use native-base-autocomplete
Tested with RN >= 0.26.2. and native-base >= 2.3.3 

### changelog
Since 1.3.0 the `renderSeparator` prop is removed. sorry about that. if you need that option please consider using previous version.
Please note that `inputContainerStyle` is deprecated and will be removed soon, to applying style please use `itemProps` instead. 

### Installation

```shell
$ npm install --save native-base-autocomplete
```

or install HEAD from github.com:

```shell
$ npm install --save thg303/native-base-autocomplete
```

### Example

```javascript
// ...

render() {
  const { query } = this.state;
  const data = this._filterData(query)
  return (<Autocomplete
    data={data}
    defaultValue={query}
    onChangeText={text => this.setState({ query: text })}
    renderItem={data => (
      <ListItem onPress={() => this.setState({ query: data })}>
        <Text>{data}</Text>
      </ListItem>
    )}
  />);
}

// ...
```

A complete example for Android and iOS can be found [here](//github.com/thg303/native-base-autocomplete/blob/master/example/).
Also don't forget to check the [snack version](https://snack.expo.io/@thg303/native-base-autocomplete) for a live experience .

### Android
Android does not support overflows, for that reason it is necessary to wrap the autocomplete into a *absolute* positioned view on Android. This will  allow the suggestion list to overlap other views inside your component.

```javascript
//...

render() {
  return(
    <View>
      <View style={styles.autocompleteContainer}>
        <Autocomplete {/* your props */} />
      </View>
      <View>
        <Text>Some content</Text>
      </View>
    </View>
  );
}

//...

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});

```

### Props
| Prop | Type | Description |
| :------------ |:---------------:| :-----|
| containerStyle | style | These styles will be applied to the container which surrounds the autocomplete component. |
| hideResults | bool | Set to `true` to hide the suggestion list.
| data | array | An array with suggestion items to be rendered in `renderItem(item)`. Any array with length > 0 will open the suggestion list and any array with length < 1 will hide the list. |
| inputContainerStyle | style | These styles will be applied to the container which surrounds the Input component. [deprecated: it would be removed in favor of itemProps]
| itemProps | object | These props will be applied to the Item component which surrounds the Input component. note that if `inputContainerStyle` was present styles in this object would be override by those.
| listContainerStyle | style | These styles will be applied to the container which surrounds the result list. |
| listStyle | style | These style will be applied to the result list. |
| onShowResult | function | `onShowResult` will be called when the autocomplete suggestions appear or disappear. |
| onStartShouldSetResponderCapture | function | `onStartShouldSetResponderCapture` will be passed to the result list view container ([onStartShouldSetResponderCapture](https://facebook.github.io/react-native/docs/gesture-responder-system.html#capture-shouldset-handlers)). |
| renderItem | function | `renderItem` will be called to render the data objects which will be displayed in the result view below the text input. you may use `ListItem` component, please checkout the example code. |
| renderSeparator | function | this was unnecessary and removed! |
| listProps | object | ﻿`listProps` will be applied to the List component which renders the suggestion list below the text input. please checkout `List` component at native-base documentation for available options. please note that *button*, *dataArray* and *renderRow* props are already token to make this component work. also please use `listStyle` instead of `style` to applying style |
| renderTextInput | function | render custom TextInput. All props passed to this function. |
| keyExtractor | function | Used by `FlatList` to extract unique key for item. Defaults to index. |

## Known issues
* By default the autocomplete will not behave as expected inside a `<ScrollView />`. Set the scroll view's prop to fix this: `keyboardShouldPersistTaps={true}` for RN <= 0.39, or `keyboardShouldPersistTaps='always'` for RN >= 0.40.
* If you want to test with Jest add ```jest.mock('native-base-autocomplete', () => 'Autocomplete');``` to your test.

## Contribute
Feel free to open issues.

 - Before submitting PR please open an issue, to make sure it's necessary.

 - Please make sure PR keeps tests green, and add new ones if it's necessary.

## Credit
package originally was made by **Laurence Bortfeld** as **react-native-autocomplete-input**