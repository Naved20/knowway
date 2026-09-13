/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["cloudinary", "nodemailer"],
};

export default nextConfig;
