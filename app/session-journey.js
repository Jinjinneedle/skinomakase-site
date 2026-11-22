/* Presentation only. Payment and access decisions remain on the server. */
(() => {
  const city = row => row.city || /^\[City: ([A-Z ]+)\]/.exec(row.note || '')?.[1] || '';
  const closed = row => ['done', 'declined', 'cancelled'].includes(row.status);
  const phase = row => closed(row) ? row.status : row.status === 'scheduled' ? 'scheduled' :
    row.status !== 'accepted' ? 'new' : row.deposit_paid ? 'date' :
    city(row) === 'SINGAPORE' || Number(row.deposit) > 0 ? 'deposit' : 'date';
  const copy = {
    new: ['요청 접수', 'Received', '스튜디오의 답장을 기다려 주세요.', 'Your request is with the studio.'],
    deposit: ['예약금 안내', 'Deposit requested', '예약금을 보낸 뒤 대화로 알려 주세요.', 'After paying the deposit, let the studio know in the conversation.'],
    date: ['일정 조율', 'Arranging your session', '대화에서 방문 일정을 정해 주세요.', 'Agree on your appointment in the conversation.'],
    scheduled: ['예약 확정', 'Confirmed', '방문 일정과 안내를 확인하세요.', 'Your appointment is ready. Check the details below.'],
    done: ['완료', 'Completed', '', ''], declined: ['진행 종료', 'Not proceeding', '', ''],
    cancelled: ['취소됨', 'Cancelled', '', '']
  };
  const zone = row => ({SINGAPORE:'Asia/Singapore',SEOUL:'Asia/Seoul',TOKYO:'Asia/Tokyo',OSAKA:'Asia/Tokyo',
    'HONG KONG':'Asia/Hong_Kong','NEW YORK':'America/New_York',VANCOUVER:'America/Vancouver',
    TORONTO:'America/Toronto',MONTREAL:'America/Toronto','LOS ANGELES':'America/Los_Angeles',
    LONDON:'Europe/London',PARIS:'Europe/Paris'})[city(row)];
  const appointment = (row, locale='en') => {
    if (!row.appt_at || !Number.isFinite(new Date(row.appt_at).getTime())) return '';
    const timeZone = zone(row);
    return new Intl.DateTimeFormat(locale, {month:'short', day:'numeric', hour:'numeric', minute:'2-digit',
      timeZoneName:'short', ...(timeZone ? {timeZone} : {})}).format(new Date(row.appt_at));
  };
  const describe = (row, locale='en') => {
    const key = phase(row), text = copy[key], ko = String(locale).startsWith('ko');
    return {key, title:text[ko?0:1], hint:text[ko?2:3], closed:closed(row),
      payment:city(row)==='SINGAPORE' && ['accepted','scheduled'].includes(row.status),
      step:key==='new'?0:key==='deposit'?1:key==='date'?2:key==='scheduled'||key==='done'?3:-1};
  };
  const api = {city,phase,closed,describe,appointment,zone};
  if (typeof module !== 'undefined') module.exports = api;
  if (typeof window !== 'undefined') window.SKMSessionJourney = api;
})();
