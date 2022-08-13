import fetchMock from 'jest-fetch-mock';
import mock from 'react-native-permissions/mock';

jest.mock('react-native-permissions', () => {
  return mock;
});

fetchMock.enableMocks();
