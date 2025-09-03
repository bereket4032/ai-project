// api/index.js
import { json } from 'micro';

export default async function handler(req, res) {
  res.status(200).send("Hello AI World! 🚀 This is your live serverless endpoint.");
}