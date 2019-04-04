import React from 'react';
import { Root } from 'native-base';
import { Font, AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Roboto from 'native-base/Fonts/Roboto.ttf';
import RobotoMedium from 'native-base/Fonts/Roboto_medium.ttf';
import PropTypes from 'prop-types';

export default class FontLoader extends React.Component {
  static propTypes = { children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired };

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    Font.loadAsync({
      Roboto,
      Roboto_medium: RobotoMedium,
      ...Ionicons.font
    }).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return (<Root>
        <AppLoading />
      </Root>);
    }
    return (
      this.props.children
    );
  }
}

