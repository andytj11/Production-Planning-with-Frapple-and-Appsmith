export default {
  tasks() {
    return getGanttJune.data.map((row, i) => ({
      id:        row.reference || `task-${i}`,
      name:      `${row.resource} – ${row.reference}`,
      start:     row.startdate,      // YYYY-MM-DD
      end:       row.enddate,
      progress:  100                 // static, or calculate %
    }));
  },
	
	juneCount() {
    return this.tasks().length;      // returns an integer
  },
	
	resourceCount() {
    const set = new Set(
      this.tasks().map(t => t.name.split(' – ')[0])  // extract resource prefix
    );
    return set.size;
  }

};
