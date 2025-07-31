export default {
  build() {
    const demand = getDemandByMonth.data ?? [];
    const fc     = _.keyBy(getForecastByMonth.data ?? [], 'month');

    const months  = demand.map(r => r.month.slice(0,10));
    const open    = demand.map(r => r.open_orders);
    const total   = demand.map(r => r.total_orders);
    const fct     = demand.map(r => fc[r.month]?.forecast_total ?? null);
    const pastFct = demand.map(r => {
      const past = new Date(r.month) < new Date();
      return past ? (fc[r.month]?.forecast_total ?? null) : null;
    });

    return { months, open, total, fct, pastFct };
  },

  /**  👉  returns a safe JSON string */
  buildString() {
    return JSON.stringify(this.build());
  }
}
