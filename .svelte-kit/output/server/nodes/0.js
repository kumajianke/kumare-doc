import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.uE8r0qhg.js","_app/immutable/chunks/BQAwfzbO.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/elfPYvtW.js","_app/immutable/chunks/B-GKDCZa.js","_app/immutable/chunks/DRwtbnQv.js","_app/immutable/chunks/CYhAGXu9.js","_app/immutable/chunks/Dnsb49Nz.js","_app/immutable/chunks/CWGxLs4N.js","_app/immutable/chunks/CDaNrxFI.js"];
export const stylesheets = ["_app/immutable/assets/Expansion.DZaGfx6o.css","_app/immutable/assets/0.UmsHT0xM.css"];
export const fonts = ["_app/immutable/assets/Dank Mono Regular.CfN0Ttr4.otf","_app/immutable/assets/Dank Mono Italic.DdvTjQwK.otf"];
