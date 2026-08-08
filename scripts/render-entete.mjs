import { pdfToPng } from "pdf-to-png-converter";
import { mkdirSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

mkdirSync("tmp-plaquette/header", { recursive: true });

const pages = await pdfToPng("tmp-plaquette/TSALACH-Entete.pdf", {
  outputFolder: "tmp-plaquette/header",
  viewportScale: 2,
  outputFileMaskFunc: (i) => `page_${i + 1}`,
});

console.log(
  "pages",
  pages.map((p) => p.path),
);

if (existsSync("tmp-plaquette/TSALACH-Entete.pdf")) {
  copyFileSync(
    "tmp-plaquette/TSALACH-Entete.pdf",
    "public/company-profile.pdf",
  );
  copyFileSync(
    "tmp-plaquette/TSALACH-Entete.pdf",
    "public/docs/TSALACH-Entete.pdf",
  );
  console.log("copied company-profile.pdf");
}
