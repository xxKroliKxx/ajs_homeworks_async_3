import GameSavingLoader from '../js/app';
import read from '../js/reader';

jest.mock('../js/reader');

beforeEach(() => {
  jest.resetAllMocks();
});

test('load test', (done) => {
  const buffer = new ArrayBuffer(0);
  read.mockResolvedValue(new Promise((resolve) => {
    resolve(buffer);
  }));
  GameSavingLoader.load().then((data) => {
    expect(data).toEqual('');
    done();
  });
});

test('load test err', (done) => {
  read.mockResolvedValue(new Promise((resolve, reject) => {
    reject(new Error('ops'));
  }));
  GameSavingLoader.load().then(() => {
  }, (err) => {
    expect(err).toEqual(new Error('ops'));
    done();
  });
});
