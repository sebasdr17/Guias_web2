import { prisma } from './lib/prisma';
import "dotenv/config";

async function main() {
  console.log("Client imported.");
}

main().catch(console.error);
