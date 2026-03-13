export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["sveltepress.svg","sveltepress@3x.png"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.Cq1u-Fuw.js",app:"_app/immutable/entry/app.DjwZxzR1.js",imports:["_app/immutable/entry/start.Cq1u-Fuw.js","_app/immutable/chunks/DX4foA5W.js","_app/immutable/chunks/C1L0hoeX.js","_app/immutable/entry/app.DjwZxzR1.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/C1L0hoeX.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CuAbifRY.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/6ugo","/6ugo/admin","/6ugo/card","/6ugo/community","/6ugo/note/lock","/6ugo/users","/rule","/rule/elysia"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
