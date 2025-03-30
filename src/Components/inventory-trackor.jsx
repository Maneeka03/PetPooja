import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Badge,
} from "@mui/material";
import { Search, FilterList, Refresh, CameraAlt } from "@mui/icons-material";

// Mock inventory data
const inventoryData = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Produce",
    quantity: "5.2 kg",
    location: "Fridge 1",
    lastUpdated: "2 hours ago",
    status: "Good",
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Meat",
    quantity: "3.5 kg",
    location: "Freezer 2",
    lastUpdated: "1 day ago",
    status: "Good",
  },
  {
    id: 3,
    name: "Heavy Cream",
    category: "Dairy",
    quantity: "1.8 L",
    location: "Fridge 2",
    lastUpdated: "5 hours ago",
    status: "Warning",
  },
  {
    id: 4,
    name: "Lettuce",
    category: "Produce",
    quantity: "2.1 kg",
    location: "Fridge 1",
    lastUpdated: "3 hours ago",
    status: "Warning",
  },
  {
    id: 5,
    name: "Ground Beef",
    category: "Meat",
    quantity: "4.2 kg",
    location: "Freezer 1",
    lastUpdated: "2 days ago",
    status: "Good",
  },
  {
    id: 6,
    name: "Flour",
    category: "Dry Goods",
    quantity: "12 kg",
    location: "Pantry",
    lastUpdated: "1 week ago",
    status: "Good",
  },
];

export function InventoryTracker() {
  const [inventory] = useState(inventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader
          title="Inventory Tracking"
          subheader="Real-time inventory management powered by computer vision"
        />
        <CardContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
            <TextField
              label="Search inventory"
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{ startAdornment: <Search /> }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="All">All Categories</MenuItem>
                <MenuItem value="Produce">Produce</MenuItem>
                <MenuItem value="Meat">Meat</MenuItem>
                <MenuItem value="Seafood">Seafood</MenuItem>
                <MenuItem value="Dairy">Dairy</MenuItem>
                <MenuItem value="Dry Goods">Dry Goods</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Warning">Warning</MenuItem>
                <MenuItem value="Alert">Alert</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<FilterList />}>
              More Filters
            </Button>
            <Button variant="outlined" startIcon={<Refresh />}>
              Refresh
            </Button>
            <Button variant="contained" startIcon={<CameraAlt />}>
              Scan New Item
            </Button>
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Showing {filteredInventory.length} of {inventory.length} items
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Badge
                        color={
                          item.status === "Alert"
                            ? "error"
                            : item.status === "Warning"
                            ? "warning"
                            : "success"
                        }
                        badgeContent={item.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
