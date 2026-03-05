/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 26/02/2025 23:54
 */

export interface Geometry {
  type: string
  coordinates: [number, number]
}

export interface IpAddress {
  countryCode: string
  country: string
  countryFlag: string
  state: string
  city: string
  latitude: number
  longitude: number
  geometry: Geometry
  connectionType: string
  stateCode: string
  stateConfidence: string
  countryConfidence: string
  stateAllowed: boolean
  countryAllowed: boolean
  layer: string
}

export interface Privacy {
  hosting: boolean
  proxy: boolean
  relay: boolean
  service: string
  tor: boolean
  vpn: boolean
}

export interface ASN {
  asn: string
  country: string
  domain: string
  name: string
  network: string
  type: string
}

export interface Fraud {
  compromised: boolean
  blocked: boolean
  bypassed: boolean
  inaccurate: boolean
  jumped: boolean
  mocked: boolean
  passed: boolean
  proxy: boolean
  verified: boolean
  sharing: boolean
  lastMockedAt: string
  lastProxyAt: string
  ipAddress: IpAddress
  privacy: Privacy
  asn: ASN
}

export interface CountryOrState {
  _id: string
  type: string
  allowed: boolean
  passed: boolean
  name: string
  code: string
  icon: string
}

export interface StateExtended extends CountryOrState {
  inExclusionZone: boolean
  inInclusionZone: boolean
}

export interface PostalCode {
  code: string;
}

export interface RadarUser {
  location: Geometry
  fraud: Fraud

  _id: string
  live: boolean
  geofences: any[]
  debug: boolean
  failureReasons: any[]
  createdAt: string
  updatedAt: string
  actualUpdatedAt: string
  notificationsDelivered: any[]
  deviceId: string
  installId: string
  foreground: boolean
  stopped: boolean
  locationAccuracy: number
  deviceType: string
  sdkVersion: string
  ip: string
  userAgent: string
  locationAuthorization: string
  sessionId: string
  passed: boolean
  userId: string
  country: CountryOrState
  state: StateExtended
  postalCode?: PostalCode
}

export interface RadarResponse {
  _id: string
  events: any[]
  user: RadarUser
  passed: boolean
  expiresIn: number
  expiresAt: string
  failureReasons: any[]
  iat: number
  exp: number
}
