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
  });
});

exports.createAppointment = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  var JSONserviceData;
  var JSONuserData;

  // handles request from app-router front end. if there is no query, we have data in the body
  if (Object.keys(req.query).length === 0) {
    JSONserviceData = req.body.serviceData;
    JSONuserData = req.body.userData;
  }
  // handle request from page-router front end. if there is no body, we have data in the query
  else if (Object.keys(req.body).length === 0) {
    const JSONdata = JSON.parse(req.query.data);
    JSONserviceData = JSONdata.serviceData;
    JSONuserData = JSONdata.userData;
  }
  else {
    res.status(500).send('Something broke!')
  }

  async function getCustomerId(firstName, lastName, email) {
    const { result: { customer } } = await customersApi.createCustomer({
      emailAddress: email, 
      familyName: lastName,
      givenName: firstName,
      referenceId: "BOOKINGS-SAMPLE-APP",
    })
  
    return customer.id;
  }

  async function getBooking(customerId) {
    const { result: { booking } } = await bookingsApi.createBooking({
      booking: {
        appointmentSegments: [
          {
            serviceVariationId: JSONserviceData.serviceVersion,
            serviceVariationVersion: JSONserviceData.serviceItem.version,
            teamMemberId: JSONserviceData.teamMemberBookingProfile.teamMemberId,
          }
        ],
        customerId: customerId,
        customerNote: JSONuserData.note,
        locationId: `${process.env.SQUARE_LOCATION_ID}`,
        locationType: 'BUSINESS_LOCATION',
        startAt: JSONserviceData.startAt,
      }
    })

    return booking;
  }
  
  getCustomerId(JSONuserData.firstName, JSONuserData.lastName, JSONuserData.email)
    .then((customerId) => {
  getBooking(customerId)
    .then((booking) => {
  res.json({booking: JSON.stringify(booking, replacer), teamMember: JSON.stringify(JSONserviceData.teamMemberBookingProfile.displayName, replacer)});
    })
  });

});