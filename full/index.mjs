// THIS FILE HAVE NO UTILITIES...
// IT IS JUST A DEMO OF "FULL" IMPORT
// npm install hive-p2p@latest

import HiveP2P from "hive-p2p";

// Any config can be changed before creating nodes...
HiveP2P.CONFIG.NODE.DEFAULT_VERBOSE = 4;

// Manual identity (for demo purposes)
const cryptoCodex = await HiveP2P.CryptoCodex.createCryptoCodex(true);

// Create a public node with manual identity and custom domain/port
const bee0 = await HiveP2P.createPublicNode({ domain: 'localhost', port: 12345, cryptoCodex });

// Use public node as bootstrap by extracting its url
const bootstraps = [bee0.publicUrl];

// Faster way to create a node - automatic identity generation (CryptoCodex)
// Auto started, connecting to bootstraps then connecting to more peers...
const bee1 = await HiveP2P.createNode({ bootstraps });
const bee2 = await HiveP2P.createNode({ bootstraps });

// Listen for unicast messages (target id)
for (const bee of [bee0, bee1, bee2])
	bee.onMessageData((fromId, message) => console.log(`[${bee.id}] from [${fromId}]: ${message}`));

// Listen for gossip messages (broadcast to all)
for (const bee of [bee0, bee1, bee2])
	bee.onGossipData((fromId, message) => console.log(`[${bee.id}]: from [${fromId}]: ${message}`));


while (true) {
	bee1.sendMessage(bee2.id, `Hello bee2!`); 			// Send direct unicast message
	bee2.broadcast("Hello everyone! I'm bee bee2"); 	// Broadcast message to all
	await new Promise((resolve) => setTimeout(resolve, 1_000));
}