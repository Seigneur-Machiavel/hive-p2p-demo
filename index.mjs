import HiveP2P from "hive-p2p"; // npm install hive-p2p@latest
HiveP2P.PARAMETERS.NODE.DEFAULT_VERBOSE = 1; // Verbose mode for all nodes

// Manual identity (for demo purposes)
const cryptoCodex = await HiveP2P.CryptoCodex.createCryptoCodex(true);

// Create a public node with manual identity and custom domain/port
const bee0 = await HiveP2P.createPublicNode({ domain: 'localhost', port: 12345, cryptoCodex });

// Use public node as bootstrap by extracting its identity
const bootstraps = [bee0.publicIdentity];

// Faster way to create a node - automatic identity generation (CryptoCodex)
// Auto started, connecting to bootstraps then connecting to more peers...
const bee1 = await HiveP2P.createNode({ bootstraps });
const bee2 = await HiveP2P.createNode({ bootstraps });

// Listen for unicast messages (target id)
for (const bee of [bee0, bee1, bee2])
	bee.onMessageData((fromId, message) => console.log(`[${bee.id}] from [${fromId}]: ${message}`));

// Listen for gossip messages (broadcast to all)
for (const bee of [bee0, bee1, bee2])
	bee.onGossipData((fromId, message) => console.log(`[${bee.id}]: ${message}`));


while (true) {
	bee1.sendMessage(bee2.id, `Hello bee2!`); 			// Send direct unicast message
	bee2.broadcast("Hello everyone! I'm bee bee2"); 	// Broadcast message to all
	await new Promise((resolve) => setTimeout(resolve, 1_000));
}