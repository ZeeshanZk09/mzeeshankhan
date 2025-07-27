// optimize.ts

import fs from 'fs/promises';
import path from 'path';
import { NodeIO } from '@gltf-transform/core';
import {
  dedup,
  flatten,
  instance,
  join,
  palette,
  prune,
  resample,
  simplify,
  sparse,
  textureCompress,
  weld,
} from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';

const INPUT_FILE = './public/models/original/workspace.glb'; // 👈 Replace this with your real input path
const OUTPUT_FILE = './public/models/optimized/workspace_optimized.glb';

async function optimizeGLTF(INPUT_FILE: string, OUTPUT_FILE: string) {
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  const io = new NodeIO().registerDependencies({
    'meshopt.decoder': MeshoptSimplifier,
  });

  const document = await io.read(INPUT_FILE);

  await document.transform(
    dedup(),
    instance({ min: 5 }),
    palette({ min: 5 }),
    flatten(),
    join(),
    weld(),
    simplify({
      simplifier: MeshoptSimplifier,
      error: 0.0001,
      ratio: 0.0,
      lockBorder: true,
    }),
    resample(),
    prune(),
    sparse({ ratio: 0.2 }),
    textureCompress({ targetFormat: 'webp', resize: [1024, 1024] })
  );

  await io.write(OUTPUT_FILE, document);
}

async function main() {
  await optimizeGLTF(INPUT_FILE, OUTPUT_FILE).catch(console.error);
}

main().catch(console.error);
