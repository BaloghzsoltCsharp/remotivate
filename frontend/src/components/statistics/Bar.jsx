import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisTitle,
    ChartCategoryAxisItem,
  } from "@progress/kendo-react-charts";
  import { COLORS } from "./constants";
  
  const series = [
    {
      status: "Total",
      data: [43, 30, 59],
      color: COLORS.Total,
    },
    {
      status: "In Progress",
      data: [25, 15, 30],
      color: COLORS.InProgress,
    },
    {
      status: "Review",
      data: [3, 5, 1],
      color: COLORS.interviewed,
    },
    {
      status: "Not started",
      data: [14, 10, 25],
      color: COLORS.NotStarted,
    },
    {
      status: "Done",
      data: [1, 3, 2],
      color: COLORS.Done,
    },
  ];

  const categories = ["Jan", "Feb", "Mar"];

const seriesLabels = {
  visible: true,
  padding: 3,
  font: "normal 16px Arial, sans-serif",
  position: "center",
};

const Bar = props => {
    return (
      <Chart >
        <ChartTitle text="Bar chart test" />
        <ChartLegend visible={true} />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories}>
            <ChartCategoryAxisTitle text="Months" />
          </ChartCategoryAxisItem>
        </ChartCategoryAxis>
        <ChartSeries>
          {series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="bar"
              gap={2}
              spacing={0.25}
              labels={seriesLabels}
              data={item.data}
              name={item.status}
              color={item.color}
            />
          ))}      
        </ChartSeries>
      </Chart>
    );
  };
  
  export default Bar;
