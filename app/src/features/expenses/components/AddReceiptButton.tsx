import { FontColor } from '@design-system/typography';
import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';

export declare namespace AddReceiptButton {
  export type Props = {} & TouchableHighlightProps;
}

export const AddReceiptButton: React.FC<AddReceiptButton.Props> = (props) => {
  return (
    <TouchableHighlight
      underlayColor="#30353904"
      style={styles.container}
      {...props}
    >
      <Icon name="plus" size={24} color={FontColor.Secondary} />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: normalize(65),
    height: normalize(65),
    borderRadius: normalize(12),
    borderWidth: normalize(1),
    borderColor: '#A2A1B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
