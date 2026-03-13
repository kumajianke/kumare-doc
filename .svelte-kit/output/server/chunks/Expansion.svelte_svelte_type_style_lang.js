import { d as attributes } from "./root.js";
import { b as base } from "./server.js";
import { w as writable, i as get } from "./exports.js";
import "@sveltejs/kit/internal/server";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const themeOptions = { "sidebar": { "/": [{ "title": "🏠 主页", "to": "/" }, { "title": "规范", "items": [{ "title": "总览", "to": "/rule" }, { "title": "Elysia", "to": "/rule/elysia" }] }, { "title": "牛邮裹", "items": [{ "title": "user应用", "to": "/6ugo/users" }, { "title": "admin应用", "to": "/6ugo/admin" }, { "title": "社区应用", "to": "/6ugo/community" }, { "title": "卡号应用", "to": "/6ugo/card" }] }, { "title": "技术文档", "items": [{ "title": "锁", "to": "/6ugo/note/lock" }] }] }, "github": "https://github.com/Blackman99/sveltepress", "logo": "/sveltepress.svg" };
function External($$renderer, $$props) {
  const { $$slots, $$events, ...rest } = $$props;
  $$renderer.push(`<svg${attributes({ ...rest, width: "1em", height: "1em", viewBox: "0 0 24 24" }, void 0, void 0, void 0, 3)}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="36" strokeDashoffset="36" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="36;0"></animate></path><path strokeDasharray="12" strokeDashoffset="12" d="M13 11L20 4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.3s" values="12;0"></animate></path><path strokeDasharray="8" strokeDashoffset="8" d="M21 3H15M21 3V9"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.2s" values="8;0"></animate></path></g></svg>`);
}
function getPathFromBase(path) {
  if (path === "/")
    return base || "/";
  if (!base || !path.startsWith("/") || (path === base || path.startsWith("".concat(base, "/"))))
    return path;
  return "".concat(base).concat(path);
}
function parseImageSrc(src) {
  if (src.startsWith("//"))
    return src;
  return getPathFromBase(src);
}
function isLinkActive(link, routeId) {
  return link === routeId || (link === null || link === void 0 ? void 0 : link.startsWith("".concat(routeId, "/")));
}
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var sidebarCollapsed = writable(true);
var tocCollapsed = writable(true);
var navCollapsed = writable(true);
var anchors = writable([]);
var pages = writable([]);
var scrollY = writable(0);
var oldScrollY = writable(0);
var scrollDirection = writable("up");
var darkMode = writable("auto");
var isDark = writable(false);
var sidebar = writable(true);
var showHeader = writable(true);
var showLayout = writable(true);
var resolvedSidebar = writable(Object.entries(themeOptions.sidebar || {}).reduce(function(all, _a) {
  var item = _a[1];
  return __spreadArray(__spreadArray([], all, true), item, true);
}, []));
function flattenPages(items) {
  var result = [];
  for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
    var item = items_1[_i];
    if (item.to)
      result.push(item);
    if (Array.isArray(item.items))
      result.push.apply(result, flattenPages(item.items));
  }
  return result;
}
scrollY.subscribe(function(sy) {
  var nextDirection = sy - get(oldScrollY) > 0 ? "down" : "up";
  if (nextDirection !== get(scrollDirection))
    scrollDirection.set(nextDirection);
});
resolvedSidebar.subscribe(function(sidebar2) {
  pages.set(flattenPages(sidebar2));
});
sidebarCollapsed.subscribe(function(v) {
  if (!v)
    tocCollapsed.set(true);
});
tocCollapsed.subscribe(function(v) {
  if (!v)
    sidebarCollapsed.set(true);
});
function resolveSidebar(routeId) {
  var _a;
  if (!routeId)
    return;
  var key = Object.keys(themeOptions.sidebar || {}).find(function(key2) {
    return routeId.startsWith(key2);
  });
  if (key)
    resolvedSidebar.set(((_a = themeOptions.sidebar) === null || _a === void 0 ? void 0 : _a[key]) || []);
}
const siteConfig = { "title": "牛邮裹 后端开发文档", "description": "@ 基于`库码内部参考代码规范文档`" };
export {
  External as E,
  tocCollapsed as a,
  scrollDirection as b,
  sidebarCollapsed as c,
  darkMode as d,
  resolveSidebar as e,
  isDark as f,
  getPathFromBase as g,
  html as h,
  isLinkActive as i,
  showHeader as j,
  showLayout as k,
  sidebar as l,
  anchors as m,
  navCollapsed as n,
  parseImageSrc as p,
  resolvedSidebar as r,
  siteConfig as s,
  themeOptions as t
};
