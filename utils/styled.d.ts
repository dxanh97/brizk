import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    [color: string]: {
      [shade: number]: string;
    };
  }
}
