const fs = require('fs');
const simpleParser = require('mailparser').simpleParser;
const pdf = require('html-pdf');
const pdfToImage = require('../utils/pdf');

class EmlPdfImage {
    constructor() {};

    emlToPdf(input, output) {
        return new Promise(async (resolve, rejects) => {
            let file = fs.readFileSync(input);
            simpleParser(file, {}, (err, parser) => {
                if (err) rejects({ success: false, text: 'Arquivo não pode ser convertido' })
                const html = `
                    <div>
                        <div><b> De: </b>${parser.from.html}</div>
                        <div><b> Para: </b>${parser.to.html}</div>
                        <div><b> Assunto: </b>${parser.subject}</div>
                    </div>
                    <br/>
                    ${parser.html}
                `;
                pdf.create(html, {}).toFile(output), (res) => {
                    fs.unlinkSync(input);
                    resolve ({ success: true, text: 'Arquivo convertido com sucesso!' });
                }
            });
        })
    }

    emlToImage(input) {
        return new Promise(async (resolve, rejects) => {
            let file = fs.readFileSync(input);
            simpleParser(file, {}, (err, parser) => {
                if (err) rejects({ success: false, text: 'Arquivo não pode ser convertido' })
                const html = `
                    <div>
                        <div><b> De: </b>${parser.from.html}</div>
                        <div><b> Para: </b>${parser.to.html}</div>
                        <div><b> Assunto: </b>${parser.subject}</div>
                    </div>
                    <br/>
                    ${parser.html}
                `;
                let options = {
                    format: 'Latter',
                    orientation: 'landscape',
                    border: {
                        top: '0.5in',
                        rigth: '0.3in',
                        bottom: '0.3in',
                        left: '0.5in',
                    },
                    type: 'pdf',
                    quality: '75'
                }
                pdf.create(html, options).toFile(input.replace(/.eml/g, '.pdf'), (res) => {
                    let baseFilePath = input.split('/')[input.split('/').length - 1];
                    pdfToImage(input.replace(/.eml/g, '.pdf'), {
                        format: 'jpeg',
                        outdir: `${baseFilePath}`,
                        singleFile: false,
                    })
                    .then(() => {
                        fs.unlinkSync(input);
                        fs.unlinkSync(input.replace(/.eml/g, '.pdf'));
                        resolve({ success: true, text: 'Arquivo convertido com sucesso!' });
                    })
                    .catch((error) => {
                        rejects(error);
                    })
                })
            });
        });
    }
}

module.exports = new EmlPdfImage();