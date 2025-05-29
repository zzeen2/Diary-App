// components/molecules/charts/EmotionPieChart.js
import React from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const EmotionPieChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    name: item.name,
    population: item.count,
    color: item.color,
    legendFontColor: '#333',
    legendFontSize: 13,
  }));

  return (
    <View>
      <PieChart
        data={chartData}
        width={screenWidth - 32}
        height={200}
        chartConfig={{
          color: () => `#000`, // legend text color
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="16"
        center={[0, 0]}
        absolute
      />
    </View>
  );
};

export default EmotionPieChart;
