// ============================================================
// MOROCCO DIGITAL TRANSFORMATION SAVINGS CALCULATOR — DATA
// Sources: HCP, OMTPME, CGEM, Lavieeco.ma, CRM.org, Phorest,
//          AMA, NetSuite, PayStream Advisors
// Currency: MAD (Moroccan Dirham)
// ============================================================

export type SectorId =
  | "retail"
  | "restaurant"
  | "salon"
  | "medical"
  | "services"
  | "pme";

export interface Solution {
  id: string;
  timeSavingsPct: number;
  revenueImpactPct: number;
}

/** A concrete manual task the business owner recognizes */
export interface ManualTask {
  id: string;
  hoursPerWeek: number; // how many hours this task eats per employee
}

export interface SectorData {

  avgHourlyWage: number;
  avgMonthlyRevenue: number;
  typicalEmployees: number;
  adminHoursMonthly: number;
  retentionImprovement: number;
  solutions: Solution[];
  manualTasks: ManualTask[];
}

export const SECTORS: Record<SectorId, SectorData> = {
  retail: {

    avgHourlyWage: 21,
    avgMonthlyRevenue: 60_000,
    typicalEmployees: 3,
    adminHoursMonthly: 32,
    retentionImprovement: 0.18,
    solutions: [
      { id: "stockManagement", timeSavingsPct: 0.35, revenueImpactPct: 0.08 },
      { id: "salesTracking", timeSavingsPct: 0.25, revenueImpactPct: 0.05 },
      { id: "crm", timeSavingsPct: 0.20, revenueImpactPct: 0.10 },
    ],
    manualTasks: [
      { id: "manualStockCount", hoursPerWeek: 5 },
      { id: "paperInvoices", hoursPerWeek: 3 },
      { id: "excelTracking", hoursPerWeek: 4 },
      { id: "phoneOrders", hoursPerWeek: 2 },
    ],
  },
  restaurant: {

    avgHourlyWage: 22,
    avgMonthlyRevenue: 120_000,
    typicalEmployees: 5,
    adminHoursMonthly: 22,
    retentionImprovement: 0.17,
    solutions: [
      { id: "ordering", timeSavingsPct: 0.30, revenueImpactPct: 0.10 },
      { id: "reservations", timeSavingsPct: 0.25, revenueImpactPct: 0.06 },
      { id: "performanceTracking", timeSavingsPct: 0.20, revenueImpactPct: 0.05 },
    ],
    manualTasks: [
      { id: "phoneReservations", hoursPerWeek: 4 },
      { id: "paperOrders", hoursPerWeek: 3 },
      { id: "manualInventory", hoursPerWeek: 3 },
      { id: "cashReconciliation", hoursPerWeek: 2 },
    ],
  },
  salon: {

    avgHourlyWage: 19,
    avgMonthlyRevenue: 40_000,
    typicalEmployees: 2,
    adminHoursMonthly: 23,
    retentionImprovement: 0.22,
    solutions: [
      { id: "onlineBooking", timeSavingsPct: 0.40, revenueImpactPct: 0.20 },
      { id: "reminders", timeSavingsPct: 0.50, revenueImpactPct: 0.15 },
      { id: "clientHistory", timeSavingsPct: 0.15, revenueImpactPct: 0.08 },
    ],
    manualTasks: [
      { id: "phoneBookings", hoursPerWeek: 5 },
      { id: "noShowCalls", hoursPerWeek: 2 },
      { id: "paperAgenda", hoursPerWeek: 3 },
      { id: "clientMemory", hoursPerWeek: 1 },
    ],
  },
  medical: {

    avgHourlyWage: 25,
    avgMonthlyRevenue: 55_000,
    typicalEmployees: 3,
    adminHoursMonthly: 34,
    retentionImprovement: 0.13,
    solutions: [
      { id: "patientManagement", timeSavingsPct: 0.30, revenueImpactPct: 0.10 },
      { id: "digitalRecords", timeSavingsPct: 0.35, revenueImpactPct: 0.05 },
      { id: "appointmentSystem", timeSavingsPct: 0.25, revenueImpactPct: 0.08 },
    ],
    manualTasks: [
      { id: "paperRecords", hoursPerWeek: 6 },
      { id: "phoneAppointments", hoursPerWeek: 4 },
      { id: "manualBilling", hoursPerWeek: 3 },
      { id: "fileSearching", hoursPerWeek: 2 },
    ],
  },
  services: {

    avgHourlyWage: 30,
    avgMonthlyRevenue: 65_000,
    typicalEmployees: 4,
    adminHoursMonthly: 45,
    retentionImprovement: 0.18,
    solutions: [
      { id: "invoicing", timeSavingsPct: 0.65, revenueImpactPct: 0.05 },
      { id: "leadTracking", timeSavingsPct: 0.30, revenueImpactPct: 0.18 },
      { id: "dataCentralization", timeSavingsPct: 0.25, revenueImpactPct: 0.07 },
    ],
    manualTasks: [
      { id: "manualInvoicing", hoursPerWeek: 6 },
      { id: "spreadsheetCrm", hoursPerWeek: 4 },
      { id: "emailChasing", hoursPerWeek: 3 },
      { id: "reportBuilding", hoursPerWeek: 3 },
    ],
  },
  pme: {

    avgHourlyWage: 27,
    avgMonthlyRevenue: 85_000,
    typicalEmployees: 7,
    adminHoursMonthly: 20,
    retentionImprovement: 0.15,
    solutions: [
      { id: "processAutomation", timeSavingsPct: 0.30, revenueImpactPct: 0.10 },
      { id: "analytics", timeSavingsPct: 0.20, revenueImpactPct: 0.08 },
      { id: "collaboration", timeSavingsPct: 0.25, revenueImpactPct: 0.06 },
    ],
    manualTasks: [
      { id: "paperworkGeneral", hoursPerWeek: 5 },
      { id: "manualReporting", hoursPerWeek: 4 },
      { id: "emailOverload", hoursPerWeek: 3 },
      { id: "meetingOverhead", hoursPerWeek: 2 },
    ],
  },
};

export const SECTOR_IDS: SectorId[] = [
  "retail",
  "restaurant",
  "salon",
  "medical",
  "services",
  "pme",
];

export interface CalculatorInputs {
  employees: number;
  manualTaskIds: string[];
  avgRevenuePerClient: number;
}

export interface CalculatorResults {
  monthlySavingsMAD: number;
  hoursSavedMonthly: number;
  revenueRecoveredMAD: number;
  clientsRecovered: number;
}

export function calculateSavings(
  sectorId: SectorId,
  selectedSolutions: string[],
  inputs: CalculatorInputs,
): CalculatorResults {
  const sector = SECTORS[sectorId];

  const activeSolutions = sector.solutions.filter((s) =>
    selectedSolutions.includes(s.id),
  );

  if (activeSolutions.length === 0) {
    return {
      monthlySavingsMAD: 0,
      hoursSavedMonthly: 0,
      revenueRecoveredMAD: 0,
      clientsRecovered: 0,
    };
  }

  // Hours lost: sum of selected manual tasks' weekly hours
  const weeklyHoursLost = sector.manualTasks
    .filter((t) => inputs.manualTaskIds.includes(t.id))
    .reduce((sum, t) => sum + t.hoursPerWeek, 0);

  // Time savings: combine selected solutions (diminishing returns)
  const combinedTimeSavings = 1 - activeSolutions.reduce(
    (remaining, sol) => remaining * (1 - sol.timeSavingsPct),
    1,
  );

  const monthlyHoursLost = weeklyHoursLost * 4.33;
  const hoursSavedMonthly = Math.round(
    monthlyHoursLost * combinedTimeSavings * inputs.employees,
  );

  const timeSavingsMAD = hoursSavedMonthly * sector.avgHourlyWage;

  // Revenue impact
  const combinedRevenueImpact = 1 - activeSolutions.reduce(
    (remaining, sol) => remaining * (1 - sol.revenueImpactPct),
    1,
  );

  const revenueRecoveredMAD = Math.round(
    inputs.avgRevenuePerClient * inputs.employees * 20 * combinedRevenueImpact,
  );

  const avgClientValue = inputs.avgRevenuePerClient || 200;
  const clientsRecovered = Math.round(
    (revenueRecoveredMAD / avgClientValue) * sector.retentionImprovement * 10,
  );

  const monthlySavingsMAD = timeSavingsMAD + revenueRecoveredMAD;

  return {
    monthlySavingsMAD,
    hoursSavedMonthly,
    revenueRecoveredMAD,
    clientsRecovered: Math.max(clientsRecovered, 1),
  };
}
