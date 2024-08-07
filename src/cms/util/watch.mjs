import { build, context } from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
// old command, but on ly works on mac:
// rsync -avzh ./public ./dist --delete && esbuild --bundle --sourcemap src/server.ts --format=esm --watch --outfile=dist/_worker.js

(async () => {
  // console.log('running build.mjs ...')
  const res = await context({
    entryPoints: ['./src/server.ts'],
    bundle: true,
    sourcemap: true,
    format: 'esm',
    loader: { '.ts': 'ts' },
    outfile: './dist/_worker.js',
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: {
          from: ['./public/css/*'],
          to: ['./dist/public/css']
        }
      }),
      copy({
        resolveFrom: 'cwd',
        assets: {
          from: ['./public/js/*'],
          to: ['./dist/public/js']
        }
      }),
      copy({
        resolveFrom: 'cwd',
        assets: {
          from: ['./public/images/*'],
          to: ['./dist/public/images']
        }
      })
    ]
  });
  await res.watch();
  console.log(res);
})();
