import { debounce } from 'lodash';
import React, { useRef, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

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
    <TextInput
      value={searchKeyword}
      onChangeText={onChangeText}
      autoCorrect={false}
      {...props}
    />
  );
};
