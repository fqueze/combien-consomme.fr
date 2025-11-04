/**
 * Scan draft folders and provide information about each draft
 */

import fs from 'fs';
import path from 'path';

export default async function() {
  const draftDir = './draft';

  if (!fs.existsSync(draftDir)) {
    return { folders: [] };
  }

  const entries = fs.readdirSync(draftDir, { withFileTypes: true });
  const folders = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const folderPath = path.join(draftDir, entry.name);
    const files = fs.readdirSync(folderPath);

    // Find images
    const images = files.filter(f =>
      f.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    // Find profiles
    const profiles = files.filter(f =>
      f.endsWith('.json.gz')
    );

    // Read draft data
    let rangeCount = 0;
    let title = null;
    const dataFile = path.join(folderPath, 'data.json');
    if (fs.existsSync(dataFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
        rangeCount = data.ranges ? data.ranges.length : 0;
        title = data.title;
      } catch (error) {
        // Invalid JSON, ignore
      }
    }

    folders.push({
      name: title || entry.name,
      slug: entry.name,
      path: folderPath,
      images: images,
      profiles: profiles,
      imageCount: images.length,
      profileCount: profiles.length,
      rangeCount: rangeCount,
      title: title
    });
  }

  return { folders };
}
