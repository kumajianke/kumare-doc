export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "kumare-doc/_app",
	assets: new Set(["search.json","sveltepress.svg","sveltepress@3x.png"]),
	mimeTypes: {".json":"application/json",".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.BV9TePJH.js",app:"_app/immutable/entry/app.DRx-9eUb.js",imports:["_app/immutable/entry/start.BV9TePJH.js","_app/immutable/chunks/Cz6VWaJK.js","_app/immutable/chunks/D0LP9oYd.js","_app/immutable/entry/app.DRx-9eUb.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/D0LP9oYd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/NS4aRjWX.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/kumare-doc/","/kumare-doc/6ugo","/kumare-doc/6ugo/admin","/kumare-doc/6ugo/card","/kumare-doc/6ugo/community","/kumare-doc/6ugo/note/lock","/kumare-doc/6ugo/note/sklearn","/kumare-doc/6ugo/note/sklearn/KNN","/kumare-doc/6ugo/users","/kumare-doc/rule","/kumare-doc/rule/elysia"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
