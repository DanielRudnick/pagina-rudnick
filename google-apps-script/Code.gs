const SPREADSHEET_ID = '19RpCmU21aSnxft9MwDX7XgNOJNRcMtROSJTSuq4wrmg';
const REVENUE_OPTIONS = ['R$ 20 mil a R$ 50 mil', 'R$ 50 mil a R$ 100 mil', 'Acima de R$ 100 mil'];
function jsonResponse(payload) { return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON); }
function clean(value) { return typeof value === 'string' ? value.trim() : ''; }
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    ['name','phone','email','revenue','improvement'].forEach(key => data[key] = clean(data[key]));
    if (!data.name || !data.phone || !data.email || !data.revenue) return jsonResponse({ok:false,error:'Preencha todos os campos obrigatórios.'});
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return jsonResponse({ok:false,error:'Informe um e-mail válido.'});
    if (!REVENUE_OPTIONS.includes(data.revenue)) return jsonResponse({ok:false,error:'Selecione uma faixa de faturamento válida.'});
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Página1');
    if (!sheet) throw new Error('A aba Página1 não foi encontrada.');
    sheet.appendRow([new Date(), data.name, data.phone, data.email, data.revenue, data.improvement]);
    return jsonResponse({ok:true});
  } catch (error) {
    console.error(error);
    return jsonResponse({ok:false,error:'Não foi possível registrar o contato agora.'});
  }
}