// Region labels group the source data's integrated address prefix by district.
(function () {
  const gwangjuDistricts = new Set(['동구', '서구', '남구', '북구', '광산구']);
  window.shelterRegionFor = function (address, regions) {
    const parts = String(address || '').trim().split(/\s+/);
    if (parts[0] === '전남광주통합특별시') {
      return gwangjuDistricts.has(parts[1]) ? 'gwangju' : 'jeonnam';
    }
    return regions.find(r => r.prefixes.some(prefix => parts[0].startsWith(prefix)))?.id || null;
  };
})();
