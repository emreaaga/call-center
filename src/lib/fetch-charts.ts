export interface WeeklyDuration {
  day: string;
  duration: number;
  call_count: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
  percentage: number;
  label_ru: string;
}

export interface ChartsResponse {
  weekly_duration: WeeklyDuration[];
  status_distribution: StatusDistribution[];
}

export const fetchCharts = (url: string): Promise<ChartsResponse> =>
  fetch(url, { credentials: 'include' }).then(async (res) => {
    if (!res.ok) throw new Error(`Ошибка ${res.status}`);
    return res.json() as Promise<ChartsResponse>;
  })
