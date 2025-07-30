export default {
	getTasks() {
		return getResourceGanttJune.data.map((r, i) => ({
			id: r.reference || `op-${i}`,
			name: `${r.resource} - ${r.reference}`,
			start: r.startdate.split('T')[0],
			end: r.enddate.split('T')[0],
			progress: 100
		}));
	}
}
