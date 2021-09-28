import { EnergeticRequirement } from "./EnergeticRequirement";
import { GroupEnergeticRequirement } from "./GroupEnergeticRequirement";

type CalculatorResponse = {
  groupsRequirements: GroupEnergeticRequirement[];
  totalRequirement: EnergeticRequirement;
};

export default CalculatorResponse;