import { UsStreetVerificationHelper } from './../../../Util/UsStreetVerificationHelper';
// import { Lookup } from 'smartystreets-javascript-sdk/src/us_street/Lookup';
import { environment } from './../../../environments/environment';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as SmartyStreetsSDK from 'smartystreets-javascript-sdk'
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { _MatOptionBase } from '@angular/material/core';
@Component({
  selector: 'app-mat-address-form',
  templateUrl: './mat-address-form.component.html',
  styleUrls: ['./mat-address-form.component.scss']
})
export class MatAddressFormComponent {
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: ['4 NOOK ALLEY', Validators.required],
    address2: null,
    city: ['Meccanicsburg', Validators.required],
    state: ['PA', Validators.required],
    county: [{value:null, disabled: true}],
    postalCode: [null, Validators.compose([Validators.minLength(5), Validators.maxLength(5)])],
    postalCodeExt: [null, Validators.compose([Validators.minLength(4), Validators.maxLength(4)])],
    addressVerificationType : ['2', Validators.required],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  @ViewChild(MatAutocompleteTrigger, {read: MatAutocompleteTrigger}) inputAutoComplete: MatAutocompleteTrigger;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

  constructor(private fb: FormBuilder,private usVerify:UsStreetVerificationHelper) {}
  addressOptions = <any>[];

  addressChange(evt){
    if((this.addressForm.get('address').value as string).length > 5){
      this.AutocompleteAddress(this.addressForm.get('address').value).then(data => {
        this.addressOptions = data.result as any[];
      }).catch();
      evt.stopPropagation();
      this.inputAutoComplete.openPanel();
    }
    else{
      this.addressOptions = [];
    }
  }
  //perform address verification on submit
  onSubmit() {
    this.addressOptions = [];
    const Lookup = SmartyStreetsSDK.usStreet.Lookup;
    const lookup1 = new Lookup();
    lookup1.inputId = "24601";  // Optional ID from your system
    // lookup1.addressee = "John Doe";
    lookup1.street = this.addressForm.controls['address'].value;
    lookup1.street2 = this.addressForm.controls['address2'].value;
    // lookup1.secondary = this.addressForm.controls['address'].value;
    // lookup1.urbanization = "";  // Only applies to Puerto Rico addresses
    lookup1.city = this.addressForm.controls['city'].value;
    lookup1.state = this.addressForm.controls['state'].value;
    lookup1.zipCode =  this.addressForm.controls['postalCode'].value;
    lookup1.maxCandidates = 3;
    lookup1.match = "exact"; // "invalid" is the most permissive match,
                               // this will always return at least one result even if the address is invalid.
                               // Refer to the documentation for additional MatchStrategy options.
    this.usVerify.getAddress(lookup1).then(data =>
      // this.addressOptions = data[0].deliveryLine1 + ' '  + data[0].lastLine
      data.lookups.map(lookup => lookup.result.forEach(element => {
        var obj = {text:element.deliveryLine1 + ' ' + element.lastLine
                   ,streetLine: element.deliveryLine1
                   ,city:element.components.cityName
                  ,state:element.components.state
                 , zipCode :element.components.zipCode
                 ,postalCodeExt: element.components.plus4Code
                , countyName  :element.metadata.countyName
              };
        this.addressOptions.push(obj);
        console.log(this.addressOptions,'1');
        console.log(element,'2');
      }))
      );
    // console.log( this.addressOptions.deliveryLine1 + ' '  + this.addressOptions.lastLine);
    this.inputAutoComplete.openPanel();
  }
  onAddressTextChange():void{
    if(this.addressForm.get('address').value == ''){
      this.addressOptions = [];
    }
  }
  //lookup address and populate state and city
  getAddressSelected(selectedVal: string):void{
    let selectedAddress = selectedVal;
    this.addressOptions.forEach(element => {
      if(element.text == selectedVal){
        this.addressForm.get('address').setValue(element.streetLine);
        this.addressForm.get('city').setValue(element.city);
        this.addressForm.get('state').setValue(element.state);
        if(this.addressForm.controls['addressVerificationType'].value == "2"){
          this.addressForm.get('postalCode').setValue(element.zipCode);
          console.log('element.zipCode',element.zipCode);
          this.addressForm.get('county').setValue(element.countyName);
          this.addressForm.get('postalCodeExt').setValue(element.postalCodeExt);
        }
        console.log('result',element);
      }
    });
  }

    //sdk call for address lookup
    AutocompleteAddress(term: string): any {
      const SmartyStreetsCore = SmartyStreetsSDK.core;
      const websiteKey = environment.SMARTY_WEBSITE_KEY; // Your Website Key
      const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;
      const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey);
       const clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
      const client = clientBuilder.buildUsAutocompleteClient();
      const lookup = new Lookup(term);
      lookup.GeolocateType = "null";
      lookup.MaxCandidates = 10;
      return client.send(lookup);
    }
}
