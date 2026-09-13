/**
 * Cloudinary Media Utility for Knowvy
 * Compatible with both Client and Server Components without bundling Node.js dependencies into browser bundles.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "agdaiyhe";

/**
 * Transforms or optimizes an image URL with format & quality auto-selection.
 * Works seamlessly in both browser (Client Components) and Node (Server Components).
 *
 * @param {string} url - Target image URL
 * @param {Object} options - Transformation options (width, height, quality, format)
 * @returns {string} - Optimized URL
 */
export function getOptimizedMediaUrl(url, options = {}) {
  if (!url) {
    return "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";
  }

  const { width, height, quality = "auto", format = "auto" } = options;

  // 1. If it's already a Cloudinary image, inject transformations into the path
  if (url.includes("res.cloudinary.com")) {
    const parts = [];
    if (format) parts.push(`f_${format}`);
    if (quality) parts.push(`q_${quality}`);
    if (width) parts.push(`w_${width}`);
    if (height) parts.push(`h_${height},c_fill`);

    const transformStr = parts.join(",");
    if (!transformStr) return url;

    // Insert after /upload/
    if (url.includes("/upload/")) {
      return url.replace("/upload/", `/upload/${transformStr}/`);
    }
    return url;
  }

  // 2. If it's an Unsplash URL, format query params
  if (url.includes("images.unsplash.com")) {
    try {
      const parsed = new URL(url);
      if (width) parsed.searchParams.set("w", width.toString());
      if (quality) parsed.searchParams.set("q", quality === "auto" ? "80" : quality.toString());
      parsed.searchParams.set("auto", "format");
      parsed.searchParams.set("fit", "crop");
      return parsed.toString();
    } catch {
      return url;
    }
  }

  // 3. For any other external image, return as-is
  return url;
}

/**
 * Upload an external event banner image to Cloudinary (Server-Only)
 * Uses dynamic import so that Node-only modules (fs, http) are never bundled into client components.
 *
 * @param {string} imageUrl - External image URL (from MLH, Unstop, Devpost, Devfolio)
 * @param {string} publicId - Custom public ID (e.g. event slug)
 * @returns {Promise<string>} - The optimized Cloudinary secure URL
 */
export async function uploadEventBanner(imageUrl, publicId) {
  if (!imageUrl) {
    return "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80";
  }

  // If image is already on Cloudinary, return as-is
  if (imageUrl.includes("cloudinary.com")) {
    return imageUrl;
  }

  // Guard against browser execution
  if (typeof window !== "undefined") {
    return imageUrl;
  }

  try {
    const { v2: cloudinary } = await import("cloudinary");

    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL,
      secure: true,
    });

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "knowvy/events/banners",
      public_id: publicId ? `event_${publicId.replace(/[^a-zA-Z0-9_-]/g, "_")}` : undefined,
      overwrite: true,
      transformation: [
        { width: 1200, height: 630, crop: "fill", gravity: "auto" },
        { fetch_format: "auto", quality: "auto" },
      ],
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.warn(`[Cloudinary] Failed to upload ${imageUrl}, falling back to original:`, error.message);
    return imageUrl;
  }
}
