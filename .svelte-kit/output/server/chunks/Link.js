import { d as attributes, e as escape_html, j as derived } from "./root.js";
import { E as External, g as getPathFromBase } from "./Expansion.svelte_svelte_type_style_lang.js";
function Link($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      label = "",
      to = "",
      inline = true,
      active = false,
      highlight = true,
      withBase = true,
      target,
      pre,
      labelRenderer,
      children
    } = $$props;
    let isExternal = derived(() => /^https?|mailto:/.test(to));
    let toWithBase = derived(() => isExternal() ? to : getPathFromBase(to));
    $$renderer2.push(`<a${attributes(
      {
        href: withBase ? toWithBase() : to,
        class: "link",
        ...target ? { target } : isExternal() ? { target: "_blank" } : {},
        "aria-label": label
      },
      "svelte-19fbi6u",
      { "no-inline": !inline, active, highlight }
    )}>`);
    pre?.($$renderer2);
    $$renderer2.push(`<!----> `);
    if (labelRenderer) {
      $$renderer2.push("<!--[0-->");
      labelRenderer?.($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<span>${escape_html(label)}</span>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (isExternal()) {
      $$renderer2.push("<!--[0-->");
      External($$renderer2, {});
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    children?.($$renderer2);
    $$renderer2.push(`<!----></a>`);
  });
}
export {
  Link as L
};
