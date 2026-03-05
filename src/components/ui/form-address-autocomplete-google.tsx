import { useFormContext } from 'react-hook-form';
import { useRef, useEffect } from 'react';
import { FormContainer } from './auth/form-container';

interface FormAddressAutocompleteProps {
  setPosition: (pos: { lat: number; lng: number }) => void;
}

export const FormAddressAutocomplete = ({
  setPosition
}: FormAddressAutocompleteProps) => {
  const autocompleteRef = useRef<google.maps.places.PlaceAutocompleteElement | null>(null);
  const { setValue, register, unregister } = useFormContext();
  // A name for RHF if needed for overall form state/validation trigger for the input itself
  const RHF_AUTOCOMPLETE_FIELD_NAME = 'addressAutocompleteControl';

  // useEffect for react-hook-form registration (optional)
  useEffect(() => {
    register(RHF_AUTOCOMPLETE_FIELD_NAME);
    return () => {
      unregister(RHF_AUTOCOMPLETE_FIELD_NAME);
    };
  }, [register, unregister, RHF_AUTOCOMPLETE_FIELD_NAME]);

  // useEffect for Google Places Autocomplete logic
  useEffect(() => {
    const autocompleteElement = autocompleteRef.current;
    if (!autocompleteElement) {
      return; // Exit if the element is not yet available
    }

    const handlePlaceChange = () => {
      const place = autocompleteElement.place; // Access the .place property

      // Use 'address_components' as per TypeScript typings for PlaceResult
      if (!place || !place.address_components) {
        console.warn('PlaceAutocompleteElement: No place selected or address_components missing.');
        // Clear related form fields
        setValue('address.line1', '');
        setValue('address.locality', '');
        setValue('address.majorAdminDivision', '');
        setValue('address.postalCode', '');
        setValue('address.country', '');
        // Optionally clear position or set to a default invalid state
        // setPosition({ lat: NaN, lng: NaN });
        return;
      }

      // Helper to get address components, adhering to snake_case from PlaceResult types
      const get = (types: string[], useShort = false): string => {
        const comp = place.address_components?.find((c) =>
          types.some((t) => c.types.includes(t))
        );
        return comp ? (useShort ? comp.short_name : comp.long_name) : '';
      };

      const streetNumber = get(['street_number']);
      const route = get(['route']);
      const street = `${streetNumber} ${route}`.trim();

      setValue('address.line1', street);
      setValue(
        'address.locality',
        get(['locality']) ||
          get(['sublocality_level_1']) ||
          get(['postal_town'])
      );
      setValue(
        'address.majorAdminDivision',
        get(['administrative_area_level_1'], true)
      );
      setValue('address.postalCode', get(['postal_code']));
      setValue('address.country', get(['country'], true));

      // Location handling: Use place.geometry.location as per PlaceResult types
      let lat: number | undefined;
      let lng: number | undefined;

      if (place.geometry?.location) {
        // place.geometry.location is a google.maps.LatLng object
        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();
      } else {
        console.warn('PlaceResult is missing geometry.location');
      }

      if (lat !== undefined && lng !== undefined) {
        setPosition({ lat, lng });
      } else {
        // Optionally handle the case where location could not be determined
        // e.g., setPosition({ lat: NaN, lng: NaN });
      }
    };

    autocompleteElement.addEventListener('gmp-placechange', handlePlaceChange);

    // Cleanup: remove the event listener
    return () => {
      autocompleteElement.removeEventListener('gmp-placechange', handlePlaceChange);
    };
  }, [setValue, setPosition]); // Dependencies for this effect

  return (
    <FormContainer className="pb-2 mb-4">
      <gmp-place-autocomplete
        ref={autocompleteRef}
        placeholder="Start typing your address..."
        country-codes={JSON.stringify(['us'])}
        // For place-fields, use camelCase strings as per Google Maps API documentation for field masks
        place-fields={JSON.stringify([
          'addressComponents',  // Requesting 'addressComponents'
          'geometry',           // Requesting 'geometry' (which includes location)
          'name',               // Requesting 'name'
          'formattedAddress'    // Requesting 'formattedAddress'
        ])}
        types={JSON.stringify(['address'])}
        aria-label="Address Autocomplete" // Important for accessibility
      />

    </FormContainer>
  );
};