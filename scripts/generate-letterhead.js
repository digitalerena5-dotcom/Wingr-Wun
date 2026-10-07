import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ImageRun,
  Header,
  Footer,
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function generateLetterhead() {
  const logoPath = path.join(rootDir, 'public', 'images', 'wingr_wun_logo.png');
  const logoBuffer = fs.readFileSync(logoPath);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              bottom: 1000,
              left: 1200,
              right: 1200,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.SINGLE, size: 18, color: 'C99B47' },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 15, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            children: [
                              new ImageRun({
                                data: logoBuffer,
                                transformation: { width: 55, height: 55 },
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 55, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: 'WINGR WUN',
                                bold: true,
                                size: 28,
                                font: 'Calibri',
                                color: '071925',
                              }),
                            ],
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: 'AEROSPACE SOURCING & PROCUREMENT CONSULTANCY',
                                bold: true,
                                size: 16,
                                font: 'Calibri',
                                color: 'C99B47',
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        width: { size: 30, type: WidthType.PERCENTAGE },
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                              new TextRun({
                                text: 'UNITED KINGDOM',
                                bold: true,
                                size: 16,
                                font: 'Calibri',
                                color: '31566D',
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                              new TextRun({
                                text: 'GLOBAL DEFENCE SOURCING',
                                size: 14,
                                font: 'Calibri',
                                color: '6E8798',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 12, color: 'C99B47' },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: 'Wingr Wun  |  3 Woodbridge Close, Appleton, WA4 5RD, United Kingdom',
                                size: 16,
                                font: 'Calibri',
                                bold: true,
                                color: '071925',
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: 'Email: contact@wingrwun.co.uk  |  Web: www.wingrwun.co.uk',
                                size: 15,
                                font: 'Calibri',
                                color: '31566D',
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: 'Confidentiality & Export Control: Handled in accordance with UK Strategic Export Controls. Proprietary & Non-Disclosure Protected.',
                                size: 13,
                                font: 'Calibri',
                                italics: true,
                                color: '6E8798',
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({ spacing: { before: 400, after: 200 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              insideHorizontal: { style: BorderStyle.NONE },
              insideVertical: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 60, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'REF: ', bold: true, size: 18, font: 'Calibri', color: '071925' }),
                          new TextRun({ text: 'WW/CORP/2026/001', size: 18, font: 'Calibri', color: '31566D' }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'DATE: ', bold: true, size: 18, font: 'Calibri', color: '071925' }),
                          new TextRun({ text: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), size: 18, font: 'Calibri' }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 40, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({
                            text: 'CLASSIFICATION:',
                            bold: true,
                            size: 16,
                            font: 'Calibri',
                            color: '6E8798',
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({
                            text: 'OFFICIAL // COMMERCIAL IN CONFIDENCE',
                            bold: true,
                            size: 16,
                            font: 'Calibri',
                            color: 'C99B47',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 300, after: 100 } }),
          new Paragraph({
            children: [
              new TextRun({ text: 'TO:', bold: true, size: 18, font: 'Calibri', color: '071925' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '[Recipient Name / Title]', size: 18, font: 'Calibri' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '[Organisation / Operator / MRO]', size: 18, font: 'Calibri', color: '31566D' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '[Destination Country / Region]', size: 18, font: 'Calibri' }),
            ],
          }),
          new Paragraph({ spacing: { before: 300, after: 150 } }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'SUBJECT: AVIATION PROCUREMENT CONSULTANCY & SUPPLY SPECIFICATION',
                bold: true,
                size: 20,
                font: 'Calibri',
                color: '071925',
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 150, after: 200 } }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Dear Sir / Madam,',
                size: 20,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 150, after: 200 } }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Wingr Wun provides specialised aviation procurement and aircraft component sourcing for commercial operators and international defence requirements. Through strategic global sourcing, vendor vetting, and legacy component procurement, we connect complex operational requirements with trusted aerospace suppliers worldwide.',
                size: 20,
                font: 'Calibri',
                color: '1A202C',
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 150, after: 200 } }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'All flight-critical components, rotable assemblies, and structural hardware sourced through our network are supplied with full traceability, non-incident documentation, and appropriate airworthiness certification (FAA Form 8130-3 / EASA Form 1 / OEM Certificate of Conformity). Sourcing corridors strictly conform with UK Strategic Export Controls and applicable international dual-use export regulations.',
                size: 20,
                font: 'Calibri',
                color: '1A202C',
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 150, after: 200 } }),
          new Paragraph({
            children: [
              new TextRun({
                text: '[Please insert requirement details, part numbers, quantity, urgency, and delivery milestones here.]',
                size: 20,
                font: 'Calibri',
                italics: true,
                color: '4A5568',
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 200, after: 200 } }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'We remain at your service for any technical clarifications or urgent AOG procurement support.',
                size: 20,
                font: 'Calibri',
                color: '1A202C',
              }),
            ],
          }),
          new Paragraph({ spacing: { before: 300, after: 100 } }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Yours sincerely,', size: 20, font: 'Calibri' }),
            ],
          }),
          new Paragraph({ spacing: { before: 300, after: 50 } }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Hamid Qayyum', bold: true, size: 20, font: 'Calibri', color: '071925' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Managing Director', bold: true, size: 18, font: 'Calibri', color: 'C99B47' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Wingr Wun // Strategic Procurement Desk', size: 18, font: 'Calibri', color: '31566D' }),
            ],
          }),
        ],
      },
    ],
  });

  const assetsDir = path.join(rootDir, 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const outputPath = path.join(assetsDir, 'Wingr_Wun_Official_Letterhead.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);

  console.log(`Letterhead successfully generated at: ${outputPath}`);
}

generateLetterhead().catch(console.error);
