import { withPermissions } from '@common';
import { Expense } from '@models/Expense';
import { NativeModules } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

const { ReceiptCamera } = NativeModules;

export const makeReceiptPhoto = withPermissions(
  async (expense: Expense): Promise<{ fileName?: string; uri?: string }> => {
    return ReceiptCamera.makePhoto(
      JSON.stringify({ formattedDate: '', ...expense })
    );
  },
  [PERMISSIONS.IOS.CAMERA],
  [PERMISSIONS.ANDROID.CAMERA]
);
