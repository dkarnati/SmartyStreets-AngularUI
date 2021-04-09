const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
 let key = process.env.SMARTY_WEBSITE_KEY;
// let hostname = process.env.SMARTY_AUTH_REFERER;
 const credentials = new SmartyStreetsCore.SharedCredentials(key);
let client = SmartyStreetsCore.buildClient.usStreet(credentials);
// .withLicenses(["us-rooftop-geocoding-cloud"]);

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/us-street-api#input-fields

let lookup1 = new Lookup();
lookup1.inputId = "24601";  // Optional ID from your system
lookup1.addressee = "John Doe";
lookup1.street = "330 N 100 W";
lookup1.street2 = "closet under the stairs";
lookup1.secondary = "APT 2";
lookup1.urbanization = "";  // Only applies to Puerto Rico addresses
lookup1.city = "Provo";
lookup1.state = "Utah";
lookup1.zipCode = "84601";
lookup1.maxCandidates = 3;
lookup1.match = "invalid"; // "invalid" is the most permissive match,
                           // this will always return at least one result even if the address is invalid.
                           // Refer to the documentation for additional MatchStrategy options.

client.send(lookup1)
	.then(handleSuccess)
	.catch(handleError);

function handleSuccess(response) {
	response.lookups.map(lookup => console.log(lookup.result));
}

function handleError(response) {
	console.log(response);
}
