import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import HiveP2P from '@hive-p2p/server';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTTP_PORT = 42311;
const WS_PORT = 42312;
const domain = '0.0.0.0'; // Replace with your DNS domain

const app = express();
// serve pixel-war.html
app.use(express.static(join(__dirname, 'public')));
// no cache
app.get('/', (req, res) => {
	res.set('Cache-Control', 'no-store');
	res.sendFile(join(__dirname, 'public', 'pixel-war.html'));
});
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));
app.listen(HTTP_PORT, () => console.log(`[HTTP] Serving on port ${HTTP_PORT}`));

// HiveP2P server node as bootstrap for browser clients
HiveP2P.CONFIG.TRANSPORTS.SIGNAL_CREATION_TIMEOUT = 1_000;
HiveP2P.CONFIG.NODE.DEFAULT_VERBOSE = 3;
const cryptoCodex = await HiveP2P.CryptoCodex.createCryptoCodex(true);
const bootstrap = await HiveP2P.createPublicNode({domain, port: WS_PORT, cryptoCodex});
//const bee1 = await HiveP2P.createNode({ bootstraps: [bootstrap.publicUrl] });

console.log(`[BOOTSTRAP] Running on ${bootstrap.publicUrl}`);
console.log(`[BOOTSTRAP] Peer ID: ${bootstrap.id}`);

console.log('[SERVER] Ready!');
console.log(`[SERVER] Access at http://${domain}${HTTP_PORT !== 80 ? ':' + HTTP_PORT : ''}`);