import { withPermissions } from '@common';
import { Expense } from '@models/Expense';
import { Dimensions, NativeModules } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import { PERMISSIONS } from 'react-native-permissions';
const { ReceiptCamera } = NativeModules;

export const makeReceiptPhoto = withPermissions(
  async (expense: Expense): Promise<{ fileName?: string; uri?: string }> => {
    const { width, height } = Dimensions.get('window');
    const result: { fileName?: string; uri?: string } =
      await ReceiptCamera.makePhoto(
        JSON.stringify({ formattedDate: '', ...expense })
      );
    if (result?.uri) {
      const { name, path } = await ImageResizer.createResizedImage(
        result.uri,
        2 * width,
        2 * height,
        'JPEG',
        100
      );
      return { fileName: name, uri: path };
    }
    return {};
  },
  [PERMISSIONS.IOS.CAMERA],
  [PERMISSIONS.ANDROID.CAMERA]
);
