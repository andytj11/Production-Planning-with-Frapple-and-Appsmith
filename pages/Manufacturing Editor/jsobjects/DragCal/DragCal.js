export default {
  html() {
    const rows = Array.isArray(GetPlan?.data) ? GetPlan.data : [];

    const itemsArr = rows.map(r => ({
      id: String(r.reference),
      content: `${r.item_id} (${r.quantity})`,
      start: new Date(r.startdate),
      end:   new Date(r.enddate),
      group: String(r.resource_id ?? r.location_id ?? 'Unassigned'),
      className: (r.status || 'planned'),
      type: 'range'
    }));

    const groupsArr = [...new Set(itemsArr.map(i => i.group))]
      .map(g => ({ id: String(g), content: String(g) }));

    return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://unpkg.com/vis-timeline@7.7.3/styles/vis-timeline-graph2d.min.css">
<style>
  html,body{height:100%;margin:0}
  #tl{height:100vh}
  #hud{position:absolute;top:6px;left:8px;font:12px system-ui;color:#555;z-index:2;background:#fff8;border:1px solid #ddd;padding:4px 6px;border-radius:4px}
  .vis-item.confirmed{background:#22c55e;border-color:#22c55e}
  .vis-item.planned  {background:#3b82f6;border-color:#3b82f6}
  .vis-item.proposed {background:#f59e0b;border-color:#f59e0b}
</style>
</head>
<body>
<div id="hud">items: ${itemsArr.length} • groups: ${groupsArr.length}</div>
<div id="tl"></div>
<script src="https://unpkg.com/vis-timeline@7.7.3/standalone/umd/vis-timeline-graph2d.min.js"></script>
<script>
  (function(){
    const items  = new vis.DataSet(${JSON.stringify(itemsArr)});
    const groups = new vis.DataSet(${JSON.stringify(groupsArr)});
    const tl = new vis.Timeline(document.getElementById('tl'), items, groups, {
      stack:false,
      editable:{ add:false, remove:false, updateTime:true, updateGroup:false },
      margin:{ item:6, axis:12 },
      orientation:'top',
      zoomKey:'ctrlKey'
    });

    // ensure it's in view
    setTimeout(() => tl.fit({ animation:false }), 0);

    // color by status
    items.forEach(it => items.update({ id: it.id, className: it.className }));

    // drag/resize -> postMessage back to Appsmith
    tl.setOptions({
      onMove:  (item, cb) => { parent.postMessage({type:'move',   id:String(item.id), start:item.start, end:item.end}, '*'); cb(item); },
      onUpdate:(item, cb) => { parent.postMessage({type:'resize', id:String(item.id), start:item.start, end:item.end}, '*'); cb(item); }
    });
  })();
</script>
</body>
</html>`;
  }
}
