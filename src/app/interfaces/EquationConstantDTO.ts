import FranjaEtaria from '../enums/FranjaEtaria';
import Sexo from '../enums/Sexo';
import TipoParametro from '../enums/TipoParametro';

type EquationConstantDTO = {
  ageRange: FranjaEtaria;
  value: number;
  sex: Sexo;
  parameterType: TipoParametro;
  order: number;
  description: string;
};

export default EquationConstantDTO;
