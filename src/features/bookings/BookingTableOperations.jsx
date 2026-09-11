import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={["All", "Checked out", "Checked in", "Unconfirmed"]}
      />

      <SortBy
        options={[
          "Sort by date (recent first)",
          "Sort by date (earlist first)",
          "Sort by amount (high first)",
          "Sort by amount (low first)",
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
