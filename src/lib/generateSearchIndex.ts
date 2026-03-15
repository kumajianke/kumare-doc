import fs from 'fs';
import path from 'path';

export function generateSearchIndex() {
    const routesDir = path.resolve(process.cwd(), 'src/routes');
    const staticDir = path.resolve(process.cwd(), 'static');
    
    if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir, { recursive: true });
    }

    const searchData: any[] = [];
    let idCounter = 1;

    function walkDir(currentPath: string) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                walkDir(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                
                // Parse frontmatter
                let title = '';
                let rawContent = content;
                
                const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
                if (fmMatch) {
                    const fm = fmMatch[1];
                    const titleMatch = fm.match(/title:\s*(.*)/);
                    if (titleMatch) {
                        title = titleMatch[1].trim().replace(/^['"](.*)['"]$/, '$1');
                    }
                    rawContent = content.slice(fmMatch[0].length).trim();
                }

                // Generate URL
                let relativePath = path.relative(routesDir, fullPath);
                // remove +page.md or other filename
                let route = relativePath.replace(/\\/g, '/').replace(/\/?\+?page\.md$/, '');
                if (route === '') {
                    route = '/';
                } else if (!route.startsWith('/')) {
                    route = '/' + route;
                }
                
                // Optional: strip markdown formatting from rawContent to make search cleaner
                // We split content by markdown headings to create anchor links
                const lines = rawContent.split('\n');
                let currentHeading = title || route;
                let currentAnchor = '';
                let currentChunk: string[] = [];

                const flushChunk = () => {
                    if (currentChunk.length > 0 || currentHeading) {
                        const cleanContent = currentChunk.join(' ')
                            .replace(/[#*`_\[\]()]/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
                        
                        const chunkUrl = currentAnchor ? `${route}#${currentAnchor}` : route;
                        
                        // Only add if there's actual content or a meaningful heading
                        if (cleanContent.length > 0 || currentHeading !== route) {
                            searchData.push({
                                id: idCounter++,
                                title: currentHeading,
                                content: cleanContent,
                                url: chunkUrl
                            });
                        }
                    }
                };

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
                    if (headingMatch) {
                        flushChunk();
                        currentHeading = headingMatch[2].trim();
                        // Sveltepress / Github slugify approximation (Updated to match user observation)
                        // It seems it does NOT lowercase everything, but keeps casing for non-ASCII or mixed content?
                        // Or maybe it only lowercases if it's purely ASCII?
                        // The user said: #ServiceDomain-领域层  (ServiceDomain kept case, space -> -)
                        // So we should NOT lowercase blindly.
                        
                        // Let's try to mimic what likely happens:
                        // 1. Trim whitespace
                        // 2. Replace spaces with dashes
                        // 3. Remove invalid chars (keeping Chinese)
                        
                        currentAnchor = currentHeading
                            .trim()
                            .replace(/\s+/g, '-')
                            .replace(/[^\w\u4e00-\u9fa5\-]+/g, '');
                            
                        currentChunk = [];
                    } else {
                        currentChunk.push(trimmedLine);
                    }
                }
                flushChunk();
            }
        }
    }

    walkDir(routesDir);
    
    fs.writeFileSync(path.join(staticDir, 'search.json'), JSON.stringify(searchData));
    console.log('[Search Index] Generated search.json with', searchData.length, 'entries');
}
