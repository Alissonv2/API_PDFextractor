const fs = require('fs');

const PDFParser = require('pdf2json');

function Extractor(pdfPath) {
    const pdfPath = fs

    if (fs.existsSync(pdfPath)) {

		var pdfParser = new PDFParser();

		pdfParser.on("pdfParser_dataError", function (errData) {

			console.error(errData.parserError)

		});

		pdfParser.on("pdfParser_dataReady", function (pdfData) {

			var retornoHtml = "";

			pdfData.formImage.Pages.forEach(function (page, index) {

				retornoHtml += `<p>Pagina   ${(parseInt(index) + 1)}  </p>`


				var y = 0;

				page.Texts.forEach(function (text, index) {

					if (index == 0) {

						y = text.y;

					}

					text.R.forEach(function (t) {

						if (text.y !== y) {

							retornoHtml += "<br/>";

						}

						retornoHtml += decodeURIComponent(t.T);

					});

					y = text.y;

				});

				retornoHtml += "</p>";

			});


			fs.writeFile("resultado.html", retornoHtml, function (err) {

				if (err) {

					return console.log(err);

				}

			});

		});


		pdfParser.loadPDF(pdfPath);

	} else {

		console.log('Arquivo não localizado');

	}

}

module.exports = Extractor();