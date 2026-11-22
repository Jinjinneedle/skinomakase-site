import type { OMMJsonObject } from './common-types.js';
import type { SatRec } from './propagation/SatRec.js';
/**
 * Return a Satellite imported from two lines of TLE data.
 *
 * Provide the two TLE lines as strings `tleLine1` and `tleLine2`,
 * and select which standard set of gravitational constants you want
 * by providing `gravity_constants`:
 *
 * `sgp4.propagation.wgs72` - Standard WGS 72 model
 * `sgp4.propagation.wgs84` - More recent WGS 84 model
 * `sgp4.propagation.wgs72old` - Legacy support for old SGP4 behavior
 *
 * Normally, computations are made using various recent improvements
 * to the algorithm.  If you want to turn some of these off and go
 * back into "afspc" mode, then set `afspc_mode` to `True`.
 */
export declare function twoline2satrec(longstr1: string, longstr2: string): SatRec;
export declare function json2satrec(jsonobj: OMMJsonObject, opsmode?: 'a' | 'i'): SatRec;
/**
 * Converts a TLE catalog number field to a number, decoding the Alpha-5 form.
 *
 * Catalog numbers above 99999 are written in a TLE's five-character field as
 * Alpha-5: a leading letter A-Z, skipping I and O, stands for 10-33 in the
 * ten-thousands place, so `'A0000'` is 100000 and `'Z9999'` is 339999.
 *
 * A blank or whitespace-only field gives `NaN`, not the 0 that `Number()`
 * would return for it. Any other field goes through `Number()`: a five-digit
 * field gives its number, and so does anything else `Number()` accepts, such
 * as a space-padded `'    5'` (5) or `'1e3'` (1000); a field starting with I
 * or O, or a malformed one such as `'a0404'`, `'A000'` or `'AA000'`, gives
 * `NaN`.
 *
 * `twoline2satrec` keeps the field as written in `satrec.satnum`; this function
 * does not change that, it only converts a field when the caller wants a number.
 */
export declare function alpha5ToNumber(field: string): number;
