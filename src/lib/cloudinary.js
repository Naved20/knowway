import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary with CLOUDINARY_URL from .env
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
  secure: true,
});

/**
 * Upload an external event banner image to Cloudinary with automated WebP & optimization
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

  try {
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

export { cloudinary };
