import ParameterType from '../enums/TipoParametro';

type DefaultExtraDataDTO = {
  id: string;
  value: number;
  parameterType: ParameterType;
  order: number;
  description: string;
};

export default DefaultExtraDataDTO;
