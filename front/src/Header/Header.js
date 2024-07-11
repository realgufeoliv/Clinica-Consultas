import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import DefaultHeaderButton from "../Style/DefaultCustomButton"; // Corrigi a importação

function Header() {
  const navItems = [
    { label: "Marcar Consultas", path: '/' },
    { label: "Ver Consultas", path: "/consultas" }
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedButton, setSelectedButton] = useState("");

  useEffect(() => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setSelectedButton(currentItem.label);
    }
  }, [location, navItems]);

  const handleClick = (item) => {
    navigate(item.path);
    setSelectedButton(item.label);
    console.log("Button clicked:", item);
  };

  return (
    <AppBar style={{ padding: 10 }} sx={{ bgcolor: 'white' }} position="sticky">
      <Box sx={{ display: { xs: "none", sm: "block" } }} position="static">
        {navItems.map((item, index) => (
          <DefaultHeaderButton
            variant="outlined"
            className={selectedButton === item.label ? "Mui-selected" : ""}
            key={index}
            onClick={() => handleClick(item)}
          >
            {item.label}
          </DefaultHeaderButton>
        ))}
      </Box>
    </AppBar>
  );
}

export default Header;
