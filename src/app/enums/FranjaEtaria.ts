export enum FranjaEtaria {
  Meses_0 = "0 meses",
  Meses_1 = "1 meses",
  Meses_2 = "2 meses",
  Meses_3 = "3 meses",
  Meses_4 = "4 meses",
  Meses_5 = "5 meses",
  Meses_6 = "6 meses",
  Meses_7 = "7 meses",
  Meses_8 = "8 meses",
  Meses_9 = "9 meses",
  Meses_10 = "10 meses",
  Meses_11 = "11 meses",
  Anios_1 = "1 años",
  Anios_2 = "2 años",
  Anios_3 = "3 años",
  Anios_4 = "4 años",
  Anios_5 = "5 años",
  Anios_6 = "6 años",
  Anios_7 = "7 años",
  Anios_8 = "8 años",
  Anios_9 = "9 años",
  Anios_10 = "10 años",
  Anios_11 = "11 años",
  Anios_12 = "12 años",
  Anios_13 = "13 años",
  Anios_14 = "14 años",
  Anios_15 = "15 años",
  Anios_16 = "16 años",
  Anios_17 = "17 años",
  Anios_18_29 = "18-29 años",
  Anios_30_59 = "30-59 años",
  Anios_60_mas = "60+ años"
}

const franjaEtariaOrder = Object.values(FranjaEtaria);
/*
 Return a negative value if first argument is less than second argument,
 zero if they're equal and a positive value otherwise.
 */
export function compareFranjaEtaria(a: FranjaEtaria, b: FranjaEtaria) {
  return franjaEtariaOrder.indexOf(a) - franjaEtariaOrder.indexOf(b)
}