const HandleSearch = (
  activitySearch: string,
  fn: (x: string) => void,
  fn2: (x: number) => void,
) => {
  fn(activitySearch)
  fn2(0)
}

export { HandleSearch }
