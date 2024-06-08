import * as Yup from "yup";

const minAgeDate = new Date();
minAgeDate.setFullYear(minAgeDate.getFullYear() - 12);

export const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "El nombre del perfil debe contener al menos 4 caracteres")
    .required("El nombre del perfil es requerido"),
  age: Yup.date()
    .max(minAgeDate, "Debes tener al menos 12 años")
    .required("La edad es requerida"),
  pokemons: Yup.array()
    .of(Yup.object())
    .min(2, "Debes seleccionar al menos 2 Pokémon")
    .max(6, "No puedes seleccionar más de 6 Pokémon")
    .required("Debes seleccionar entre 2 y 6 Pokémon"),
});
