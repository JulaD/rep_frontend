import IndividualMaternity from './IndividualMaternityDTO';
import PopulationMaternity from './PopulationMaternityDTO';

type Maternity = {
  maternity18to29: IndividualMaternity | PopulationMaternity;
  maternity30to59: IndividualMaternity | undefined;
};

export default Maternity;
