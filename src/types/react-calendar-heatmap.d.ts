declare module 'react-calendar-heatmap' {
	import { ComponentType } from 'react';

	interface CalendarHeatmapProps {
		values: Array<{ date: string; count: number }>;
		startDate: Date;
		endDate: Date;
		classForValue?: (value: { date: string; count: number } | null) => string;
		tooltipDataAttrs?: (
			value: { date: string; count: number } | null
		) => { [key: string]: string } | null;
	}

	const CalendarHeatmap: ComponentType<CalendarHeatmapProps>;
	export default CalendarHeatmap;
}
