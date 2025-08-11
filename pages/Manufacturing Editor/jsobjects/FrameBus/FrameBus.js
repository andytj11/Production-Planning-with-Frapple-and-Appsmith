export default {
  onMsg(e) {
    const m = e && e.data;
    if (!m) return; // nothing to do

    return UpdatePlanParam.run(
      {
        reference: String(m.id),                           // == operationplan.reference
        startdate: moment(m.start).format("YYYY-MM-DD HH:mm:ss"),
        enddate:   moment(m.end).format("YYYY-MM-DD HH:mm:ss"),
      },
      () => GetPlan.run()
    );
  }
}
