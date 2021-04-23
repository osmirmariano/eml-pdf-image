const fs = require('fs');
const simpleParser = require('mailparser').simpleParser;
const pdf = require('html-pdf');
const pdfToImage = require('./utils/pdf.js');

class EmlPdfImage {
    constructor() {};

    async emlToPdf(input, output) {
        try {
            let file = fs.readFileSync(input);
            simpleParser(file, {}, (err, parser) => {
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
                    return { success: true, text: 'Arquivo convertido com sucesso!' };
                }
            })
        } catch (error) {
            throw error;
        }
    }

    async emlToImage(input, output) {
        try {
            let file = fs.readFileSync(input);
            simpleParser(file, {}, (err, parser) => {
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
                    
                    pdfToImage(file, {

                    })
                    return { success: true, text: 'Arquivo convertido com sucesso!' };
                }
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new EmlPdfImage();