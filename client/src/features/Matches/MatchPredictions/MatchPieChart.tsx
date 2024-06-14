import {PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const MatchPieChart = ({data}: { data: any }) => {
    return (
        <PieChart
            colors={['#003366', '#9ca3af', '#66ccff']} // Use palette
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
