import { Box, Button, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';

import { TextField } from 'formik-mui';

export default function FormikDependentSelectsState({
  regions,
  countries,
  cities,
  cityId,
}) {
  const { countryId = 0 } = cities.find((city) => city.id === cityId);
  const { regionId = 0 } = countries.find(
    (country) => country.id === countryId
  );

  const [filteredCountries, setFilteredCountries] = useState(
    countries.filter((country) => country.regionId === regionId)
  );
  const [filteredCities, setFilteredCities] = useState(
    cities.filter((city) => city.countryId === countryId)
  );

  const initialValues = {
    regionId,
    countryId,
    cityId,
  };

  function handleSubmit(values, { setSubmitting }) {
    const { regionId, countryId, ...finalValues } = values; // We can safely discard regionId and countryId
    alert(JSON.stringify(finalValues));
    setSubmitting(false);
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => {
          function resetCountries(regionId) {
            setFieldValue('countryId', 0);
            setFilteredCountries(
              countries.filter((country) => country.regionId === regionId)
            );
          }

          function resetCities(countryId) {
            setFieldValue('cityId', 0);
            setFilteredCities(
              cities.filter((city) => city.countryId === countryId)
            );
          }

          function handleRegionIdChange(event) {
            const regionId = event.target.value;
            setFieldValue('regionId', regionId);
            resetCountries(regionId);
            resetCities(0);
          }

          function handleCountryIdChange(event) {
            const countryId = event.target.value;
            setFieldValue('countryId', countryId);
            resetCities(countryId);
          }

          return (
            <Form>
              <Box sx={{ p: 1 }}>
                <Field
                  component={TextField}
                  select
                  fullWidth
                  name="regionId"
                  label="Region"
                  onChange={handleRegionIdChange}
                >
                  <MenuItem value="0">Select Region...</MenuItem>
                  {regions?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box sx={{ p: 1 }}>
                <Field
                  component={TextField}
                  select
                  fullWidth
                  name="countryId"
                  label="Country"
                  onChange={handleCountryIdChange}
                >
                  <MenuItem value="0">Select Country...</MenuItem>
                  {filteredCountries?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box sx={{ p: 1 }}>
                <Field
                  component={TextField}
                  select
                  fullWidth
                  name="cityId"
                  label="City"
                >
                  <MenuItem value="0">Select City...</MenuItem>
                  {filteredCities?.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Field>
              </Box>
              <Box>
                <Button type="submit">Submit</Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

const regions = [
  { id: 1, name: 'Asia' },
  { id: 2, name: 'Europe' },
  { id: 3, name: 'North America' },
];

const countries = [
  { id: 1, regionId: 1, name: 'China' },
  { id: 2, regionId: 1, name: 'Japan' },
  { id: 3, regionId: 2, name: 'England' },
  { id: 4, regionId: 2, name: 'France' },
  { id: 5, regionId: 3, name: 'Canada' },
  { id: 6, regionId: 3, name: 'United States' },
];

const cities = [
  { id: 1, countryId: 1, name: 'Beijing' },
  { id: 2, countryId: 1, name: 'Shanghai' },
  { id: 3, countryId: 2, name: 'Osaka' },
  { id: 4, countryId: 2, name: 'Tokyo' },
  { id: 5, countryId: 3, name: 'London' },
  { id: 6, countryId: 3, name: 'Manchester' },
  { id: 7, countryId: 4, name: 'Marseille' },
  { id: 8, countryId: 4, name: 'Paris' },
  { id: 9, countryId: 5, name: 'Toronto' },
  { id: 10, countryId: 5, name: 'Vancouver' },
  { id: 11, countryId: 6, name: 'Los Angeles' },
  { id: 12, countryId: 6, name: 'New York' },
];

const cityId = cities.find((city) => city.name === 'Vancouver').id;

export function getStaticProps() {
  return {
    props: {
      regions,
      countries,
      cities,
      cityId,
    },
  };
}
