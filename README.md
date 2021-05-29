# eml-pdf-imagem

** Biblioteca para converter arquivo eml para pdf e eml para imagem

## Aplicação ##
Converter EML para PDF
```js
const emlPdfImage = require('eml-pdf-image');

let conversao = await emlPdfImage.emlToPdf('./exemplo/exemplo.eml');
conversao.success ? 'Arquivo convertido com sucesso' : 'Não foi possível converter';
```

Converter EML para IMAGEM (JEPG)
```js
const emlPdfImage = require('eml-pdf-image');

let conversao = await emlPdfImage.emlToImage('./exemplo/exemplo.eml');
conversao.success ? 'Arquivo convertido com sucesso' : 'Não foi possível converter'
```

## License ##

Este projeto é licenciado sobre MIT License - [LICENSE.md](LICENSE) para mais detalhes vide arquivo

## Perfil ##
* E-mail: osmirmarianocc@gmail.com
* Link do npm https://www.npmjs.com/package/eml-pdf-image
