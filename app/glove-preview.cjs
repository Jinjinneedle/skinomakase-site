'use strict';
// One bundled asset is reused; no invented city-specific design, location or inventory.
function glovePreview(plan,city){
 return {...plan,code:plan?.code||city.label,model:plan?.model||'models/skm-product.glb',
  previewOnly:!plan?.model&&!plan?.photo,publicPickup:plan?.publicPickup};
}
module.exports={glovePreview};
