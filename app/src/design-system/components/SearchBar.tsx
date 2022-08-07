import { Layout } from '@design-system/layout/Layout';
import { spaceScale } from '@design-system/lib';
import { Font, FontColor, getFontStyle } from '@design-system/typography';
import { debounce } from 'lodash';
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/Feather';

export type SearchBarProps = {
  onSearchKeywordChanged: (keyWord: string) => void;
} & TextInputProps;

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchKeywordChanged,
  ...props
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const _onSearchKeywordChanged = useRef(debounce(onSearchKeywordChanged, 300));
  const onChangeText = (text: string) => {
    setSearchKeyword(text);
    _onSearchKeywordChanged.current(text);
  };

  return (
    <Layout
      style={styles.container}
      direction="row"
      marginScale={3}
      align="start center"
      paddingScale={2}
    >
      <Icon name="search" size={normalize(16)} color={FontColor.Secondary} />
      <TextInput
        value={searchKeyword}
        onChangeText={onChangeText}
        autoCorrect={false}
        placeholder="Search..."
        selectionColor={FontColor.Primary}
        style={[styles.textInput, getFontStyle(Font.Body2, FontColor.Primary)]}
        {...props}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(8),
    backgroundColor: 'rgba(232, 234, 234, 0.5)',
  },
  textInput: {
    padding: spaceScale[1],
    paddingHorizontal: spaceScale[2],
  },
});
