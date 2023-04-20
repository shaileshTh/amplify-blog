/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, IconProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MyResponsiveNavOverridesProps = {
    MyResponsiveNav?: PrimitiveOverrideProps<FlexProps>;
    Logo36562864?: PrimitiveOverrideProps<FlexProps>;
    "Star 1"?: PrimitiveOverrideProps<IconProps>;
    Logo36562866?: PrimitiveOverrideProps<TextProps>;
    "Frame 32136562867"?: PrimitiveOverrideProps<FlexProps>;
    Dashboard?: PrimitiveOverrideProps<TextProps>;
    Jobs?: PrimitiveOverrideProps<TextProps>;
    Applicants?: PrimitiveOverrideProps<TextProps>;
    "Frame 32136562871"?: PrimitiveOverrideProps<FlexProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
} & EscapeHatchProps;
export declare type MyResponsiveNavProps = React.PropsWithChildren<Partial<FlexProps> & {
    breakpoint?: "large" | "medium" | "small" | "xl";
} & {
    overrides?: MyResponsiveNavOverridesProps | undefined | null;
}>;
export default function MyResponsiveNav(props: MyResponsiveNavProps): React.ReactElement;
