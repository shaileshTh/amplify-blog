/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextFieldProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MyMarketingFooterOverridesProps = {
    MyMarketingFooter?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 738"?: PrimitiveOverrideProps<ViewProps>;
    text4?: PrimitiveOverrideProps<TextProps>;
    text3?: PrimitiveOverrideProps<TextProps>;
    "Frame 313"?: PrimitiveOverrideProps<FlexProps>;
    text1?: PrimitiveOverrideProps<TextProps>;
    TextField?: PrimitiveOverrideProps<TextFieldProps>;
    text2?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type MyMarketingFooterProps = React.PropsWithChildren<Partial<ViewProps> & {
    breakpoint?: "large" | "medium";
} & {
    overrides?: MyMarketingFooterOverridesProps | undefined | null;
}>;
export default function MyMarketingFooter(props: MyMarketingFooterProps): React.ReactElement;
