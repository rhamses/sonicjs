import { clearInMemoryCache } from './cache';
import { getRecords } from './data';

describe('bypassKvCache', () => {
  beforeEach(async () => {
    await clearInMemoryCache();
  });

  it('should not read/write KV when ctx bypassKvCache is true', async () => {
    const kv = {
      get: jest.fn(async () => {
        throw new Error('KV should not be read when bypassKvCache=true');
      }),
      put: jest.fn(async () => {
        throw new Error('KV should not be written when bypassKvCache=true');
      })
    };

    const ctx = {
      env: { KVDATA: kv },
      get: (key: string) => (key === 'bypassKvCache' ? true : undefined)
    };

    const res = await getRecords(
      ctx as any,
      'posts',
      {},
      'test-cache-key',
      'fastest',
      async () => [{ id: '1', title: 'hello', total: 1 }]
    );

    expect(res.source).toBe('d1');
    expect(kv.get).not.toHaveBeenCalled();
    expect(kv.put).not.toHaveBeenCalled();
  });
});

