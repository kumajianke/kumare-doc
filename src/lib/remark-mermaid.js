// @ts-nocheck
import { visit } from 'unist-util-visit';

/**
 * remark-mermaid
 * 将 Markdown 中 ```mermaid 代码块替换为 <MermaidChart> 组件调用。
 * import 语句由配套的 Vite transform 插件注入进已有的 <script> 块，
 * 避免产生第二个 <script> 块导致 Svelte 报错。
 */
export default function remarkMermaid() {
    return (tree) => {
        const targets = [];

        visit(tree, 'code', (node, index, parent) => {
            if (node.lang === 'mermaid') {
                targets.push({ node, index, parent });
            }
        });

        for (const { node, index, parent } of targets) {
            // 对属性值进行 HTML 实体转义，防止注入
            const escaped = node.value
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            // 仅输出自定义元素标签，由 +layout.svelte 的 customElements.define 处理渲染
            parent.children[index] = {
                type: 'html',
                value: `<mermaid-diagram code="${escaped}"></mermaid-diagram>`,
            };
        }
    };
}
