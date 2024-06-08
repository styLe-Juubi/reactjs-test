import {
  Autocomplete,
  Button,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { LoginSchema } from "../../schemas/LoginSchema";
import usePokemons from "../../hooks/usePokemons";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useStore } from "../../context/store";
import { toast } from "react-toastify";
import { useGeolocation } from "../../hooks/useGeolocation";
import * as S from "./EditProfile.styled";

export default function EditProfile() {
  const { isLoading, data: pokemons } = usePokemons();
  const { locationInfo, locationError } = useGeolocation();
  const { user, setUser } = useStore((state) => state);

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
    toast.success("Usuario editado correctamente");
  };

  return (
    <S.EditProfileContainer>
      {isLoading ? (
        <Skeleton variant="rectangular" width={500} height={250} />
      ) : (
        <Formik
          initialValues={{
            name: user.name,
            age: user.age,
            pokemons: user.pokemons,
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form>
              <S.FormContainer
                sx={{
                  padding: { xs: 2, md: 4 },
                  width: { xs: "90%", md: "35rem" },
                  boxShadow: 2,
                }}
              >
                <Typography variant="h5" fontWeight={700}>
                  Editar Perfil
                </Typography>

                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
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
                  options={pokemons?.results}
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
                  isOptionEqualToValue={(option, value) =>
                    option.url === value.url
                  }
                  value={values.pokemons}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  disabled={isSubmitting}
                >
                  Editar Perfil
                </Button>
              </S.FormContainer>
            </Form>
          )}
        </Formik>
      )}
    </S.EditProfileContainer>
  );
}
