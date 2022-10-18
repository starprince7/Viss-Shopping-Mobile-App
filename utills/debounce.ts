type Debounce = (
  fn: (args: any) => any,
  delay?: number
) => (...args: any[]) => void;

const debounce: Debounce = (fn, delay = 1200) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (text: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(text);
    }, delay);
  };
};

export default debounce
