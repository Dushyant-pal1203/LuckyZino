/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 27/02/2025 14:38
 */

export enum RadarFailureReason {
  COUNTRY_NOT_ALLOWED = 'country_not_allowed',
  COUNTRY_NOT_EXPECTED = 'country_not_expected',
  COUNTRY_IN_BUFFER_ZONE = 'country_in_buffer_zone',
  COUNTRY_IN_EXCLUSION_ZONE = 'country_in_exclusion_zone',

  STATE_NOT_ALLOWED = 'state_not_allowed',
  STATE_NOT_EXPECTED = 'state_not_expected',
  STATE_IN_BUFFER_ZONE = 'state_in_buffer_zone',
  STATE_IN_EXCLUSION_ZONE = 'state_in_exclusion_zone',

  FRAUD_BLOCKED_USER_ID = 'fraud_blocked_user_id',
  FRAUD_BLOCKED_DEVICE_ID = 'fraud_blocked_device_id',
  FRAUD_BLOCKED_IP = 'fraud_blocked_ip',
  FRAUD_BLOCKED_MAC_ADDRESS = 'fraud_blocked_mac_address',
  FRAUD_BLOCKED_RISK_SCORE_AUTO_BLOCK = 'fraud_blocked_risk_score_auto_block',

  FRAUD_COMPROMISED_JAILBROKEN = 'fraud_compromised_jailbroken',
  FRAUD_COMPROMISED_APP_ATTEST = 'fraud_compromised_app_attest',
  FRAUD_COMPROMISED_PLAY_INTEGRITY_API = 'fraud_compromised_play_integrity_api',

  FRAUD_MOCKED_FROM_MOCK_PROVIDER = 'fraud_mocked_from_mock_provider',
  FRAUD_MOCKED_KNOWN_SPOOFING_APP = 'fraud_mocked_known_spoofing_app',
  FRAUD_MOCKED_INCONSISTENT_IP_COUNTRY = 'fraud_mocked_inconsistent_ip_country',

  FRAUD_JUMPED_SINGLE_DEVICE = 'fraud_jumped_single_device',
  FRAUD_JUMPED_MULTIPLE_DEVICES = 'fraud_jumped_multiple_devices',

  FRAUD_INACCURATE_EXCEEDED_ACCURACY_THRESHOLD = 'fraud_inaccurate_exceeded_accuracy_threshold',

  FRAUD_SHARING_KNOWN_SCREEN_SHARING_APP = 'fraud_sharing_known_screen_sharing_app',
  FRAUD_SHARING_MULTIPLE_DISPLAYS = 'fraud_sharing_multiple_displays',
  FRAUD_SHARING_VIRTUAL_INPUT_DEVICE = 'fraud_sharing_virtual_input_device',

  FRAUD_PROXY_KNOWN_PROXY_IP = 'fraud_proxy_known_proxy_ip',
  FRAUD_PROXY_NETWORK_CONFIGURATION = 'fraud_proxy_network_configuration',

  UNABLE_TO_VERIFY_GEOLOCATION = 'unable_to_verify_geolocation',

  ERROR_PERMISSIONS = 'ERROR_PERMISSIONS',
  ERROR_LOCATION = 'ERROR_LOCATION',
  ERROR_NETWORK = 'ERROR_NETWORK',
}
