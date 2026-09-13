/**
 * Cloudinary Media Optimization Utility
 * Automatically injects responsive widths, auto-format (WebP/AVIF),
 * auto-quality compression, and aspect-ratio transformations.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "agdaiyhe";

/**
 * Returns an optimized Cloudinary delivery URL.
 * If given an external URL (e.g. Unsplash), it returns the URL or wraps it in Cloudinary fetch if supported.
 *
 * @param {string} publicIdOrUrl - Cloudinary public ID or media URL
 * @param {object} options - Transformation options
 * @param {number} [options.width] - Target width in pixels
 * @param {number} [options.height] - Target height in pixels
 * @param {string} [options.crop] - Crop mode (e.g., 'fill', 'scale', 'thumb')
 * @param {number} [options.quality] - Quality (default 'auto')
 * @param {string} [options.format] - Format (default 'auto')
 * @returns {string}
 */
export function getOptimizedMediaUrl(publicIdOrUrl, options = {}) {
  if (!publicIdOrUrl) return "";

  // If it's already a full HTTP URL
  if (publicIdOrUrl.startsWith("http://") || publicIdOrUrl.startsWith("https://")) {
    // If it's already a Cloudinary URL, inject transformations
    if (publicIdOrUrl.includes("res.cloudinary.com")) {
      const parts = publicIdOrUrl.split("/upload/");
      if (parts.length === 2) {
        const transforms = buildTransformationString(options);
        return `${parts[0]}/upload/${transforms}/${parts[1]}`;
      }
    }
    return publicIdOrUrl;
  }

  // Otherwise it's a Cloudinary public ID
  const transforms = buildTransformationString(options);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicIdOrUrl}`;
}

function buildTransformationString(options = {}) {
  const parts = ["f_auto", "q_auto"];

  if (options.width) parts.push(`w_${options.width}`);
  if (options.height) parts.push(`h_${options.height}`);
  if (options.crop) parts.push(`c_${options.crop}`);

  return parts.join(",");
}
