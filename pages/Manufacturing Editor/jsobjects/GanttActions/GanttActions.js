export default {
  async save(payload) {
    await storeValue('ganttSaving', true, true);
    try {
      const rows = await UpdatePlanEvent.run(payload);   // <- UPDATE first
      await GetPlanGantt.run();                          // <- then refetch
      showAlert('Saved','success');
      return rows;
    } catch (e) {
      showAlert(e.message, 'error');
      throw e;
    } finally {
      await storeValue('ganttSaving', false, true);
    }
  }
}
