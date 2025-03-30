
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  Button,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  Refresh as RefreshCw,
  Camera,
  Warning as AlertCircle,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const predictionData = [
  {
    id: 1,
    name: "Fresh Salmon",
    category: "Seafood",
    freshness: 25,
    estimatedDaysLeft: 1,
    confidence: 92,
  },
  {
    id: 2,
    name: "Organic Spinach",
    category: "Produce",
    freshness: 30,
    estimatedDaysLeft: 1,
    confidence: 89,
  },
  {
    id: 3,
    name: "Heavy Cream",
    category: "Dairy",
    freshness: 45,
    estimatedDaysLeft: 2,
    confidence: 94,
  },
  {
    id: 4,
    name: "Ground Beef",
    category: "Meat",
    freshness: 60,
    estimatedDaysLeft: 2,
    confidence: 91,
  },
  {
    id: 5,
    name: "Tomatoes",
    category: "Produce",
    freshness: 70,
    estimatedDaysLeft: 3,
    confidence: 88,
  },
  {
    id: 6,
    name: "Chicken Breast",
    category: "Meat",
    freshness: 75,
    estimatedDaysLeft: 3,
    confidence: 93,
  },
];

const freshnessData = [
  { day: "Day 1", salmon: 95, spinach: 90, cream: 85, beef: 90 },
  { day: "Day 2", salmon: 85, spinach: 80, cream: 75, beef: 85 },
  { day: "Day 3", salmon: 70, spinach: 65, cream: 65, beef: 75 },
  { day: "Day 4", salmon: 55, spinach: 45, cream: 55, beef: 65 },
  { day: "Day 5", salmon: 40, spinach: 30, cream: 45, beef: 60 },
  { day: "Day 6", salmon: 25, spinach: 15, cream: 35, beef: 50 },
  { day: "Day 7", salmon: 10, spinach: 5, cream: 25, beef: 40 },
];

export function SpoilagePrediction() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardHeader
          title="Spoilage Prediction"
          subheader="AI-powered freshness monitoring and spoilage prediction"
        />
        <CardContent>
          <Alert severity="warning" icon={<AlertCircle />}>
            <Typography variant="h6">Attention Required</Typography>
            <Typography>
              4 items are predicted to expire within the next 48 hours. Take
              action to reduce waste.
            </Typography>
          </Alert>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button variant="outlined" startIcon={<RefreshCw />}>
              Refresh Analysis
            </Button>
            <Button variant="contained" startIcon={<Camera />}>
              Scan Item
            </Button>
          </Box>

          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ mt: 3 }}
          >
            <Tab label="At Risk Items" />
            <Tab label="Freshness Trends" />
            <Tab label="Historical Data" />
          </Tabs>

          {activeTab === 0 && (
            <Grid container spacing={2} mt={2}>
              {predictionData.map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Card>
                    <CardHeader title={item.name} subheader={item.category} />
                    <CardContent>
                      <Typography variant="body2">
                        Freshness: {item.freshness}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.freshness}
                        sx={{ height: 8, borderRadius: 2 }}
                      />
                      <Box display="flex" justifyContent="space-between" mt={2}>
                        <Box textAlign="center">
                          <Typography variant="body2">
                            Est. Days Left
                          </Typography>
                          <Typography variant="h6">
                            {item.estimatedDaysLeft}
                          </Typography>
                        </Box>
                        <Box textAlign="center">
                          <Typography variant="body2">AI Confidence</Typography>
                          <Typography variant="h6">
                            {item.confidence}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 1 && (
            <Card sx={{ mt: 2 }}>
              <CardHeader
                title="Freshness Trends"
                subheader="Tracking freshness levels over time for high-risk items"
              />
              <CardContent>
                <Box height={400}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={freshnessData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis
                        label={{
                          value: "Freshness %",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="salmon"
                        stroke="#ef4444"
                        name="Fresh Salmon"
                      />
                      <Line
                        type="monotone"
                        dataKey="spinach"
                        stroke="#22c55e"
                        name="Organic Spinach"
                      />
                      <Line
                        type="monotone"
                        dataKey="cream"
                        stroke="#3b82f6"
                        name="Heavy Cream"
                      />
                      <Line
                        type="monotone"
                        dataKey="beef"
                        stroke="#f59e0b"
                        name="Ground Beef"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card sx={{ mt: 2, textAlign: "center", p: 3 }}>
              <Typography color="textSecondary">
                Historical data visualization will appear here
              </Typography>
            </Card>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
