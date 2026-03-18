// Mock data for Smart Energy Monitoring Dashboard

export const generateHourlyData = (days: number = 1) => {
  const data: { time: string; power: number; hour: number }[] = [];
  const now = new Date();

  for (let d = 0; d < days; d++) {
    for (let h = 0; h < 24; h++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (days - 1 - d));
      date.setHours(h, 0, 0, 0);

      // Simulate realistic power consumption patterns
      let basePower = 800;
      if (h >= 6 && h <= 9) basePower = 1800; // Morning peak
      if (h >= 12 && h <= 14) basePower = 2200; // Lunch peak
      if (h >= 18 && h <= 22) basePower = 3000; // Evening peak
      if (h >= 0 && h <= 5) basePower = 400; // Night low

      const variation = Math.random() * 400 - 200;
      const power = Math.max(200, Math.round(basePower + variation));

      data.push({
        time: `${String(h).padStart(2, "0")}:00`,
        power,
        hour: h,
      });
    }
  }
  return data;
};

export const getPeakHoursData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map((h) => {
    let basePower = 600;
    if (h >= 6 && h <= 9) basePower = 1600;
    if (h >= 12 && h <= 14) basePower = 2000;
    if (h >= 18 && h <= 22) basePower = 2800;
    if (h >= 0 && h <= 5) basePower = 350;

    const variation = Math.random() * 300 - 150;
    return {
      hour: `${String(h).padStart(2, "0")}:00`,
      consumption: Math.max(100, Math.round(basePower + variation)),
    };
  });
};

export const getEnergyDistribution = () => [
  { name: "Region A", value: 30, color: "#FF1744", devices: "Microwave, Water Pump" },
  { name: "Region B", value: 25, color: "#00E676", devices: "Air Conditioner" },
  { name: "Region C", value: 15, color: "#7C4DFF", devices: "Lighting" },
  { name: "Region D", value: 18, color: "#FFEA00", devices: "Refrigerator" },
  { name: "Region E", value: 12, color: "#00B0FF", devices: "Other Devices" },
];

export const getRealtimePower = () => {
  return Math.round(1000 + Math.random() * 500);
};

export const ELECTRICITY_PRICE = 4; // DA per kWh
export const GAS_PRICE_PER_TH = 0.32;

export const getEstimatedMonthlyBill = (currentPower: number, includeGas: boolean, gasAmount: number) => {
  // Average daily consumption in kWh (assuming current power is average)
  const dailyKwh = (currentPower * 24) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const electricityCost = monthlyKwh * ELECTRICITY_PRICE;
  const gasCost = includeGas ? gasAmount : 0;
  return Math.round(electricityCost + gasCost);
};

export const getAIPredictions = () => ({
  predictedBill: 4200,
  recommendations: [
    {
      icon: "🔥",
      title: "Reduce Hair Dryer Usage",
      description: "Using the hair dryer less frequently can save up to 300 DA/month",
      savings: 300,
    },
    {
      icon: "❄️",
      title: "Optimize AC Usage",
      description: "Set AC to 24°C instead of 20°C to reduce consumption by 25%",
      savings: 520,
    },
    {
      icon: "💡",
      title: "Turn Off Unused Devices",
      description: "Standby devices consume up to 10% of your total energy",
      savings: 380,
    },
    {
      icon: "🔌",
      title: "Use Energy-Efficient Appliances",
      description: "Switching to LED bulbs can reduce lighting costs by 75%",
      savings: 200,
    },
  ],
  totalSavings: 1200,
});
