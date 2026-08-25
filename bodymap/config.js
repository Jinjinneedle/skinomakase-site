/* SKINOMAKASE — Body Map 설정
 * 1) WEBHOOK_URL 을 채우면 배치 이미지+좌표가 Venue Ink 로 전송됩니다.
 * 2) 비어 있으면 EMAILJS 로 문의 메일 발송 + 이미지는 사용자 기기에 저장.
 * 3) 둘 다 없으면 JSON 파일 저장 테스트 모드.
 */
window.SKM_CONFIG = {
  WEBHOOK_URL: "",
  WEBHOOK_HEADERS: {},
  WEBHOOK_MODE: "json",     // "json" | "formdata"
  EXPORT_SCALE: 2,
  // 이미지 호스팅 (선택) — 채우면 배치 이미지가 이메일 본문에 바로 보입니다.
  // cloudinary.com 무료 계정 → Cloud name + Unsigned upload preset
  CLOUDINARY: {
    cloudName: "o8ytkoqj",
    uploadPreset: "skm-bodymap",
  },

  EMAILJS: {
    publicKey:  'xEz9t78eBnnGH07jx',
    serviceId:  'service_djzfort',
    templateId: 'template_kqlf0h4',
  },
};
