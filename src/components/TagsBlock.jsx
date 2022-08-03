import React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { Chip, Paper } from "@mui/material";

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Тэги">
      <Paper
        sx={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          gap: "10px",
          p: 1,
          m: 0,
        }}
        component="ul"
      >
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link
            key={i}
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}
          >
            <ListItem disablePadding>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <Chip
                  variant="outlined"
                  color="primary"
                  icon={<TagIcon />}
                  label={name}
                  clickable
                />
              )}
            </ListItem>
          </Link>
        ))}
      </Paper>
    </SideBlock>
  );
};
