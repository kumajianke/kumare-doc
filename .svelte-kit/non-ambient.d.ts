
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/6ugo" | "/6ugo/admin" | "/6ugo/card" | "/6ugo/community" | "/6ugo/note" | "/6ugo/note/lock" | "/6ugo/note/sklearn" | "/6ugo/note/sklearn/KNN" | "/6ugo/users" | "/rule" | "/rule/elysia";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/6ugo": Record<string, never>;
			"/6ugo/admin": Record<string, never>;
			"/6ugo/card": Record<string, never>;
			"/6ugo/community": Record<string, never>;
			"/6ugo/note": Record<string, never>;
			"/6ugo/note/lock": Record<string, never>;
			"/6ugo/note/sklearn": Record<string, never>;
			"/6ugo/note/sklearn/KNN": Record<string, never>;
			"/6ugo/users": Record<string, never>;
			"/rule": Record<string, never>;
			"/rule/elysia": Record<string, never>
		};
		Pathname(): "/" | "/6ugo" | "/6ugo/admin" | "/6ugo/card" | "/6ugo/community" | "/6ugo/note/lock" | "/6ugo/note/sklearn" | "/6ugo/note/sklearn/KNN" | "/6ugo/users" | "/rule" | "/rule/elysia";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/search.json" | "/sveltepress.svg" | "/sveltepress@3x.png" | string & {};
	}
}