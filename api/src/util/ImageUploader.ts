import express from "express";
import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const router = express.Router();

// AWS S3 setup
const s3Config: S3ClientConfig = {
  region: process.env.AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
};
const s3Client = new S3Client(s3Config);

router.get("/upload-url", async (req, res) => {
  try {
    const fileName = req.query.fileName as string;
    const fileType = req.query.fileType as string;

    if (!fileName || !fileType) {
      return res
        .status(400)
        .json({ message: "fileName and fileType are required" });
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `car-photo-bucket/${fileName}`,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 min
    res.json({ uploadUrl: url, key: `car-photo-bucket/${fileName}` });
  } catch (error) {
    console.error("S3 Signed URL Error:", error);
    res.status(500).json({ message: "Failed to generate signed URL", error });
  }
});

export default router;
