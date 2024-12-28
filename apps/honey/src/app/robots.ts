import { MetadataRoute } from "next";
import { isIPFS } from "@bera/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      [isIPFS || process.env.DONT_INDEX === "1" ? "disallow" : "allow"]: "/",
    },
  };
}
