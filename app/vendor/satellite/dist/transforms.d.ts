import type { Degrees, EcfVec3, EciVec3, GeodeticLocation, GMSTime, Kilometer, KilometerPerSecond, LookAngles, Radians } from './common-types.js';
export declare function radiansToDegrees(radians: Radians): Degrees;
export declare function degreesToRadians(degrees: Degrees): Radians;
export declare function degreesLat(radians: Radians): Degrees;
export declare function degreesLong(radians: Radians): Degrees;
export declare function radiansLat(degrees: Degrees): Radians;
export declare function radiansLong(degrees: Degrees): Radians;
export declare function geodeticToEcf({ longitude, latitude, height, }: GeodeticLocation): EcfVec3<Kilometer>;
export declare function eciToGeodetic(eci: EciVec3<Kilometer>, gmst: GMSTime): GeodeticLocation;
export declare function ecfToEci(ecf: EcfVec3<number>, gmst: GMSTime): EciVec3<number>;
export declare function eciToEcf(eci: EciVec3<number>, gmst: GMSTime): EcfVec3<number>;
/**
 * Converts an ECI velocity to a true ECF velocity.
 *
 * `eciToEcf(velocityEci, gmst)` only re-expresses the ECI velocity vector in ECF
 * axes; the result still contains the motion of the rotating Earth. A true ECF
 * velocity, the rate of change of the ECF position, also has the velocity of the
 * rotating frame at the satellite's position, ω × r_ecf, subtracted.
 *
 * Note: in this major version `dopplerFactor` still expects the rotated-only
 * velocity from `eciToEcf(velocityEci, gmst)`, not this function's output.
 */
export declare function eciToEcfVelocity(positionEci: EciVec3<Kilometer>, velocityEci: EciVec3<KilometerPerSecond>, gmst: GMSTime): EcfVec3<KilometerPerSecond>;
/**
 * Converts a true ECF velocity back to an ECI velocity: the inverse of
 * `eciToEcfVelocity`.
 *
 * It adds the velocity of the rotating frame at the satellite's position,
 * ω × r_ecf, back to the ECF velocity and rotates the result into ECI axes.
 * `ecfToEci(velocityEcf, gmst)` alone only rotates the axes, so it leaves the
 * Earth's rotation out.
 */
export declare function ecfToEciVelocity(positionEcf: EcfVec3<Kilometer>, velocityEcf: EcfVec3<KilometerPerSecond>, gmst: GMSTime): EciVec3<KilometerPerSecond>;
export declare function ecfToLookAngles(observerGeodetic: GeodeticLocation, satelliteEcf: EcfVec3<Kilometer>): LookAngles;
