
<![CDATA[
const libxmljs = require('libxmljs');
const db = require('your-db-module'); // Replace with your actual database module
const DOMPurify = require('dompurify'); // Importing DOMPurify for sanitizing XML input
]]>

const express = require('express')
const libxmljs = require('libxml')
const db = require('db');
const router = express.Router()

router.post('/upload-products', 
(req, res) => {
    try {
        const XMLfile = req.files.products.data;

        // Sanitize the XML input to prevent any unwanted entities
        const sanitizedXML = sanitizeXML(XMLfile);

        // Parse the sanitized XML string without enabling external entity expansion
        const products = libxmljs.parseXmlString(sanitizedXML, { noent: false, noblanks: true });

        products.root().childNodes().forEach(product => {
            let newProduct = new db.Product();
            newProduct.name = product.childNodes()[0].text();
            newProduct.description = product.childNodes()[3].text();
            newProduct.save();
        });

        res.send('Thanks');
    } catch (error) {
        console.error("Error processing XML: ", error);
        res.status(500).send('Internal Server Error');
    }

    // Function to sanitize XML input
    function sanitizeXML(xml) {
        return DOMPurify.sanitize(xml, { USE_PROFILES: { xml: true } });
    }
}
)

module.exports = router
