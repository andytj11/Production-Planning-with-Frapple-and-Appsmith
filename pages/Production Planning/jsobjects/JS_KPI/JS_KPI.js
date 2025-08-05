export default {
  /* Build the KPI table from the GetKPI query */
  buildHtml () {
    const rows = GetKPI.data || [];

    /* group by category */
    const grouped = rows.reduce((acc, r) => {
      (acc[r.category] = acc[r.category] || []).push(r);
      return acc;
    }, {});

    /* html */
    let html = `
      <style>
        .kpiTbl    { width:100%; border-collapse:collapse; font:14px Arial,sans-serif; }
        .kpiTbl td { padding:6px 8px; border-bottom:1px solid #e5e7eb; }
        .head      { background:#3b82f6; color:#fff; font-weight:600; }
        .val       { text-align:right; font-weight:600; }
      </style>
      <table class="kpiTbl">`;

    Object.entries(grouped).forEach(([cat, items]) => {
      html += `<tr class="head"><td colspan="2">${cat}</td></tr>`;
      items.forEach(({ name, value }) =>
        html += `<tr><td>${name}</td><td class="val">${value}</td></tr>`
      );
    });
    html += '</table>';
    return html;
  }
};
