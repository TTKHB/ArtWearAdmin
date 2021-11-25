import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import Chip from "@mui/material/Chip";

const ListChip = ({ colors, setColors, onDelete, onClick, selectColor }) => {
  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
      }}
    >
      {colors.map((color) => {
        return (
          <Chip
            onClick={() => onClick(color.hexString)}
            onDelete={() => onDelete(color)}
            icon={<CircleIcon style={{ color: color.hexString }} />}
            label={color.name}
            style={{ margin: 3 }}
            color={selectColor == color.hexString ? "primary" : "default"}
            variant={selectColor == color.hexString ? null : "outlined"}
          />
        );
      })}
    </div>
  );
};

export default ListChip;
