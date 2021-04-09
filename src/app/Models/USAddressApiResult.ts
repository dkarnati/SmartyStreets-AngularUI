declare module namespace {

  export interface Components {
      primary_number: string;
      street_name: string;
      street_suffix: string;
      city_name: string;
      default_city_name: string;
      state_abbreviation: string;
      zipcode: string;
      plus4_code: string;
      delivery_point: string;
      delivery_point_check_digit: string;
  }

  export interface Metadata {
      record_type: string;
      zip_type: string;
      county_fips: string;
      county_name: string;
      carrier_route: string;
      congressional_district: string;
      rdi: string;
      elot_sequence: string;
      elot_sort: string;
      latitude: number;
      longitude: number;
      precision: string;
      time_zone: string;
      utc_offset: number;
      dst: boolean;
  }

  export interface Analysis {
      dpv_match_code: string;
      dpv_footnotes: string;
      dpv_cmra: string;
      dpv_vacant: string;
      dpv_no_stat: string;
      active: string;
      footnotes: string;
  }

  export interface RootObject {
      input_index: number;
      candidate_index: number;
      delivery_line_1: string;
      last_line: string;
      delivery_point_barcode: string;
      components: Components;
      metadata: Metadata;
      analysis: Analysis;
  }

}

