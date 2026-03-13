<script>
  import { onMount } from 'svelte';

  /** @type {{ code: string }} */
  let { code } = $props();

  /** @type {HTMLDivElement} */
  let container;
  let svg = $state('');
  let error = $state('');

  // 生成唯一 ID，避免多图表共存时 ID 冲突
  const uid = 'mermaid-' + Math.random().toString(36).slice(2, 9);

  onMount(async () => {
    try {
      const mermaid = (await import('mermaid')).default;

      // 检测系统/文档深色模式
      const isDark =
        typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark');

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit',
      });

      const { svg: rendered } = await mermaid.render(uid, code.trim());
      svg = rendered;
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
  });
</script>

<div class="mermaid-wrap">
  {#if error}
    <pre class="mermaid-error">⚠ Mermaid 渲染错误：{error}</pre>
  {:else if svg}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html svg}
  {:else}
    <div class="mermaid-loading">图表加载中…</div>
  {/if}
</div>

<style>
  .mermaid-wrap {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 8px;
    background: var(--sp-color-bg-soft, #f6f8fa);
    overflow-x: auto;
  }

  :global(.dark) .mermaid-wrap {
    background: var(--sp-color-bg-soft, #1e1e2e);
  }

  .mermaid-wrap :global(svg) {
    max-width: 100%;
    height: auto;
  }

  .mermaid-error {
    color: #cf222e;
    background: #fff0f0;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-size: 0.85rem;
    white-space: pre-wrap;
    word-break: break-all;
  }

  .mermaid-loading {
    color: var(--sp-color-text-muted, #888);
    font-size: 0.9rem;
    padding: 0.5rem;
  }
</style>
