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

    // Find images (exclude preview folder and its contents)
    const images = files.filter(f => {
      // Skip directories
      const filePath = path.join(folderPath, f);
      if (fs.statSync(filePath).isDirectory()) return false;

      // Only include image files
      return f.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    });

    // Find profiles with size info
    const profileFiles = files
      .filter(f => f.endsWith('.json.gz'))
      .map(f => {
        const profilePath = path.join(folderPath, f);
        const stats = fs.statSync(profilePath);
        return {
          filename: f,
          size: stats.size
        };
      });

    // Read draft data
    let rangeCount = 0;
    let title = null;
    let img = null;
    let published = null;
    let profilesData = {};
    const dataFile = path.join(folderPath, 'data.json');
    if (fs.existsSync(dataFile)) {
      try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
        rangeCount = data.ranges ? data.ranges.length : 0;
        title = data.title;
        published = data.published;
        profilesData = data.profiles || {};

        // Check if there's a thumbnail preview (images.img)
        if (data.images && data.images.img) {
          // Use the preview file for the thumbnail
          const previewFile = `preview/images/${entry.name}.jpg`;
          const previewPath = path.join(folderPath, previewFile);
          if (fs.existsSync(previewPath)) {
            img = previewFile;
          }
        }
      } catch (error) {
        // Invalid JSON, ignore
      }
    }

    // Enhance profiles with shortname data
    const profiles = profileFiles.map(p => {
      const shortname = profilesData[p.filename]?.shortname || '';

      return {
        ...p,
        shortname
      };
    });

    folders.push({
      name: title || entry.name,
      slug: entry.name,
      path: folderPath,
      images,
      profiles,
      imageCount: images.length,
      profileCount: profiles.length,
      rangeCount,
      title,
      img,
      published
    });
  }

  return { folders };
}
