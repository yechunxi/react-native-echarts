import * as React from 'react';
import { useEffect, useRef } from 'react';

import { StyleSheet, View, Dimensions } from 'react-native';
import { SVGRenderer, SkiaChart } from 'wrn-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';

// register extensions
echarts.use([
  TitleComponent,
  TooltipComponent,
  SVGRenderer,
  // ...
  BarChart,
]);

const E_HEIGHT = 250;
const E_WIDTH = Dimensions.get('screen').width;

function SkiaComponent({ option }: any) {
  const skiaRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (skiaRef.current) {
      // @ts-ignore
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  return <SkiaChart ref={skiaRef} />;
}

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
};
export default function App() {
  return (
    <View style={styles.container}>
      <SkiaComponent option={option}></SkiaComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});