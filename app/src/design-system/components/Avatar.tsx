import { Colors } from '@design-system/theme';
import React from 'react';
import normalize from 'react-native-normalize';
// @ts-ignore
import UserAvatar from 'react-native-user-avatar';
import { UserAvatarPropsType } from 'react-native-user-avatar/src/types';

export declare namespace Avatar {
  export type Props = {} & Omit<
    UserAvatarPropsType,
    | 'bgColors'
    | 'src'
    | 'bgColor'
    | 'borderRadius'
    | 'textColor'
    | 'imageStyle'
    | 'component'
    | 'size'
  >;
}

export const Avatar: React.FC<Avatar.Props> = (props) => {
  return (
    <UserAvatar
      {...props}
      size={normalize(45)}
      bgColors={[
        Colors.blue,
        Colors.green,
        Colors.red,
        Colors.purple,
        Colors.lightGreen,
      ]}
    />
  );
};
