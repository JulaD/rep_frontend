import ParameterType from '../enums/TipoParametro';
import Sexo from '../enums/Sexo';
import FranjaEtaria from '../enums/FranjaEtaria';

type DefaultWeightDTO = {
  value: number;
  ageRange: FranjaEtaria;
  sex: Sexo;
  parameterType: ParameterType;
};

export default DefaultWeightDTO;
