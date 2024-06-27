const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const {
  catalogApi,
  bookingsApi,
  teamApi,
  customersApi,
} = require("./square-client");

const replacer = (key, value) => key === 'version' || key === 'serviceDuration' || key === 'amount' || key === 'serviceVariationVersion' || key === 'ordinal' ? value.toString() : value;

exports.getCatalogServices = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  async function getCatalogItems() {
    let { result: { items }} = await catalogApi.searchCatalogItems({
      enabledLocationIds: [ '${process.env.SQUARE_LOCATION_ID}' ],
      productTypes: [ "APPOINTMENTS_SERVICE" ]
    });

    if (!items) {
      items = [];
    }
    return items;
  }

  getCatalogItems().then((items) => {
    res.json({items: JSON.stringify(items, replacer)})
  })
});