import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Client = new AWS.S3({
  endpoint: process.env.DO_SPACE_URL,
  region: "nyc3",
  credentials: {
    accessKeyId: process.env.DO_SPACE_ID,
    secretAccessKey: process.env.DO_SECRET,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (!files.file) {
      return res.status(400).json({ error: "No file provided" });
    }
    try {
      const name = `${files.file?.name || "image"}-${Date.now()}`;
      return s3Client.putObject(
        {
          Bucket: process.env.DO_SPACE_BUCKET,
          Key: name,
          Body: fs.createReadStream(files.file.filepath),
          ACL: "public-read",
        },
        async () => {
          return res.status(200).json({ message: "success", body: name });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Something went wrong" });
    }
  });
}
