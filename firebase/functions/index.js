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
      enabledLocationIds: [ `${process.env.SQUARE_LOCATION_ID}` ],
      productTypes: [ "APPOINTMENTS_SERVICE" ]
    });

    if (!items) {
      items = [];
    }
    return items;
  }

  getCatalogItems().then((items) => {
    res.json({items: JSON.stringify(items, replacer)})
  });
});

exports.getStaffServiceVersion = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const serviceID = req.query.serviceID;

  async function staffServiceVersion() {
    const retrieveServicePromise = catalogApi.retrieveCatalogObject(serviceID);
    const listActiveTeamMembersPromise = teamApi.searchTeamMembers({
      query: {
        filter: {
          locationIds: [ `${process.env.SQUARE_LOCATION_ID}` ],
          status: "ACTIVE"
        }
      }
    });

    const [ { result: service }, { result: { teamMembers } } ] =
      await Promise.all([ retrieveServicePromise, listActiveTeamMembersPromise ]);
    
    return [teamMembers, service];
  }

  staffServiceVersion().then((x) => {
    res.json({
      team: JSON.stringify(x[0], replacer), 
      service: JSON.stringify(x[1], replacer),
    });
  });
});

exports.getAvailabilities = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const query = req.query;

  async function availabilitySearch() {
    const { result } = await bookingsApi.searchAvailability(query);
    return result;
  }
  
  availabilitySearch().then((x) => {
    res.json(JSON.stringify(x, replacer));
  });
});

exports.getTeamMemberServiceData = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const serviceId = req.query.serviceId;
  const serviceVersion = req.query.serviceVersion;
  const teamMemberId = req.query.teamMemberId;
  const startAt = req.query.startAt;


  async function teamMemberServiceData() {
    const retrieveServicePromise = catalogApi.retrieveCatalogObject(serviceId, true);
    const retrieveTeamMemberPromise = bookingsApi.retrieveTeamMemberBookingProfile(teamMemberId);

    const [ { result: { object : serviceItem } }, { result: { teamMemberBookingProfile } } ] = 
      await Promise.all([ retrieveServicePromise, retrieveTeamMemberPromise ]);

      const serviceData = {
        serviceItem: serviceItem,
        teamMemberBookingProfile: teamMemberBookingProfile,
        serviceVersion: serviceVersion,
        startAt: startAt
      }
      
      return serviceData;
  }

  teamMemberServiceData().then((x) => {
    res.json(JSON.stringify(x, replacer));
  })

})