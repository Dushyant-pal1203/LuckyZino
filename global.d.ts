// In global.d.ts (or your chosen .d.ts file)

// Augment the existing google.maps.places namespace
declare namespace google.maps.places {
  interface PlaceAutocompleteElement extends HTMLElement {
    /**
     * The PlaceResult for the selected place. This is populated after the
     * 'gmp-placechange' event is fired.
     * Note: The actual structure of the PlaceResult object (e.g., snake_case vs camelCase
     * for properties like address_components) will depend on how it's provided by the API
     * and defined in your @types/google.maps. This example assumes conformance with
     * standard PlaceResult typings which often use snake_case.
     */
    place?: google.maps.places.PlaceResult;

    // Attributes as properties (optional, for JS access if needed)
    countryCodes?: string[] | string;
    placeFields?: string[] | string;
    types?: string[] | string;
    value?: string;
  }
}

// Define the JSX intrinsic element for TypeScript
declare namespace JSX {
  interface IntrinsicElements {
    'gmp-place-autocomplete': React.DetailedHTMLProps<
      React.HTMLAttributes<google.maps.places.PlaceAutocompleteElement> & {
        "country-codes"?: string;    // JSON string array: e.g., '["us", "ca"]'
        "place-fields"?: string;     // JSON string array of fields (use camelCase here as per API docs for field masks)
        "types"?: string;            // JSON string array: e.g., '["address"]'
        "placeholder"?: string;
        "value"?: string;
        "aria-label"?: string;
        // Add other HTML attributes the web component accepts
      },
      google.maps.places.PlaceAutocompleteElement
    >;
  }
}