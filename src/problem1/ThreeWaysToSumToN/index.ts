// O(n) time, O(1) space — iterative loop
const sum_to_n_a = (n: number): number => {
  if (n <= 0 || Number.isNaN(n)) return 0;
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

// O(n) time, O(n) call stack — recursive
const sum_to_n_b = (n: number): number => {
  if (n <= 0 || Number.isNaN(n)) return 0;

  return n + sum_to_n_b(n - 1);
};

// O(1) time, O(1) space — closed-form Gauss's formula
const sum_to_n_c = (n: number): number => {
  if (n <= 0 || Number.isNaN(n)) return 0;

  return (n * (n + 1)) / 2;
};