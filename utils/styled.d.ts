import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    green: string;
    orange: string;
    neutral: Map<number, string>;
  }
}
