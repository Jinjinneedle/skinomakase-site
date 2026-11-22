// User-confirmed collection mapping. Planned quantities, not live inventory.
// Exact dates and pickup locations remain unset; glove server migration is deferred.
// STG-03 is reserved for a city to be chosen later.
export const gloveDropPlan={
 '1835848':{code:'STG-01',pairs:50,phase:1,window:'2026.11 · 첫 드롭 예정',photo:'app/earth-assets/gloves/stg-01.jpg',print:'app/earth-assets/gloves/stg-01-print.svg'},
 '1850147':{code:'STG-02',pairs:50,phase:3,window:'홍콩 다음 · 일본 드롭 예정',photo:null},
 '1853909':{code:null,pairs:50,phase:3,window:'홍콩 다음 · 일본 드롭 예정',photo:null},
 '1819729':{code:'STG-04',pairs:50,phase:2,window:'서울 다음 · 홍콩 드롭 예정',photo:null},
 '6167865':{code:null,pairs:50,phase:4,window:'일본 다음 · 토론토 드롭 예정',photo:null},
 '6173331':{code:'STG-06',pairs:50,phase:null,window:'드롭 일정 준비 중',photo:null},
 '6077243':{code:'STG-07',pairs:50,phase:null,window:'드롭 일정 준비 중',photo:null},
 '5128581':{code:'STG-05',pairs:50,phase:null,window:'드롭 일정 준비 중',photo:'app/earth-assets/gloves/stg-05.jpg',print:'app/earth-assets/gloves/stg-05-print.svg',model:'models/skm-product.glb',publicPickup:{address:'17-17 Troutman Street',area:'Ridgewood, New York',confirmed:false}},
 '5368361':{code:'STG-09',pairs:50,phase:null,window:'드롭 일정 준비 중',photo:null}
};

// Programme principles approved 2026-11-01; physical inventory is not created here.
export const stgProgramme={firstDistribution:'pay-what-you-choose',minimumFirstPrice:10,currency:'USD',fulfillment:'pickup-only',firstRecipient:'anyone',secondaryEligibility:'anyone',secondaryMethods:['sale','gift','auction'],payment:'between-participants',perPairHistory:true,documentFromProduction:true,purpose:'Return the trust received through tattooing, and connect the community to music and concerts.',hongKong:{recipients:[8,9],pairsPerRecipient:[5,6],ownership:'recipient',allocationConfirmed:false},tokyo:{multiplePairsPerRecipient:true,allocationConfirmed:false}};
