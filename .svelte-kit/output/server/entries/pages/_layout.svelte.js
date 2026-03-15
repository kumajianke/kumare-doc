import "clsx";
import { s as ssr_context, a as attr_style, b as bind_props, c as attr_class, e as escape_html, h as head, d as attributes, f as attr, g as ensure_array_like, i as spread_props, j as derived, k as store_get, l as stringify, u as unsubscribe_stores, m as setContext } from "../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import { p as page } from "../../chunks/index.js";
import { L as Link } from "../../chunks/Link.js";
import { h as html, t as themeOptions, g as getPathFromBase, E as External, s as siteConfig, p as parseImageSrc, a as tocCollapsed, n as navCollapsed, d as darkMode, b as scrollDirection, i as isLinkActive, c as sidebarCollapsed, r as resolvedSidebar, e as resolveSidebar, f as isDark, j as showHeader, k as showLayout, l as sidebar, m as anchors } from "../../chunks/Expansion.svelte_svelte_type_style_lang.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
var SVELTEPRESS_CONTEXT_KEY = /* @__PURE__ */ Symbol("sveltepress");
function AjaxBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let barWidth = 0;
    let startedFlag;
    let interval = 200;
    onDestroy(() => {
      if (startedFlag) clearTimeout(startedFlag);
    });
    function start() {
      if (startedFlag) clearTimeout(startedFlag);
      barWidth = 0;
      interval = 200;
      const next = () => {
        barWidth += 1;
        interval += Math.floor(Math.random() * 200);
        startedFlag = setTimeout(next, interval);
      };
      next();
    }
    function end() {
      if (barWidth > 0) barWidth = 100;
      if (startedFlag) clearInterval(startedFlag);
      setTimeout(
        () => {
          barWidth = 0;
        },
        100
      );
    }
    $$renderer2.push(`<div class="ajax-bar svelte-1ae1hoj"${attr_style(`--ajax-bar-width: ${barWidth}%;`)}><div class="progress svelte-1ae1hoj"></div></div>`);
    bind_props($$props, { start, end });
  });
}
function Backdrop($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { show = false, top = 0, zIndex = 900 } = $$props;
    $$renderer2.push(`<div${attr_class("backdrop svelte-1xyfeqs", void 0, { "show": show })} role="none"${attr_style("", { top, "z-index": zIndex })}></div>`);
  });
}
function Home($$renderer) {
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494l9-8zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333l-6 5.333zM13 19v-4h-2v4h2z"></path></svg>`);
}
function Error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { error = {} } = $$props;
    $$renderer2.push(`<div class="error svelte-11xga7o"><div class="code svelte-11xga7o">${escape_html(error.code || 404)}</div> <div class="title svelte-11xga7o">${escape_html(error.message || "Not Found")}</div> `);
    {
      let pre = function($$renderer3) {
        $$renderer3.push(`<div class="home-icon svelte-11xga7o">`);
        Home($$renderer3);
        $$renderer3.push(`<!----></div>`);
      };
      Link($$renderer2, { label: "Take me home", to: "/", pre });
    }
    $$renderer2.push(`<!----></div>`);
  });
}
function GoogleAnalytics($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const ga = themeOptions.ga;
    head("1brpztt", $$renderer2, ($$renderer3) => {
      if (ga) {
        $$renderer3.push("<!--[0-->");
        $$renderer3.push(`${html(`<${"script"} async src="${`https://www.googletagmanager.com/gtag/js?id=${ga}`}"></${"script"}>
    <${"script"}>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag('js', new Date())

      gtag('config', '${ga}')
  </${"script"}>
  `)}`);
      } else {
        $$renderer3.push("<!--[-1-->");
      }
      $$renderer3.push(`<!--]-->`);
    });
  });
}
function Discord($$renderer, $$props) {
  const { $$slots, $$events, ...rest } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      ...rest
    },
    void 0,
    void 0,
    void 0,
    3
  )}><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"></path></svg>`);
}
function Github($$renderer, $$props) {
  const { $$slots, $$events, ...rest } = $$props;
  $$renderer.push(`<svg${attributes({ width: "1em", height: "1em", viewBox: "0 0 24 24", ...rest }, void 0, void 0, void 0, 3)}><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>`);
}
function NavArrowDown($$renderer) {
  $$renderer.push(`<svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"></path></svg>`);
}
function NavItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      title = "",
      to = "/",
      items = [],
      icon = false,
      external = false,
      builtInIcon = false,
      children,
      $$slots,
      $$events,
      ...rest
    } = $$props;
    const normalizedTo = to.endsWith("/") ? to.slice(0, -1) : to;
    const isExactMatch = (p) => p === to;
    const isChildMatch = (p) => p.startsWith(`${normalizedTo}/`);
    let active = derived(() => isExactMatch(page.url.pathname) || isChildMatch(page.url.pathname));
    if (items && items.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class("nav-item svelte-92vz8", void 0, {
        "built-in-icon": builtInIcon,
        "nav-item--icon": icon,
        "nav-item--user-icon": icon
      })} role="link"${attr("aria-label", title)}>`);
      if (typeof icon === "string") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`${html(icon)}`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`${escape_html(title)} <div class="arrow svelte-92vz8">`);
        NavArrowDown($$renderer2);
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]--> <div class="dropdown svelte-92vz8"><!--[-->`);
      const each_array = ensure_array_like(items);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let subItem = each_array[$$index];
        NavItem($$renderer2, spread_props([subItem]));
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<a${attributes(
        {
          href: external ? to : getPathFromBase(to),
          class: "nav-item",
          ...external ? { target: "_blank" } : {},
          "aria-label": title
        },
        "svelte-92vz8",
        { "nav-item--icon": icon, active }
      )}>`);
      if (children) {
        $$renderer2.push("<!--[0-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[-1-->");
        if (typeof icon === "string") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`${html(icon)}`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`${escape_html(title)}`);
        }
        $$renderer2.push(`<!--]--> `);
        if (external) {
          $$renderer2.push("<!--[0-->");
          External($$renderer2, {});
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></a>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Logo($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    NavItem($$renderer2, {
      to: getPathFromBase("/"),
      title: siteConfig.title,
      children: ($$renderer3) => {
        {
          $$renderer3.push("<!--[0-->");
          $$renderer3.push(`<img class="logo svelte-1bag2f5" height="32"${attr("src", parseImageSrc(themeOptions.logo))}${attr("alt", siteConfig.title)}/> <span class="title svelte-1bag2f5">${escape_html(siteConfig.title)}</span>`);
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
  });
}
function MenuOpen($$renderer, $$props) {
  const { $$slots, $$events, ...all } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      ...all
    },
    void 0,
    void 0,
    void 0,
    3
  )}><path fill="currentColor" d="M4 18h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h8c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h11c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1m17.3 7.88L17.42 12l2.88-2.88a.996.996 0 1 0-1.41-1.41L15.3 11.3a.996.996 0 0 0 0 1.41l3.59 3.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42"></path></svg>`);
}
const DEFAULT_ON_THIS_PAGE = "On this page";
function Toc($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const { anchors: anchors2 = [] } = $$props;
    let activeIdx = 0;
    if (anchors2.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class("toc svelte-1flx1ys", void 0, {
        "collapsed": store_get($$store_subs ??= {}, "$tocCollapsed", tocCollapsed)
      })}><div class="title svelte-1flx1ys">${escape_html(themeOptions?.i18n?.onThisPage || DEFAULT_ON_THIS_PAGE)}</div> <div class="anchors svelte-1flx1ys"${attr_style(`--bar-top: calc(${activeIdx * 2}em);`)}><!--[-->`);
      const each_array = ensure_array_like(anchors2);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let an = each_array[i];
        const active = activeIdx === i;
        $$renderer2.push(`<a${attr("href", `#${stringify(an.slugId)}`)}${attr_class("item svelte-1flx1ys", void 0, { "active": active })}${attr_style(`--heading-depth: ${stringify(an.depth < 2 ? 2 : an.depth)};`)}>${escape_html(an.title)}</a>`);
      }
      $$renderer2.push(`<!--]--> <div class="active-bar svelte-1flx1ys"></div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    Backdrop($$renderer2, {
      show: !store_get($$store_subs ??= {}, "$tocCollapsed", tocCollapsed)
    });
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function MobileSubNav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<nav class="sub-nav svelte-1k8153b" aria-label="Browse docs"><div role="button" tabindex="0" class="text-6">`);
    MenuOpen($$renderer2, {});
    $$renderer2.push(`<!----></div> <div role="button" tabindex="0">${escape_html(themeOptions?.i18n?.onThisPage || DEFAULT_ON_THIS_PAGE)}</div></nav>`);
  });
}
function ArrowDown($$renderer) {
  $$renderer.push(`<svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"></path></svg>`);
}
function Markdown($$renderer) {
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6h17.12c.79 0 1.44.63 1.44 1.41v9.18c0 .78-.65 1.41-1.44 1.41M3.44 6.94c-.26 0-.48.21-.48.47v9.19c0 .25.22.46.48.46h17.12c.26 0 .48-.21.48-.46V7.41c0-.26-.22-.47-.48-.47H3.44m1.45 8.25V8.81h1.92l1.92 2.35l1.92-2.35h1.93v6.38h-1.93v-3.66l-1.92 2.35l-1.92-2.35v3.66H4.89m12.01 0l-2.9-3.1h1.94V8.81h1.92v3.28h1.93l-2.89 3.1"></path></svg>`);
}
function Svelte($$renderer) {
  $$renderer.push(`<svg width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M26.1 5.7C23.5 2 18.4.9 14.7 3.2L8.2 7.4c-1.8 1.1-3 2.9-3.4 5c-.3 1.7 0 3.5.8 5.1c-.6.8-.9 1.8-1.1 2.8c-.4 2.1.1 4.3 1.4 6c2.6 3.7 7.7 4.8 11.4 2.5l6.5-4.2c1.8-1.1 3-2.9 3.4-5c.3-1.7 0-3.5-.8-5.1c.6-.8.9-1.8 1.1-2.8c.4-2.1-.1-4.3-1.4-6zM24.3 11c0 .2-.1.4-.2.6l-.1.4l-.3-.2c-.8-.6-1.6-1-2.6-1.3l-.2-.1v-.2c0-.3-.1-.7-.3-1c-.4-.5-1-.8-1.7-.6c-.1 0-.3.1-.4.2L12 12.9c-.3.2-.5.5-.6.9c-.1.4 0 .8.2 1.1c.4.5 1 .8 1.7.6c.1 0 .3-.1.4-.2l2.5-1.6c.4-.3.9-.5 1.3-.6c2.1-.5 4.3.3 5.6 2.1c.7 1 1 2.4.8 3.6c-.2 1.2-1 2.3-2 3L15.4 26c-.4.3-.9.5-1.3.6c-2.1.5-4.3-.3-5.6-2.1c-.7-1-1-2.4-.8-3.6c0-.2.1-.4.2-.6L8 20l.3.2c.8.6 1.6 1 2.6 1.3l.2.1v.2c0 .3.1.7.3 1c.4.5 1 .8 1.7.6c.1 0 .3-.1.4-.2L20 19c.3-.2.5-.5.6-.9c.1-.4 0-.8-.2-1.1c-.4-.5-1-.8-1.7-.6c-.1 0-.3.1-.4.2l-2.5 1.6c-.4.3-.9.5-1.3.6c-2.1.5-4.3-.3-5.6-2.1c-.8-1-1-2.4-.8-3.6c.2-1.2 1-2.3 2-3l6.5-4.2c.4-.3.9-.5 1.3-.6c2.1-.5 4.3.3 5.6 2.1c.7 1.1 1 2.4.8 3.6z"></path></svg>`);
}
function SvelteWithColor($$renderer) {
  $$renderer.push(`<svg width="1em" height="1em" viewBox="0 0 32 32"><path fill="#ff3e00" d="M26.47 5.7a8.973 8.973 0 0 0-11.793-2.454L7.96 7.4a7.461 7.461 0 0 0-3.481 5.009a7.686 7.686 0 0 0 .8 5.058a7.358 7.358 0 0 0-1.151 2.8a7.789 7.789 0 0 0 1.4 6.028a8.977 8.977 0 0 0 11.794 2.458L24.04 24.6a7.468 7.468 0 0 0 3.481-5.009a7.673 7.673 0 0 0-.8-5.062a7.348 7.348 0 0 0 1.152-2.8A7.785 7.785 0 0 0 26.47 5.7"></path><path fill="#fff" d="M14.022 26.64A5.413 5.413 0 0 1 8.3 24.581a4.678 4.678 0 0 1-.848-3.625a4.307 4.307 0 0 1 .159-.61l.127-.375l.344.238a8.76 8.76 0 0 0 2.628 1.274l.245.073l-.025.237a1.441 1.441 0 0 0 .271.968a1.63 1.63 0 0 0 1.743.636a1.512 1.512 0 0 0 .411-.175l6.7-4.154a1.366 1.366 0 0 0 .633-.909a1.407 1.407 0 0 0-.244-1.091a1.634 1.634 0 0 0-1.726-.622a1.509 1.509 0 0 0-.413.176l-2.572 1.584a4.934 4.934 0 0 1-1.364.582a5.415 5.415 0 0 1-5.727-2.06a4.678 4.678 0 0 1-.831-3.628A4.507 4.507 0 0 1 9.9 10.09l6.708-4.154a4.932 4.932 0 0 1 1.364-.581A5.413 5.413 0 0 1 23.7 7.414a4.679 4.679 0 0 1 .848 3.625a4.272 4.272 0 0 1-.159.61l-.127.375l-.344-.237a8.713 8.713 0 0 0-2.628-1.274l-.245-.074l.025-.237a1.438 1.438 0 0 0-.272-.968a1.629 1.629 0 0 0-1.725-.622a1.484 1.484 0 0 0-.411.176l-6.722 4.14a1.353 1.353 0 0 0-.631.908a1.394 1.394 0 0 0 .244 1.092a1.634 1.634 0 0 0 1.726.621a1.538 1.538 0 0 0 .413-.175l2.562-1.585a4.9 4.9 0 0 1 1.364-.581a5.417 5.417 0 0 1 5.728 2.059a4.681 4.681 0 0 1 .843 3.625a4.5 4.5 0 0 1-2.089 3.013l-6.707 4.154a4.9 4.9 0 0 1-1.364.581"></path></svg>`);
}
function arrow($$renderer) {
  ArrowDown($$renderer);
}
function Expansion($$renderer, $$props) {
  let {
    title,
    expanded = false,
    reverse = false,
    headerStyle = "",
    codeType = "svelte",
    showIcon = true,
    children,
    iconFold,
    iconExpanded,
    customTitle
  } = $$props;
  function body($$renderer2) {
    $$renderer2.push(`<div class="c-expansion--body">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  }
  function defaultIconExpanded($$renderer2) {
    if (codeType === "svelte") {
      $$renderer2.push("<!--[0-->");
      SvelteWithColor($$renderer2);
    } else if (codeType === "md") {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="flex items-center text-6 text-svp-primary">`);
      Markdown($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  }
  function defaultIconFold($$renderer2) {
    if (codeType === "svelte") {
      $$renderer2.push("<!--[0-->");
      Svelte($$renderer2);
    } else if (codeType === "md") {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="flex items-center text-6">`);
      Markdown($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  }
  function defaultCustomTitle($$renderer2) {
    $$renderer2.push(`<!---->${escape_html(title)}`);
  }
  $$renderer.push(`<div${attr_class(`c-expansion ${expanded ? "c-expansion--expanded" : ""}`, "svelte-1f03nol")}>`);
  if (reverse) {
    $$renderer.push("<!--[0-->");
    body($$renderer);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> <div class="c-expansion--header svelte-1f03nol"${attr_style(headerStyle)} role="button" tabindex="0"><div class="c-expansion--header-left svelte-1f03nol">`);
  if (showIcon) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="c-expansion--icon svelte-1f03nol">`);
    if (expanded) {
      $$renderer.push("<!--[0-->");
      if (iconExpanded) {
        $$renderer.push("<!--[0-->");
        iconExpanded($$renderer);
        $$renderer.push(`<!---->`);
      } else {
        $$renderer.push("<!--[-1-->");
        defaultIconExpanded($$renderer);
      }
      $$renderer.push(`<!--]-->`);
    } else if (iconFold) {
      $$renderer.push("<!--[1-->");
      iconFold($$renderer);
      $$renderer.push(`<!---->`);
    } else {
      $$renderer.push("<!--[-1-->");
      defaultIconFold($$renderer);
    }
    $$renderer.push(`<!--]--></div>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> <div class="c-expansion--title svelte-1f03nol">`);
  if (customTitle) {
    $$renderer.push("<!--[0-->");
    customTitle($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[-1-->");
    defaultCustomTitle($$renderer);
  }
  $$renderer.push(`<!--]--></div></div> <div${attr_class(`c-expansion--arrow ${expanded ? "c-expansion--arrow-expanded" : ""}`, "svelte-1f03nol")}>`);
  arrow($$renderer);
  $$renderer.push(`<!----></div></div> `);
  if (!reverse) {
    $$renderer.push("<!--[0-->");
    body($$renderer);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function TocClose($$renderer) {
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M5 5L19 5"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5;M5 5L19 19"></animate></path><path d="M5 12H19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set attributeName="opacity" begin="0.4s" to="0"></set></path><path d="M5 19L19 19"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 19L19 19;M5 19L19 5"></animate></path></g></svg>`);
}
function TocMenu($$renderer) {
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path d="M5 5L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19;M5 5L19 5"></animate></path><path d="M12 12H12" opacity="0"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"></animate><set attributeName="opacity" begin="0.2s" to="1"></set></path><path d="M5 19L19 5"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 19L19 5;M5 19L19 19"></animate></path></g></svg>`);
}
function NavbarMobile($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    $$renderer2.push(`<div class="nav-trigger svelte-11uoqne" role="menu" tabindex="0">`);
    if (store_get($$store_subs ??= {}, "$navCollapsed", navCollapsed)) {
      $$renderer2.push("<!--[0-->");
      TocMenu($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
      TocClose($$renderer2);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (!store_get($$store_subs ??= {}, "$navCollapsed", navCollapsed)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<nav class="navbar-mobile svelte-11uoqne" aria-label="Menu">`);
      Logo($$renderer2);
      $$renderer2.push(`<!----> <!--[-->`);
      const each_array = ensure_array_like(themeOptions.navbar);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let navItem = each_array[$$index_1];
        if (navItem.items) {
          $$renderer2.push("<!--[0-->");
          {
            let customTitle = function($$renderer3) {
              $$renderer3.push(`<div>`);
              if (navItem.icon) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<div class="text-6">${html(navItem.icon)}</div>`);
              } else {
                $$renderer3.push("<!--[-1-->");
                $$renderer3.push(`${escape_html(navItem.title)}`);
              }
              $$renderer3.push(`<!--]--></div>`);
            };
            Expansion($$renderer2, {
              title: navItem.title,
              showIcon: false,
              customTitle,
              children: ($$renderer3) => {
                $$renderer3.push(`<!--[-->`);
                const each_array_1 = ensure_array_like(navItem.items);
                for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                  let subItem = each_array_1[$$index];
                  NavItem($$renderer3, spread_props([subItem]));
                }
                $$renderer3.push(`<!--]-->`);
              }
            });
          }
        } else {
          $$renderer2.push("<!--[-1-->");
          NavItem($$renderer2, spread_props([navItem]));
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></nav>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Moon($$renderer) {
  $$renderer.push(`<svg width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><g strokeDasharray="2"><path d="M12 21v1M21 12h1M12 3v-1M3 12h-1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;2"></animate></path><path d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="4;2"></animate></path></g><path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" opacity="0"><set attributeName="opacity" begin="0.5s" to="1"></set></path></g><g fill="currentColor" fillOpacity="0"><path d="m15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z"><animate id="lineMdSunnyOutlineToMoonLoopTransition0" fill="freeze" attributeName="fill-opacity" begin="0.6s;lineMdSunnyOutlineToMoonLoopTransition0.begin+6s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+2.2s" dur="0.4s" values="1;0"></animate></path><path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+3s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+5.2s" dur="0.4s" values="1;0"></animate></path><path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+0.4s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+2.8s" dur="0.4s" values="1;0"></animate></path><path d="m20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+3.4s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdSunnyOutlineToMoonLoopTransition0.begin+5.6s" dur="0.4s" values="1;0"></animate></path></g><mask id="lineMdSunnyOutlineToMoonLoopTransition1"><circle cx="12" cy="12" r="12" fill="#fff"></circle><circle cx="12" cy="12" r="4"><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="4;8"></animate></circle><circle cx="22" cy="2" r="3" fill="#fff"><animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18"></animate><animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6"></animate><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="3;12"></animate></circle><circle cx="22" cy="2" r="1"><animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18"></animate><animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6"></animate><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="1;10"></animate></circle></mask><circle cx="12" cy="12" r="6" fill="currentColor" mask="url(#lineMdSunnyOutlineToMoonLoopTransition1)"><set attributeName="opacity" begin="0.5s" to="0"></set><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="6;10"></animate></circle></svg>`);
}
function Sun($$renderer) {
  $$renderer.push(`<svg width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeDasharray="2" strokeDashoffset="2" strokeLinecap="round" strokeWidth="2"><path d="M0 0"><animate fill="freeze" attributeName="d" begin="1.2s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.2s" values="2;0"></animate></path><path d="M0 0"><animate fill="freeze" attributeName="d" begin="1.5s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.5s" dur="1.2s" values="2;0"></animate></path><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></g><g fill="currentColor"><path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z"><animate fill="freeze" attributeName="fill-opacity" dur="0.4s" values="1;0"></animate></path><path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.2s" dur="0.4s" values="1;0"></animate></path></g><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"></path><set attributeName="opacity" begin="0.6s" to="0"></set></g><mask id="lineMdMoonToSunnyOutlineLoopTransition0"><circle cx="12" cy="12" r="12" fill="#fff"></circle><circle cx="12" cy="12" r="8"><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="8;4"></animate></circle><circle cx="18" cy="6" r="12" fill="#fff"><animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22"></animate><animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2"></animate><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="12;3"></animate></circle><circle cx="18" cy="6" r="10"><animate fill="freeze" attributeName="cx" begin="0.6s" dur="0.4s" values="18;22"></animate><animate fill="freeze" attributeName="cy" begin="0.6s" dur="0.4s" values="6;2"></animate><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;1"></animate></circle></mask><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#lineMdMoonToSunnyOutlineLoopTransition0)" opacity="0"><set attributeName="opacity" begin="0.6s" to="1"></set><animate fill="freeze" attributeName="r" begin="0.6s" dur="0.4s" values="10;6"></animate></circle></svg>`);
}
function SystemDefault($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  $$renderer.push(`<svg${attributes(
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24",
      ...props
    },
    void 0,
    void 0,
    void 0,
    3
  )}><path fill="currentColor" d="M10 16h4v0h-4z"><animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M10 16h4v0h-4z;M10 16h4v6h-4z"></animate></path><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="72" stroke-dashoffset="72" d="M12 17h-10v-14h20v14Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0"></animate></path><path stroke-dasharray="4" stroke-dashoffset="4" d="M12 21h3M12 21h-3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="4;0"></animate></path></g></svg>`);
}
function ToggleDark($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const key = "SVELTEPRESS_DARK_MODE";
    const themeColor = themeOptions.themeColor || { light: "#fff", dark: "#000" };
    head("1njhg6a", $$renderer2, ($$renderer3) => {
      $$renderer3.push(`<meta id="theme-color" name="theme-color"${attr("content", themeColor.light || "#fff")}/> ${html(`
<${"script"}>
  const themeColor = JSON.parse('${JSON.stringify(themeColor)}')
  const storedMode = window.localStorage.getItem('${key}')
  if (storedMode === 'dark' || (storedMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.querySelector('html').classList.add('dark')
    document.getElementById('theme-color')?.setAttribute('content', themeColor ? themeColor.dark : '#ffffff')
  }
  else {
    document.querySelector('html').classList.remove('dark')
    document.getElementById('theme-color')?.setAttribute('content', themeColor ? themeColor.light : '#ffffff')
  }
</${"script"}>`)}`);
    });
    $$renderer2.push(`<div class="toggle svelte-1njhg6a" aria-label="Toggle dark mode" role="button" tabindex="0">`);
    if (store_get($$store_subs ??= {}, "$darkMode", darkMode) === "auto") {
      $$renderer2.push("<!--[0-->");
      SystemDefault($$renderer2, {});
    } else if (store_get($$store_subs ??= {}, "$darkMode", darkMode) === "dark") {
      $$renderer2.push("<!--[1-->");
      Moon($$renderer2);
    } else if (store_get($$store_subs ??= {}, "$darkMode", darkMode) === "light") {
      $$renderer2.push("<!--[2-->");
      Sun($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Navbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const routeId = derived(() => page.route.id);
    const isHome = derived(() => routeId() === "/");
    const hasError = derived(() => page.error);
    $$renderer2.push(`<header${attr_class("header svelte-1uynsho", void 0, {
      "hidden-in-mobile": store_get($$store_subs ??= {}, "$scrollDirection", scrollDirection) === "down"
    })}><div class="header-inner svelte-1uynsho"><div class="left svelte-1uynsho">`);
    NavbarMobile($$renderer2);
    $$renderer2.push(`<!----> `);
    if (hasError() || isHome()) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="logo-container svelte-1uynsho">`);
      Logo($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (themeOptions.search && typeof themeOptions.search !== "string") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div${attr_class("doc-search svelte-1uynsho", void 0, { "is-home": isHome(), "move": !isHome() && !hasError() })}>`);
      if (themeOptions.search) {
        $$renderer2.push("<!--[-->");
        (0, themeOptions.search)($$renderer2, {});
        $$renderer2.push("<!--]-->");
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push("<!--]-->");
      }
      $$renderer2.push(`</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <nav class="nav-links svelte-1uynsho" aria-label="Menu"><div class="navbar-pc svelte-1uynsho"><div class="sm:flex none"><!--[-->`);
    const each_array = ensure_array_like(themeOptions.navbar);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let navItem = each_array[$$index];
      NavItem($$renderer2, spread_props([navItem]));
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[0-->");
      NavItem($$renderer2, {
        to: themeOptions.github,
        external: true,
        icon: true,
        builtInIcon: true,
        title: "Github",
        children: ($$renderer3) => {
          Github($$renderer3, {});
        },
        $$slots: { default: true }
      });
    }
    $$renderer2.push(`<!--]--> `);
    if (themeOptions.discord) {
      $$renderer2.push("<!--[0-->");
      NavItem($$renderer2, {
        to: themeOptions.discord,
        external: true,
        icon: true,
        builtInIcon: true,
        title: "Discord",
        children: ($$renderer3) => {
          Discord($$renderer3, {});
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    ToggleDark($$renderer2);
    $$renderer2.push(`<!----></div></nav></div> `);
    if (!isHome()) {
      $$renderer2.push("<!--[0-->");
      MobileSubNav($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Close($$renderer) {
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="m7.116 8l-4.558 4.558l.884.884L8 8.884l4.558 4.558l.884-.884L8.884 8l4.558-4.558l-.884-.884L8 7.116L3.442 2.558l-.884.884L7.116 8z" clipRule="evenodd"></path></svg>`);
}
function PointLeft($$renderer) {
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M0 220.8C0 266.416 37.765 304 83.2 304h35.647a93.148 93.148 0 0 0 7.929 22.064c-2.507 22.006 3.503 44.978 15.985 62.791C143.9 441.342 180.159 480 242.701 480H264c60.063 0 98.512-40 127.2-40h2.679c5.747 4.952 13.536 8 22.12 8h64c17.673 0 32-12.894 32-28.8V188.8c0-15.906-14.327-28.8-32-28.8h-64c-8.584 0-16.373 3.048-22.12 8H391.2c-6.964 0-14.862-6.193-30.183-23.668l-.129-.148l-.131-.146c-8.856-9.937-18.116-20.841-25.851-33.253C316.202 80.537 304.514 32 259.2 32c-56.928 0-92 35.286-92 83.2c0 8.026.814 15.489 2.176 22.4H83.2C38.101 137.6 0 175.701 0 220.8zm48 0c0-18.7 16.775-35.2 35.2-35.2h158.4c0-17.325-26.4-35.2-26.4-70.4c0-26.4 20.625-35.2 44-35.2c8.794 0 20.445 32.712 34.926 56.1c9.074 14.575 19.524 27.225 30.799 39.875c16.109 18.374 33.836 36.633 59.075 39.596v176.752C341.21 396.087 309.491 432 264 432h-21.299c-40.524 0-57.124-22.197-50.601-61.325c-14.612-8.001-24.151-33.979-12.925-53.625c-19.365-18.225-17.787-46.381-4.95-61.05H83.2C64.225 256 48 239.775 48 220.8zM448 360c13.255 0 24 10.745 24 24s-10.745 24-24 24s-24-10.745-24-24s10.745-24 24-24z"></path></svg>`);
}
function SidebarGroup_1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const routeId = derived(() => page.route.id);
    const { items = [], title = "", collapsible = false, nested = false } = $$props;
    let collapsed = false;
    $$renderer2.push(`<div${attr_class("sidebar-group svelte-17lcn8t", void 0, { "nested": nested })}><div${attr_class("group-title svelte-17lcn8t", void 0, { "with-mb": !nested })}><div>${escape_html(title)}</div> `);
    if (collapsible) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="collapse-control svelte-17lcn8t" role="button" tabindex="0" aria-label="Collapsable button"><div${attr_class("arrow svelte-17lcn8t", void 0, { "collapsed": collapsed })}>`);
      ArrowDown($$renderer2);
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="links svelte-17lcn8t"><!--[-->`);
      const each_array = ensure_array_like(items);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let item = each_array[$$index];
        const active = isLinkActive(item.to, routeId());
        if (Array.isArray(item.items) && item.items.length) {
          $$renderer2.push("<!--[0-->");
          SidebarGroup_1($$renderer2, spread_props([item, { nested: true }]));
        } else {
          $$renderer2.push("<!--[-1-->");
          Link($$renderer2, {
            to: item.to,
            active,
            label: item.title,
            inline: false,
            highlight: false,
            children: ($$renderer3) => {
              if (active) {
                $$renderer3.push("<!--[0-->");
                $$renderer3.push(`<div class="active-icon svelte-17lcn8t">`);
                PointLeft($$renderer3);
                $$renderer3.push(`<!----></div>`);
              } else {
                $$renderer3.push("<!--[-1-->");
              }
              $$renderer3.push(`<!--]-->`);
            }
          });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const routeId = derived(() => page.route.id);
    const isHome = derived(() => routeId() === "/");
    $$renderer2.push(`<aside${attr_class("theme-default-sidebar svelte-i3rv0e", void 0, {
      "collapsed": store_get($$store_subs ??= {}, "$sidebarCollapsed", sidebarCollapsed),
      "is-home": isHome()
    })}><div class="sidebar-logo svelte-i3rv0e">`);
    Logo($$renderer2);
    $$renderer2.push(`<!----> <div class="close svelte-i3rv0e" role="button" tabindex="0">`);
    Close($$renderer2);
    $$renderer2.push(`<!----></div></div> <!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$resolvedSidebar", resolvedSidebar));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let sidebarItem = each_array[$$index];
      const hasItems = Array.isArray(sidebarItem.items);
      SidebarGroup_1($$renderer2, spread_props([hasItems ? sidebarItem : { title: "", items: [sidebarItem] }]));
    }
    $$renderer2.push(`<!--]--></aside> `);
    Backdrop($$renderer2, {
      show: !store_get($$store_subs ??= {}, "$sidebarCollapsed", sidebarCollapsed)
    });
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function GlobalLayout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const { children, $$slots, $$events, ...rest } = $$props;
    setContext(SVELTEPRESS_CONTEXT_KEY, { isDark });
    resolveSidebar(page.route.id);
    if (store_get($$store_subs ??= {}, "$showHeader", showHeader)) {
      $$renderer2.push("<!--[0-->");
      Navbar($$renderer2);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (page.error) {
      $$renderer2.push("<!--[0-->");
      Error($$renderer2, { error: page.error });
    } else if (store_get($$store_subs ??= {}, "$showLayout", showLayout) === false) {
      $$renderer2.push("<!--[1-->");
      children?.($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<main${attr_class("svelte-pd5177", void 0, {
        "without-header": store_get($$store_subs ??= {}, "$showHeader", showHeader) === false
      })}>`);
      AjaxBar($$renderer2, {});
      $$renderer2.push(`<!----> `);
      if (store_get($$store_subs ??= {}, "$sidebar", sidebar)) {
        $$renderer2.push("<!--[0-->");
        Sidebar($$renderer2);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      Backdrop($$renderer2, {
        show: !store_get($$store_subs ??= {}, "$navCollapsed", navCollapsed),
        top: "56px",
        zIndex: 887
      });
      $$renderer2.push(`<!----> `);
      children?.($$renderer2);
      $$renderer2.push(`<!----> `);
      Toc($$renderer2, {
        anchors: store_get($$store_subs ??= {}, "$anchors", anchors)
      });
      $$renderer2.push(`<!----> `);
      GoogleAnalytics($$renderer2);
      $$renderer2.push(`<!----> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></main>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function SearchBox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let searchQuery = "";
    $$renderer2.push(`<div class="search-container svelte-d4uu4c"><div class="search-bar svelte-d4uu4c"><input type="text"${attr("value", searchQuery)} placeholder="搜索文档..." class="search-input svelte-d4uu4c"/> <button class="update-btn svelte-d4uu4c" title="更新搜索索引">↻</button></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const fm = {};
    const { children } = $$props;
    GlobalLayout($$renderer2, {
      fm,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="layout-container" style="padding: 1rem; max-width: 1200px; margin: 0 auto;"><div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">`);
        SearchBox($$renderer3);
        $$renderer3.push(`<!----></div> `);
        children?.($$renderer3);
        $$renderer3.push(`<!----></div>`);
      },
      $$slots: { default: true }
    });
  });
}
export {
  _layout as default
};
