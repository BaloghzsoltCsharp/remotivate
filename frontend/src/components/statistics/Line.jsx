import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
  } from "@progress/kendo-react-charts";
  import { COLORS } from "./constants";
  
  const categories = ["January", "February", "March"];

  export const series = [
    {
      name: "Total",
      data: [19, 9, 20],
      color: COLORS.Total,
    },
    {
      name: "In Progress",
      data: [12, 6, 15],
      color: COLORS.InProgress,
    },
    {
      name: "Done",
      data: [7, 3, 5],
      color: COLORS.Done,
    },
  ];

  
  
  const Line = props => {
    return (
      <Chart style={{ height: 350 }}>
        <ChartTitle text="Line chart test" />
        <ChartLegend position="top" orientation="vertical" />
        <ChartValueAxis>
          <ChartValueAxisItem title={{ text: "Tasks" }} min={0} max={30} />
        </ChartValueAxis>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} />
        </ChartCategoryAxis>  
        <ChartSeries>
        {series.map((item, idx) => (
          <ChartSeriesItem
            key={idx}
            type="line"
            tooltip={{ visible: true }}
            data={item.data}
            name={item.name}
          />
        ))}
      </ChartSeries>     
      </Chart>

    );
  };
  
  export default Line;