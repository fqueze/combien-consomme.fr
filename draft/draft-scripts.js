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
// Shared data for title and ranges (to avoid fetching twice)
window.draftData = null;

// Helper to set button state with auto-reset after 2 seconds
function setButtonState(button, text) {
  button.textContent = text;
  button.disabled = false;

  setTimeout(() => {
    button.textContent = 'Sauvegarder';
  }, 2000);
}

// Helper to show error message to user
function showError(message) {
  console.error('Error:', message);
  alert('Erreur: ' + message);
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
  const article = document.querySelector('article[data-draft-slug]');
  const currentSlug = article ? article.dataset.draftSlug : null;

  const openBtn = document.querySelector('.open-profiler-btn');
  const saveBtn = document.querySelector('.save-range-btn');
  const closeBtn = document.querySelector('.close-profiler-btn');
  const container = document.getElementById('profiler-container');
  const iframe = document.getElementById('profiler-iframe');
  const headerTitle = document.getElementById('profiler-title');
  const savedRangesList = document.getElementById('saved-ranges-list');
  const titleEl = document.getElementById('draft-title');

  let currentProfile = openBtn ? openBtn.dataset.profile : null;
  let stopPolling = null;

  // Load saved ranges on page load
  if (currentSlug) {
    loadSavedRanges();
  }

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
      // Use shared draftData if available (to avoid duplicate fetch on initial load),
      // unless force is true
      let data;
      if (!force && window.draftData) {
        data = window.draftData;
        window.draftData = null;
      } else {
        const response = await fetch(`http://localhost:8080/api/draft/${currentSlug}/data`);
        data = await response.json();
      }

      savedRangesList.innerHTML = '';

      if (data.ranges && data.ranges.length > 0) {
        for (const range of data.ranges) {
          const item = document.createElement('div');
          item.className = 'saved-range-item';
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
            renderShortcode(range.shortcode, range.id);
          }
        }

        // Add rename functionality
        document.querySelectorAll('.range-name').forEach(nameEl => {
          const rangeId = nameEl.dataset.rangeId;
          makeEditable(
            nameEl,
            async (newName) => {
              try {
                const response = await fetch(`http://localhost:8080/api/draft/${currentSlug}/update-range/${rangeId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: newName })
                });

                if (!response.ok) {
                  const result = await response.json();
                  throw new Error(result.error || 'Impossible de renommer');
                }
              } catch (error) {
                showError(error.message);
              }

              loadSavedRanges();
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
              await fetch(`http://localhost:8080/api/draft/${currentSlug}/update-range/${rangeId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description })
              });
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
              const response = await fetch(`http://localhost:8080/api/draft/${currentSlug}/range/${rangeId}`, {
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
        const response = await fetch(`http://localhost:8080/api/draft/${currentSlug}/save-range`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rangeData)
        });

        if (response.ok) {
          notification.remove();
          // Reload ranges with fresh data
          loadSavedRanges(true);
        } else {
          this.textContent = 'Erreur';
        }
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

      const response = await fetch('http://localhost:8080/api/render-profile', {
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

        const response = await fetch(`http://localhost:8080/api/draft/${currentSlug}/save-range`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profileName: profileName,
            range: range,
            name: profileName,
            file: currentProfile,
            shortcode: shortcode
          })
        });

        if (response.ok) {
          setButtonState(saveBtn, '✓ Sauvegardé');
          loadSavedRanges(true);
        } else {
          setButtonState(saveBtn, 'Erreur');
        }
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

  // Editable title functionality
  if (titleEl && currentSlug) {
    // Load data.json once (will be reused by loadSavedRanges)
    (async function() {
      try {
        const response = await fetch(`http://localhost:8080/api/draft/${currentSlug}/data`);
        window.draftData = await response.json();
        if (window.draftData.title) {
          titleEl.textContent = window.draftData.title;
        }
      } catch (error) {
        console.error('Error loading data:', error);
        window.draftData = { ranges: [], title: null };
      }
    })();

    makeEditable(
      titleEl,
      async (newTitle) => {
        try {
          const response = await fetch(`http://localhost:8080/api/draft/${currentSlug}/title`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
          });

          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || 'Impossible de mettre à jour le titre');
          }
        } catch (error) {
          showError(error.message);
          location.reload();
        }
      },
      () => location.reload()
    );
  }
});
