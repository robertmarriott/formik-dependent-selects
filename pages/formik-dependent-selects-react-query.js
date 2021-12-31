import { Box, Button, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import React from 'react';
import { TextField } from 'formik-mui';
import axios from 'axios';
import { useQuery } from 'react-query';

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

function useRegions() {
  return useQuery(
    'regions',
    async () => {
      const { data } = await axios.get('/api/regions');
      return data;
    },
    { staleTime: STALE_TIME }
  );
}

function useCountries(regionId) {
  return useQuery(
    ['countries', regionId],
    async () => {
      const { data } = await axios.get(`/api/countries?regionId=${regionId}`);
      return data;
    },
    { staleTime: STALE_TIME }
  );
}

function useCities(countryId) {
  return useQuery(
    ['cities', countryId],
    async () => {
      const { data } = await axios.get(`/api/cities?countryId=${countryId}`);
      return data;
    },
    { staleTime: STALE_TIME }
  );
}

export default function FormikDependentSelectsReactQuery({
  regionId = 0,
  countryId = 0,
  cityId = 0,
}) {
  const initialValues = {
    regionId,
    countryId,
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
          const { data: regionsData } = useRegions();
          const { data: countriesData } = useCountries(values.regionId);
          const { data: citiesData } = useCities(values.countryId);

          function resetCountries() {
            setFieldValue('countryId', 0);
          }

          function resetCities() {
            setFieldValue('cityId', 0);
          }

          function handleRegionIdChange(e) {
            resetCities();
            resetCountries();
            const regionId = e.target.value;
            setFieldValue('regionId', regionId);
          }

          function handleCountryIdChange(e) {
            resetCities();
            const countryId = e.target.value;
            setFieldValue('countryId', countryId);
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
                  value={regionsData ? values.regionId : 0}
                  onChange={handleRegionIdChange}
                >
                  <MenuItem value="0">Select Region...</MenuItem>
                  {regionsData?.map(({ id, name }) => (
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
                  value={countriesData ? values.countryId : 0}
                  onChange={handleCountryIdChange}
                >
                  <MenuItem value="0">Select Country...</MenuItem>
                  {countriesData?.map(({ id, name }) => (
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
                  value={citiesData ? values.cityId : 0}
                >
                  <MenuItem value="0">Select City...</MenuItem>
                  {citiesData?.map(({ id, name }) => (
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

export function getStaticProps() {
  return {
    props: {
      regionId: 3,
      countryId: 5,
      cityId: 10,
    },
  };
}
