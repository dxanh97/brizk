import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    green: string;
    orange: string;
    red: string;
    neutral: Map<number, string>;
  }
}
