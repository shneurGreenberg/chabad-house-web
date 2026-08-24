const path = require('path');
const { normalizePhotoCrop, DEFAULT_PHOTO_CROP } = require('./photo-crop');

const LIST_THUMB_WIDTH = 128;
const EMBED_THUMB_WIDTH = 280;

function buildPhotoUrl(filename) {
  if (!filename) {
    return '';
  }

  return `/photos/${encodeURIComponent(path.basename(filename))}`;
}

function buildPhotoThumbUrl(filename, width = LIST_THUMB_WIDTH, crop = null) {
  if (!filename) {
    return '';
  }

  const params = new URLSearchParams({
    w: String(Math.round(width)),
  });

  if (crop) {
    const normalized = normalizePhotoCrop(crop);
    if (normalized.x !== DEFAULT_PHOTO_CROP.x) {
      params.set('cx', String(normalized.x));
    }
    if (normalized.y !== DEFAULT_PHOTO_CROP.y) {
      params.set('cy', String(normalized.y));
    }
    if (normalized.zoom !== DEFAULT_PHOTO_CROP.zoom) {
      params.set('cz', String(normalized.zoom));
    }
  }

  return `${buildPhotoUrl(filename)}?${params.toString()}`;
}

function toAbsoluteAssetUrl(pathname, origin) {
  if (!pathname) {
    return '';
  }
  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }
  if (!origin) {
    return pathname;
  }
  return `${String(origin).replace(/\/$/, '')}${pathname}`;
}

module.exports = {
  LIST_THUMB_WIDTH,
  EMBED_THUMB_WIDTH,
  buildPhotoUrl,
  buildPhotoThumbUrl,
  toAbsoluteAssetUrl,
};
