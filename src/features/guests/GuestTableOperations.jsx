import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function GuestTableOperations() {
  return (
    <TableOperations>
      <SortBy
        options={[
          "None",
          "Sort by latest",
          "Sort by name asc",
          "Sort by name desc",
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
