import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BHJ3ez_P.js","_app/immutable/chunks/DmHuTy-b.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/elfPYvtW.js","_app/immutable/chunks/B7h5meAB.js","_app/immutable/chunks/DRwtbnQv.js","_app/immutable/chunks/nHTqwd_i.js","_app/immutable/chunks/oGw1FoOK.js","_app/immutable/chunks/BUqtPL3a.js","_app/immutable/chunks/CDaNrxFI.js"];
export const stylesheets = ["_app/immutable/assets/Expansion.DZaGfx6o.css","_app/immutable/assets/0.CCkecsh1.css"];
export const fonts = ["_app/immutable/assets/Dank Mono Regular.CfN0Ttr4.otf","_app/immutable/assets/Dank Mono Italic.DdvTjQwK.otf"];
