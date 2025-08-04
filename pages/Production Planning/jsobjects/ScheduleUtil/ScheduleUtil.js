export default {
  /* convert rows ➜ FullCalendar events */
  events() {
    return getDailySchedule.data.map((row, i) => ({
      id       : row.order_ref,
      title    : `${row.model}  x${row.quantity}\n${row.processes}`,
      start    : row.startdate,
      end      : row.enddate,
      groupId  : row.model          // optional colour grouping
    }));
  },

  /* supply rows grouped by weekday for a plain Table */
  byDay() {
    return _.groupBy(getDailySchedule.data, r =>
      new Date(r.startdate).toLocaleDateString('en-US', { weekday:'long'})
    );
  }
};
