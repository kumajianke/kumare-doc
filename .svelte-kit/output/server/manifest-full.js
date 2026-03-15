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
		client: {start:"_app/immutable/entry/start.V5n8clNs.js",app:"_app/immutable/entry/app.BrqDE89s.js",imports:["_app/immutable/entry/start.V5n8clNs.js","_app/immutable/chunks/CYhAGXu9.js","_app/immutable/chunks/elfPYvtW.js","_app/immutable/entry/app.BrqDE89s.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/elfPYvtW.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DRwtbnQv.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/6ugo",
				pattern: /^\/6ugo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/6ugo/admin",
				pattern: /^\/6ugo\/admin\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/6ugo/card",
				pattern: /^\/6ugo\/card\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/6ugo/community",
				pattern: /^\/6ugo\/community\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/6ugo/note/lock",
				pattern: /^\/6ugo\/note\/lock\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/6ugo/note/sklearn",
				pattern: /^\/6ugo\/note\/sklearn\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/6ugo/note/sklearn/KNN",
				pattern: /^\/6ugo\/note\/sklearn\/KNN\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/6ugo/users",
				pattern: /^\/6ugo\/users\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/rule",
				pattern: /^\/rule\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/rule/elysia",
				pattern: /^\/rule\/elysia\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
