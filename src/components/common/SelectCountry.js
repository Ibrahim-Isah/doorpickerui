import React, { Component } from "react";
import Select from "react-select";
import { laglgas } from "../../utils/ngdata";
const lgas = laglgas.map((l) => {
  return {
    label: l,
    value: l,
  };
});
class SelectCountry extends Component {
  render() {
    return (
      <>
        <Select placeholder="Select a Location" options={lgas} />
      </>
    );
  }
}

export default SelectCountry;
