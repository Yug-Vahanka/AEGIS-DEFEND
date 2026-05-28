/* ============================================================
   AEGIS DEFEND — data.js
   Training data, sample messages, and feature vocabulary
   ============================================================ */

/* ---- FEATURE VOCABULARY (TF-IDF tokens) ---- */
const FEATURES = [
  'urgent','immediately','verify','confirm','suspended','locked','expire','click here',
  'login','password','credentials','security alert','account','update your',
  'free','win','winner','congratulations','prize','claim','gift card','selected',
  'discount','earn','money','cash','reward','exclusive deal','buy now',
  'ceo','manager','payroll','wire transfer','bypass','audit','compliance',
  'remote access','it support','maintenance','employee id','vpn',
  'unusual activity','we detected','limited time','act now','warning',
  'your invoice','docusign','irs notice','tax refund','subscription',
  'meeting','attached','schedule','project','regards','team','thank you',
  'appointment confirmed','order shipped','feedback','quarterly',
];

/* ---- TRAINING DATA ---- */
const TRAINING = [
  {text:"Your account has been suspended. Click here to verify your identity immediately.", label:1},
  {text:"URGENT: Your bank account will be closed. Confirm your password now at secure-bank-verify.com", label:1},
  {text:"You have a pending payment. Login to release it at paypal-secure-login.xyz", label:1},
  {text:"Your Apple ID was used from an unknown device. Verify now or account will be closed.", label:1},
  {text:"Security Alert: Unusual activity detected. Click to confirm your identity within 24 hours.", label:1},
  {text:"Your password expires today. Update it immediately to avoid losing access to your account.", label:1},
  {text:"You received a DocuSign document. Click to review and sign at docusign-secure.net", label:1},
  {text:"IRS Notice: You are owed a tax refund. Submit your bank details to claim it.", label:1},
  {text:"Your Netflix subscription payment failed. Update payment info here to continue watching.", label:1},
  {text:"Microsoft detected malware on your PC. Call our support line immediately.", label:1},
  {text:"Account locked due to suspicious login. Verify credentials at amazon-login-secure.com", label:1},
  {text:"Final warning: Your domain will expire. Renew now at domain-secure-renew.net", label:1},
  {text:"FREE iPhone! You have been selected. Claim NOW at bit.ly/freephone", label:2},
  {text:"Congratulations! You won $5000 in our weekly draw. Text WIN to claim your prize.", label:2},
  {text:"SALE 90% OFF today only!! Shop now before it expires. Limited stock!! BUY NOW", label:2},
  {text:"You are our lucky winner. Reply YES to receive your Amazon gift card today.", label:2},
  {text:"Lose 30 lbs in 30 days! Buy 1 get 1 free. Limited time only. Click here now.", label:2},
  {text:"Work from home and earn $5000/week. No experience needed. Apply now free.", label:2},
  {text:"Your loan has been pre-approved! No credit check required. Claim today!", label:2},
  {text:"FREE gift card waiting for you. Tap to claim before it expires tonight.", label:2},
  {text:"Hi, this is John from IT. We are doing emergency maintenance. I need your VPN credentials.", label:3},
  {text:"This is the CEO. I need you to purchase $2000 in gift cards urgently and send me the codes.", label:3},
  {text:"I am from HR. We are updating the payroll system. Please confirm your bank account number.", label:3},
  {text:"Your manager asked me to contact you. We need your employee ID and password for a security audit.", label:3},
  {text:"This is Microsoft support. Your computer is sending error reports. I need remote access to fix it.", label:3},
  {text:"Hi it is Sarah from accounts. Quick favour — can you approve this wire transfer? The CFO is unreachable.", label:3},
  {text:"We are auditing user accounts. Please provide your username and current password for verification.", label:3},
  {text:"Emergency: Our main server is down. Disable the firewall temporarily so we can restore service.", label:3},
  {text:"Hi Sarah, just following up on our meeting Tuesday. Let me know if you have any questions.", label:0},
  {text:"The project files are attached. Let me know your feedback by Friday.", label:0},
  {text:"Can we reschedule our call to Thursday 3pm? I have a scheduling conflict.", label:0},
  {text:"Your order has shipped! Expected delivery is this Friday.", label:0},
  {text:"Meeting notes from today standup are in the shared doc. No blockers reported.", label:0},
  {text:"Hey, are you free for lunch tomorrow? Thinking of trying that new place.", label:0},
  {text:"Reminder: team outing is this Friday at 6pm. RSVP to the calendar invite.", label:0},
  {text:"Your appointment is confirmed for December 12 at 10:30am with Dr. Thompson.", label:0},
  {text:"The quarterly report is ready for review. I have shared it with the team.", label:0},
  {text:"Thanks for your feedback. We have updated the design based on your comments.", label:0},
  {text:"Package delivered at front door at 2:34 PM. Photo available in the app.", label:0},
];

/* ---- SAMPLE MESSAGES ---- */
const SAMPLES = {
  phish: { type:'email', text:'URGENT: Your bank account will be suspended in 24 hours due to unusual activity. Click here to verify your identity and update your login credentials immediately: secure-bank-verify.xyz/confirm — Failure to act will result in permanent account closure.' },
  spam:  { type:'sms',   text:'🎉 Congratulations! You have been SELECTED as our lucky winner! Claim your FREE $500 Amazon gift card NOW before it expires. Limited to first 50 claimants. Click: bit.ly/claim-reward-2024 — Reply STOP to unsubscribe.' },
  social:{ type:'social',text:'Hi, this is Robert from IT Support. We have detected unauthorized access attempts on your account. I need to verify your identity — please provide your employee ID, current password, and VPN credentials so I can lock down the breach before it escalates. The CTO has been alerted.' },
  vishing:{type:'social',text:'This is CEO David Wilson. I am in an important client meeting and cannot talk. I need you to immediately purchase 5x $200 Google Play gift cards from the nearest store. Scratch the back, photograph the codes, and email them to me. This is confidential — do not discuss with anyone.'},
  legit1:{ type:'email', text:'Hi James, following up on our discussion from the Monday standup. I have attached the revised project timeline and budget breakdown as requested. Please review and share your thoughts before our Thursday meeting. Let me know if anything needs adjusting. Best regards, Priya'},
  legit2:{ type:'sms',   text:'Hi! Your prescription is ready for pickup at MedPlus Pharmacy, Surat. Store hours: Mon-Sat 9am-9pm. Please bring your ID. Call 0261-555-0123 if you have questions.' },
};
