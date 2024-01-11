import { PieChart } from '@mui/x-charts/PieChart';

const MatchPieChart = ({data}: {data: any}) => {
  return (
    <PieChart
      colors={['#004634', '#ff7900', '#9ca3af']} // Use palette
      series={[
        {
          data: data,
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default MatchPieChart
