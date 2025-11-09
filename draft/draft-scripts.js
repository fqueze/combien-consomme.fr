/**
 * Format duration in milliseconds to human-readable string
 * NOTE: This function should stay in sync with the formatDuration function in .eleventy.js
 * @param {number} timeMs - Duration in milliseconds
 * @returns {string} Formatted duration (e.g., "2h30min", "45s", "1j5h")
 */
function formatDuration(timeMs) {
  let result = "";
  let timeS = Math.round(timeMs / 1000);
  if (timeS >= 60) {
    let timeMin = Math.floor(timeS / 60);
    if (timeMin >= 60) {
      let timeHours = Math.floor(timeMin / 60);
      if (timeHours >= 24) {
        result = Math.floor(timeHours / 24) + "j";
        let hour = timeHours % 24;
        if (hour) {
          result += hour + "h";
        }
      } else {
        result = timeHours + "h";
        let min = timeMin % 60;
        if (min) {
          result += min + "min";
        }
      }
    } else {
      let sec = timeS % 60;
      result = timeMin + "min";
      if (sec) {
        result += sec + "s";
      }
    }
  } else {
    result = timeMs < 1000 ? Math.round(timeMs) + "ms" : timeS + "s";
  }

  return result;
}

/**
 * Normalize crop to 4-point format
 * Converts rect {x, y, width, height} format to [[x,y], [x,y], [x,y], [x,y]]
 */
function normalizeCrop(crop) {
  if (!crop) return null;

  // Rect format
  if (crop.x !== undefined) {
    return [
      [crop.x, crop.y],
      [crop.x + crop.width, crop.y],
      [crop.x + crop.width, crop.y + crop.height],
      [crop.x, crop.y + crop.height]
    ];
  }

  // Already 4-point format
  return crop;
}

/**
 * Check if crop is a rectangle (all corners at 90 degrees)
 */
function isRectangularCrop(points) {
  if (!points || points.length !== 4) return false;

  // Check if points form a rectangle (aligned horizontally and vertically)
  const tolerance = 1; // 1% tolerance

  // Check if top edge is horizontal
  const topHorizontal = Math.abs(points[0][1] - points[1][1]) < tolerance;
  // Check if bottom edge is horizontal
  const bottomHorizontal = Math.abs(points[2][1] - points[3][1]) < tolerance;
  // Check if left edge is vertical
  const leftVertical = Math.abs(points[0][0] - points[3][0]) < tolerance;
  // Check if right edge is vertical
  const rightVertical = Math.abs(points[1][0] - points[2][0]) < tolerance;

  return topHorizontal && bottomHorizontal && leftVertical && rightVertical;
}

// Helper to set button state with auto-reset after 2 seconds
function setButtonState(button, text, originalText = 'Sauvegarder') {
  button.textContent = text;
  button.disabled = false;

  setTimeout(() => {
    button.textContent = originalText;
  }, 2000);
}

// Helper to make PATCH requests
async function patch(path, data) {
  const response = await fetch(`/api/draft/${window.currentSlug}/${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || 'Request failed');
  }
  return response;
}

// Helper to make POST requests
async function post(path, data) {
  const response = await fetch(`/api/draft/${window.currentSlug}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

// Helper to show error message to user
function showError(message) {
  console.error('Error:', message);
  alert('Erreur: ' + message);
}

// Helper to show a modal and prevent body scroll
function showModal(modal) {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Helper to hide a modal and restore body scroll
function hideModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Make an element editable with click-to-edit functionality
function makeEditable(element, onSave, onCancel) {
  element.addEventListener('click', function() {
    this.contentEditable = 'true';
    this.focus();
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(this);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  });

  element.addEventListener('blur', async function() {
    this.contentEditable = 'false';
    const newValue = this.textContent.trim();

    if (!newValue) {
      alert('Le nom ne peut pas être vide');
      onCancel();
      return;
    }

    await onSave(newValue);
  });

  element.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.blur();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  window.currentSlug = document.querySelector('article[data-draft-slug]')?.dataset.draftSlug;
  const currentSlug = window.currentSlug;

  const openBtn = document.querySelector('.open-profiler-btn');
  const saveBtn = document.querySelector('.save-range-btn');
  const closeBtn = document.querySelector('.close-profiler-btn');
  const container = document.getElementById('profiler-container');
  const iframe = document.getElementById('profiler-iframe');
  const headerTitle = document.getElementById('profiler-title');
  const savedRangesList = document.getElementById('saved-ranges-list');
  const titleEl = document.getElementById('draft-title');
  const notesEl = document.getElementById('draft-notes');

  let currentProfile = openBtn ? openBtn.dataset.profile : null;
  let stopPolling = null;

  // Image modal elements
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const modalImageFilename = document.getElementById('modal-image-filename');
  const modalImageContainer = document.getElementById('modal-image-container');
  const imageNameInput = document.getElementById('image-name');
  const widthButtons = imageModal?.querySelectorAll('.width-btn') || [];
  const customWidthInput = document.getElementById('custom-width');
  const cropOverlay = document.getElementById('crop-overlay');
  const cropSvg = document.getElementById('crop-svg');
  const cropPolygon = document.getElementById('crop-polygon');
  const cropPolygonMask = document.getElementById('crop-polygon-mask');
  const cropCorners = cropSvg?.querySelectorAll('.crop-corner') || [];
  const magnifierCanvas = document.getElementById('magnifier-canvas');
  const magnifierCtx = magnifierCanvas?.getContext('2d');

  let currentImageFilename = null; // Source filename (e.g., PXL_xxx.jpg)
  let currentImageShortname = null; // Shortname for this crop (e.g., 'img', 'afficheur')
  let currentImageWidth = 500; // Default display width
  let allImages = []; // Array of all image filenames (source files from grid)
  let allPreviews = []; // Array of all preview entries [{shortname, sourceFilename}]
  let currentImageIndex = -1;
  let isNavigatingPreviews = false; // Track whether we're navigating previews or source images
  let currentCrop = null; // [[x,y], [x,y], [x,y], [x,y]] (4 corners) or {x, y, width, height} (rect)
  let draggedCorner = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let initialCropPoints = null;
  let cachedDraftData = null; // Cache the draft data to avoid repeated fetches

  // Track original values to detect changes
  let originalImageShortname = null;
  let originalImageWidth = null;
  let originalCrop = null;

  // Helper function to get draft data (cached or fetch)
  async function getDraftData(force = false) {
    if (!force && cachedDraftData) {
      return cachedDraftData;
    }
    try {
      const response = await fetch(`/api/draft/${currentSlug}/data`);
      cachedDraftData = await response.json();
      return cachedDraftData;
    } catch (error) {
      console.error('Error loading draft data:', error);
      // Cache empty structure as fallback
      const emptyData = { ranges: [], images: {}, title: null, notes: '' };
      cachedDraftData = emptyData;
      return emptyData;
    }
  }

  // Helper function to find shortname for a source filename
  function findShortnameForSource(sourceFilename) {
    if (!cachedDraftData || !cachedDraftData.images) {
      return null;
    }

    // Find first entry that uses this source file
    for (const [shortname, imageData] of Object.entries(cachedDraftData.images)) {
      if (imageData.source === sourceFilename) {
        return shortname;
      }
    }
    return null;
  }

  // Load data once on page load
  (async function() {
    const data = await getDraftData();
    if (data.title) {
      titleEl.textContent = data.title;
    }
    if (data.notes) {
      notesEl.value = data.notes;
    }

    // Load UI sections
    loadSavedRanges();
    loadImagePreviews();
  })();

  function formatRangeDuration(range) {
    if (!range) return '';

    // Extract start and duration from range format like "6479738m18899237" or "m18899237"
    // Format is: [startMs] m durationMs (both in milliseconds, start is optional)
    const match = range.match(/^(\d*)m(\d+)$/);
    if (!match) {
      console.warn('Could not parse range:', range);
      return range;
    }

    // The second number is the duration in milliseconds
    const durationMs = parseInt(match[2]);

    return formatDuration(durationMs);
  }

  async function loadImagePreviews(force = false) {
    const imagePreviewsList = document.getElementById('image-previews-list');
    if (!imagePreviewsList) return;

    try {
      const data = await getDraftData(force);

      imagePreviewsList.innerHTML = '';

      // Build list from data.images (shortname -> imageData)
      if (!data.images || Object.keys(data.images).length === 0) {
        imagePreviewsList.innerHTML = '<p class="image-preview-name">Aucune image avec nom court définie</p>';
        return;
      }

      const imageEntries = Object.entries(data.images).map(([shortname, imageData]) => ({
        shortname,
        sourceFilename: imageData.source || '',
        description: imageData.description || '',
        width: imageData.width || 500,
        crop: imageData.crop
      }));

      // Sort: 'img' first (thumbnail), then alphabetically
      imageEntries.sort((a, b) => {
        if (a.shortname === 'img') return -1;
        if (b.shortname === 'img') return 1;
        return a.shortname.localeCompare(b.shortname);
      });

      // Store sorted preview list for navigation
      allPreviews = imageEntries.map(entry => ({
        shortname: entry.shortname,
        sourceFilename: entry.sourceFilename
      }));

      // Render each image with its metadata
      for (const {shortname, sourceFilename, description, width, crop} of imageEntries) {
        const previewName = shortname === 'img' ? currentSlug : `${currentSlug}-${shortname}`;

        const item = document.createElement('div');
        item.className = 'image-preview-item';
        item.innerHTML = `
          <div class="image-preview-header">
            <div class="image-preview-info">
              <span class="image-preview-filename" title="${sourceFilename}">${previewName}</span>
              ${shortname === 'img' ? ' <span class="image-preview-name">— Vignette</span>' : ''}
            </div>
            <div class="image-preview-actions">
              <span class="image-preview-meta">${width}px</span>
              <button class="image-preview-delete-btn" data-shortname="${shortname}" type="button" title="Retirer de la liste">✕</button>
            </div>
          </div>
          <div class="image-preview-content">
            <div class="image-preview-placeholder" data-shortname="${shortname}" data-source="${sourceFilename}" data-width="${width}" data-crop="${crop ? JSON.stringify(crop) : ''}">Chargement...</div>
            <div class="image-preview-description-container">
              <textarea class="image-preview-description-textarea" data-shortname="${shortname}" placeholder="Description de l'image..." rows="2">${description}</textarea>
              <button class="image-preview-ocr-btn" data-source="${sourceFilename}" type="button" title="Extraire le texte de l'image avec OCR">📷 OCR</button>
            </div>
          </div>
        `;

        imagePreviewsList.appendChild(item);

        // Get the image from the grid to access natural dimensions
        const gridImage = document.querySelector(`.image-item[data-image="${sourceFilename}"] img`);

        // Wait for image to load if not already complete
        if (!gridImage.complete) {
          await new Promise(resolve => {
            gridImage.addEventListener('load', resolve, { once: true });
          });
        }

        // Render the image preview
        const placeholder = item.querySelector('.image-preview-placeholder');
        const parentContent = placeholder.parentElement;

        // Try loading preview file (for cropped or perspective-corrected images)
        const previewFilename = `${previewName}.jpg`;
        const previewPath = `preview/images/${previewFilename}`;

        // Add cache-busting timestamp to force reload after save
        const cacheBust = Date.now();

        // Try preview first with onerror fallback to original
        const imageHTML = `<img src="/draft/${currentSlug}/${previewPath}?t=${cacheBust}"
                                onerror="this.onerror=null; this.src='/draft/${currentSlug}/${sourceFilename}?t=${cacheBust}';"
                                alt="${sourceFilename}" width="${width}" data-shortname="${shortname}" data-source="${sourceFilename}" class="preview-image-editable">`;
        placeholder.outerHTML = imageHTML;

      }
    } catch (error) {
      console.error('Error loading image previews:', error);
      imagePreviewsList.innerHTML = '<p style="color: #dc3545;">Erreur lors du chargement des aperçus</p>';
    }
  }

  function updateProfilerTitle() {
    try {
      const iframeUrl = iframe.contentWindow.location.href;
      const url = new URL(iframeUrl);
      const params = url.searchParams;

      const profileName = params.get('profileName');
      const range = params.get('range');

      let title = 'Firefox Profiler';
      if (range) {
        // Extract just the last part of the range and format it
        const cleanRange = range.replace(/.*~/, '');
        const duration = formatRangeDuration(cleanRange);

        if (profileName) {
          title = profileName + ' — ' + duration;
        } else {
          title = 'Plage: ' + duration;
        }
      } else if (profileName) {
        title = profileName;
      }

      headerTitle.textContent = title;
    } catch (e) {
      // Can't access iframe URL yet or cross-origin
    }
  }

  async function loadSavedRanges(force = false) {
    try {
      const data = await getDraftData(force);

      savedRangesList.innerHTML = '';

      if (data.ranges && data.ranges.length > 0) {
        const renderPromises = [];

        for (const range of data.ranges) {
          const item = document.createElement('div');
          item.className = 'saved-range-item';
          item.dataset.rangeId = range.id;
          item.innerHTML = `
            <div class="saved-range-header">
              <span class="range-summary">
                <strong class="range-name" data-range-id="${range.id}" contenteditable="false" title="Cliquer pour renommer">${range.name}</strong>
                ${range.range ? ' — Durée: ' + formatRangeDuration(range.range) + ' — Plage: ' + range.range : ' — Profil complet'}
              </span>
              ${range.shortcode ? `<code class="range-shortcode">${range.shortcode}</code>` : ''}
              <button class="delete-range-btn" data-range-id="${range.id}" title="Supprimer">✕</button>
            </div>
            ${range.shortcode ? `
              <textarea class="range-description" data-range-id="${range.id}" placeholder="Description (optionnel) : qu'est-ce qui est intéressant dans cette mesure ?">${range.description || ''}</textarea>
            ` : ''}
          `;
          savedRangesList.appendChild(item);

          // Fetch and render the shortcode
          if (range.shortcode) {
            renderPromises.push(renderShortcode(range.shortcode, range.id));
          }
        }

        // Wait for all SVGs to be rendered
        await Promise.all(renderPromises);

        // Add rename functionality
        document.querySelectorAll('.range-name').forEach(nameEl => {
          const rangeId = nameEl.dataset.rangeId;
          makeEditable(
            nameEl,
            async (newName) => {
              try {
                await patch(`update-range/${rangeId}`, { name: newName });
              } catch (error) {
                showError(error.message);
              }

              loadSavedRanges(true);
            },
            () => loadSavedRanges()
          );
        });

        // Add description functionality
        document.querySelectorAll('.range-description').forEach(descEl => {
          descEl.addEventListener('blur', async function() {
            const rangeId = this.dataset.rangeId;
            const description = this.value.trim();

            try {
              await patch(`update-range/${rangeId}`, { description });
            } catch (error) {
              console.error('Error updating description:', error);
            }
          });
        });

        // Add delete functionality to all delete buttons
        document.querySelectorAll('.delete-range-btn').forEach(btn => {
          btn.addEventListener('click', async function() {
            const rangeId = this.dataset.rangeId;

            // Find the range data for undo
            const rangeData = data.ranges.find(r => r.id === rangeId);
            if (!rangeData) return;

            // Get button position for undo notification
            const buttonRect = this.getBoundingClientRect();

            this.disabled = true;
            this.textContent = '...';

            try {
              const response = await fetch(`/api/draft/${currentSlug}/range/${rangeId}`, {
                method: 'DELETE'
              });

              if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Impossible de supprimer');
              }

              // Show undo notification at button position
              showUndoNotification(rangeData, buttonRect);
              // Reload the ranges list with fresh data
              loadSavedRanges(true);
            } catch (error) {
              showError(error.message);
              this.disabled = false;
              this.textContent = '✕';
            }
          });
        });
      } else {
        savedRangesList.innerHTML = '<p style="color: #6c757d; font-style: italic;">Aucune plage sauvegardée</p>';
      }
    } catch (error) {
      console.error('Error loading saved ranges:', error);
      savedRangesList.innerHTML = '<p style="color: #dc3545;">Erreur lors du chargement des plages</p>';
    }
  }

  function showUndoNotification(rangeData, buttonRect) {
    // Remove any existing notification
    const existing = document.querySelector('.undo-notification');
    if (existing) {
      existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = 'undo-notification';
    notification.innerHTML = `
      <span>Plage "${rangeData.name}" supprimée</span>
      <button class="undo-btn">Annuler</button>
    `;

    // Position it near the delete button
    notification.style.position = 'fixed';
    notification.style.top = `${buttonRect.top}px`;
    notification.style.right = `${window.innerWidth - buttonRect.right}px`;

    document.body.appendChild(notification);

    // Auto-hide after 5 seconds
    const timeout = setTimeout(() => {
      notification.classList.add('undo-notification-hide');
      setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Undo button
    notification.querySelector('.undo-btn').addEventListener('click', async function() {
      clearTimeout(timeout);
      this.disabled = true;
      this.textContent = '...';

      try {
        // Re-save the range
        await post('save-range', rangeData);
        notification.remove();
        // Reload ranges with fresh data
        loadSavedRanges(true);
      } catch (error) {
        console.error('Error restoring range:', error);
        this.textContent = 'Erreur';
      }
    });
  }

  async function renderShortcode(shortcode, rangeId) {
    // Find the saved-range-item container
    const item = document.querySelector(`.saved-range-item:has([data-range-id="${rangeId}"])`);
    if (!item) return;

    try {
      // Parse the shortcode to extract profile and options
      // Format: {% profile "filename.json.gz" '{"name":"...","range":"...","path":"..."}' %}
      const match = shortcode.match(/\{%\s*profile\s+"([^"]+)"\s+'([^']+)'\s*%\}/);
      if (!match) {
        throw new Error('Invalid shortcode format');
      }

      const profile = match[1];
      const options = match[2].replace(/\\'/g, "'"); // Unescape single quotes

      const response = await fetch('/api/render-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, options })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Impossible de rendre l\'aperçu');
      }

      if (!result.html) {
        throw new Error('No HTML returned');
      }

      // Append the rendered HTML after the description textarea
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = result.html;
      item.appendChild(tempDiv.firstChild);
    } catch (error) {
      console.error('Error rendering shortcode:', error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'preview-error';
      errorDiv.textContent = 'Erreur: ' + error.message;
      item.appendChild(errorDiv);
    }
  }

  if (openBtn) {
    openBtn.addEventListener('click', function() {
      const profile = this.dataset.profile;
      const slug = this.dataset.slug;
      const profilePath = 'draft/' + slug + '/' + profile;
      const baseUrl = window.location.origin;
      const profileUrl = baseUrl + '/' + profilePath;
      const profilerUrl = baseUrl + '/from-url/' + encodeURIComponent(profileUrl);

      iframe.src = profilerUrl;
      container.style.display = 'block';
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Monitor iframe URL changes
      let lastUrl = '';
      let checkUrl = null;

      function checkUrlChange() {
        try {
          const currentUrl = iframe.contentWindow.location.href;
          if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            updateProfilerTitle();
          }
        } catch (e) {
          // Still loading or cross-origin
        }
      }

      function startPolling() {
        if (!checkUrl) {
          checkUrl = setInterval(checkUrlChange, 500);
        }
      }

      stopPolling = function() {
        if (checkUrl) {
          clearInterval(checkUrl);
          checkUrl = null;
        }
      };

      // Start polling initially
      startPolling();

      // Pause/resume polling when tab visibility changes
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          stopPolling();
        } else {
          startPolling();
        }
      });
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', async function() {
      try {
        const iframeUrl = iframe.contentWindow.location.href;
        const url = new URL(iframeUrl);
        const params = url.searchParams;

        let profileName = params.get('profileName');
        let range = params.get('range') || '';

        // Extract only the last part of the range (after the last ~)
        range = range.replace(/.*~/, '');

        if (!profileName) {
          profileName = prompt('Nom de cette plage:');
          if (!profileName) return;
        }

        // Generate the shortcode
        const shortcodeOptions = {name: profileName};
        if (range) {
          shortcodeOptions.range = range;
        }
        shortcodeOptions.path = `draft/${currentSlug}/`;

        const shortcode = `{% profile "${currentProfile}" '${JSON.stringify(shortcodeOptions).replace(/'/g, "\\'")}' %}`;

        saveBtn.disabled = true;
        saveBtn.textContent = 'Sauvegarde...';

        await post('save-range', {
          profileName: profileName,
          range: range,
          name: profileName,
          file: currentProfile,
          shortcode: shortcode
        });

        setButtonState(saveBtn, '✓ Sauvegardé');
        loadSavedRanges(true);
      } catch (e) {
        console.error('Cannot save range:', e);
        setButtonState(saveBtn, 'Erreur');
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      if (stopPolling) {
        stopPolling();
      }

      container.style.display = 'none';
      iframe.src = '';
      headerTitle.textContent = 'Firefox Profiler';
    });
  }

  // Function to load an image into the modal (defined at top level for reusability)
  async function loadImageIntoModal(shortname, sourceFilename) {
    if (!imageModal) return;

    // Store both for later use
    currentImageShortname = shortname;
    currentImageFilename = sourceFilename;
    // Don't update currentImageIndex here - it should be set by the caller
    // who knows the correct navigation context

    // Load existing metadata FIRST
    const data = await getDraftData();
    const imageData = data.images?.[shortname] || {};

    // Load crop data if exists - BEFORE loading the image
    currentCrop = imageData.crop || null;

    // Hide crop overlay immediately if no crop data
    if (!currentCrop) {
      cropSvg?.classList.add('hidden');
    }

    // Set shortname field
    imageNameInput.value = shortname;
    imageNameInput.title = 'Nom court pour générer le fichier de preview (slug-shortname.jpg)';

    // Set width from saved data or default to 500
    currentImageWidth = imageData.width || 500;

    // Load perspective data if exists
    currentPerspective = imageData.perspective || null;

    // Store original values to detect changes later
    originalImageShortname = shortname;
    originalImageWidth = currentImageWidth;
    originalCrop = JSON.stringify(currentCrop);

    // Update width button states
    widthButtons.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.width) === currentImageWidth);
    });

    // Set custom width input if not a preset
    const presetWidths = [250, 300, 500, 512, 700, 800];
    if (!presetWidths.includes(currentImageWidth)) {
      customWidthInput.value = currentImageWidth;
    } else {
      customWidthInput.value = '';
    }

    modalImageFilename.textContent = sourceFilename;

    // Check if this is the first image load (modal just opened)
    const isFirstLoad = modalImage.src === '' || modalImage.style.width === '';

    // Wait for image to load before updating crop display
    modalImage.onload = function() {
      // Get current computed width before applying new width
      const oldWidth = parseFloat(window.getComputedStyle(modalImage).width);

      // Apply the preview at actual width
      updateImagePreview();

      const newWidth = currentImageWidth;

      // If this is the first load or no width change, update immediately
      if (isFirstLoad || Math.abs(oldWidth - newWidth) < 1) {
        // No transition - update immediately
        updateCropDisplay();
      } else {
        // Width is changing - hide crop during transition
        cropSvg?.classList.add('hidden');
        const onTransitionEnd = function(e) {
          // Only respond to width transitions on the image itself
          if (e.target === modalImage && e.propertyName === 'width') {
            modalImage.removeEventListener('transitionend', onTransitionEnd);
            updateCropDisplay();
          }
        };
        modalImage.addEventListener('transitionend', onTransitionEnd);
      }
    };

    // Set image source AFTER loading metadata (triggers image load and onload handler)
    modalImage.src = `/draft/${currentSlug}/${sourceFilename}`;
  }

  // Update crop visual display
  function updateCropDisplay() {
    if (!cropSvg || !cropPolygon || !modalImage) return;

    const points = normalizeCrop(currentCrop);
    if (!points) {
      cropSvg.classList.add('hidden');
      return;
    }

    const imgRect = modalImage.getBoundingClientRect();
    const containerRect = modalImageContainer.getBoundingClientRect();

    // Calculate absolute positions for each point
    const absPoints = points.map(([x, y]) => {
      const left = (imgRect.left - containerRect.left) + (imgRect.width * x / 100);
      const top = (imgRect.top - containerRect.top) + (imgRect.height * y / 100);
      return [left, top];
    });

    // Update polygon and mask
    const pointsStr = absPoints.map(p => p.join(',')).join(' ');
    cropPolygon.setAttribute('points', pointsStr);
    cropPolygonMask.setAttribute('points', pointsStr);

    // Update corner circles
    cropCorners.forEach((circle, i) => {
      if (absPoints[i]) {
        circle.setAttribute('cx', absPoints[i][0]);
        circle.setAttribute('cy', absPoints[i][1]);
      }
    });

    cropSvg.classList.remove('hidden');
  }

  // Convert screen coordinates to crop percentages
  function screenToCropPercent(screenX, screenY) {
    const imgRect = modalImage.getBoundingClientRect();
    const x = ((screenX - imgRect.left) / imgRect.width) * 100;
    const y = ((screenY - imgRect.top) / imgRect.height) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  }

  // Check if point is inside image bounds
  function isInsideImage(clientX, clientY) {
    const imgRect = modalImage.getBoundingClientRect();
    return clientX >= imgRect.left && clientX <= imgRect.right &&
           clientY >= imgRect.top && clientY <= imgRect.bottom;
  }

  // Update magnifier position and content
  function updateMagnifier(clientX, clientY) {
    if (!magnifierCanvas || !magnifierCtx || !modalImage.complete) return;

    const imgRect = modalImage.getBoundingClientRect();
    const containerRect = modalImageContainer.getBoundingClientRect();

    // Calculate position relative to image
    const imgX = clientX - imgRect.left;
    const imgY = clientY - imgRect.top;

    // Position magnifier near cursor (offset to not cover the point being edited)
    const magnifierSize = 150;
    const offset = 30;
    let magnifierX = clientX - containerRect.left + offset;
    let magnifierY = clientY - containerRect.top - magnifierSize - offset;

    // Keep magnifier within container bounds
    if (magnifierX + magnifierSize > containerRect.width) {
      magnifierX = clientX - containerRect.left - magnifierSize - offset;
    }
    if (magnifierY < 0) {
      magnifierY = clientY - containerRect.top + offset;
    }

    magnifierCanvas.style.left = `${magnifierX}px`;
    magnifierCanvas.style.top = `${magnifierY}px`;

    // Set canvas dimensions (need to be set as attributes for proper rendering)
    magnifierCanvas.width = magnifierSize;
    magnifierCanvas.height = magnifierSize;

    // Draw magnified portion
    const zoomLevel = 3; // 3x magnification
    const sourceSize = magnifierSize / zoomLevel;
    const sourceX = (imgX / imgRect.width) * modalImage.naturalWidth - sourceSize / 2;
    const sourceY = (imgY / imgRect.height) * modalImage.naturalHeight - sourceSize / 2;

    // Clear canvas
    magnifierCtx.clearRect(0, 0, magnifierSize, magnifierSize);

    // Create circular clip
    magnifierCtx.save();
    magnifierCtx.beginPath();
    magnifierCtx.arc(magnifierSize / 2, magnifierSize / 2, magnifierSize / 2, 0, Math.PI * 2);
    magnifierCtx.clip();

    // Draw magnified image
    magnifierCtx.drawImage(
      modalImage,
      Math.max(0, sourceX),
      Math.max(0, sourceY),
      Math.min(sourceSize, modalImage.naturalWidth - sourceX),
      Math.min(sourceSize, modalImage.naturalHeight - sourceY),
      0,
      0,
      magnifierSize,
      magnifierSize
    );

    // Draw crosshair
    magnifierCtx.strokeStyle = '#0066cc';
    magnifierCtx.lineWidth = 2;
    magnifierCtx.beginPath();
    magnifierCtx.moveTo(magnifierSize / 2 - 10, magnifierSize / 2);
    magnifierCtx.lineTo(magnifierSize / 2 + 10, magnifierSize / 2);
    magnifierCtx.moveTo(magnifierSize / 2, magnifierSize / 2 - 10);
    magnifierCtx.lineTo(magnifierSize / 2, magnifierSize / 2 + 10);
    magnifierCtx.stroke();

    magnifierCtx.restore();

    // Show magnifier
    magnifierCanvas.classList.add('active');
  }

  // Hide magnifier
  function hideMagnifier() {
    magnifierCanvas?.classList.remove('active');
  }

  // Generate preview file for rectangular crop using canvas
  async function generateRectangularPreview(points) {
    try {
      // Load the image into a canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = modalImage.src;
      });

      // Convert 4-point format to x, y, width, height
      const minX = Math.min(points[0][0], points[1][0], points[2][0], points[3][0]);
      const minY = Math.min(points[0][1], points[1][1], points[2][1], points[3][1]);
      const maxX = Math.max(points[0][0], points[1][0], points[2][0], points[3][0]);
      const maxY = Math.max(points[0][1], points[1][1], points[2][1], points[3][1]);

      const cropX = minX;
      const cropY = minY;
      const cropWidth = maxX - minX;
      const cropHeight = maxY - minY;

      // Calculate pixel coordinates
      const cropLeftPx = img.naturalWidth * cropX / 100;
      const cropTopPx = img.naturalHeight * cropY / 100;
      const cropWidthPx = img.naturalWidth * cropWidth / 100;
      const cropHeightPx = img.naturalHeight * cropHeight / 100;

      // Create canvas with crop dimensions
      const canvas = document.createElement('canvas');
      canvas.width = cropWidthPx;
      canvas.height = cropHeightPx;
      const ctx = canvas.getContext('2d');

      // Draw cropped portion
      ctx.drawImage(img, cropLeftPx, cropTopPx, cropWidthPx, cropHeightPx, 0, 0, cropWidthPx, cropHeightPx);

      // Convert to data URL
      const croppedImageData = canvas.toDataURL('image/jpeg', 0.95);

      // Save to server
      const shortname = imageNameInput.value.trim();
      if (shortname === '') {
        alert('Un nom court est requis pour sauvegarder l\'image');
        throw new Error('Shortname required');
      }

      await post('save-preview', { imageData: croppedImageData, shortname });
    } catch (error) {
      console.error('Error generating rectangular preview:', error);
      alert('Erreur lors de la sauvegarde de l\'image: ' + error.message);
      throw error;
    }
  }

  // Apply perspective correction using OpenCV.js
  async function applyPerspectiveCorrection() {
    const points = normalizeCrop(currentCrop);
    if (!points || !window.cv) {
      console.error('OpenCV not loaded or no crop defined');
      return;
    }

    try {
      // Load the image into a canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Get natural image dimensions
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = modalImage.src;
      });

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      // Convert percentage points to pixel coordinates
      const srcPoints = points.map(([x, y]) => [
        (x / 100) * img.naturalWidth,
        (y / 100) * img.naturalHeight
      ]);

      // Calculate destination rectangle size (bounding box of corrected image)
      const width = Math.max(
        Math.hypot(srcPoints[1][0] - srcPoints[0][0], srcPoints[1][1] - srcPoints[0][1]),
        Math.hypot(srcPoints[2][0] - srcPoints[3][0], srcPoints[2][1] - srcPoints[3][1])
      );
      const height = Math.max(
        Math.hypot(srcPoints[3][0] - srcPoints[0][0], srcPoints[3][1] - srcPoints[0][1]),
        Math.hypot(srcPoints[2][0] - srcPoints[1][0], srcPoints[2][1] - srcPoints[1][1])
      );

      // Destination points (rectangle)
      const dstPoints = [
        [0, 0],
        [width, 0],
        [width, height],
        [0, height]
      ];

      // Create OpenCV matrices
      const src = cv.imread(canvas);
      const dst = new cv.Mat();

      const srcMat = cv.matFromArray(4, 1, cv.CV_32FC2, srcPoints.flat());
      const dstMat = cv.matFromArray(4, 1, cv.CV_32FC2, dstPoints.flat());

      // Get perspective transform matrix
      const M = cv.getPerspectiveTransform(srcMat, dstMat);

      // Apply transform
      const dsize = new cv.Size(width, height);
      cv.warpPerspective(src, dst, M, dsize);

      // Convert back to image
      const outputCanvas = document.createElement('canvas');
      cv.imshow(outputCanvas, dst);

      // Get the transformed image as data URL
      const correctedImageData = outputCanvas.toDataURL('image/jpeg', 0.95);

      // Clean up OpenCV resources
      src.delete();
      dst.delete();
      srcMat.delete();
      dstMat.delete();
      M.delete();

      // Save the transformed image to the server in preview subfolder
      const shortname = imageNameInput.value.trim();
      if (shortname === '') {
        alert('Un nom court est requis pour sauvegarder l\'image corrigée');
        // Don't clear crop or continue if save is blocked
        throw new Error('Shortname required');
      }

      try {
        await post('save-preview', { imageData: correctedImageData, shortname });
      } catch (saveError) {
        console.error('Error saving transformed image:', saveError);
        alert('Erreur lors de la sauvegarde de l\'image transformée: ' + saveError.message);
        throw saveError; // Re-throw to prevent clearing crop on error
      }
    } catch (error) {
      console.error('Perspective correction error:', error);
      alert('Erreur lors de la correction de perspective: ' + error.message);
    }
  }

  // Image modal functionality
  if (imageModal) {
    // Build array of all images
    allImages = Array.from(document.querySelectorAll('.clickable-image')).map(img => img.dataset.image);

    // Helper to open modal with navigation context
    async function openImageModal(shortname, sourceFilename, navigatingPreviews) {
      isNavigatingPreviews = navigatingPreviews;

      if (navigatingPreviews) {
        // Find index in allPreviews
        currentImageIndex = allPreviews.findIndex(p => p.shortname === shortname);
      } else {
        // Find index in allImages
        currentImageIndex = allImages.indexOf(sourceFilename);
      }

      await loadImageIntoModal(shortname, sourceFilename);
      showModal(imageModal);
    }

    // Open modal when clicking on images
    document.querySelectorAll('.clickable-image').forEach(img => {
      img.addEventListener('click', async function() {
        const sourceFilename = this.dataset.image;
        const shortname = findShortnameForSource(sourceFilename) || '';
        await openImageModal(shortname, sourceFilename, false);
      });
    });

    // Add double-click handler for all preview images (event delegation)
    const imagePreviewsList = document.getElementById('image-previews-list');
    imagePreviewsList?.addEventListener('dblclick', async function(e) {
      if (e.target.classList.contains('preview-image-editable')) {
        const { shortname, source: sourceFilename } = e.target.dataset;
        await openImageModal(shortname, sourceFilename, true);
      }
    });

    // Add auto-save for description textareas with event delegation
    imagePreviewsList?.addEventListener('blur', async function(e) {
      if (e.target.classList.contains('image-preview-description-textarea')) {
        const shortname = e.target.dataset.shortname;
        const description = e.target.value.trim();

        try {
          await patch(`image/${encodeURIComponent(shortname)}`, { description });
        } catch (error) {
          console.error('Error saving description:', error);
          showError('Erreur lors de la sauvegarde de la description');
        }
      }
    }, true); // Use capture phase for blur event

    // Add delete functionality with event delegation
    imagePreviewsList?.addEventListener('click', async function(e) {
      const deleteBtn = e.target.closest('.image-preview-delete-btn');
      if (deleteBtn) {
        const shortname = deleteBtn.dataset.shortname;

        const confirmed = confirm('Retirer cette image de la liste ? L\'image source ne sera pas supprimée, mais ses métadonnées (description, recadrage) seront effacées.');
        if (!confirmed) return;

        try {
          // Delete the image metadata
          await fetch(`/api/draft/${currentSlug}/image/${encodeURIComponent(shortname)}`, {
            method: 'DELETE'
          });

          // Reload the preview list with fresh data
          await loadImagePreviews(true);
        } catch (error) {
          console.error('Error deleting image metadata:', error);
          showError('Erreur lors de la suppression');
        }
        return;
      }

      // OCR button handler
      const ocrBtn = e.target.closest('.image-preview-ocr-btn');
      if (ocrBtn && typeof Tesseract !== 'undefined') {
        const previewItem = ocrBtn.closest('.image-preview-item');
        const textarea = previewItem.querySelector('.image-preview-description-textarea');
        const shortname = textarea.dataset.shortname;

        if (!textarea) return;

        // Only run OCR if description is empty
        if (textarea.value.trim()) {
          const confirmed = confirm('La description contient déjà du texte. Voulez-vous la remplacer par le résultat de l\'OCR ?');
          if (!confirmed) return;
        }

        ocrBtn.disabled = true;
        const originalText = ocrBtn.textContent;
        ocrBtn.textContent = '...';

        try {
          // Use preview file
          const previewName = shortname === 'img' ? currentSlug : `${currentSlug}-${shortname}`;
          const imagePath = `/draft/${currentSlug}/preview/images/${previewName}.jpg`;

          const { data: { text } } = await Tesseract.recognize(
            imagePath,
            'fra', // French language
            {
              logger: info => {
                if (info.status === 'recognizing text') {
                  const progress = Math.round(info.progress * 100);
                  ocrBtn.textContent = `${progress}%`;
                }
              }
            }
          );

          const cleanedText = text.trim();

          if (cleanedText) {
            textarea.value = cleanedText;
            // Trigger blur to auto-save
            textarea.dispatchEvent(new Event('blur'));
            setButtonState(ocrBtn, '✓', originalText);
          } else {
            setButtonState(ocrBtn, '✗', originalText);
          }
        } catch (error) {
          console.error('OCR error:', error);
          setButtonState(ocrBtn, '✗', originalText);
        } finally {
          ocrBtn.disabled = false;
        }
      }
    });

    // Close modal handlers
    function closeModal() {
      hideModal(imageModal);
      currentImageFilename = null;
    }
    imageModal.querySelector('.close-modal-btn')?.addEventListener('click', closeModal);
    imageModal.querySelector('.modal-overlay')?.addEventListener('click', closeModal);

    // Keyboard navigation
    document.addEventListener('keydown', async function(e) {
      if (imageModal.style.display !== 'block') return;

      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        await navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        await navigateImage(1);
      }
    });

    // Navigate to next/previous image
    async function navigateImage(direction) {
      // Save current image first (only if it has a shortname)
      if (currentImageShortname) {
        await saveCurrentImage();
      }

      // Calculate new index
      const newIndex = currentImageIndex + direction;

      // Check boundaries based on navigation mode
      const maxIndex = isNavigatingPreviews ? allPreviews.length : allImages.length;
      if (newIndex < 0 || newIndex >= maxIndex) {
        // Close modal if at first/last image
        closeModal();
        return;
      }

      // Load the new image based on navigation mode
      let shortname, sourceFilename;
      if (isNavigatingPreviews) {
        // Navigating through previews
        const preview = allPreviews[newIndex];
        shortname = preview.shortname;
        sourceFilename = preview.sourceFilename;
      } else {
        // Navigating through source images
        sourceFilename = allImages[newIndex];
        shortname = findShortnameForSource(sourceFilename) || '';
      }

      // Update current index AFTER getting the data but BEFORE loading
      // (so loadImageIntoModal doesn't overwrite it)
      currentImageIndex = newIndex;

      await loadImageIntoModal(shortname, sourceFilename);
    }

    // Save current image metadata
    async function saveCurrentImage() {
      // Get the new shortname from the input
      const newShortname = imageNameInput.value.trim();
      if (!newShortname) {
        throw new Error('Le nom court est obligatoire');
      }

      // Check if anything changed
      const cropChanged = JSON.stringify(currentCrop) !== originalCrop;
      const widthChanged = currentImageWidth !== originalImageWidth;
      const shortnameChanged = newShortname !== originalImageShortname;

      // If nothing changed, no need to save
      if (!cropChanged && !widthChanged && !shortnameChanged) {
        return;
      }

      // Generate new preview file if needed
      // Only regenerate if crop or shortname changed (not width - that's just display metadata)
      const points = normalizeCrop(currentCrop);
      if (points && (cropChanged || shortnameChanged)) {
        if (isRectangularCrop(points)) {
          // Rectangular crop - generate preview with simple canvas crop
          await generateRectangularPreview(points);
        } else {
          // Non-rectangular crop - apply perspective correction
          await applyPerspectiveCorrection();
        }
      }

      try {
        // Save the image with the (potentially new) shortname
        // This will either update an existing entry or create a new one
        await patch(`image/${encodeURIComponent(newShortname)}`, {
          source: currentImageFilename,
          width: currentImageWidth,
          crop: currentCrop
        });

        // Update current shortname to the new one
        currentImageShortname = newShortname;
      } catch (error) {
        console.error('Error saving image:', error);
        showError('Erreur lors de la sauvegarde');
      }
    }

    // Helper function to update image preview size
    function updateImagePreview() {
      // Preview shows the image at actual display width
      modalImage.style.width = currentImageWidth + 'px';
      modalImage.style.maxWidth = 'none';
    }

    // Unified crop/perspective interaction
    if (cropOverlay && cropSvg) {
      let hoveredCorner = null;

      // Corner dragging and hover
      cropCorners.forEach((corner, index) => {
        corner.addEventListener('mousedown', function(e) {
          e.stopPropagation();
          e.preventDefault();

          const points = normalizeCrop(currentCrop);
          if (!points) return;

          draggedCorner = index;
          dragStartX = e.clientX;
          dragStartY = e.clientY;
          initialCropPoints = points.map(p => [...p]); // Deep copy
        });

        corner.addEventListener('mouseover', function(e) {
          hoveredCorner = index;
        });

        corner.addEventListener('mouseout', function(e) {
          if (hoveredCorner === index) {
            hoveredCorner = null;
          }
        });
      });

      // Clicking on overlay to draw new crop or delete existing
      cropOverlay.addEventListener('mousedown', function(e) {
        if (!isInsideImage(e.clientX, e.clientY)) return;
        if (draggedCorner !== null) return; // Already handling corner drag

        // Check if clicking inside current crop polygon
        if (currentCrop) {
          const points = normalizeCrop(currentCrop);
          if (points && isPointInPolygon(e.clientX, e.clientY, points)) {
            // TODO: Could implement moving the entire shape here
            return;
          }

          // Clicked outside - delete crop and start drawing new one
          currentCrop = null;
          updateCropDisplay();
          // Don't return - continue to start drawing new crop
        }

        // Start drawing new crop
        const startPos = screenToCropPercent(e.clientX, e.clientY);
        dragStartX = e.clientX;
        dragStartY = e.clientY;

        // Initialize as 4-point rectangle
        currentCrop = [
          [startPos.x, startPos.y],
          [startPos.x, startPos.y],
          [startPos.x, startPos.y],
          [startPos.x, startPos.y]
        ];
        initialCropPoints = null;
        updateCropDisplay();
      });

      // Global mouse move handler
      document.addEventListener('mousemove', function(e) {
        if (draggedCorner !== null && initialCropPoints) {
          // Dragging a corner - show magnifier
          const pos = screenToCropPercent(e.clientX, e.clientY);
          const newPoints = initialCropPoints.map(p => [...p]);
          newPoints[draggedCorner] = [pos.x, pos.y];
          currentCrop = newPoints;
          updateCropDisplay();
          updateMagnifier(e.clientX, e.clientY);
        } else if (hoveredCorner !== null && currentCrop) {
          // Hovering over a corner (not dragging) - show magnifier at corner position
          const points = normalizeCrop(currentCrop);
          if (points) {
            const imgRect = modalImage.getBoundingClientRect();
            const [x, y] = points[hoveredCorner];
            const screenX = imgRect.left + (imgRect.width * x / 100);
            const screenY = imgRect.top + (imgRect.height * y / 100);
            updateMagnifier(screenX, screenY);
          }
        } else if (currentCrop && e.buttons === 1 && initialCropPoints === null) {
          // Drawing new crop rectangle
          const currentPos = screenToCropPercent(e.clientX, e.clientY);
          const startPos = screenToCropPercent(dragStartX, dragStartY);

          const x1 = Math.min(startPos.x, currentPos.x);
          const y1 = Math.min(startPos.y, currentPos.y);
          const x2 = Math.max(startPos.x, currentPos.x);
          const y2 = Math.max(startPos.y, currentPos.y);

          currentCrop = [
            [x1, y1],
            [x2, y1],
            [x2, y2],
            [x1, y2]
          ];
          updateCropDisplay();
        } else {
          // Not dragging or hovering - hide magnifier
          hideMagnifier();
        }
      });

      // Global mouse up handler
      document.addEventListener('mouseup', function(e) {
        if (draggedCorner !== null) {
          draggedCorner = null;
          initialCropPoints = null;
          hideMagnifier();
          // Note: Perspective correction will be applied when saving, not immediately
        } else if (currentCrop && initialCropPoints === null) {
          // Finished drawing
          const points = normalizeCrop(currentCrop);
          if (points) {
            const width = Math.abs(points[1][0] - points[0][0]);
            const height = Math.abs(points[2][1] - points[1][1]);

            // If too small, delete it
            if (width < 1 || height < 1) {
              currentCrop = null;
              updateCropDisplay();
            }
          }
        }
      });
    }

    // Helper: Check if point is inside polygon
    function isPointInPolygon(clientX, clientY, points) {
      const imgRect = modalImage.getBoundingClientRect();
      const containerRect = modalImageContainer.getBoundingClientRect();

      // Convert points to absolute coordinates
      const absPoints = points.map(([x, y]) => {
        const left = (imgRect.left - containerRect.left) + (imgRect.width * x / 100);
        const top = (imgRect.top - containerRect.top) + (imgRect.height * y / 100);
        return [left, top];
      });

      const x = clientX - containerRect.left;
      const y = clientY - containerRect.top;

      // Ray casting algorithm
      let inside = false;
      for (let i = 0, j = absPoints.length - 1; i < absPoints.length; j = i++) {
        const xi = absPoints[i][0], yi = absPoints[i][1];
        const xj = absPoints[j][0], yj = absPoints[j][1];

        const intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }

      return inside;
    }

    // Width controls - set the actual display width
    widthButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const width = parseInt(this.dataset.width);
        currentImageWidth = width;
        customWidthInput.value = '';

        // Update active button
        widthButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        updateImagePreview();

        // Wait for transition to complete before updating crop
        if (currentCrop) {
          // Hide crop overlay during transition
          cropSvg?.classList.add('hidden');
          const onTransitionEnd = function(e) {
            if (e.target === modalImage && e.propertyName === 'width') {
              modalImage.removeEventListener('transitionend', onTransitionEnd);
              updateCropDisplay();
            }
          };
          modalImage.addEventListener('transitionend', onTransitionEnd);
        }
      });
    });

    // Custom width input
    customWidthInput?.addEventListener('change', function() {
      const width = parseInt(this.value);
      if (width && width >= 30 && width <= 2000) {
        currentImageWidth = width;
        widthButtons.forEach(b => b.classList.remove('active'));
        updateImagePreview();

        // Wait for transition to complete before updating crop
        if (currentCrop) {
          // Hide crop overlay during transition
          cropSvg?.classList.add('hidden');
          const onTransitionEnd = function(e) {
            if (e.target === modalImage && e.propertyName === 'width') {
              modalImage.removeEventListener('transitionend', onTransitionEnd);
              updateCropDisplay();
            }
          };
          modalImage.addEventListener('transitionend', onTransitionEnd);
        }
      }
    });

    // Set as thumbnail button - sets shortname to "img"
    document.getElementById('set-as-thumbnail-btn').addEventListener('click', function() {
      imageNameInput.value = 'img';
      imageNameInput.focus();
    });

    // Save metadata functionality
    const saveMetadataBtn = document.getElementById('save-image-metadata-btn');

    // Save on Enter key in shortname field
    imageNameInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        saveMetadataBtn.click();
      }
    });

    saveMetadataBtn.addEventListener('click', async function() {
      this.disabled = true;
      const originalText = this.textContent;
      this.textContent = 'Sauvegarde...';

      try {
        // Use the centralized save function
        await saveCurrentImage();

        // Reset button state
        this.textContent = originalText;
        this.disabled = false;

        // Close the modal immediately
        closeModal();

        // Reload previews in the background (after modal is closed)
        loadImagePreviews(true);
      } catch (error) {
        showError(error.message);
        this.textContent = originalText;
        this.disabled = false;
      }
    });
  }

  // View data.json functionality
  const dataJsonModal = document.getElementById('data-json-modal');

  document.getElementById('view-data-json-btn').addEventListener('click', async function() {
    const data = await getDraftData();

    // Pretty print the JSON with 2-space indentation
    document.getElementById('data-json-content').textContent = JSON.stringify(data, null, 2);

    // Show modal
    showModal(dataJsonModal);
  });

  // Close modal handlers
  function closeDataJsonModal() {
    hideModal(dataJsonModal);
  }

  document.getElementById('close-data-json-btn').addEventListener('click', closeDataJsonModal);
  dataJsonModal.querySelector('.modal-overlay').addEventListener('click', closeDataJsonModal);

  // ESC key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && dataJsonModal.style.display === 'block') {
      closeDataJsonModal();
    }
  });

  // Notes functionality
  // Auto-save on blur (when user clicks away)
  notesEl.addEventListener('blur', async function() {
    const notes = this.value.trim();

    try {
      await patch('notes', { notes });
    } catch (error) {
      showError(error.message);
    }
  });

  // Editable title functionality
  makeEditable(
    titleEl,
    async (newTitle) => {
      try {
        await patch('title', { title: newTitle });
      } catch (error) {
        showError(error.message);
        location.reload();
      }
    },
    () => location.reload()
  );

  // Generate Template functionality
  const generateBtn = document.getElementById('generate-template-btn');
  const statusDiv = document.getElementById('generate-template-status');
  const previewContainer = document.getElementById('test-preview-container');
  const previewIframe = document.getElementById('test-preview-iframe');

  // Enable button when there are ranges and main image
  async function updateGenerateButtonState() {
    const data = await getDraftData();
    const hasRanges = data.ranges && data.ranges.length > 0;
    const hasMainImage = data.images && data.images['img'];

    // Check if template already exists
    const templatePath = `draft/${currentSlug}/preview/tests/${currentSlug}`;
    let templateExists = false;
    try {
      const response = await fetch(`/${templatePath}`);
      templateExists = response.ok;
    } catch (e) {
      templateExists = false;
    }

    if (hasRanges && hasMainImage) {
      generateBtn.disabled = false;
      generateBtn.title = '';

      if (templateExists) {
        generateBtn.textContent = 'Afficher l\'aperçu';
        generateBtn.dataset.mode = 'show';
      } else {
        generateBtn.textContent = 'Générer le template';
        generateBtn.dataset.mode = 'generate';
      }
    } else {
      generateBtn.disabled = true;
      generateBtn.textContent = 'Générer le template';
      generateBtn.dataset.mode = 'generate';
      const reasons = [];
      if (!hasRanges) reasons.push('Aucune plage sauvegardée');
      if (!hasMainImage) reasons.push('Image principale (vignette) manquante');
      generateBtn.title = reasons.join(', ');
    }

    // Remove loading state
    generateBtn.style.visibility = 'visible';
  }

  // Initial state
  updateGenerateButtonState();

  // Update button state after ranges or images change
  window.addEventListener('draft-data-updated', updateGenerateButtonState);

  // Refresh preview button
  const refreshPreviewBtn = document.getElementById('refresh-preview-btn');
  refreshPreviewBtn.addEventListener('click', async () => {
    const originalText = refreshPreviewBtn.textContent;
    refreshPreviewBtn.disabled = true;
    refreshPreviewBtn.textContent = '...';

    try {
      // Trigger rebuild of the preview
      const response = await fetch(`/api/draft/${currentSlug}/rebuild-preview`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la reconstruction');
      }

      // Reload iframe with cache bust
      const iframe = document.getElementById('test-preview-iframe');
      if (iframe && iframe.src) {
        const url = new URL(iframe.src, window.location.origin);
        url.searchParams.set('t', Date.now());
        iframe.src = url.toString();
      }

      setButtonState(refreshPreviewBtn, '✓', originalText);
    } catch (error) {
      console.error('Error rebuilding preview:', error);
      setButtonState(refreshPreviewBtn, '✗', originalText);
    }
  });

  generateBtn.addEventListener('click', async () => {
    const mode = generateBtn.dataset.mode;

    // If in 'show' mode, just display the existing preview
    if (mode === 'show') {
      const templatePath = `draft/${currentSlug}/preview/tests/${currentSlug}`;
      previewIframe.src = `/${templatePath}?t=${Date.now()}`;
      previewContainer.style.display = 'block';
      previewContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Otherwise, generate the template
    try {
      generateBtn.disabled = true;
      statusDiv.className = 'info';
      statusDiv.textContent = 'Génération des captures d\'écran des profils...';

      const data = await getDraftData(true); // Force refresh

      // Step 1: Generate and upload profile screenshots
      let uploadedCount = 0;
      for (const range of data.ranges) {
        statusDiv.textContent = `Génération des captures (${uploadedCount + 1}/${data.ranges.length})...`;

        // Find the saved range item to get its SVG
        const rangeElements = document.querySelectorAll('.saved-range-item');
        let svgElement = null;

        for (const elem of rangeElements) {
          if (elem.dataset.rangeId === range.id) {
            svgElement = elem.querySelector('svg');
            break;
          }
        }

        if (!svgElement) {
          throw new Error(`Impossible de trouver le SVG pour la plage ${range.name}`);
        }

        // Convert SVG to PNG by drawing directly from DOM
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 2400;  // Match viewBox width from profileShortcode
        canvas.height = 120;  // Match viewBox height

        // Draw SVG directly using drawImage on a foreignObject
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        await new Promise((resolve, reject) => {
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            resolve();
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Erreur lors du chargement de l\'image SVG'));
          };
          img.src = url;
        });

        // Convert canvas to PNG data URL
        const imageData = canvas.toDataURL('image/png');

        // Upload screenshot using post() helper
        await post('save-profile-screenshot', {
          rangeId: range.id,
          imageData: imageData
        });

        uploadedCount++;
      }

      // Step 2: Generate template
      statusDiv.textContent = 'Génération du template...';
      const result = await post('generate-template', {});

      // Show success with instructions
      statusDiv.className = 'success';
      statusDiv.innerHTML = `
        <strong>✅ Template généré avec succès !</strong>
        <pre>${result.instructions}</pre>
      `;

      // Show preview iframe with the generated test
      if (result.testPath) {
        previewIframe.src = `/${result.testPath}`;
        previewContainer.style.display = 'block';
        previewContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Update button state to show mode
      await updateGenerateButtonState();

    } catch (error) {
      statusDiv.className = 'error';
      statusDiv.innerHTML = `<strong>❌ Erreur :</strong> ${error.message}`;
      await updateGenerateButtonState();
    }
  });
});
