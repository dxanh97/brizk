import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;

    colors: {
      white: string;
    };
  }
}
