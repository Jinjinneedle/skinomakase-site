import type { EcfVec3, Kilometer, KilometerPerSecond } from './common-types.js';
/**
 * `velocityEcf` is the ECI velocity rotated into ECF axes, as returned by
 * `eciToEcf(velocityEci, gmst)`; the observer's rotation velocity is subtracted
 * here. Do not pass the output of `eciToEcfVelocity` to this version: that is a
 * true ECF velocity and would put the range rate off by up to ω·R·cos(latitude),
 * about 0.46 km/s at the equator. The next major version switches this function
 * to the true ECF velocity.
 *
 * Negative range rate means the satellite is moving towards the observer and
 * its frequency is shifted higher because 1 minus a negative range rate is
 * positive. If the range rate is positive, the satellite is moving away from
 * the observer and its frequency is shifted lower.
 */
export declare function dopplerFactor(observerCoordsEcf: EcfVec3<Kilometer>, positionEcf: EcfVec3<Kilometer>, velocityEcf: EcfVec3<KilometerPerSecond>): number;
