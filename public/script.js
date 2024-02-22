document.addEventListener("DOMContentLoaded", () => {
  const selectInput = document.getElementById("provincia");
  const localidad = document.getElementById("localidad");
  fetch("/provincias")
    .then((res) => res.json())
    .then((data) =>
      data.provincias
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
        .forEach((provincia) => {
          selectInput.innerHTML += `
  <option value=${provincia.nombre}>${provincia.nombre}</option>
  `;
        }),
    );

  selectInput.addEventListener("change", setLocalidad);

  function setLocalidad() {
    localidad.innerHTML = "";
    const provinciaValue = selectInput.value;
    fetch("/departamentos/" + provinciaValue)
      .then((res) => res.json())
      .then((json) =>
        json.departamentos
          .sort((a, b) => a.nombre.localeCompare(b.nombre))
          .forEach((dep) => {
            localidad.innerHTML += `
      <option value=${dep.nombre}> ${dep.nombre} </option>
      `;
          }),
      );
  }
});
