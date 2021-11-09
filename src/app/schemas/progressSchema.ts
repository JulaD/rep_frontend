export const progressSchema = {
  $id: '/progressSchema',
  type: 'object',
  properties: {
    step1Data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          age: { type: 'string' },
          sex: { type: 'string' },
          medianWeight: {
            type: 'number',
            minimum: 0,
          },
          population: {
            type: 'number',
            minimum: 0,
          },
        },
        required: ['age', 'sex', 'medianWeight', 'population'],
        additionalProperties: false,
      },
    },
    extraData: {
      type: 'object',
      properties: {
        minorPAL: {
          type: 'object',
          properties: {
            lowPALPrevalence: { type: 'number' },
            moderatePALPrevalence: { type: 'number' },
            intensePALPrevalence: { type: 'number' },
          },
          required: ['lowPALPrevalence', 'moderatePALPrevalence', 'intensePALPrevalence'],
          additionalProperties: false,
        },
        adultPAL: {
          type: 'object',
          properties: {
            urbanPercentage: { type: 'number' },
            activeUrbanPAL: { type: 'number' },
            lowUrbanPAL: { type: 'number' },
            ruralPercentage: { type: 'number' },
            activeRuralPAL: { type: 'number' },
            lowRuralPAL: { type: 'number' },
          },
          required: ['urbanPercentage', 'activeUrbanPAL', 'lowUrbanPAL', 'ruralPercentage', 'activeRuralPAL', 'lowRuralPAL'],
          additionalProperties: false,
        },
        maternity18to29: {
          type: 'object',
          if: {
            properties: {
              countryWomenInAgeGroup: { type: 'number' },
              countryPopulation: { type: 'number' },
              countryBirthRate: { type: 'number' },
            },
          },
          then: {
            required: ['countryWomenInAgeGroup', 'countryPopulation', 'countryBirthRate'],
          },
          else: {
            if: {
              properties: {
                pregnantWomen: { type: 'number' },
                lactatingWomen: { type: 'number' },
              },
            },
            then: {
              required: ['pregnantWomen', 'lactatingWomen'],
            },
          },
          additionalProperties: false,
        },
      },
    },
  },
  required: ['step1Data'],
  additionalProperties: false,
};
