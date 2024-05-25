declare module "wrap-ansi" {
  export default function wrapAnsi(
    input: string,
    columns: number,
    options?: any,
  ): string;
}
