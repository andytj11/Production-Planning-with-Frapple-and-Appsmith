export default {
  // Run all independent queries together
  runAll: async () => {
    // list only the queries you actually want to fire
    const jobs = [
      GetPlan.run(),
      TABLE_RELATIONS.run(),
      getClosedOrders.run(),
      getDailySchedule.run(),
      getDailyUtil.run(),
      getDemandByMonth.run(),
      getForecastByMonth.run(),
      getGanttJune.run(),
      getKPI.run(),
      getLateOrders.run(),
      getOpenNow.run(),
      getOpenOrders.run(),
      getPOList.run(),
      getProblemReport.run(),
      getProposedOrders.run(),
      getResourceUtil.run(),
      getTopItems.run(),
    ];

    const results = await Promise.allSettled(jobs);
    const ok = results.filter(r => r.status === "fulfilled").length;
    const fail = results.length - ok;

    await storeValue("lastBulkRun", { ts: new Date().toISOString(), ok, fail });
    showAlert(fail ? `${ok} finished, ${fail} failed — see debugger.` : `All ${ok} queries finished.`, fail ? "warning" : "success");
    return results;
  },

  // Use this if some queries depend on earlier ones
  runSequential: async () => {
    try {
      await GetPlan.run();
      await TABLE_RELATIONS.run();
      await getClosedOrders.run();
      await getDailySchedule.run();
      await getDailyUtil.run();
      await getDemandByMonth.run();
      await getForecastByMonth.run();
      await getGanttJune.run();
      await getKPI.run();
      await getLateOrders.run();
      await getOpenNow.run();
      await getOpenOrders.run();
      await getPOList.run();
      await getProblemReport.run();
      await getProposedOrders.run();
      await getResourceUtil.run();
      await getTopItems.run();
      showAlert("All queries finished.", "success");
    } catch (e) {
      showAlert(`Stopped: ${e.message}`, "error");
      throw e;
    }
  },
};
