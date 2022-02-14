export type LineColor = 'green' | 'blue' | 'red' | 'yellow';

export type LineStatus = {
  [key in LineColor]?: Partial<{ status: string; message: string }>;
};
