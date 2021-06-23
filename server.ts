import { Application, Router, HttpError, Status, send } from "https://deno.land/x/oak/mod.ts";
import { exists } from "https://deno.land/std/fs/exists.ts";

const app = new Application();
//const scriptCache = new Map<string,string>();
const router = new Router();

router.get('/rack/:src', async (ctx) => {
  ctx.response.headers.set('Content-Type',"application/javascript");
  if (ctx.params && ctx.params.src) {
    const filename = `${Deno.cwd()}/rack/${ctx.params.src}`;
    const srcfile = filename.replace('.js','.ts').replace('rack','src');
    // console.log(filename);
    // if (scriptCache.has(filename)) {
    //   console.log('File Found');
    //   ctx.response.body = scriptCache.get(filename);
    // } else {
    //   console.log('File Not Found');
      if (await exists(srcfile)) {
        const { files, diagnostics } = await Deno.emit(srcfile, {
          check: false,
          bundle: 'module',
          compilerOptions: {
          lib: ['esnext','dom'],
          module: 'es6',
          target: 'es2017'
          }
        });
        if (diagnostics.length) {
            console.warn(Deno.formatDiagnostics(diagnostics));
        }
        //scriptCache.set(filename, files['deno:///bundle.js']);
        //ctx.response.body = scriptCache.get(filename);
        ctx.response.body = files['deno:///bundle.js'];
      }
    //}
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/`,
      index: 'index.html'
    });
  } catch {
    next();
  }
});

app.addEventListener('listen', ({hostname, port}) => {
  console.log(`Start listening on ${hostname}:${port}`);
})

await app.listen({hostname: "0.0.0.0", port: 8000 });
