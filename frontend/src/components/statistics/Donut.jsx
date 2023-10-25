import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartTooltip,
  } from "@progress/kendo-react-charts";
  import { COLORS } from "./constants";

  const renderTooltip = context => {
    const { category, value } = context.point || context;
    return (
      <div>
        {category}: {value}%
      </div>
    );
  };
  const projectStatusThisMonth = [
    {
      status: "Done",
      value: 14,
      color: COLORS.Done,
    },
    {
      status: "In Progress",
      value: 14,
      color: COLORS.Review,
    },
    {
      status: "Not started",
      value: 40,
      color: COLORS.NotStarted,
    },
    {
      status: "Review",
      value: 32,
      color: COLORS.InProgress,
    },
  ];

  const labelContent = e => e.category;
  
  const Charts = props => {
    return (
      <Chart>
        <ChartTitle text="Projects" />
        <ChartLegend visible={false} />
        <ChartTooltip render={renderTooltip} />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
            data={projectStatusThisMonth}
            categoryField="status"
            field="value"
          >
            <ChartSeriesLabels
              color="#fff"
              background="none"
              content={labelContent}
            />
          </ChartSeriesItem>
        </ChartSeries>
      </Chart>
    );
  };
  
  export default Charts;