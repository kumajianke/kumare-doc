import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.DxWJRTbm.js","_app/immutable/chunks/cfe_pWul.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/C1L0hoeX.js","_app/immutable/chunks/CpnvmI1U.js","_app/immutable/chunks/CuAbifRY.js","_app/immutable/chunks/DX4foA5W.js","_app/immutable/chunks/CwUzUFgs.js","_app/immutable/chunks/UXU-UX6N.js","_app/immutable/chunks/C3-kh7En.js"];
export const stylesheets = ["_app/immutable/assets/Expansion.DZaGfx6o.css","_app/immutable/assets/0.C9e_Ob47.css"];
export const fonts = ["_app/immutable/assets/Dank Mono Regular.CfN0Ttr4.otf","_app/immutable/assets/Dank Mono Italic.DdvTjQwK.otf"];
