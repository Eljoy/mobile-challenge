import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import normalize from 'react-native-normalize';

export declare namespace ReceiptPreview {
  export type Props = {} & FastImageProps;
}

export const ReceiptPreview: React.FC<ReceiptPreview.Props> = (props) => {
  return <FastImage {...props} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: normalize(65),
    height: normalize(65),
    borderRadius: normalize(12),
  },
});
