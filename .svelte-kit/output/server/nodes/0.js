import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CC4E6-lT.js","_app/immutable/chunks/C4HfTHQT.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/D0LP9oYd.js","_app/immutable/chunks/Df2ORK52.js","_app/immutable/chunks/NS4aRjWX.js","_app/immutable/chunks/Cz6VWaJK.js","_app/immutable/chunks/CN9v3Yxe.js","_app/immutable/chunks/DeNgPmq-.js","_app/immutable/chunks/BzQgUcve.js"];
export const stylesheets = ["_app/immutable/assets/Expansion.DZaGfx6o.css","_app/immutable/assets/0.DcfwdAgQ.css"];
export const fonts = ["_app/immutable/assets/Dank Mono Regular.CfN0Ttr4.otf","_app/immutable/assets/Dank Mono Italic.DdvTjQwK.otf"];
