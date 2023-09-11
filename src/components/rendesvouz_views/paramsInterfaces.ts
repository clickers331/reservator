export interface DateParams {
  params: {
    month: string;
    day: string;
    year: string;
  };
}

export interface WeekParams {
  params: {
    weekNo: string | number;
  };
}
