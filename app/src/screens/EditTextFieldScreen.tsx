import { TextButton, TextInput } from '@design-system/components';
import { Layout } from '@design-system/layout/Layout';
import { Colors } from '@design-system/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, TextInput as RNTextInput } from 'react-native';
import { RootStackParamList } from './RootStack';

type Props = NativeStackScreenProps<RootStackParamList, 'EditTextField'>;

export const EditTextFieldScreen: React.FC<Props> = ({ route, navigation }) => {
  const { value, onSubmit, onCancel } = route.params;
  const [text, setText] = useState(value);
  const textInputRef = useRef<RNTextInput>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.white,
      },
      headerShadowVisible: false,
      headerLeft: () => (
        <TextButton
          color={Colors.black}
          onPress={() => {
            onCancel?.();
            navigation.goBack();
          }}
        >
          Cancel
        </TextButton>
      ),
      headerRight: () => (
        <TextButton
          onPress={() => {
            onSubmit(text || '');
            navigation.goBack();
          }}
        >
          Save
        </TextButton>
      ),
    });
  }, [navigation, onCancel, onSubmit, text, value]);

  useEffect(() => {
    setTimeout(() => {
      textInputRef.current?.focus();
    });
  }, []);

  return (
    <Layout flex={1} paddingScale={3}>
      <StatusBar barStyle="dark-content" animated={true} />
      <TextInput
        ref={textInputRef as any}
        value={text}
        onChangeText={setText}
        multiline
        placeholder="Add Comment..."
      />
    </Layout>
  );
};
