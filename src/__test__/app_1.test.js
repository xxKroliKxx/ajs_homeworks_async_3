import GameSavingLoader from '../js/app';
import read from '../js/reader';

jest.mock('../js/reader');

beforeEach(() => {
  jest.resetAllMocks();
});

test('load test', (done) => {
  const input = '{"id":9,"created":1546300800,"userInfo":{"id":1,name":"Hitman","level":10,"points":2000}}';
  const buffer = new ArrayBuffer(input.length * 2);
  const bufferView = new Uint16Array(buffer);
  for (let i = 0; i < input.length; i += 1) {
    bufferView[i] = input.charCodeAt(i);
  }
  read.mockResolvedValue(new Promise((resolve) => {
    resolve(buffer);
  }));
  GameSavingLoader.load().then((data) => {
    expect(data).toEqual(input);
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
