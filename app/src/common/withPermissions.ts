import { Platform } from 'react-native';
import {
  AndroidPermission,
  IOSPermission,
  Permission,
  PermissionStatus,
  requestMultiple,
} from 'react-native-permissions';

const hasEveryPermission = (result: Record<Permission, PermissionStatus>) => {
  return Object.values(result).every((r) => r === 'granted');
};

export const withPermissions = <T, R>(
  cb: (...args: T[]) => R,
  iosPermissions: IOSPermission[],
  androidPermissions: AndroidPermission[]
) => {
  return async (...args: T[]) => {
    const checkResult = await requestMultiple(
      Platform.select<Permission[]>({
        ios: iosPermissions as Permission[],
        default: androidPermissions as Permission[],
      })
    );
    if (hasEveryPermission(checkResult)) {
      return cb(...args);
    }
  };
};
