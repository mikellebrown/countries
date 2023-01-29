const populationWithCommas = (population) => {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const menuLinks = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
  "All Countries",
];

export { populationWithCommas, menuLinks };
