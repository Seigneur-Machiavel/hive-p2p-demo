// THIS FILE HAVE NO UTILITIES...
// IT IS JUST A DEMO OF MINIMAL "SERVER" IMPORT
// npm install @hive-p2p/server

import HiveP2P from "@hive-p2p/server";

// Any config can be changed before creating node...
HiveP2P.CONFIG.NODE.DEFAULT_VERBOSE = 3;

// Manual identity creation for demo purposes...
// otherwise automatic identity is created
const cryptoCodex = await HiveP2P.CryptoCodex.createCryptoCodex(true);

// Create a public node with manual identity and custom domain/port
const bee0 = await HiveP2P.createPublicNode({ domain: 'localhost', port: 12345, cryptoCodex });

// Use public node as bootstrap by extracting its identity
const identity = bee0.publicIdentity;
console.log("Public identity:", identity);

// In other node: add public identity as bootstrap
const bootstraps = [identity];
// Your client code...