import { environment } from './../environments/environment';
import Lookup from "smartystreets-javascript-sdk/src/us_street/Lookup";
import * as SmartyStreetsSDK from 'smartystreets-javascript-sdk'
import { analyzeAndValidateNgModules } from '@angular/compiler';
export class UsStreetVerificationHelper {

SmartyStreetsCore = SmartyStreetsSDK.core;
// const Lookup = SmartyStreetsSDK.usStreet.Lookup;
key:string = environment.SMARTY_WEBSITE_KEY;
credentials = new this.SmartyStreetsCore.SharedCredentials(this.key);
client = this.SmartyStreetsCore.buildClient.usStreet(this.credentials);
getAddress(lookup:Lookup):any{
   return this.client.send(lookup);
    // .then(handleSuccess)
    // .catch(handleError);
  };
}
  function handleSuccess(response):any {
    let result:any;
    response.lookups.map(lookup =>
      // console.log(lookup.result);
      result = lookup.result
    );
    console.log(result);
    return result;
  }

  function handleError(response) {
    console.log(response);
  }



// Documentation for input fields can be found at:
// https://smartystreets.com/docs/us-street-api#input-fields

// let lookup1 = new Lookup();
// lookup1.inputId = "24601";  // Optional ID from your system
// lookup1.addressee = "John Doe";
// lookup1.street = "330 N 100 W";
// lookup1.street2 = "closet under the stairs";
// lookup1.secondary = "APT 2";
// lookup1.urbanization = "";  // Only applies to Puerto Rico addresses
// lookup1.city = "Provo";
// lookup1.state = "Utah";
// lookup1.zipCode = "84601";
// lookup1.maxCandidates = 3;
// lookup1.match = "invalid"; // "invalid" is the most permissive match,
//                            // this will always return at least one result even if the address is invalid.
//                            // Refer to the documentation for additional MatchStrategy options.

