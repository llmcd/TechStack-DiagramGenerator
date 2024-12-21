import { readdir, stat, unlink } from 'fs/promises';
import { join, relative } from 'path';
import { createInterface } from 'readline';

const DAYS_THRESHOLD = 90;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Files and directories to always exclude
const EXCLUDED = new Set([
  'node_modules',
  '.git',
  '.bolt',
  'dist',
  'package.json',
  'package-lock.json',
  '.gitignore',
  'scripts'
]);

async function getUnusedFiles(dir) {
  const unusedFiles = [];
  const now = Date.now();
  const threshold = now - (DAYS_THRESHOLD * MS_PER_DAY);

  async function scan(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const path = join(directory, entry.name);
      const relativePath = relative(process.cwd(), path);

      // Skip excluded paths
      if (EXCLUDED.has(entry.name) || entry.name.startsWith('.')) {
        continue;
      }

      if (entry.isDirectory()) {
        await scan(path);
      } else {
        const stats = await stat(path);
        const lastAccessed = Math.max(
          stats.atimeMs,
          stats.mtimeMs,
          stats.ctimeMs
        );

        if (lastAccessed < threshold) {
          unusedFiles.push({
            path: relativePath,
            size: stats.size,
            lastAccessed: new Date(lastAccessed).toISOString()
          });
        }
      }
    }
  }

  await scan(dir);
  return unusedFiles;
}

async function promptConfirmation(files) {
  if (files.length === 0) {
    console.log('No unused files found.');
    return false;
  }

  console.log('\nUnused files found:');
  files.forEach(file => {
    console.log(`- ${file.path} (${(file.size / 1024).toFixed(2)} KB, Last accessed: ${file.lastAccessed})`);
  });

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  console.log(`\nTotal space to be recovered: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const answer = await new Promise(resolve => {
    rl.question('\nDo you want to delete these files? (y/N): ', resolve);
  });
  rl.close();

  return answer.toLowerCase() === 'y';
}

async function deleteFiles(files) {
  let deletedCount = 0;
  let totalSize = 0;

  for (const file of files) {
    try {
      await unlink(file.path);
      deletedCount++;
      totalSize += file.size;
    } catch (error) {
      console.error(`Error deleting ${file.path}:`, error.message);
    }
  }

  return { deletedCount, totalSize };
}

async function main() {
  try {
    const unusedFiles = await getUnusedFiles(process.cwd());
    const shouldDelete = await promptConfirmation(unusedFiles);

    if (shouldDelete) {
      const { deletedCount, totalSize } = await deleteFiles(unusedFiles);
      console.log(`\nCleanup complete:`);
      console.log(`- Files deleted: ${deletedCount}`);
      console.log(`- Space recovered: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    } else {
      console.log('\nCleanup cancelled.');
    }
  } catch (error) {
    console.error('Error during cleanup:', error.message);
    process.exit(1);
  }
}

main();