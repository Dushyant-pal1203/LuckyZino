/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 05/03/2025 18:20
 */

export interface GeolocationToken {
  id: string;
  country: string;
  state: string;
  zip?: string;
  ip?: string;
  ua?: string;
  fingerprintId: string;
}
