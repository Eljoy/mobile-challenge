import { Icon } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { Colors } from '@design-system/theme';
import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';
import normalize from 'react-native-normalize';

export declare namespace AddReceiptButton {
  export type Props = {} & TouchableHighlightProps;
}

export const AddReceiptButton: React.FC<AddReceiptButton.Props> = (props) => {
  return (
    <Layout style={styles.container}>
      <TouchableHighlight
        underlayColor={Colors.underlay}
        style={styles.touchable}
        {...props}
      >
        <Icon name="plus" />
      </TouchableHighlight>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: normalize(1),
    borderRadius: normalize(16),
    borderColor: Colors.secondaryGrey,
  },
  touchable: {
    width: normalize(65),
    height: normalize(65),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
