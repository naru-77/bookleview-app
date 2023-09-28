import React from "react";
import { Button } from "@mantine/core";

function Pagination({ currentPage, setCurrentPage }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      {currentPage > 1 && (
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          style={{ marginRight: 10 }}
          variant="light"
        >
          前へ
        </Button>
      )}
      <span>{currentPage}</span>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        style={{ marginLeft: 10 }}
        variant="light"
      >
        次へ
      </Button>
    </div>
  );
}

export default Pagination;
