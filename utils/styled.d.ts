import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    bottomSheetBackground: string;
    colors: {
      white: string;
      green: string;
    };
  }
}
