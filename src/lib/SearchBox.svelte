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
    let showSearchModal = false; // Controls the main search modal
    let updateStatus = '';
    let searchInput; // Reference for auto-focus
    let selectedIndex = -1; // For keyboard navigation

    onMount(async () => {
        try {
            const res = await fetch(`${base}/search.json`);
            if (res.ok) {
                const data = await res.json();
                minisearch = new MiniSearch({
                    fields: ['title', 'content'],
                    storeFields: ['title', 'url', 'content'],
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

    function handleKeydown(e) {
        // Ctrl+K or Cmd+K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showSearchModal = true;
        }
        
        if (showSearchModal) {
            // Esc to close
            if (e.key === 'Escape') {
                if (showUpdateModal) showUpdateModal = false;
                else showSearchModal = false;
            }
            // Arrow Up
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (searchResults.length > 0) {
                    selectedIndex = (selectedIndex - 1 + searchResults.length) % searchResults.length;
                    scrollToSelected();
                }
            }
            // Arrow Down
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (searchResults.length > 0) {
                    selectedIndex = (selectedIndex + 1) % searchResults.length;
                    scrollToSelected();
                }
            }
            // Enter
            else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
                    const result = searchResults[selectedIndex];
                    closeSearch();
                    goto(`${base}${result.url === '/' && base ? '' : result.url}`);
                }
            }
        }
    }

    function scrollToSelected() {
        const el = document.getElementById(`result-item-${selectedIndex}`);
        if (el) {
            el.scrollIntoView({ block: 'nearest' });
        }
    }

    $: if (showSearchModal && searchInput) {
        // Auto focus input when modal opens
        setTimeout(() => searchInput.focus(), 50);
        selectedIndex = -1; // Reset selection
    }

    function handleSearch() {
        //@ts-ignore
        if (!searchQuery.trim() || !minisearch) {
            searchResults = [];
            showResults = false;
            selectedIndex = -1;
            return;
        }
        
        const results = minisearch.search(searchQuery);
        searchResults = results.slice(0, 10);
        showResults = true;
        selectedIndex = 0; // Select first result by default
    }

    function closeSearch() {
        showSearchModal = false;
        searchQuery = '';
        searchResults = [];
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

<svelte:window on:keydown={handleKeydown} />

<!-- Trigger Button (Visible on page) -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="search-trigger" on:click={() => showSearchModal = true}>
    <span class="search-icon">🔍</span>
    <span class="search-placeholder">搜索</span>
    <span class="search-key">Ctrl K</span>
</div>

<!-- Search Modal (Absolute Centered) -->
{#if showSearchModal}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-backdrop search-backdrop" on:click={closeSearch}>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="search-modal" on:click|stopPropagation>
            <div class="search-header">
                <span class="search-icon-modal">🔍</span>
                <input 
                    bind:this={searchInput}
                    type="text" 
                    bind:value={searchQuery} 
                    on:input={handleSearch} 
                    placeholder="搜索文档..." 
                    class="search-input-modal"
                />
                <button class="close-btn" on:click={closeSearch}>Esc</button>
            </div>
            
            <div class="search-body">
                {#if searchQuery && searchResults.length > 0}
                    <div class="results-list">
                        {#each searchResults as result, index}
                            <a href="{base}{result.url === '/' && base ? '' : result.url}" 
                               class="result-item {index === selectedIndex ? 'selected' : ''}" 
                               id="result-item-{index}"
                               on:mouseenter={() => selectedIndex = index}
                               on:click={() => {
                                closeSearch();
                                // goto handles client-side navigation if possible
                                goto(`${base}${result.url === '/' && base ? '' : result.url}`);
                            }}>
                                <div class="result-title">
                                    <span class="hash">#</span>
                                    {result.title}
                                </div>
                                <div class="result-content">{result.content.substring(0, 80)}...</div>
                            </a>
                        {/each}
                    </div>
                {:else if searchQuery}
                    <div class="no-results">未找到结果</div>
                {:else}
                    <div class="empty-state">
                        <p>输入关键词搜索文档...</p>
                        <!-- Only show update button here to keep UI clean, or maybe in a footer -->
                        <div class="update-action">
                             <button on:click={() => showUpdateModal = true} class="text-btn" title="更新搜索索引">
                                ↻ 更新索引 (开发模式)
                            </button>
                        </div>
                    </div>
                {/if}
            </div>
            <div class="search-footer">
                <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
                <span>Select with <kbd>Enter</kbd></span>
                <span>Close with <kbd>Esc</kbd></span>
            </div>
        </div>
    </div>
{/if}

<!-- Update Index Modal -->
{#if showUpdateModal}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-backdrop" on:click={() => showUpdateModal = false} style="z-index: 3000;">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="modal update-modal" on:click|stopPropagation>
            <h3>更新搜索索引 (开发模式)</h3>
            <input type="password" bind:value={adminPassword} placeholder="管理员密码" class="auth-input"/>
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

<style>
    /* CSS Variables */
    .search-trigger, .search-modal, .update-modal {
        font-family: inherit;
        
        --sb-bg: #ffffff;
        --sb-modal-bg: #fdfdfd;
        --sb-text: #333333;
        --sb-subtext: #666666;
        --sb-border: #e2e2e3;
        --sb-border-hover: #8e8e8e;
        --sb-accent: #3eaf7c;
        --sb-overlay: rgba(0, 0, 0, 0.4);
        --sb-item-hover: #f5f5f5;
        --sb-item-active: #e2e2e3;
        --sb-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    :global(html.dark) .search-trigger, 
    :global(html.dark) .search-modal, 
    :global(html.dark) .update-modal {
        --sb-bg: #1e1e20;
        --sb-modal-bg: #1b1b1f;
        --sb-text: #e2e2e2;
        --sb-subtext: #a1a1aa;
        --sb-border: #3e3e42;
        --sb-border-hover: #555555;
        --sb-accent: #3eaf7c;
        --sb-overlay: rgba(0, 0, 0, 0.7);
        --sb-item-hover: #2e2e30;
        --sb-item-active: #3e3e40;
        --sb-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    /* Trigger Button Style */
    .search-trigger {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background: var(--sb-bg);
        border: 1px solid var(--sb-border);
        border-radius: 6px;
        cursor: pointer;
        color: var(--sb-subtext);
        font-size: 14px;
        transition: border-color 0.2s;
        width: 140px;
    }
    .search-trigger:hover {
        border-color: var(--sb-border-hover);
        color: var(--sb-text);
    }
    .search-key {
        margin-left: auto;
        font-size: 12px;
        border: 1px solid var(--sb-border);
        border-radius: 4px;
        padding: 0 4px;
        background: rgba(125,125,125,0.1);
    }

    /* Modal Backdrop */
    .modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: var(--sb-overlay);
        display: flex;
        justify-content: center;
        align-items: flex-start; /* Align to top but with margin */
        padding-top: 10vh;
        z-index: 2000;
        backdrop-filter: blur(2px);
    }

    /* Search Modal Box */
    .search-modal {
        width: 100%;
        max-width: 600px;
        background: var(--sb-modal-bg);
        border-radius: 8px;
        box-shadow: var(--sb-shadow);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--sb-border);
    }

    .search-header {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid var(--sb-border);
        gap: 10px;
    }
    .search-icon-modal {
        font-size: 18px;
        color: var(--sb-subtext);
    }
    .search-input-modal {
        flex: 1;
        background: transparent;
        border: none;
        font-size: 18px;
        color: var(--sb-text);
        outline: none;
    }
    .close-btn {
        background: transparent;
        border: 1px solid var(--sb-border);
        border-radius: 4px;
        color: var(--sb-subtext);
        padding: 2px 6px;
        font-size: 12px;
        cursor: pointer;
    }

    /* Search Body */
    .search-body {
        max-height: 400px;
        overflow-y: auto;
        min-height: 100px;
    }
    
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        color: var(--sb-subtext);
        gap: 10px;
    }
    .text-btn {
        background: none;
        border: none;
        color: var(--sb-accent);
        cursor: pointer;
        font-size: 13px;
        text-decoration: underline;
    }

    .no-results {
        padding: 30px;
        text-align: center;
        color: var(--sb-subtext);
    }

    /* Results List */
    .results-list {
        padding: 8px;
    }
    .result-item {
        display: block;
        padding: 12px;
        border-radius: 6px;
        text-decoration: none;
        color: var(--sb-text);
        margin-bottom: 4px;
        transition: all 0.1s;
        border-left: 3px solid transparent;
    }
    .result-item:hover, .result-item.selected {
        background: var(--sb-item-hover);
        border-left: 3px solid var(--sb-accent);
        padding-left: 9px; /* adjust for border */
    }
    .result-title {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 15px;
        color: var(--sb-accent);
        margin-bottom: 4px;
        gap: 6px;
    }
    .hash {
        opacity: 0.5;
    }
    .result-content {
        font-size: 13px;
        color: var(--sb-subtext);
        line-height: 1.4;
    }

    /* Footer */
    .search-footer {
        display: flex;
        gap: 16px;
        padding: 8px 16px;
        border-top: 1px solid var(--sb-border);
        font-size: 12px;
        color: var(--sb-subtext);
        background: rgba(125,125,125,0.05);
    }
    kbd {
        background: rgba(125,125,125,0.1);
        border: 1px solid var(--sb-border);
        border-radius: 3px;
        padding: 1px 4px;
        font-family: monospace;
    }

    /* Update Modal Styles */
    .update-modal {
        width: 300px;
        padding: 20px;
        background: var(--sb-modal-bg);
        border: 1px solid var(--sb-border);
    }
    .update-modal h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        color: var(--sb-text);
    }
    .auth-input {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--sb-border);
        background: var(--sb-bg);
        color: var(--sb-text);
        border-radius: 4px;
        margin-bottom: 16px;
        box-sizing: border-box;
    }
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
    }
    .modal-actions button {
        padding: 6px 12px;
        border: 1px solid var(--sb-border);
        background: var(--sb-bg);
        color: var(--sb-text);
        border-radius: 4px;
        cursor: pointer;
    }
    .modal-actions button:hover {
        background: var(--sb-item-hover);
    }
    .status-msg {
        margin-top: 10px;
        text-align: center;
        font-size: 13px;
    }
</style>
