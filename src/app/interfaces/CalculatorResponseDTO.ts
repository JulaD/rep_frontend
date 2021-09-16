import { EnergeticRequirement } from "./EnergeticRequirement";
import { GroupEnergeticRequirement } from "./GroupEnergeticRequirement";

export interface CalculatorResponseDTO {
  requerimientosPorGrupo: GroupEnergeticRequirement[];
  requerimientoTotal: EnergeticRequirement;
}