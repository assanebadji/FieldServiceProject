import React, { Component } from 'react';

import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  ScrollView
} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollView: {
    height: 120,
    width: 198 //TODO: this needs to be dynamic
  },
  container: {
    position: 'absolute',
    borderColor: '#BDBDC1',
    borderWidth: 2 / window.scale,
    borderTopColor: 'transparent',
  }
})

class Items extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items,
      positionX,
      positionY,
      show,
      onPress,
      width,
      height,
      styleOptionContainer,
      styleOptionList
    } = this.props;

    if (!show) {
      return null;
    }

    const renderedItems = React.Children.map(items, (item) => {

      return (
        <TouchableWithoutFeedback onPress={() => onPress(item.props.children, item.props.value) }>
          <View style={styleOptionContainer}>
            {item}
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <View style={[styles.container, { top: positionY, left: positionX }, styleOptionList]}>
        <ScrollView
          style={{ width: width - 2, height: height * 3 }}
          automaticallyAdjustContentInsets={false}
          bounces={false}>
          {renderedItems}
        </ScrollView>
      </View>
    );
  }
}

Items.propTypes = {
  positionX: React.PropTypes.number,
  positionY: React.PropTypes.number,
  show: React.PropTypes.bool,
  onPress: React.PropTypes.func,
  styleOptionContainer: View.propTypes.style,
  styleOptionList: View.propTypes.style
};

Items.defaultProps = {
  width: 0,
  height: 0,
  positionX: 0,
  positionY: 0,
  show: false,
  onPress: () => {}
};

export default Items;
