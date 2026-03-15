<script>
    import { onMount } from 'svelte';
    import MiniSearch from 'minisearch';
    import { base } from '$app/paths';
  import { goto } from '$app/navigation';

    let searchQuery = '';
    //@ts-ignore
    let searchResults = [];
    let showResults = false;
    //@ts-ignore
    let minisearch;
    let adminPassword = '';
    let showUpdateModal = false;
    let updateStatus = '';

    onMount(async () => {
        try {
            const res = await fetch(`${base}/search.json`);
            if (res.ok) {
                const data = await res.json();
                minisearch = new MiniSearch({
                    fields: ['title', 'content'], // fields to index for full-text search
                    storeFields: ['title', 'url', 'content'], // fields to return with search results
                    searchOptions: {
                        fuzzy: 0.2,
                        prefix: true
                    }
                });
                minisearch.addAll(data);
            }
        } catch (e) {
            console.error('Failed to load search index', e);
        }
    });

    function handleSearch() {
        //@ts-ignore
        if (!searchQuery.trim() || !minisearch) {
            searchResults = [];
            showResults = false;
            return;
        }
        
        const results = minisearch.search(searchQuery);
        // limit to top 10 results
        searchResults = results.slice(0, 10);
        showResults = true;
    }

    async function handleUpdateSearch() {
        if (!adminPassword) {
            updateStatus = '请输入密码';
            return;
        }
        
        updateStatus = '更新中...';
        try {
            const res = await fetch('/api/update-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: adminPassword })
            });
            const data = await res.json();
            
            if (res.ok) {
                updateStatus = '更新成功！';
                setTimeout(() => { showUpdateModal = false; adminPassword = ''; updateStatus = ''; }, 1500);
            } else {
                updateStatus = data.message || '更新失败';
            }
        } catch (e) {
            updateStatus = '请求出错';
        }
    }
</script>

<div class="search-container">
    <div class="search-bar">
        <input 
            type="text" 
            bind:value={searchQuery} 
            on:input={handleSearch} 
            placeholder="搜索文档..." 
            class="search-input"
        />
        <!-- 仅在开发环境可用的更新按钮 (生产环境为纯静态) -->
        <button on:click={() => showUpdateModal = true} class="update-btn" title="更新搜索索引">
            ↻
        </button>
    </div>

    {#if showResults && searchQuery}
        <div class="search-results">
            {#if searchResults.length === 0}
                <div class="no-results">未找到结果</div>
            {:else}
                {#each searchResults as result}
                    <a  class="result-item" on:click={() => {
                         goto(`${base}${result.url === '/' && base ? '' : result.url}`)
                         setTimeout(() => {
                            goto(`${base}${result.url === '/' && base ? '' : result.url}`)
                         }, 2000);
                    }}>
                        <h4>{result.title}</h4>
                        <p>{result.content.substring(0, 100)}...</p>
                    </a>
                {/each}
            {/if}
        </div>
    {/if}

    {#if showUpdateModal}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="modal-backdrop" on:click={() => showUpdateModal = false}>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="modal" on:click|stopPropagation>
                <h3>更新搜索索引 (开发模式)</h3>
                <input type="password" bind:value={adminPassword} placeholder="管理员密码 " />
                <div class="modal-actions">
                    <button on:click={handleUpdateSearch}>更新</button>
                    <button on:click={() => showUpdateModal = false}>取消</button>
                </div>
                {#if updateStatus}
                    <div class="status-msg">{updateStatus}</div>
                {/if}
            </div>
        </div>
    {/if}
</div>

<style>
    .search-container {
        position: relative;
        margin-bottom: 20px;
        width: 100%;
        max-width: 500px;
        font-family: inherit;
        
        --sb-bg: #ffffff;
        --sb-text: #333333;
        --sb-border: #cccccc;
        --sb-border-hover: #aaaaaa;
        --sb-btn-bg: #f0f0f0;
        --sb-btn-hover: #e0e0e0;
        --sb-res-bg: #ffffff;
        --sb-res-border: #eeeeee;
        --sb-res-hover: #f9f9f9;
        --sb-res-text: #666666;
        --sb-shadow: rgba(0,0,0,0.1);
        --sb-modal-overlay: rgba(0,0,0,0.5);
    }

    :global(html.dark) .search-container {
        --sb-bg: #1e1e1e;
        --sb-text: #eeeeee;
        --sb-border: #444444;
        --sb-border-hover: #666666;
        --sb-btn-bg: #2a2a2a;
        --sb-btn-hover: #3a3a3a;
        --sb-res-bg: #1e1e1e;
        --sb-res-border: #333333;
        --sb-res-hover: #2a2a2a;
        --sb-res-text: #aaaaaa;
        --sb-shadow: rgba(0,0,0,0.5);
        --sb-modal-overlay: rgba(0,0,0,0.7);
    }

    .search-bar {
        display: flex;
        gap: 8px;
    }
    .search-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid var(--sb-border);
        border-radius: 4px;
        font-size: 16px;
        background: var(--sb-bg);
        color: var(--sb-text);
        transition: all 0.2s;
    }
    .search-input:focus {
        outline: none;
        border-color: var(--sb-border-hover);
    }
    .update-btn {
        padding: 8px 12px;
        background: var(--sb-btn-bg);
        color: var(--sb-text);
        border: 1px solid var(--sb-border);
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s;
    }
    .update-btn:hover {
        background: var(--sb-btn-hover);
    }
    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--sb-res-bg);
        border: 1px solid var(--sb-res-border);
        border-radius: 4px;
        box-shadow: 0 4px 12px var(--sb-shadow);
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        margin-top: 4px;
    }
    .result-item {
        display: block;
        padding: 12px;
        text-decoration: none;
        color: var(--sb-text);
        border-bottom: 1px solid var(--sb-res-border);
        transition: background 0.2s;
    }
    .result-item:hover {
        background: var(--sb-res-hover);
    }
    .result-item h4 {
        margin: 0 0 4px 0;
        font-size: 16px;
        color: var(--sb-text);
    }
    .result-item p {
        margin: 0;
        font-size: 13px;
        color: var(--sb-res-text);
    }
    .no-results {
        padding: 12px;
        color: var(--sb-res-text);
        text-align: center;
    }
    
    .modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: var(--sb-modal-overlay);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }
    .modal {
        background: var(--sb-bg);
        color: var(--sb-text);
        padding: 24px;
        border-radius: 8px;
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        box-shadow: 0 8px 24px var(--sb-shadow);
    }
    .modal h3 { margin: 0; font-size: 18px; }
    .modal input {
        padding: 8px;
        border: 1px solid var(--sb-border);
        background: var(--sb-bg);
        color: var(--sb-text);
        border-radius: 4px;
    }
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
    }
    .modal-actions button {
        padding: 6px 12px;
        border: 1px solid var(--sb-border);
        background: var(--sb-btn-bg);
        color: var(--sb-text);
        border-radius: 4px;
        cursor: pointer;
    }
    .modal-actions button:hover {
        background: var(--sb-btn-hover);
    }
    .status-msg {
        font-size: 14px;
        color: #d32f2f;
        text-align: center;
    }
    :global(html.dark) .status-msg {
        color: #ff6b6b;
    }
</style>
