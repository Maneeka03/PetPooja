import { useState } from "react";
import tomatos from "../assets/tomato.jpg";
import Capsicum from "../assets/capsicum.jpg";
import Broccoli from "../assets/broccoli.jpg";
import Carrots from "../assets/Carrots.webp";
import TablePagination from "@mui/material/TablePagination";

import {
  Box,
  Card,
  Chip,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Grid,
  Tooltip,
} from "@mui/material";
import { Search, FilterList, Refresh, CameraAlt } from "@mui/icons-material";
import Scan from "./Scan";

const inventoryData = [
  {
    id: 1,
    name: "Beef",
    category: "Meat",
    quantity: "5.2 kg",
    location: "Fridge 1",
    lastUpdated: "2 hours ago",
    status: "Good",
    image: tomatos,
  },
  {
    id: 2,
    name: "Capsicum",
    category: "Produce",
    quantity: "5.2 kg",
    location: "Fridge 1",
    lastUpdated: "3 hours ago",
    status: "Good",
    image: Capsicum,
  },
  {
    id: 3,
    name: "Broccoli",
    category: "Produce",
    quantity: "2.1 kg",
    location: "Fridge 1",
    lastUpdated: "3 hours ago",
    status: "Warning",
    image: Broccoli,
  },
  {
    id: 4,
    name: "Carrots",
    category: "Meat",
    quantity: "4.2 kg",
    location: "Freezer 1",
    lastUpdated: "2 days ago",
    status: "Good",
    image: Carrots,
  },
  {
    id: 5,
    name: "Tomatoes",
    category: "Dry Goods",
    quantity: "12 kg",
    location: "Pantry",
    lastUpdated: "1 week ago",
    status: "Good",
    image: tomatos,
  },
  {
    id: 6,
    name: "Capsicum",
    category: "Produce",
    quantity: "5.2 kg",
    location: "Fridge 1",
    lastUpdated: "3 hours ago",
    status: "Good",
    image: Capsicum,
  },
  {
    id: 7,
    name: "Tomatoes",
    category: "Produce",
    quantity: "5.2 kg",
    location: "Fridge 1",
    lastUpdated: "2 hours ago",
    status: "Good",
    image: tomatos,
  },
  {
    id: 8,
    name: "Broccoli",
    category: "Produce",
    quantity: "2.1 kg",
    location: "Fridge 1",
    lastUpdated: "3 hours ago",
    status: "Warning",
    image: Broccoli,
  },
  {
    id: 9,
    name: "Carrots",
    category: "Meat",
    quantity: "4.2 kg",
    location: "Freezer 1",
    lastUpdated: "2 days ago",
    status: "Good",
    image: Carrots,
  },
  {
    id: 10,
    name: "Tomatoes",
    category: "Dry Goods",
    quantity: "12 kg",
    location: "Pantry",
    lastUpdated: "1 week ago",
    status: "Good",
    image: tomatos,
  },
  {
    id: 11,
    name: "Capsicum",
    category: "Produce",
    quantity: "5.2 kg",
    location: "Fridge 1",
    lastUpdated: "3 hours ago",
    status: "Good",
    image: Capsicum,
  },
  {
    id: 12,
    name: "Broccoli",
    category: "Produce",
    quantity: "2.1 kg",
    location: "Fridge 1",
    lastUpdated: "3 hours ago",
    status: "Warning",
    image: Broccoli,
  },
  {
    id: 13,
    name: "Carrots",
    category: "Meat",
    quantity: "4.2 kg",
    location: "Freezer 1",
    lastUpdated: "2 days ago",
    status: "Good",
    image: Carrots,
  },
  {
    id: 14,
    name: "Tomatoes",
    category: "Dry Goods",
    quantity: "12 kg",
    location: "Pantry",
    lastUpdated: "1 week ago",
    status: "Good",
    image: tomatos,
  },
];

// Featured Item Component
const FeaturedItem = ({ item }) => {
  return (
    // <Paper
    //   elevation={2}
    //   sx={{
    //     height: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    //     position: "relative",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       p: 2,
    //       height: 350,
    //       overflow: "hidden",
    //     }}
    //   >
    //     <img
    //       src={item.image}
    //       alt={item.name}
    //       style={{
    //         maxWidth: "100%",
    //         maxHeight: "100%",
    //         objectFit: "contain",
    //       }}
    //     />
    //   </Box>
    //   <Box
    //     sx={{
    //       p: 2,
    //       textAlign: "center",
    //       borderTop: "1px solid #eee",
    //     }}
    //   >
    //     <Typography variant="h5" gutterBottom>
    //       {item.name}
    //     </Typography>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Typography variant="body1">{item.quantity}</Typography>
    //       <Badge
    //         color={
    //           item.status === "Alert"
    //             ? "error"
    //             : item.status === "Warning"
    //             ? "warning"
    //             : "success"
    //         }
    //         badgeContent={item.status}
    //       />
    //     </Box>
    //   </Box>
    // </Paper>
    <></>
  );
};

// Small Grid Item Component
const SmallGridItem = ({ item, onMouseEnter, onMouseLeave, isHovered }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onMouseEnter={() => onMouseEnter(item.id)}
      onMouseLeave={onMouseLeave}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 120,
          p: 2,
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          mt: "auto",
        }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            fontWeight: "medium",
          }}
        >
          {item.name}
        </Typography>
      </Box>

      {/* Info overlay on hover */}
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(50, 50, 50, 0.85)",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Location:</strong> {item.location}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Last Updated:</strong> {item.lastUpdated}
          </Typography>
          <Typography variant="body2">
            <strong>Category:</strong> {item.category}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export function InventoryTracker() {
  const [inventory] = useState(inventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(1); // Default to grid view
  const [hoveredItem, setHoveredItem] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleItemHover = (id) => {
    setHoveredItem(id);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

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

  // Separate the first item for featured display
  const featuredItem =
    filteredInventory.length > 0 ? filteredInventory[0] : null;
  const gridItems =
    filteredInventory.length > 1 ? filteredInventory.slice(0) : [];
  const statusStyles = {
    Alert: {
      backgroundColor: "#FFD1C1", // Light red-orange
      borderColor: "#FFA500", // Dark red-orange
      textColor: "#A93226", // Darker text for contrast
    },
    Warning: {
      backgroundColor: "#FFECB3", // Light yellow
      borderColor: "#FFA000", // Dark orange
      textColor: "#8B5A00",
    },
    Good: {
      backgroundColor: "#C8E6C9", // Light green
      borderColor: "#388E3C", // Dark green
      textColor: "#1B5E20",
    },
    Info: {
      backgroundColor: "#BBDEFB", // Light blue
      borderColor: "#1976D2", // Dark blue
      textColor: "#0D47A1",
    },
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedInventory = filteredInventory.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        p: 1, // Padding
        border: "1px solid #D3D3D3", // Light gray border
        borderRadius: "8px", // Optional rounded corners
      }}
    >
      <CardHeader
        title="Inventory Tracking"
        subheader="Real-time inventory management powered by computer vision"
        sx={{ textAlign: "left", alignItems: "flex-start", color: "black" }}
      />

      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: 2,
            mb: 3,
          }}
        >
          {/* Top Center - Search and Filters */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <TextField
              label="Search inventory"
              variant="outlined"
              size="small"
              sx={{ width: "250px", flexGrow: 1 }}
              InputProps={{ startAdornment: <Search /> }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel className="bg-white" sx={{ padding: "0px 7px" }}>
                Category
              </InputLabel>
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
              <InputLabel className="bg-white" sx={{ padding: "0px 7px" }}>
                Status
              </InputLabel>
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
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Left Side - Typography (Item Count) */}
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Showing {filteredInventory.length} of {inventory.length} items
            </Typography>

            {/* Right Side - Buttons */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" startIcon={<FilterList />}>
                More Filters
              </Button>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="outlined" startIcon={<Refresh />}>
                  Refresh
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CameraAlt />}
                  onClick={() => setOpen(true)}
                >
                  Scan New Item
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* View Tabs */}
        <Box sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="GRID VIEW" value={1} />
            <Tab label="TABLE VIEW" value={0} />
          </Tabs>
        </Box>

        {/* Table View */}
        {tabValue === 0 && (
          <TableContainer
            component={Paper}
            sx={{ border: "1px solid #D3D3D3", borderRadius: "8px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box sx={{ width: 60, height: 60 }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        variant="outlined"
                        sx={{
                          color: item.status === "Good" ? "green" : "orange",
                          borderColor:
                            item.status === "Good" ? "green" : "orange",
                          backgroundColor:
                            item.status === "Good"
                              ? "rgba(0, 128, 0, 0.1)" // Light green tint for success
                              : "rgba(255, 165, 0, 0.1)", // Light orange tint for warning
                          fontWeight: "normal",
                          borderRadius: "16px",
                          fontSize: "14px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredInventory.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}

        {/* Grid View with Featured Item */}
        {tabValue === 1 && featuredItem && (
          <Grid container spacing={3}>
            {/* Featured Item - left side */}
            <Grid item xs={12} md={7} lg={8}>
              <FeaturedItem item={featuredItem} />
            </Grid>

            {/* Right side grid items */}
            <Grid item xs={12} md={5} lg={4}>
              <Grid container spacing={3}>
                {gridItems.map((item) => (
                  <Grid item xs={12} sm={6} key={item.id}>
                    <SmallGridItem
                      item={item}
                      onMouseEnter={handleItemHover}
                      onMouseLeave={handleItemLeave}
                      isHovered={hoveredItem === item.id}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* Popup Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Scan Item</DialogTitle>
          <DialogContent>
            <Scan />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Box>
  );
}
