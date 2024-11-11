import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import ListItem from "../../Components/ListItem/ListItem";
import "../../App.css";

function detailPage() {
  const location = useLocation();
  const { site } = location.state || {};
  if (!site) {
    return <div>No data available for this site.</div>;
  }
  return <ListItem site={site}></ListItem>;
}
export default detailPage;
