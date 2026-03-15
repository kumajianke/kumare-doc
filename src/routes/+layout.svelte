<script>
  import { onMount } from "svelte";
  import SearchBox from "$lib/SearchBox.svelte";
  const { children } = $props();

  onMount(async () => {
    if (typeof customElements === "undefined") return;
    if (customElements.get("mermaid-diagram")) return;

    const mermaid = (await import("mermaid")).default;

    const isDark = document.documentElement.classList.contains("dark");
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    customElements.define(
      "mermaid-diagram",
      class MermaidDiagram extends HTMLElement {
        async connectedCallback() {
          // 解码 HTML 实体（remark 插件中编码过）
          const raw = (this.getAttribute("code") ?? "")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");

          if (!raw.trim()) return;

          this.style.display = "flex";
          this.style.justifyContent = "center";
          this.style.margin = "1.5rem 0";
          this.innerHTML =
            '<span style="color:#888;font-size:.9rem">图表加载中…</span>';

          try {
            const uid = "mermaid-" + Math.random().toString(36).slice(2, 9);
            const { svg } = await mermaid.render(uid, raw);
            this.innerHTML = svg;
            // 让 SVG 自适应宽度
            const svgEl = this.querySelector("svg");
            if (svgEl) {
              svgEl.style.maxWidth = "100%";
              svgEl.style.height = "auto";
            }
          } catch (e) {
            this.innerHTML = `<pre style="color:#cf222e;background:#fff0f0;padding:.75rem;border-radius:6px;font-size:.8rem">⚠ Mermaid 错误：${e}</pre>`;
          }
        }
      },
    );
  });
</script>

<!-- Leave this. Or you can add more content for your custom layout -->
<div class="layout-container" style="padding: 1rem; max-width: 1200px; margin: 0 auto;">
  <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">
    <SearchBox />
  </div>
  {@render children?.()}
</div>
