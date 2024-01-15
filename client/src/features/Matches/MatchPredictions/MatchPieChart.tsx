import {PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const MatchPieChart = ({data}: { data: any }) => {
    return (
        <PieChart
            colors={['#004634', '#ff7900', '#9ca3af']} // Use palette
            series={[
                {
                    arcLabel: (item) => { if (item.percentage === 0) return ''; return item.percentage + '%'; },
                    data: data,
                },
            ]}
            width={400}
            height={200}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                },
            }}
        />
    );
}

export default MatchPieChart
