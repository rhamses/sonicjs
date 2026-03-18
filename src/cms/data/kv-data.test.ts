import {
  add,
  getKey,
  getDataListByPrefix,
  saveKVData,
  addToKvCache,
  getRecordFromKvCache,
  clearKVCache,
  getKVCache,
  __resetKvCacheForTests
} from './kv-data';

function createFakeKv() {
  const store = new Map<string, { value: string; metadata?: any }>();
  return {
    async put(key: string, value: string, opts?: { metadata?: any }) {
      store.set(key, { value, metadata: opts?.metadata });
    },
    async get(key: string, opts?: { type?: 'json' | 'text' }) {
      const rec = store.get(key);
      if (!rec) return null;
      if (opts?.type === 'json') return JSON.parse(rec.value);
      if (opts?.type === 'text') return rec.value;
      return rec.value;
    },
    async delete(key: string) {
      store.delete(key);
    },
    async list(opts?: { prefix?: string; limit?: number; cursor?: string }) {
      const prefix = opts?.prefix ?? '';
      const keys = [...store.keys()]
        .filter((k) => k.startsWith(prefix))
        .slice(0, opts?.limit ?? 1000)
        .map((name) => ({ name }));
      return { keys, list_complete: true, cursor: '' };
    }
  };
}

describe('test KV data access tier', () => {
  // it('saveKVData should insert data', async () => {
  //   const rec1 = await saveKVData(
  //     env.KVDATA,
  //     'site',
  //     'ct',
  //     { foo: 'bar' },
  //     '12345'
  //   );
  //   const rec2 = await saveKVData(
  //     env.KVDATA,
  //     'site',
  //     'ct',
  //     { foo: 'bar' },
  //     '23456'
  //   );
  //
  //   const data = await getDataListByPrefix(env.KVDATA, '', 2);
  //   console.log('getDataListByPrefix==>', data);
  //
  //   // expect(key.startsWith("site::module")).toBe(true);
  //   // expect(key.length).toBe(40);
  // });

  saveKVData;
  it('getDataListByPrefix should return data', async () => {
    const kv = createFakeKv();
    await kv.put('a', JSON.stringify({ foo: 1 }));
    await kv.put('b', JSON.stringify({ foo: 2 }));
    const data = await getDataListByPrefix(kv as any, '', 2);
    expect(data.keys.length).toBe(2);
  });

  // it("should generate a key", () => {
  //   const key = getKey("site", "module");
  //   console.log(key);
  //   expect(key.startsWith("site::module")).toBe(true);
  //   expect(key.length).toBe(40);
  // });

  // it("should generate a key for a content type", () => {
  //   const key = getKey("", "", "site1::content-type::blog-post");
  //   // console.log(key);
  //   expect(key).toBe("site1::content-type::blog-post");
  // });
});

describe('test KV cache', () => {
  beforeEach(() => {
    __resetKvCacheForTests();
  });

  it('addToKvCache should save to kv', async () => {
    const kv = createFakeKv();
    await addToKvCache({}, kv as any, '/some-url-key-1', {
      foo: 'bar'
    });
    await addToKvCache({}, kv as any, '/some-url-key-2', {
      foo: 'bear'
    });

    const kvResult1 = await getRecordFromKvCache(kv as any, '/some-url-key-1');
    const kvResult2 = await getRecordFromKvCache(kv as any, '/some-url-key-2');

    // console.log('kvResult1', kvResult1)
    expect(kvResult1).toEqual({
      foo: 'bar'
    });

    expect(kvResult2).toEqual({
      foo: 'bear'
    });

    const allCacheItems = await getKVCache(kv as any);
    console.log('allCacheItems', allCacheItems);

    // //clear cache
    await clearKVCache(kv as any);

    const allCacheItemsAfterClearCache = await getKVCache(kv as any);
    expect(allCacheItemsAfterClearCache.keys.length).toEqual(0);
  });

  it('should disable KV cache for the day on kv.put error', async () => {
    const failingKv = {
      put: jest.fn(async () => {
        throw new Error('KV quota exceeded');
      }),
      get: jest.fn(async () => {
        throw new Error('should not be called');
      })
    };

    await expect(
      addToKvCache({ env: {} }, failingKv as any, '/key', { foo: 'bar' })
    ).resolves.toBeUndefined();

    // once disabled, getRecordFromKvCache should return null and not call kv.get
    const res = await getRecordFromKvCache(failingKv as any, '/key');
    expect(res).toBeNull();
    expect(failingKv.get).not.toHaveBeenCalled();
  });

  it('should disable KV cache for the day on kv.get error', async () => {
    const failingKv = {
      get: jest.fn(async () => {
        throw new Error('KV quota exceeded');
      }),
      put: jest.fn(async () => {
        throw new Error('should not be called');
      })
    };

    const res1 = await getRecordFromKvCache(failingKv as any, '/key');
    expect(res1).toBeNull();
    // kv cache read tries json first, then raw; both should fail here
    expect(failingKv.get).toHaveBeenCalledTimes(2);

    // once disabled, addToKvCache should no-op and not call put
    await addToKvCache({ env: {} }, failingKv as any, '/key', { foo: 'bar' });
    expect(failingKv.put).not.toHaveBeenCalled();
  });
});
