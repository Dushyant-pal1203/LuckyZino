import { useFormContext } from 'react-hook-form';
import { useRef, useEffect } from 'react';
import { FormContainer } from './auth/form-container';
import { FormField } from './form-field';

interface FormAddressAutocompleteProps {
  setPosition: (pos: { lat: number; lng: number }) => void;
}

export const FormAddressAutocomplete = ({
  setPosition
}: FormAddressAutocompleteProps) => {
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const { setValue, trigger } = useFormContext();

  useEffect(() => {
    if (!window.google || !autocompleteRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        types: ['address'],
        componentRestrictions: { country: 'us' }
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.address_components) return;

      const get = (types: string[], useShort = false) => {
        const comp = place.address_components?.find((c) =>
          types.some((t) => c.types.includes(t))
        );
        return comp ? (useShort ? comp.short_name : comp.long_name) : '';
      };

      const street = `${get(['street_number'])} ${get(['route'])}`.trim();
      const locality = get(['locality']) || get(['sublocality_level_1']) || get(['postal_town']) || '';
      const majorAdminDivision = get(['administrative_area_level_1'], true) || '';
      const postalCode = get(['postal_code']) || '';
      const country = get(['country'], true) || 'US';

      setValue('address.line1', street, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('address.line2', '', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('address.locality', locality, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('address.majorAdminDivision', majorAdminDivision, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('address.postalCode', postalCode, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue('address.country', country, { shouldValidate: true, shouldDirty: true, shouldTouch: true });

      if (place.geometry?.location) {
        const loc = place.geometry.location;
        setPosition({ lat: loc.lat(), lng: loc.lng() });
      }
    });
  }, [setValue, trigger, setPosition]);

  return (
    <FormContainer className="pb-2 mb-4">
      <FormField
        ref={autocompleteRef}
        name="addressSearchField" // This name is different to avoid conflict with the validation schema expecting the object
        placeholder="Start typing your address..."
        label={''}
        type={'text'} // className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </FormContainer>
  );
};
