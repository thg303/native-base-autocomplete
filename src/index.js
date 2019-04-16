import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, ViewPropTypes as RNViewPropTypes, StyleSheet, FlatList } from 'react-native';
import { Text, Input, View, Item, ListItem } from 'native-base';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

class Autocomplete extends Component {
  static propTypes = {
    ...Input.propTypes,
    /**
     * These styles will be applied to the container which
     * surrounds the autocomplete component.
     */
    containerStyle: ViewPropTypes.style,
    /**
     * Assign an array of data objects which should be
     * rendered in respect to the entered text.
     */
    data: PropTypes.array,
    /**
     * Set to `true` to hide the suggestion list.
     */
    hideResults: PropTypes.bool,
    /*
     * These styles will be applied to the container which surrounds
     * the Input component. [deprecated: it would be removed in favor of itemProps]
     */
    inputContainerStyle: ViewPropTypes.style,
    /*
     * These props will be applied to the Item component which surrounds
     * the Input component. note that if *inputContainerStyle* was present
     * styles in this object would be override by those.
     */
    itemComponentProps: PropTypes.object,
    /*
     * Set `keyboardShouldPersistTaps` to true if RN version is <= 0.39.
     */
    keyboardShouldPersistTaps: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    /*
     * These styles will be applied to the container which surrounds
     * the result list.
     */
    listContainerStyle: ViewPropTypes.style,
    /**
     * These style will be applied to the result list.
     */
    listStyle: ViewPropTypes.style,
    /**
     * `onShowResults` will be called when list is going to
     * show/hide results.
     */
    onShowResults: PropTypes.func,
    /**
     * method for intercepting swipe on ListView. Used for ScrollView support on Android
     */
    onStartShouldSetResponderCapture: PropTypes.func,
    /**
     * `renderItem` will be called to render the data objects
     * which will be displayed in the result view below the
     * text input. you may use `ListItem` component, please checkout the example code.
     */
    renderItem: PropTypes.func,
    /**
     * `listProps` will be applied to List component which renders the suggestion list
     * below the text input. please checkout `List` component at native-base documentation
     * for available options
     */
    listProps: PropTypes.object,
    /**
     * renders custom TextInput. All props passed to this function.
     */
    renderTextInput: PropTypes.func,
    /**
     * Used by `FlatList` to extract unique key for item.
     */
    keyExtractor: PropTypes.func
  };

  static defaultProps = {
    data: [],
    defaultValue: '',
    keyboardShouldPersistTaps: 'always',
    onStartShouldSetResponderCapture: () => false,
    renderItem: rowData => <ListItem onPress={() => {}}><Text>{rowData}</Text></ListItem>,
    listProps: null,
    renderTextInput: props => <Input {...props} />,
    itemProps: {},
    keyExtractor: (item, index) => `${index}`
  };

  constructor(props) {
    super(props);

    this.resultList = null;
  }

  /**
   * Proxy `blur()` to autocomplete's text input.
   */
  blur() {
    const { textInput } = this;
    textInput && textInput.blur();
  }

  /**
   * Proxy `focus()` to autocomplete's text input.
   */
  focus() {
    const { textInput } = this;
    textInput && textInput.focus();
  }


  renderResultList() {
    const {
      data,
      listStyle,
      renderItem,
      listProps,
      keyboardShouldPersistTaps,
      keyExtractor
    } = this.props;

    return (
      <FlatList
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        ref={(resultList) => { this.resultList = resultList; }}
        data={data}
        renderItem={arg => renderItem(arg.item)}
        keyExtractor={keyExtractor}
        style={[styles.list, listStyle]}

        {...listProps}
      />
    );
  }

  renderTextInput() {
    const { onEndEditing, renderTextInput, style } = this.props;
    const props = {
      style,
      ref: (ref) => { this.textInput = ref; },
      onEndEditing: e => onEndEditing && onEndEditing(e),
      ...this.props
    };

    return renderTextInput(props);
  }

  render() {
    const {
      data,
      containerStyle,
      hideResults,
      inputContainerStyle,
      itemProps,
      listContainerStyle,
      onShowResults,
      onStartShouldSetResponderCapture
    } = this.props;
    const showResults = data.length > 0;
    // Notify listener if the suggestion will be shown.
    onShowResults && onShowResults(showResults);
    const { style, ...restOfItemProps } = itemProps;

    return (
      <View style={[styles.container, containerStyle]}>
        <Item style={[style || {}, inputContainerStyle]} {...restOfItemProps}>
          {this.renderTextInput()}
        </Item>
        {!hideResults && (
          <View
            style={listContainerStyle}
            onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
          >
            {showResults && this.renderResultList()}
          </View>
        )}
      </View>
    );
  }
}

const androidStyles = {
  container: {
    flex: 1
  },
  list: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    zIndex: 30,
    right: 0,
    marginTop: 0,
    marginBottom: 0
  }
};

const iosStyles = {
  container: {
    zIndex: 1
  },
  list: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopWidth: 0,
    left: 0,
    position: 'absolute',
    right: 0
  }
};

const styles = StyleSheet.create({
  ...Platform.select({
    android: { ...androidStyles },
    ios: { ...iosStyles }
  })
});

export default Autocomplete;
