/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 27/02/2025 14:32
 */
import { ErrorCode } from '@/lib/errors';

export class GeolocationError extends Error {
  constructor(message: string, public readonly reason: ErrorCode) {
    super(message);
    this.name = 'GeolocationError';
  }
}
