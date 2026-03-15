import { Plugin } from 'vite';
import { generateSearchIndex } from './src/lib/generateSearchIndex';

export function searchIndexPlugin(): Plugin {
    return {
        name: 'vite-plugin-search-index',
        buildStart() {
            try {
                generateSearchIndex();
            } catch (e) {
                console.error('[Search Index] Failed to generate index', e);
            }
        },
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/api/update-search' && req.method === 'POST') {
                    let body = '';
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        try {
                            const data = JSON.parse(body);
                            // Simple password check (e.g. "admin123")
                            if (data.password === 'liuboyuan') {
                                generateSearchIndex();
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ success: true, message: 'search.json updated' }));
                            } else {
                                res.statusCode = 401;
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ success: false, message: 'Incorrect password' }));
                            }
                        } catch (e) {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ success: false, message: 'Server error' }));
                        }
                    });
                    return;
                }
                next();
            });
        }
    };
}
