// components/PieChart.jsx
import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
  padding-bottom: 60px;
`;

const SVG = styled.svg`
  transform: rotate(-90deg);
`;

const DonutSegment = styled.circle`
  fill: none;
  stroke-width: ${props => props.strokeWidth};
  stroke: ${props => props.color};
  stroke-dasharray: ${props => props.dashArray};
  stroke-dashoffset: ${props => props.dashOffset};
  transition: all 0.5s ease;
`;


function PieChart({ positive = 50, neutral = 30, negative = 20 }) {
  const size = 334;          // 전체 SVG 크기
  const innerRadius = 83;     // 중앙 빈 원 반지름
  const strokeWidth = 84;     // 도넛 두께
  const radius = innerRadius + strokeWidth / 2; // circle의 r 값
  const circumference = 2 * Math.PI * radius;

  const total = positive + neutral + negative;
  const positiveDash = (positive / total) * circumference;
  const neutralDash = (neutral / total) * circumference;
  const negativeDash = (negative / total) * circumference;

  const positiveOffset = 0;
  const neutralOffset = -positiveDash;
  const negativeOffset = -(positiveDash + neutralDash);

  return (
    <ChartContainer>
      <SVG width={size} height={size}>
        <DonutSegment
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          color="#759AFC"
          dashArray={`${positiveDash} ${circumference}`}
          dashOffset={positiveOffset}
        />
        <DonutSegment
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          color="#494954"
          dashArray={`${neutralDash} ${circumference}`}
          dashOffset={neutralOffset}
        />
        <DonutSegment
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          color="#FF9762"
          dashArray={`${negativeDash} ${circumference}`}
          dashOffset={negativeOffset}
        />
      </SVG>
    </ChartContainer>
  );
}


export default PieChart;