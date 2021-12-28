import { Box, Button, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import React from 'react';
import { TextField } from 'formik-mui';

export default function FormikDependentSelects({
  regions,
  countries,
  cities,
  cityId,
}) {
  const { countryId = 0 } = cities.find((city) => city.id === cityId);
  const { regionId = 0 } = countries.find(
    (country) => country.id === countryId
  );

  const initialValues = {
    regions,
    regionId,
    countries,
    countryId,
    cities,
    cityId,
  };

  function handleSubmit(values, { setSubmitting }) {
    alert(JSON.stringify(values));
    setSubmitting(false);
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => {
          function handleRegionIdChange(e) {
            const regionId = e.target.value;
            setFieldValue('regionId', regionId);
            setFieldValue('countryId', 0);
            setFieldValue(
              'countries',
              countries.filter((country) => country.regionId === regionId)
            );
            setFieldValue('cityId', 0);
            setFieldValue('cities', []);
          }

          function handleCountryIdChange(e) {
            const countryId = e.target.value;
            setFieldValue('countryId', countryId);
            setFieldValue('cityId', 0);
            setFieldValue(
              'cities',
              cities.filter((city) => city.countryId === countryId)
            );
          }

          return (
            <Form>
              <Box sx={{ p: 1 }}>
                <Field
                  component={TextField}
                  select
                  name="regionId"
                  label="Region"
                  fullWidth
                  onChange={handleRegionIdChange}
                >
                  <MenuItem value="0">Select Region...</MenuItem>
                  {values.regions.map(({ id, name }) => (
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
                  name="countryId"
                  label="Country"
                  fullWidth
                  onChange={handleCountryIdChange}
                >
                  <MenuItem value="0">Select Country...</MenuItem>
                  {values.countries.map(({ id, name }) => (
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
                  name="cityId"
                  label="City"
                  fullWidth
                >
                  <MenuItem value="0">Select City...</MenuItem>
                  {values.cities.map(({ id, name }) => (
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
  { id: 2, countryId: 1, name: 'Hong Kong' },
  { id: 3, countryId: 2, name: 'Osaka' },
  { id: 4, countryId: 2, name: 'Tokyo' },
  { id: 5, countryId: 3, name: 'London' },
  { id: 6, countryId: 3, name: 'Newquay' },
  { id: 7, countryId: 4, name: 'Nice' },
  { id: 8, countryId: 4, name: 'Paris' },
  { id: 9, countryId: 5, name: 'Calgary' },
  { id: 10, countryId: 5, name: 'Vancouver' },
  { id: 11, countryId: 6, name: 'Los Angeles' },
  { id: 12, countryId: 6, name: 'New York' },
];

export function getStaticProps() {
  return {
    props: {
      regions,
      countries,
      cities,
      cityId: 10,
    },
  };
}
