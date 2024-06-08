import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { LoginSchema } from "../schemas/LoginSchema";
import PropTypes from "prop-types";
import { useGeolocation } from "../hooks/useGeolocation";
import { useStore } from "../context/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  age: null,
  pokemons: [],
};

export default function LoginForm({ pokemons }) {
  const { locationInfo, locationError } = useGeolocation();
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const location = locationInfo
      ? {
          lat: locationInfo.latitude,
          lng: locationInfo.longitude,
        }
      : null;

    if (locationError) {
      toast.error("No se pudo obtener la ubicación");
    }

    const newValue = {
      ...values,
      location,
      age: dayjs(values.age).format("YYYY-MM-DD"),
    };

    setUser(newValue);

    toast.success("Usuario creado correctamente");

    navigate("/pokemons");
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <TextField
              fullWidth
              variant="outlined"
              id="name"
              name="name"
              label="Nombre"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                id="age"
                name="age"
                sx={{
                  width: "100%",
                }}
                slotProps={{
                  textField: {
                    size: "small",
                    InputLabelProps: { shrink: true },
                    placeholder: "",
                    helperText: touched.age && errors.age,
                    error: touched.age && Boolean(errors.age),
                    onBlur: handleBlur,
                    id: "age",
                    name: "age",
                  },
                }}
                value={values.age ? dayjs(values.age) : null}
                onChange={(newValue) =>
                  setFieldValue("age", newValue ? newValue : null)
                }
                format="DD/MM/YYYY"
                onBlur={handleBlur}
                maxDate={dayjs().subtract(12, "years")}
              />
            </LocalizationProvider>

            <Autocomplete
              multiple
              id="pokemons"
              name="pokemons"
              options={pokemons}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  id="pokemons"
                  label="Pokemones"
                  name="pokemons"
                  error={touched.pokemons && Boolean(errors.pokemons)}
                  helperText={touched.pokemons && errors.pokemons}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  sx={{
                    "& .MuiChip-root": {
                      height: "23px",
                      fontSize: "10px",
                      fontWeight: "500",
                      backgroundColor: "#A9A9A9",
                      color: "#fff",
                      mt: "5px",
                      "& .MuiChip-deleteIcon": {
                        color: "#fff",
                        height: "15px",
                      },
                      "& .MuiChip-label": {
                        px: "8px",
                      },
                    },
                  }}
                />
              )}
              onChange={(_, value) => {
                setFieldValue("pokemons", value);
              }}
              onBlur={handleBlur}
              size="small"
              isOptionEqualToValue={(option, value) => option.url === value.url}
            />

            <Box sx={{ display: "flex", alignSelf: "flex-end" }}>
              <Button variant="outlined" type="submit" size="small">
                Iniciar Sesión
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

LoginForm.propTypes = {
  pokemons: PropTypes.array,
};
