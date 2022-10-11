export const classSplitter = (...args: any[]) => {
  return args.filter(Boolean).join(" ");
};
