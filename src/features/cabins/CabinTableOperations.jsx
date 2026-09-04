import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={["All", "With Discount", "No Discount"]}
      />

      <SortBy
        options={[
          "None",
          "Sort by latest",
          "Sort by name asc",
          "Sort by price asc",
          "Sort by capacity asc",
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
